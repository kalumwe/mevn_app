import AuthService from '../../../../services/auth.service';

const user = JSON.parse(localStorage.getItem('token'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const state = {
  token: null,
  loading: false,
  initialState
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

                return Promise.resolve(user);
        },
        error => {
            commit('LOGIN_FAILURE');
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
  token: state => state.token,
  loading: state => state.loading,
  status: state => state.initialState.status.loggedIn,
  user: state => state.initialState.user,
}

const loginModule = {
   state,
   mutations,
   actions,
   getters
}


export default loginModule;
