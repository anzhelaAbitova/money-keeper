import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
import { IServicesState } from './types';

const state = {
  services: [],
};

const services: Module<IServicesState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default services;
