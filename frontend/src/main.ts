import Vue from 'vue';
import VModal from 'vue-js-modal';
import PageLayout from '@/layouts/PageLayout.vue';
import CabinetLayout from '@/layouts/CabinetLayout.vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import App from './App.vue';
import router from './router';
import store from './store';

// import the styles
import './assets/scss/main.scss';

Vue.use(VModal, { componentName: 'AppModal', dynamicDefaults: { height: 'auto' } });

Vue.component('page-layout', PageLayout);
Vue.component('cabinet-layout', CabinetLayout);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyCBJ1vwTG82mSRSivjqbcTCww_cR3bkAA4',
  authDomain: 'rscloneapp.firebaseapp.com',
  projectId: 'rscloneapp',
  storageBucket: 'rscloneapp.appspot.com',
  messagingSenderId: '554608307832',
  appId: '1:554608307832:web:9c484f0f6bb607ed51878d',
});

let app: object;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
