import firebase from 'firebase/app';
import { ActionTree } from 'vuex';
import { IServicesState } from '../types';
import { IRootState } from '../../../types';
import { SET_STATE_SERVICES, CLEAR_STATE } from './mutations-types';

const actions: ActionTree<IServicesState, IRootState> = {
  setServicesData({ dispatch, commit, getters }, payload) {
    const data = [...getters.services];
    data.push(payload);
    return new Promise((resolve, reject) => {
      dispatch('getUid')
        .then((userId) => {
          firebase.database()
            .ref(`services/${userId}`)
            .set(data);
        })
        .then((resp) => {
          commit(SET_STATE_SERVICES, data);
          resolve(resp);
        })
        .catch((err) => reject(err));
    });
  },
  getServicesData({ dispatch, commit }) {
    dispatch('getUid')
      .then((uid) => {
        firebase.database()
          .ref(`/services/${uid}`)
          .once('value')
          .then((snapshot) => {
            const services = (snapshot.val() && snapshot.val()) || [];
            commit(SET_STATE_SERVICES, services);
          });
      });
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
  clearServicesData({ commit }) {
    commit(CLEAR_STATE);
  },
};

export default actions;
