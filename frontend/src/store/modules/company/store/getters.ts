import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { ICompanyState } from '../types';

const getters: GetterTree<ICompanyState, IRootState> = {
  settingsComapany: (state: ICompanyState) => state.settings,
  dataComapany: (state: ICompanyState) => state.data,
  company: (state: ICompanyState) => state,
};

export default getters;
