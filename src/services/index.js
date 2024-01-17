import http from "../http-common";
//import * as types from './mutation-types';

const state = {
   tutorialItems: [],
   tutorialItem: {}
};


const mutations = {
   UPDATE_TUTORIAL_ITEMS (state, payload) {
      state.tutorialItems = payload;
   },
   UPDATE_TUTORIAL_ITEM (state, payload) {
      state.tutorialItem = payload;
   }
};

const actions = {

   getTutorialItems ({ commit }) {
      http.get('/tutorials').then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data) 
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   getTutorialItem (itemId) {
      return http.get(`/tutorials/${itemId}`);
   },
   get(id) {
      return http.get(`/tutorials/${id}`);
    },
   addTutorialItem ({ commit }, tutorialItem) {
      return http.post('/tutorials', tutorialItem).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data)
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   updateTutorialItem ({ commit }, itemId, tutorialItem) {
      return http.put(`/tutorials/${itemId}`, tutorialItem).then((response) => {
         commit('UPDATE_TUTORIAL_ITEM', response.data)
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   update(id, data) {
      return http.put(`/tutorials/${id}`, data);
    },
  
   removeTutorialItem ({ commit }, itemId) { 
    http.delete(`/tutorials/${itemId}`).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data)
          console.log(response.data);
      })
      .catch(e => {
       console.log(e);
      });
   },
   removeAllItems ({ commit }) {
    http.delete('/tutorials').then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data)
         console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
   },
   findByTitle ({ commit }, title) {
    http.get(`/tutorials?title=${title}`).then((response) => {
         commit('UPDATE_TUTORIAL_ITEMS', response.data);
      })
      .catch(e => {
        console.log(e);
      });
   }
};

const getters = {
   tutorialItems: state => state.tutorialItems,
   tutorialItem: state => state.tutorialItem,
   tutorialItemFromId: (state) => (id) => {
    return state.tutorialItems.find(tutorialItem => tutorialItem.id === id)
   },
   getTotalTutorials: state => state.tutorialItems.length,
};

const tutorialModule = {
   state,
   mutations,
   actions,
   getters
}


export default tutorialModule;