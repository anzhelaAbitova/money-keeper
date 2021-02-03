import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
import { IUserState } from './types';

const state = {
  token: localStorage.getItem('rsapp-token') || null,
  user: localStorage.getItem('rsapp-user') || '',
  request: false,
  data: {
    avatar: '',
    name: 'New User',
    status: 'active',
    position: 'Web-designer',
    uid: 'New User',
  },
};

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default user;
