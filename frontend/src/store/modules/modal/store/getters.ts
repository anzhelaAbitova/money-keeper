import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IModalState } from '../types';

const getters: GetterTree<IModalState, IRootState> = {
  getModalState: (state: IModalState): boolean => state.modalState,
  getModalComponentName: (state: IModalState): string => state.modalComponentName,
  getModalParams: (state: IModalState): object => state.modalParams,
};

export default getters;
