<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
//import TutorialDataService from "../services/TutorialDataService";


export default {
  name: "tutorial-component",
  data() {
    return {
      currentTutorial: null,
      message: ''
    };
  },
  computed: {
      ...mapGetters([
        'tutorialItem',
      ])
   },
  methods: {
    getTutorial(id) {
    //TutorialDataService.get(id)
    this.$store.dispatch('getTutorialItem', id)
        .then(() => {
          this.currentTutorial = this.tutorialItem;
          console.log(this.tutorialItem);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      this.$store.dispatch('updateTutorialItem', data)
      //TutorialDataService.update(this.currentTutorial.id, data)
        .then(() => {
          this.currentTutorial.published = status;
          console.log(this.tutorialItem);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {    
      this.$store.dispatch('updateTutorialItem', this.currentTutorial)
      //TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(() => {
          console.log(this.currentTutorial);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      this.$store.dispatch('removeTutorialItem', this.tutorialItem.id)
      //TutorialDataService.delete(this.currentTutorial.id)
        .then(() => {
          this.$router.push({ name: "tutorials-list" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>