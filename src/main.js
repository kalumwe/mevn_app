import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuetify from './plugins/vuetify';
import lang from "./lang";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

lang;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
