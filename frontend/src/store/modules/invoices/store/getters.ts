import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IInvoicesState } from '../types';

const getters: GetterTree<IInvoicesState, IRootState> = {
  invoices: (state: IInvoicesState) => state.invoices,
  getInvoicesStatuses: (state: IInvoicesState) => state.statuses,
};

export default getters;
