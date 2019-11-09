,<template>
  <div>
    <BasePageHeader
      :title="username"
      description="You are welcome here!"
      :backgroundImage="true"
      buttonText="Find out more"
      :buttonClickAction="clickBtn"
    />
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      messages: []
    };
  },
  methods: {
    clickBtn() {
      console.log("sdsds");
    }
  },
  created() {},
  computed: {
    username() {
      let username = this.$store.getters.getAuthUser.name
        ? this.$store.getters.getAuthUser.name
        : "";
      return `Dashboard ${username}`;
    }
  }
};
</script>

<style>
</style>
