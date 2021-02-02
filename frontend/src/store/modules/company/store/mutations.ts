import { MutationTree } from 'vuex';
import { ICompanyState } from '../types';
import { SET_STATE_COMPANY, CLEAR_STATE } from './mutations-types';

const mutations: MutationTree<ICompanyState> = {
  [SET_STATE_COMPANY](state, payload) {
    state.settings = { ...state.settings, ...payload.settings };
    state.data = { ...state.data, ...payload.data };
  },
  [CLEAR_STATE](state) {
    state.settings = {
      signature: '',
    };
    state.data = {
      companyName: '',
      bussinesType: '',
      inn: '',
      kpp: '',
      address: {
        zipCode: '',
        sity: '',
        streat: '',
        phone: '',
      },
      bank: {
        account: '',
        bik: '',
        name: '',
        kor: '',
      },
      menegment: {
        bossName: '',
        bossPosition: '',
        buhName: '',
        buhPosition: '',
      },
    };
  },
};

export default mutations;
