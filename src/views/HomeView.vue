,<template>
  <div>
    <BasePageHeader
      title="Home"
      description="You are welcome here!"
      :backgroundImage="true"
      buttonText="Find out more"
      :buttonClickAction="clickBtn"
    />
  </div>
</template>

<script>
export default {
  name: "HomeView",
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
  created() {}
};
</script>

<style>
</style>
