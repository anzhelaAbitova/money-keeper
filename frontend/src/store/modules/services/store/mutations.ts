import { MutationTree } from 'vuex';
import { IServicesState } from '../types';
import { SET_STATE_SERVICES, CLEAR_STATE } from './mutations-types';

const mutations: MutationTree<IServicesState> = {
  [SET_STATE_SERVICES](state, payload) {
    state.services = [];
    state.services = payload;
  },
  [CLEAR_STATE](state) {
    state.services = [];
  },
};

export default mutations;
