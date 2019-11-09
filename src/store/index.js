import Vue from "vue";
import Vuex from "vuex";
import { axios } from "../bootstrap/plugins";
import auth from "./modules/auth";
import messages from "./modules/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    series: [],
    speakers: []
  },
  actions: {
    fetchSeries({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("series")
          .then(res => {
            let data = res.data.data,
              series = [];

            data.forEach(e => {
              const serie = {
                id: e.id,
                name: e.name
              };
              series.push(serie);
            });
            commit("SET_SERIES", series);
            resolve(series);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchSpeakers({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("roles/6/users")
          .then(res => {
            let data = res.data,
              speakers = [];

            data.forEach(e => {
              const speaker = {
                id: e.id,
                name: e.name
              };
              speakers.push(speaker);
            });

            commit("SET_SPEAKERS", speakers);
            resolve(speakers);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mutations: {
    SET_SERIES(state, payload) {
      state.series = payload;
    },
    SET_SPEAKERS(state, payload) {
      state.speakes = payload;
    }
  },
  getters: {
    getSeries(state) {
      return state.series;
    },
    getSpeakers(state) {
      return state.speakers;
    }
  },
  modules: {
    auth,
    messages
  },
  strict: process.env.NODE_ENV !== "production"
});
