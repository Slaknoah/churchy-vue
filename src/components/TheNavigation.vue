<template>
  <nav class="navigation navbar navbar-expand-lg navbar-dark bg-dark py-3">
    <router-link to="/" class="navbar-brand">Churchy</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#theNavigation"
      aria-controls="theNavigation"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="theNavigation">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item px-md-3">
          <router-link to="/articles" class="nav-link">Articles</router-link>
        </li>

        <li class="nav-item px-md-3">
          <router-link to="/messages" class="nav-link">Messages</router-link>
        </li>
        <li class="nav-item px-md-3">
          <router-link to="/songs" class="nav-link">Songs</router-link>
        </li>
        <li class="nav-item px-md-3">
          <router-link to="/users" class="nav-link">Users</router-link>
        </li>
      </ul>
      <div class="dropdown-divider"></div>
      <ul class="navbar-nav">
        <template v-if="isLoggedin">
          <li class="nav-item px-md-3">
            <router-link href="#" class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item px-md-3">
            <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item px-md-3">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>

          <li class="nav-item px-md-3">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: "TheNavigation",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  props: {
    component: String
  },
  computed: {
    isLoggedin() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>

<style>
.navigation a {
  transition: ease-in-out color 0.15s;
}
.navbar a.nav-link.router-link-active {
  color: #fff;
}
</style>
