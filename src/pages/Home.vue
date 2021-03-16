<template>
  <div class="hero" v-if="currentProject.config === false">
    <h1>mmmDocs UI</h1>
    <span>easy documentation for site</span>
    <br />
    <div class="actionButtons">
      <v-btn v-on:click="newProject" dark>New Project</v-btn>
      <v-btn to="/docs" dark>Docs</v-btn>
    </div>
    <div class="recentProjects">
      <h1>Recent Projects</h1>
      <v-btn
        v-for="(project, key) in recentProjects"
        :key="key"
        v-on:click="selectCurrentProject(project.path)"
      >
        {{ project.config.name }}
      </v-btn>
      <all-projects />
    </div>
  </div>
  <current-project-navigation v-else />
</template>

<script>
import { ipcRenderer } from "electron";
import { mapGetters, mapActions } from "vuex";
import AllProjects from "../components/AllProjects.vue";
import CurrentProjectNavigation from "../components/currentProjectNavigation.vue";
export default {
  name: "Home",
  components: { AllProjects, CurrentProjectNavigation },
  computed: { ...mapGetters(["currentProject", "recentProjects"]) },
  methods: {
    ...mapActions(["updateCurrentProject"]),
    async newProject() {
      let res = await ipcRenderer.invoke("newProject");
      this.updateCurrentProject(res);
    },
    async selectCurrentProject(path) {
      let res = await ipcRenderer.invoke("selectProject", path);
      this.updateCurrentProject(res);
    },
  },
};
</script>

<style scoped>
.hero {
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -12px;
}
.actionButtons {
  display: flex;
  width: 40%;
  justify-content: space-evenly;
}

.recentProjects {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.recentProjects .v-btn {
  margin: 5px 0;
}
</style>
