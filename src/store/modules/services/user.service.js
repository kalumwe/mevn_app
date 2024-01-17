import http from "../../../http-common";
import authHeader from '../../../services/auth-header';

const state = {
  user: "guest",
}

const mutations = {
    GUEST_USER (state) {
        state.user = "guest";
    },
    REGULAR_USER (state) {
        state.user = "regular";
    },
    MOD_USER (state) {
        state.user = "mod";
    },
    ADMIN_USER (state) {
        state.user = "admin";   
    }
}

const actions = {
    getPublicContent ({ commit }) {
        return http.get('all')
          .then(() => {
            commit('GUEST_USER');
        });
    },
    getUserBoard ({ commit }) {
        return http.get('user', { headers: authHeader() })
          .then(() => {
            commit('REGULAR_USER');
        });
    },    
    getModeratorBoard ({ commit }) {
        return http.get('mod', { headers: authHeader() })
          .then(() => {
            commit('MOD_USER');
        });
    },   
    getAdminBoard ({ commit }) {
        return http.get('admin', { headers: authHeader() })
          .then(() => {
            commit('ADMIN_USER');
        });
    }, 
}

const getters = {
  userType: state => state.user
}

const loginModule = {
   state,
   mutations,
   actions,
   getters
}


export default userServiceModule;
