import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IDrawerRoutes } from '../types';

const getters: GetterTree<IDrawerRoutes, IRootState> = {
  getDrawerRoutes: (state: IDrawerRoutes) => state.drawerRoutes,
};

export default getters;
