import { GetterTree } from 'vuex';
import { IRootState } from '../../../types';
import { IDrawerRoutes } from '../types';

const getters: GetterTree<IDrawerRoutes, IRootState> = {
  getDrawerRoutes: (state: IDrawerRoutes) => state.drawerRoutes,
  getRoutTitle: (state: IDrawerRoutes) => (rout: string) => {
    const item = state.drawerRoutes.find((el) => el.rout === rout);
    return item?.headerTitle;
  },
};

export default getters;
