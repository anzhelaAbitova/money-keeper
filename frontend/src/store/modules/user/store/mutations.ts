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
    state.user = user;
    localStorage.setItem('rsapp-user', JSON.stringify(user));
  },
  [LOGOUT](state) {
    state.token = null;
    state.user = '';
    localStorage.clear();
  },
  [REG_SUCCESS](state, { token, user }) {
    state.token = token;
    localStorage.setItem('rsapp-token', token);
    state.user = user;
    localStorage.setItem('rsapp-user', JSON.stringify(user));
  },
  [SET_USER_DATA](state, payload = '') {
    state.data = { ...state.data, ...payload };
  },
};

export default mutations;
