import Vue from 'vue';
import VModal from 'vue-js-modal';
import PageLayout from '@/layouts/PageLayout.vue';
import CabinetLayout from '@/layouts/CabinetLayout.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/main.scss';

Vue.use(VModal, { componentName: 'AppModal', dynamicDefaults: { height: 'auto' } });

Vue.component('page-layout', PageLayout);
Vue.component('cabinet-layout', CabinetLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
