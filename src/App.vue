<template>
  <div id="app">
    <TheNavigation />

    <main role="main">
      <router-view></router-view>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation";

export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  components: {
    TheNavigation
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

body {
  font-family: "Montserrat", sans-serif;
}
</style>
