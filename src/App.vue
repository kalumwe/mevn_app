<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand mx-3 me-5" @click.prevent>Kalu</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="navbar-brand">
            <font-awesome-icon icon="home" class="mx-2" />Home</router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" class="mx-2" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" class="mx-2" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" class="mx-2" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" class="mx-2" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "app",
  methods: {
    fetchData() {
      let params = {};    
      params['page'] = this.getCurrentPage;

      this.$store.dispatch('getTutorialItems', params);
    },
    logOut() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  },
  computed: {
      ...mapGetters([
        'tutorialItems',
        'getCurrentPage',
        'getUser'
      ]),
      currentUser() {
        //return this.$store.state.login.user;
        return this.getUser;
      },
      showAdminBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_ADMIN');
        }

        return false;
      },
      showModeratorBoard() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_MODERATOR');
        }

        return false;
      }
   },
  watch: {
    'getCurrentPage': 'fetchData',
  },
  created() {
   this.fetchData
  },
};
</script>