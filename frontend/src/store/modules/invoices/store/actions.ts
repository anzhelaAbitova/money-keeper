import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { IInvoicesState } from '../types';
import { IRootState } from '../../../types';
import { SET_STATE_INVOICES, CLEAR_STATE } from './mutations-types';

const actions: ActionTree<IInvoicesState, IRootState> = {
  setInvoicesData({ dispatch, commit, getters }, payload) {
    const data = [...getters.invoices];
    data.push(payload);
    return new Promise((resolve, reject) => {
      dispatch('getUid')
        .then((userId) => {
          firebase.database()
            .ref(`invoices/${userId}`)
            .set(data);
        })
        .then((resp) => {
          commit(SET_STATE_INVOICES, data);
          resolve(resp);
        })
        .catch((err) => reject(err));
    });
  },
  getInvoicesData({ dispatch, commit }) {
    dispatch('getUid')
      .then((uid) => {
        firebase.database()
          .ref(`/invoices/${uid}`)
          .once('value')
          .then((snapshot) => {
            const invoices = (snapshot.val() && snapshot.val()) || [];
            commit(SET_STATE_INVOICES, invoices);
          });
      });
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
  clearInvoicesData({ commit }) {
    commit(CLEAR_STATE);
  },
};

export default actions;
