import { axios } from "../../bootstrap/plugins";

const state = {
  status: "",
  token: window.$cookies.get("token") || "",
  authUser: {}
};

const mutations = {
  SET_AUTH_USER_AND_TOKEN(state, payload) {
    state.success = "success";
    state.token = payload.token;
    state.authUser = payload.user;
  },
  LOGOUT_USER(state) {
    state.status = "";
    state.token = "";
    state.authUser = {};
  }
};

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("login", user)
        .then(response => {
          const token = response.data.success.token;
          const user = response.data.success.user;

          window.$cookies.set("token", token);
          window.$cookies.set("authUser", JSON.stringify(user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          commit("SET_AUTH_USER_AND_TOKEN", { token, user });

          resolve(response);
        })
        .catch(error => {
          window.$cookies.remove("token");
          window.$cookies.remove("authUser");
          reject(error);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("register", user)
        .then(res => {
          const token = res.data.success.token;
          const user = res.data.success.user;

          window.$cookies.set("token", token);
          window.$cookies.set("authUser", JSON.stringify(user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          commit("SET_AUTH_USER_AND_TOKEN", { token, user });
          resolve(res.data.success);
        })
        .catch(err => {
          window.$cookies.remove("token");
          window.$cookies.remove("authUser");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("LOGOUT_USER");
      window.$cookies.remove("token");
      window.$cookies.remove("authUser");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

const getters = {
  getAuthUser(state) {
    return state.authUser;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
  isAdmin(state) {
    return state.authUser.isAdmin;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
