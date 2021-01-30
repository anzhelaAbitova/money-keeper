import { MutationTree } from 'vuex';
import { IUser } from '../types';
import { SET_USER_AVATAR } from './mutations-types';

const mutations: MutationTree<IUser> = {
  [SET_USER_AVATAR](state, payload = '') {
    state.avatar = payload;
  },
};

export default mutations;
