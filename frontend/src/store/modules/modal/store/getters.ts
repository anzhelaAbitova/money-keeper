import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IModalState } from '../types';

const getters: GetterTree<IModalState, IRootState> = {
  getModalState: (state: IModalState) => state.modalState,
  getModalComponentName: (state: IModalState) => state.modalComponentName,
  getModalParams: (state: IModalState) => state.modalParams,
};

export default getters;
