<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile-view',
  computed: {
    currentUser() {
      return this.getUser;
    },
    ...mapGetters([
        'getUser'
      ]),
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>