<template>
  <div class="create-message">
    <BasePageHeader title="Message" description="Create new message"></BasePageHeader>
    <div class="container">
      <div class="row mt-5">
        <div class="col-lg-6 col-sm-8 offset-lg-3 offset-sm-2">
          <message-form @form-submitted="saveMessage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageForm from "../../components/MessageForm";

export default {
  name: "MessageCreate",
  methods: {
    saveMessage(message) {
      console.log(message);

      this.$store
        .dispatch('saveMessage', message)
        .then(res => this.$router.push("/messages"))
        .catch(err => console.log(err) )
    }
  },
  components: {
    MessageForm
  }
};
</script>

<style lang="stylus" scoped></style>