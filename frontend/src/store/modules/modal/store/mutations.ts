import { MutationTree } from 'vuex';
import { IModalState } from '../types';
import { SET_MODAL_STATE, CLOSE_MODAL } from './mutations-types';

const mutations: MutationTree<IModalState> = {
  [SET_MODAL_STATE](state, payload: IModalState) {
    if (!payload) state.modalState = false;
    else {
      state.modalState = payload.modalState;
      if (payload.modalComponentName) state.modalComponentName = payload.modalComponentName;
      if (payload.modalParams) state.modalParams = payload.modalParams;
    }
  },
  [CLOSE_MODAL](state) {
    state.modalState = false;
  },
};

export default mutations;
