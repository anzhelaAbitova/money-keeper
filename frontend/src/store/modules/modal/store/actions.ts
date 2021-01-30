import { ActionTree } from 'vuex';
import { IModalState } from '../types';
import { IRootState } from '../../../types';
import { SET_MODAL_STATE } from './mutations-types';

const actions: ActionTree<IModalState, IRootState> = {
  setModalState({ commit }, payload: IModalState) {
    commit(SET_MODAL_STATE, payload);
  },
};

export default actions;
