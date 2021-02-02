import { Module } from 'vuex';
import { IRootState } from '@/store/types';
import actions from './store/actions';
import getters from './store/getters';
import mutations from './store/mutations';
import { ICompanyState } from './types';

const state = {
  settings: {
    signature: '',
  },
  data: {
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
  },
};

const company: Module<ICompanyState, IRootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

export default company;
