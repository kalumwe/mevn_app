import AuthService from '../../../../services/auth.service';

const state = {
  loading: false,
  status: { loggedIn: false }
}

const mutations = {
    SIGNUP_PENDING (state) {
        state.loading = true;
    },
    SIGNUP_SUCCESS (state) {
        state.loading = false;
        state.status.loggedIn = false;
    },
    SIGNUP_FAILURE (state) {
        state.status.loggedIn = false;
    }
}

const actions = {
    register ({ commit }, user) {
        commit('SIGNUP_PENDING');
        return AuthService.register(user)
        .then((response) => {
            commit('SIGNUP_SUCCESS');
            return Promise.resolve(response.data);
        },
        error => {
            commit('SIGNUP_FAILURE');
            return Promise.reject(error);
          }
        );
    }  
}

const getters = {
  loading: state => state.loading,
  status: state => state.loading.loggedIn
}

const signUpModule = {
   state,
   mutations,
   actions,
   getters
}


export default signUpModule;
