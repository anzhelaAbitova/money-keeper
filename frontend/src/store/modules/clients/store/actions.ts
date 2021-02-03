import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { IClientsState } from '../types';
import { IRootState } from '../../../types';
import { SET_STATE_CLIENTS, CLEAR_STATE } from './mutations-types';

const actions: ActionTree<IClientsState, IRootState> = {
  setClientsData({ dispatch, commit, getters }, payload) {
    const data = [...getters.clients];
    data.push(payload);
    return new Promise((resolve, reject) => {
      dispatch('getUid')
        .then((userId) => {
          firebase.database()
            .ref(`clients/${userId}`)
            .set(data);
        })
        .then((resp) => {
          commit(SET_STATE_CLIENTS, data);
          resolve(resp);
        })
        .catch((err) => reject(err));
    });
  },
  getClientsData({ dispatch, commit }) {
    dispatch('getUid')
      .then((uid) => {
        firebase.database()
          .ref(`/clients/${uid}`)
          .once('value')
          .then((snapshot) => {
            const userdata = (snapshot.val() && snapshot.val()) || [];
            commit(SET_STATE_CLIENTS, userdata);
          });
      });
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
  clearClientsData({ commit }) {
    commit(CLEAR_STATE);
  },
};

export default actions;
