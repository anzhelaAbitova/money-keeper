import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IModalState } from '../types';

const getters: GetterTree<IModalState, IRootState> = {
<<<<<<< HEAD
  getModalState: (state: IModalState) => state.modalState,
  getModalComponentName: (state: IModalState) => state.modalComponentName,
  getModalParams: (state: IModalState) => state.modalParams,
  getModalHeight: (state: IModalState) => state.modalHeight,
=======
  getModalState: (state: IModalState): boolean => state.modalState,
  getModalComponentName: (state: IModalState): string => state.modalComponentName,
  getModalParams: (state: IModalState): object => state.modalParams,
>>>>>>> develop
};

export default getters;
