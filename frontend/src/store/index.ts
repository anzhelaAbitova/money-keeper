import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState } from './types';
import global from './modules/global/store';
import user from './modules/user/store';
import modal from './modules/modal/store';
<<<<<<< HEAD
import company from './modules/company/store';
import clients from './modules/clients/store';
import services from './modules/services/store';
import invoices from './modules/invoices/store';
=======
import global from './modules/global/store';
import user from './modules/user/store';
>>>>>>> develop

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
    version: '0.1.0',
  },
  modules: {
    global,
    user,
    modal,
<<<<<<< HEAD
    company,
    clients,
    services,
    invoices,
=======
    global,
    user,
>>>>>>> develop
  },
  strict: true,
};

export default new Vuex.Store(store);
