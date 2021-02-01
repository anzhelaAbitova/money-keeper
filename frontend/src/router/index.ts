import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import Home from '../views/pages/Home.vue';
import CabinetHome from '../views/cabinet/Home.vue';
import Settings from '../views/cabinet/Settings.vue';
import History from '../views/cabinet/History.vue';
import Goals from '../views/cabinet/Goals.vue';
import Balance from '../views/cabinet/Balance.vue';
import New from '../views/cabinet/New.vue';

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
    children: [
      {
        path: 'history',
        name: 'History',
        component: History,
        meta: {
          layout: 'cabinet-layout',
        },
      },
      {
        path: 'goals',
        name: 'Goals',
        component: Goals,
        meta: {
          layout: 'cabinet-layout',
        },
      },
      {
        path: 'balance',
        name: 'Balance',
        component: Balance,
        meta: {
          layout: 'cabinet-layout',
        },
      },
      {
        path: 'new',
        name: 'New',
        component: New,
        meta: {
          layout: 'cabinet-layout',
        },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: {
          layout: 'cabinet-layout',
        },
      },
    ],
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
