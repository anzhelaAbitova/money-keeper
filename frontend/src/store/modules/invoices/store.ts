import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
import { IInvoicesState } from './types';

const state = {
  invoices: [],
  statuses: ['в работе', 'готов', 'оплачен'],
};

const invoices: Module<IInvoicesState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default invoices;
