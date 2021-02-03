import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IUserState } from '../types';

const getters: GetterTree<IUserState, IRootState> = {
  isLoggedIn: (state: IUserState) => !!state.token,
  user: (state: IUserState) => state.user,
  userData: (state: IUserState) => state.data,
};

export default getters;
