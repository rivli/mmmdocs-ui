<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green" v-bind="attrs" v-on="on">
        All projects
      </v-btn>
    </template>
    <v-card>
      <v-card-title>All projects</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-5">
        <v-list>
          <v-list-item
            v-for="(project, key) in allProjects"
            :key="key"
            v-on:click="selectCurrentProject(project)"
            >{{ key }}</v-list-item
          >
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="pink" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ipcRenderer } from "electron";

export default {
  name: "all-projects",
  computed: mapGetters(["allProjects"]),
  data() {
    return {
      dialogm1: "",
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["updateCurrentProject"]),
    async selectCurrentProject(path) {
      let res = await ipcRenderer.invoke("selectProject", path);
      this.updateCurrentProject(res);
      this.dialog = false;
    },
  },
};
</script>

<style></style>
