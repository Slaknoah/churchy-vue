<template>
  <div>
    <BasePageHeader title="Login" />
    <div class="container">
      <div class="row mt-5">
        <div class="col-lg-6 col-sm-8 offset-lg-3 offset-sm-2">
          <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                required
                autofocus
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
                placeholder="Password"
              />
              <small class="form-text text-muted">
                <router-link to="/register">No account yet? Sign up.</router-link>
              </small>
            </div>
            <BaseButton btnClass="btn-primary login--form--btn" @click.native="handleSubmit">Submit</BaseButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      let user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
.login--form--btn {
  margin-top: 1em;
  float: right;
}
</style>
