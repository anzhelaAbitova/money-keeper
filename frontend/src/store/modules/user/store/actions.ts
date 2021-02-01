import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { IUserState } from '../types';
import { IRootState } from '../../../types';
import { AUTH_SUCCESS, LOGOUT, REG_SUCCESS } from './mutations-types';

const actions: ActionTree<IUserState, IRootState> = {
  // login({ dispatch, commit }, { email, password }) {
  login({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        // eslint-disable-next-line
        .then((res: any) => {
          const user = { token: res.user.refreshToken, user: { email: res.user.email } };
          commit(AUTH_SUCCESS, user);
          // const uid = dispatch('getUid');
          // console.log('uid = ', uid);
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
  // async getUid() {
  //   const user = await firebase.auth().currentUser;
  //   return user ? user.uid : null;
  // },
};

export default actions;
