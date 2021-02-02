import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { IUserState } from '../types';
import { IRootState } from '../../../types';
import {
  AUTH_SUCCESS,
  LOGOUT,
  REG_SUCCESS,
  SET_USER_DATA,
} from './mutations-types';
import { CLEAR_STATE } from '../../company/store/mutations-types';

const actions: ActionTree<IUserState, IRootState> = {
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        // eslint-disable-next-line
        .then((res: any) => {
          const user = { token: res.user.refreshToken, user: { email: res.user.email } };
          commit(AUTH_SUCCESS, user);
          resolve(user);
        })
        .catch((error) => {
          // commit('setError', error);
          reject(error);
        });
    });
  },
  logout({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit(LOGOUT);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  register({ dispatch, commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        // eslint-disable-next-line
        .then((res: any) => {
          const user = { token: res.user.refreshToken, user: { email } };
          commit(REG_SUCCESS, user);
        })
        .then(() => dispatch('setUserData', { email }))
        .then(() => {
          resolve(email);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setUserData({ dispatch, commit, getters }, payload) {
    let data = getters.userData;
    data = { ...data, ...payload };
    return new Promise((resolve, reject) => {
      dispatch('getUid')
        .then((userId) => {
          data.uid = userId;
          return userId;
        })
        .then((userId) => {
          firebase.database()
            .ref(`users/${userId}`)
            .set({ user: data });
        })
        .then((resp) => {
          commit(SET_USER_DATA, data);
          resolve(resp);
        })
        .catch((err) => reject(err));
    });
  },
  getUserData({ dispatch, commit }) {
    dispatch('getUid')
      .then((uid) => {
        firebase.database()
          .ref(`/users/${uid}`)
          .once('value')
          .then((snapshot) => {
            const userdata = (snapshot.val() && snapshot.val().user) || 'Anonymous';
            commit(SET_USER_DATA, userdata);
          });
      });
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
};

export default actions;
