import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { ICompanyState } from '../types';
import { IRootState } from '../../../types';
import { SET_STATE_COMPANY, CLEAR_STATE } from './mutations-types';

const actions: ActionTree<ICompanyState, IRootState> = {
  setCompanyData({ dispatch, commit, getters }, payload) {
    let data = getters.company;
    data = { ...data, ...payload };
    return new Promise((resolve, reject) => {
      dispatch('getUid')
        .then((userId) => {
          firebase.database()
            .ref(`company/${userId}`)
            .set(data);
        })
        .then((resp) => {
          commit(SET_STATE_COMPANY, data);
          resolve(resp);
        })
        .catch((err) => reject(err));
    });
  },
  getCompanyData({ dispatch, commit }) {
    dispatch('getUid')
      .then((uid) => {
        firebase.database()
          .ref(`/company/${uid}`)
          .once('value')
          .then((snapshot) => {
            const userdata = (snapshot.val() && snapshot.val()) || {};
            commit(SET_STATE_COMPANY, userdata);
          });
      });
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
  clearCompanyData({ commit }) {
    commit(CLEAR_STATE);
  },
};

export default actions;
