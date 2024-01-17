import Vue from 'vue';
import Vuex from 'vuex';
import tutorial from './modules/tutorial';
import login from './modules/auth/login';
import signup from './modules/auth/sign-up';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);


export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
       tutorial,
       login,
       signup
    }
});