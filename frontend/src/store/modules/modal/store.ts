import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
import { IModalState } from './types';

const state = {
  modalComponentName: '',
  modalState: false,
  modalParams: {},
};

const modal: Module<IModalState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default modal;
