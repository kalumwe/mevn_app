<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title" />
          <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="page = 1; retrieveTutorials();"
          >
            Search
          </button>
          </div>
        </div>
      </div>

    <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

    </div>

    <div class="col-md-6">
      <div v-if="tutorialItems.length">
      <h4>Tutorials List</h4>
      <ul  class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorialItems"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllItems">
        Remove All
      </button>
    </div>
      <div v-if="!tutorialItems.length">
        <p>Item(s) not found</p>
      </div>
      <div v-if="loadStatus" class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>

    

    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div v-if="loadStatus" class="spinner-border" role="status">
        <span class="visually-hidden"></span>
        </div>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>
   
        <router-link :to="{ name: 'tutorial-details', params: { id: currentTutorial.id } }">
          <span class="badge badge-warning">
          Edit
          </span>
      </router-link>
        
      </div>
      <div v-else>
        <br />
        <div v-if="tutorialItems.length" class="mb-3">
          <p >Please click on a Tutorial...</p>
        </div>
      </div>
    </div>

    <b-pagination v-if="tutorialItems.length"
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        pills
        @change="handlePageChange"
      ></b-pagination>
      
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
//import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",

      page: 1,
      count: 0,
      pageSize: 3,
      pageSizes: [3, 6, 9],
    };
  },
  computed: {
      ...mapGetters([
        'tutorialItems',
        'getTotalTutorials',
        'getTotalDocs',
        'loadStatus',
        'getCurrentPage'
      ]),
   },
  methods: {

    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveTutorials() {
      const params = this.getRequestParams(
        this.title,
        this.page,
        this.pageSize
      );

      this.$store.dispatch('getTutorialItems', params)
       .then(() => {
          this.tutorials = this.tutorialItems;
          this.count = this.getTotalDocs;
       })
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveTutorials();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveTutorials();
    },
    removeAllTutorials() {
      this.removeAllItems
    },

    ...mapActions([
        'removeAllItems', 'getTutorialItems'
    ]),
  },

  watch: {
    'getCurrentPage': 'retrieveTutorials',
  },

  created() {
    this.loading = true;
    this.retrieveTutorials(); 
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>