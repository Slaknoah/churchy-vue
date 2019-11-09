// NPM: MAIN
import Vue from "vue";
import VueCookies from "vue-cookies";
import Permissions from "./mixins/Permissions";
import CKEditor from "@ckeditor/ckeditor5-vue";

// PROJECT: MAIN
import App from "./App.vue";
import router from "./router";
// import { axios } from "./bootstrap/plugins"; can import if need be in components
import store from "./store/index";

// PROJECT: OTHER
import "@/bootstrap/config";

Vue.config.productionTip = false;

// Vue.prototype.$http = axios; can import if need be in components

/**
 * Vue cookies
 */
VueCookies.config("3d");
Vue.use(VueCookies);

/**
 * CKEditor
 */
Vue.use( CKEditor );

/**
 * Vue Mixins
 */
Vue.mixin(Permissions);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
