import Vuex from "vuex";
import Vue from "vue";
import * as types from "./types";
import Store from "electron-store";

const store = new Store();

let state = {
  currentProject: store.get("currentProject"),
  recentProjects: store.get("recentProjects"),
  allProjects: store.get("allProjects"),
  snackbar: {
    isShown: false,
    timeout: 2000,
    text: "",
  },
  activeDoc: false,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters: {
    currentProject: (state) => state.currentProject,
    recentProjects: (state) => state.recentProjects,
    allProjects: (state) => state.allProjects,
    snackbar: (state) => state.snackbar,
    activeDoc: (state) => state.activeDoc,
  },
  actions: {
    updateCurrentProject: ({ commit }, payload) => {
      commit(types.currentProject.UPDATE, payload);
    },
    setSnackbar: ({ commit }, { text, timeout }) => {
      commit(types.snackbar.SET_SNACKBAR, text, timeout);
    },
    setActiveDoc: ({ commit }, payload) => {
      commit(types.doc.SET_ACTIVE_DOCUMENT, payload);
    },
  },
  mutations: {
    [types.currentProject.UPDATE](state, payload) {
      state.currentProject = {
        ...state.currentProject,
        ...payload,
      };
    },
    [types.snackbar.SET_SNACKBAR](state, text, timeout = 2000) {
      state.snackbar = {
        isShown: true,
        text,
        timeout,
      };
    },
    [types.doc.SET_ACTIVE_DOCUMENT](state, payload) {
      state.activeDoc = {
        ...payload,
      };
    },
  },
});
