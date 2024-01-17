import http from "../../../http-common";
//import * as types from './mutation-types';
import authHeader from '../../../services/auth-header';

const state = {
   items: [],
   tutorialItem: {},
   currentPage: 1,
   totalPages: 1,
   totalItems: 0,
   loading: false
};


const mutations = {
   UPDATE_TUTORIAL_ITEMS (state, payload) {
      state.items = payload;
   },
   SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    },
   UPDATE_TUTORIAL_ITEM (state, payload) {
      state.tutorialItem = payload;
   },
   SET_TOTAL_ITEMS (state, totalItems) {
      state.totalItems  = totalItems;
   },
   SET_LOADING_STATUS (state, status) {
      state.loading = status;
   }

};

const actions = {

   getTutorialItems ({ commit }, params) {
      commit('SET_LOADING_STATUS', true);
      http.get('/tutorials', { params, headers: authHeader() }).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data.documents);
         commit('SET_TOTAL_PAGES', response.data.totalPages);
        // commit('SET_CURRENT_PAGE', page);
         commit('SET_TOTAL_ITEMS', response.data.totalItems);
         commit('SET_LOADING_STATUS', false);
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   getTutorialItem ({ commit }, id) {
      commit('SET_LOADING_STATUS', true);
      return http.get(`/tutorials/${id}`, { headers: authHeader() })
      .then((response) => {
         commit('UPDATE_TUTORIAL_ITEM', response.data);
         commit('SET_LOADING_STATUS', false);
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   addTutorialItem ({ commit }, payload) {
      return http.post('/tutorials', { payload, headers: authHeader() }).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data)
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   updateTutorialItem ({ commit }, payload) {
       return http.put(`/tutorials/${payload.id}`, { payload, headers: authHeader() })
       .then((response) => {
         commit('UPDATE_TUTORIAL_ITEM', response.data);
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   removeTutorialItem ({ commit }, id) { 
      return http.delete(`/tutorials/${id}`, { headers: authHeader() }).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data);
          console.log(response.data);
      })
      .catch(e => {
       console.log(e);
      });
   },
   removeAllItems ({ commit }) {
    http.delete('/tutorials', { headers: authHeader() }).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data);
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   }
};

const getters = {
   tutorialItems: state => state.items,
   tutorialItem: state => state.tutorialItem,
   tutorialItemFromId: (state) => (id) => {
    return state.items.find(tutorialItem => tutorialItem.id === id)
   },
   getTotalTutorials: state => state.items.length,
   getTotalDocs: state => state.totalItems,
   getCurrentPage: state => state.currentPage,
   loadStatus: state => state.loading
};

const tutorialModule = {
   state,
   mutations,
   actions,
   getters
}


export default tutorialModule;