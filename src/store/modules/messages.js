import { axios } from "../../bootstrap/plugins";

const state = {
  messagesList: [],
  messageAuthorsList: [],
  messagesFilter: {
    offset: 0,
    limit: 3,
    series: 0,
    speaker: 0,
    author: 0,
    hasMedia: false
  },
  pageCount: 0,
  currentPage: 1
};

const mutations = {
  SET_MESSAGES(state, payload) {
    state.messagesList = payload;
  },
  SET_MESSAGE_AUTHORS(state, payload) {
    state.messageAuthorsList = payload;
  },
  SET_MESSAGES_FILTER(state, payload) {
    Object.assign(state.messagesFilter, payload);
  },
  SET_MESSAGES_PAGE_COUNT(state, payload) {
    state.pageCount = payload;
  },
  SET_MESSAGES_CURRENT_PAGE(state, payload) {
    state.currentPage = payload;
  },
  ADD_NEW_MESSAGE(state, payload) {
    if (state.messagesList.length)
      state.messagesList.unshift(payload);
  }
};

const getters = {
  getMessages(state) {
    return state.messagesList;
  },
  getMessageAuthors(state) {
    return state.messageAuthorsList;
  },
  getMessagesFilter(state) {
    return state.messagesFilter;
  },
  getMessagesPageCount(state) {
    return state.pageCount;
  },
  getMessagesCurrentPage(state) {
    return state.currentPage;
  }
};

const actions = {
  fetchMessages({ commit }, filter) {
    var queryString = "messages?sort_by_date=desc";
    if (parseInt(filter.series)) queryString += `&series=${filter.series}`;
    if (parseInt(filter.speaker)) queryString += `&speaker=${filter.speaker}`;
    if (parseInt(filter.author)) queryString += `&author=${filter.author}`;
    if (filter.hasMedia) queryString += `&has_media`;
    if (parseInt(filter.limit)) queryString += `&limit=${filter.limit}`;
    if (parseInt(filter.offset)) queryString += `&offset=${filter.offset}`;

    commit("SET_MESSAGES_FILTER", filter);
    return new Promise((resolve, reject) => {
      axios
        .get(queryString)
        .then(res => {
          commit("SET_MESSAGES", res.data.data);
          const pageCount = Math.ceil(res.data.total / parseInt(filter.limit));

          const currentPage =
            1 + Math.ceil(parseInt(filter.offset) / parseInt(filter.limit));

          commit("SET_MESSAGES_PAGE_COUNT", pageCount);
          commit("SET_MESSAGES_CURRENT_PAGE", currentPage);
          
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  fetchMessageAuthors({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("message-authors")
        .then(res => {
          let data = res.data,
            authors = [];

          data.forEach(e => {
            const author = {
              id: e.id,
              name: e.name
            };
            authors.push(author);
          });
          commit("SET_MESSAGE_AUTHORS", authors);
          resolve(authors);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  saveMessage({ commit }, message) {
    return new Promise((resolve, reject) => {
      axios
        .post('messages', message, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          commit("ADD_NEW_MESSAGE", res.data);
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
