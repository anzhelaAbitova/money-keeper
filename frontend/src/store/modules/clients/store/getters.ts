import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IClientsState } from '../types';

const getters: GetterTree<IClientsState, IRootState> = {
  clients: (state: IClientsState) => state.clients,
};

export default getters;
