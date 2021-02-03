import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
<<<<<<< HEAD
import { IUserState } from '../types';

const getters: GetterTree<IUserState, IRootState> = {
  isLoggedIn: (state: IUserState) => !!state.token,
  user: (state: IUserState) => state.user,
  userData: (state: IUserState) => state.data,
=======
import { IUser } from '../types';

const getters: GetterTree<IUser, IRootState> = {
  getUserAvatar: (state: IUser) => state.avatar,
  getUserName: (state: IUser) => state.name,
>>>>>>> develop
};

export default getters;
