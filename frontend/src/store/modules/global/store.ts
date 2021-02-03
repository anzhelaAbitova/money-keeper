import { Module } from 'vuex';
import { IRootState } from '@/store/types';
// import actions from './store/actions';
import getters from './store/getters';
// import mutations from './store/mutations';
import { IDrawerRoutes } from './types';

const state = {
  drawerRoutes: [
    {
      rout: '/cabinet/charts',
      routName: 'Charts',
      icon: 'IconCharts',
      headerTitle: 'This is your charts',
    },
    {
      rout: '/cabinet/history',
      routName: 'History',
      icon: 'IconAlarm',
      headerTitle: 'This is your history',
    },
    {
      rout: '/cabinet/balance',
      routName: 'Balance',
      icon: 'IconWallet',
      headerTitle: 'This is your expenses and incomes',
    },
    {
      rout: '/cabinet/invoices',
      routName: 'Invoices',
      icon: 'IconActions',
      headerTitle: 'This is your invoices',
    },
    {
      rout: '/cabinet/services',
      routName: 'Services',
      icon: 'IconTrophy',
      headerTitle: 'This is your services',
    },
    {
      rout: '/cabinet/clients',
      routName: 'Clients',
      icon: 'IconClients',
      headerTitle: 'This is your clients',
    },
    {
      rout: '/cabinet/settings',
      routName: 'Settings',
      icon: 'IconSettings',
      headerTitle: 'This is your settings',
    },
  ],
};

const global: Module<IDrawerRoutes, IRootState> = {
  namespaced: true,
  state,
  // actions,
  getters,
  // mutations,
};

export default global;
