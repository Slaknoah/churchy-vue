<template>
  <div>
    <BasePageHeader title="Register" />
    <div class="container">
      <div class="row mt-5">
        <div class="col-lg-6 col-sm-8 offset-lg-3 offset-sm-2">
          <form>
            <div class="form-group">
              <label for="name">Full name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
                required
                autofocus
                placeholder="Enter full name"
              />
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                required
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="passwoord"
                v-model="password"
                required
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="password">Repeat password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password_confirmation"
                required
                autocomplete="off"
                placeholder="Repeat password"
              />
            </div>
            <small class="form-text text-muted">
              <router-link to="/login">Have an account already? Sign in.</router-link>
            </small>
            <BaseButton
              btnClass="btn-primary register--form--btn"
              @click.native="handleSubmit"
            >Submit</BaseButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        let user = {
          name: this.name,
          email: this.email,
          password: this.password,
          c_password: this.password_confirmation
        };
        this.$store
          .dispatch("register", user)
          .then(() => {
            this.$router.push("/dashboard");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.password = "";
        this.password_confirmation = "";

        return alert("Passwords do no match");
      }
    }
  }
};
</script>

<style scoped>
.register--form--btn {
  float: right;
  margin-top: 1em;
}
</style>
