import { MutationTree } from 'vuex';
import { IModalState } from '../types';
import { SET_MODAL_STATE } from './mutations-types';

const mutations: MutationTree<IModalState> = {
  [SET_MODAL_STATE](state, payload: IModalState) {
    state.modalComponentName = payload.modalComponentName || '';
    state.modalState = payload.modalState || false;
    state.modalParams = payload.modalParams || {};
  },
};

export default mutations;
