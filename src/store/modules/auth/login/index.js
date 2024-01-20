import AuthService from '../../../../services/auth.service';

const user = JSON.parse(localStorage.getItem('token'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const state = {
  token: null,
  loading: false,
  initialState,
  message: ""
} 

const mutations = {
    SET_TOKEN (state, token) { 
        state.token = token;
    },
    LOGIN_PENDING (state) {
        state.loading = true;
    },
    LOGIN_SUCCESS (state, user) {
        state.loading = false;
        state.initialState.status.loggedIn = true;
        state.initialState.user = user;
    },
    LOGIN_FAILURE(state) {
        state.initialState.status.loggedIn = false;
        state.initialState.user = null;
        
    },
    RESP_MESSAGE(state, message) {
        state.message = message;
    },
    LOGOUT(state) {
        state.initialState.status.loggedIn = false;
        state.initialState.user = null;
    },
}

const actions = {
    login ({ commit }, user) {
        commit('LOGIN_PENDING');
        return AuthService.login(user)
        .then((user) => {
                commit('SET_TOKEN', user.accessToken);
                commit('LOGIN_SUCCESS', user);
                commit('RESP_MESSAGE', user);

                return Promise.resolve(user);
        })
        .catch(error => {
            commit('LOGIN_FAILURE');
            commit('RESP_MESSAGE', (error.user && error.message));
            return Promise.reject(error);
        });
    },
    logout ({ commit }) {
          AuthService.logout();
          commit('SET_TOKEN', null);
          commit('LOGOUT')
       }
}

const getters = {
  getToken: state => state.token,
  getLoadinglogIn: state => state.loading,
  getStatusloggedIn: state => state.initialState.status.loggedIn,
  getUser: state => state.initialState.user,
  getStatusMessage: state => state.message
}

const loginModule = {
   state,
   mutations,
   actions,
   getters
}

 
export default loginModule;
