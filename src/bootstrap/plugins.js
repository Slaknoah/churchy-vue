import Axios from "axios";

/**
 * Axios config
 */
export const axios = Axios.create({
  baseURL: "http://practise-laravel.slk/api/",
  timeout: 10000
});

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Accept"] = "application/json";

// Add token to all header globally
const token = window.$cookies.get("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
