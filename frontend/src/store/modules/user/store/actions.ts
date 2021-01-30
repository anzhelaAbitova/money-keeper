import { ActionTree } from 'vuex';
import { IUser } from '../types';
import { IRootState } from '../../../types';
import { SET_USER_AVATAR } from './mutations-types';

const actions: ActionTree<IUser, IRootState> = {
  setUserAvatar({ commit }, payload: string) {
    commit(SET_USER_AVATAR, payload);
  },
};

export default actions;
