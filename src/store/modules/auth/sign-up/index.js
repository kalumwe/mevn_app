import AuthService from '../../../../services/auth.service';

const state = {
  loading: false,
  status: { loggedIn: false },
  message: ""
}

const mutations = {
    SIGNUP_PENDING (state) {
        state.loading = true;
    },
    SIGNUP_SUCCESS (state, payload) {
        state.loading = false;
        state.status.loggedIn = false;
        state.message = payload;
    },
    SIGNUP_FAILURE (state, payload) {
        state.status.loggedIn = false;
        state.message = payload;
    }
}

const actions = {
    register ({ commit }, user) {
        commit('SIGNUP_PENDING');
        return AuthService.register(user)
        .then((response) => {
            commit('SIGNUP_SUCCESS', response.data.message);
            return Promise.resolve(response.data);
        })
        .catch( error => {
            commit('SIGNUP_FAILURE', (error.response && error.response.data));
            return Promise.reject(error);
          }
        );
    }  
}

const getters = {
  getLoading: state => state.loading,
  getStatus: state => state.status.loggedIn,
  getMessage: state => state.message
}

const signUpModule = {
   state,
   mutations,
   actions,
   getters
}


export default signUpModule;
