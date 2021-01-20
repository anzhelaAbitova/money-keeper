import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from './types';
import modal from './modules/modal/store';
import global from './modules/global/store';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: '0.1.0',
  },
  modules: {
    modal,
    global,
  },
  strict: true,
};

export default new Vuex.Store(store);
