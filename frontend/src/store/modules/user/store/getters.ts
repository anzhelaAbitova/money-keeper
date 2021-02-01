import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IUserState } from '../types';

const getters: GetterTree<IUserState, IRootState> = {
  isLoggedIn: (state: IUserState) => !!state.token,
  user: (state: IUserState) => state.user,
  getUserAvatar: (state: IUserState) => state.avatar,
  getUserName: (state: IUserState) => state.name,
};

export default getters;
