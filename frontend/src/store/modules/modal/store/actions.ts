import { ActionTree } from 'vuex';
import { IModalState } from '../types';
import { IRootState } from '../../../types';
import { SET_MODAL_STATE, CLOSE_MODAL } from './mutations-types';

const actions: ActionTree<IModalState, IRootState> = {
  setModalState({ commit }, payload: IModalState) {
    commit(SET_MODAL_STATE, payload);
  },
  closeModal({ commit }) {
    commit(CLOSE_MODAL);
  },
};

export default actions;
