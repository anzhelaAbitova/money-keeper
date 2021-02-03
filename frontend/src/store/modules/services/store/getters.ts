import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IServicesState } from '../types';

const getters: GetterTree<IServicesState, IRootState> = {
  services: (state: IServicesState) => state.services,
};

export default getters;
