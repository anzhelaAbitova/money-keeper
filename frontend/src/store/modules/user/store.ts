import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
<<<<<<< HEAD
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
=======
import { IUser } from './types';

const state = {
  avatar: '',
  name: 'Jane Doe',
  status: 'active',
  position: 'Web-designer',
  email: localStorage.getItem('app-rs-email') || '',
  token: localStorage.getItem('app-rs-token') || '',
};

const user: Module<IUser, IRootState> = {
>>>>>>> develop
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default user;
