import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import Home from '../views/pages/Home.vue';
import CabinetHome from '../views/cabinet/Home.vue';
import Charts from '../views/cabinet/Charts.vue';
import Invoices from '../views/cabinet/Invoices.vue';
import Services from '../views/cabinet/Services.vue';
import Balance from '../views/cabinet/Balance.vue';
import Clients from '../views/cabinet/Clients.vue';
import Settings from '../views/cabinet/Settings.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guest: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/About.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/cabinet',
    name: 'CabinetHome',
    component: CabinetHome,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
  {
    path: '/cabinet/charts',
    name: 'Charts',
    component: Charts,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
  {
    path: '/cabinet/invoices',
    name: 'Invoices',
    component: Invoices,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
  {
    path: '/cabinet/services',
    name: 'Services',
    component: Services,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
  {
    path: '/cabinet/balance',
    name: 'Balance',
    component: Balance,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
  {
    path: '/cabinet/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
  {
    path: '/cabinet/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      layout: 'cabinet-layout',
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['user/isLoggedIn']) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

export default router;
