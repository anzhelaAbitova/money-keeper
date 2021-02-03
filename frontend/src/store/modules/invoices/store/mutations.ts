import { MutationTree } from 'vuex';
import { IInvoicesState } from '../types';
import { SET_STATE_INVOICES, CLEAR_STATE } from './mutations-types';

const mutations: MutationTree<IInvoicesState> = {
  [SET_STATE_INVOICES](state, payload) {
    state.invoices = [];
    state.invoices = payload;
  },
  [CLEAR_STATE](state) {
    state.invoices = [];
  },
};

export default mutations;
