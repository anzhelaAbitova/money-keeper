import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IUser } from '../types';

const getters: GetterTree<IUser, IRootState> = {
  getUserAvatar: (state: IUser) => state.avatar,
  getUserName: (state: IUser) => state.name,
};

export default getters;
