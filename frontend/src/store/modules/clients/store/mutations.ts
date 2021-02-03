import { MutationTree } from 'vuex';
import { IClientsState } from '../types';
import { SET_STATE_CLIENTS, CLEAR_STATE } from './mutations-types';

const mutations: MutationTree<IClientsState> = {
  [SET_STATE_CLIENTS](state, payload) {
    state.clients = [];
    state.clients = payload;
  },
  [CLEAR_STATE](state) {
    state.clients = [];
  },
};

export default mutations;
