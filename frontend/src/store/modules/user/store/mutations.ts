import { MutationTree } from 'vuex';
import { IUserState } from '../types';
import {
  AUTH_SUCCESS,
  LOGOUT,
  REG_SUCCESS,
  SET_USER_DATA,
} from './mutations-types';

const mutations: MutationTree<IUserState> = {
  [AUTH_SUCCESS](state, { token, user }) {
    state.token = token;
    localStorage.setItem('rsapp-token', token);
    state.user = user.email;
    localStorage.setItem('rsapp-user', user.email);
  },
  [LOGOUT](state) {
    state.token = null;
    state.user = '';
    state.data = {
      avatar: '',
      name: '',
      status: '',
      position: '',
      uid: '',
    };
    localStorage.clear();
  },
  [REG_SUCCESS](state, { token, user }) {
    state.token = token;
    localStorage.setItem('rsapp-token', token);
    state.user = user.email;
    localStorage.setItem('rsapp-user', user.email);
  },
  [SET_USER_DATA](state, payload = '') {
    state.data = { ...state.data, ...payload };
  },
};

export default mutations;
