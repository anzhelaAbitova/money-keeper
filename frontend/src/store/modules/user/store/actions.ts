import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { IUserState } from '../types';
import { IRootState } from '../../../types';
import {
  AUTH_SUCCESS,
  LOGOUT,
  REG_SUCCESS,
  SET_USER_AVATAR,
} from './mutations-types';

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
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then((resp) => {
          console.log('logout', resp);
          commit(LOGOUT);
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  register({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      // eslint-disable-next-line
        .then((res: any) => {
          const user = { token: res.user.refreshToken, user: { email: res.user.email } };
          commit(REG_SUCCESS, user);
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setUserAvatar({ dispatch, commit }, payload: string) {
    dispatch('getUid')
      .then((userId) => {
        firebase.database().ref(`users/${userId}`).set({ avatar: payload });
      })
      .then(() => {
        commit(SET_USER_AVATAR, payload);
      });
  },
  getUserAvatar({ dispatch, commit }) {
    dispatch('getUid')
      .then((userId) => firebase.database().ref(`users/${userId}`).once('value'))
      .then((snapshot) => {
        const avatar = (snapshot.val() && snapshot.val().avatar) || '';
        commit(SET_USER_AVATAR, avatar);
      });
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
};

export default actions;
