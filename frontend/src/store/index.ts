import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from './types';
import global from './modules/global/store';
import user from './modules/user/store';
import modal from './modules/modal/store';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: '0.1.0',
  },
  modules: {
    global,
    user,
    modal,
  },
  strict: true,
};

export default new Vuex.Store(store);
