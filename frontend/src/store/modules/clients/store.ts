import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
import { IClientsState } from './types';

const state = {
  clients: [],
};

const clients: Module<IClientsState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default clients;
