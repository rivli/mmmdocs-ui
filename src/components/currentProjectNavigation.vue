<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-text>
          <h1>Project Navigation</h1>
          <v-list nav dense v-if="currentProject.navigation.length !== 0">
            <template v-for="nav in currentProject.navigation">
              <v-list-item
                link
                :key="nav.title"
                v-if="!nav.children"
                @click="loadDocument(nav)"
              >
                <v-list-item-title>{{ nav.title }}</v-list-item-title>

                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-group :value="true" no-action v-else :key="nav.title">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ nav.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="navChild in nav.children"
                  :key="navChild.title"
                  link
                  @click="loadDocument(navChild)"
                >
                  <v-list-item-title
                    v-text="navChild.title"
                  ></v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <add-base />
          <add-file />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="8">
      <placeholder
        text="please choose file from the navigation on the left"
        v-if="!doc"
      />
      <v-card v-else>
        <v-card-actions>
          <v-spacer />
          <v-btn icon @click="goEdit">
            <v-icon>
              mdi-pencil
            </v-icon>
            <v-spacer />
          </v-btn>
        </v-card-actions>
        <v-card-text v-if="!error" color="white">
          <VueShowdown
            :markdown="doc"
            flavor="github"
            :options="{ emoji: true }"
          />
        </v-card-text>
        <v-card-text v-else>
          {{ error }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addBase from "./projectNavigationButtons/addBase.vue";
import AddFile from "./projectNavigationButtons/addFile.vue";
import placeholder from "../components/Placeholder.vue";
import { ipcRenderer } from "electron";
import { VueShowdown } from "vue-showdown";
import path from "path";

export default {
  components: { addBase, AddFile, placeholder, VueShowdown },
  name: "current-project-navigation",
  data: () => ({
    doc: false,
    error: false,
    url: false,
  }),
  computed: {
    ...mapGetters(["currentProject"]),
  },
  methods: {
    ...mapActions(["setActiveDoc"]),
    async loadDocument(item) {
      let pathArray = [
        this.currentProject.path,
        "public",
        "docs",
        item.url + ".md",
      ];

      this.url = path.join(...pathArray);

      try {
        let doc = await ipcRenderer.invoke("loadDocument", pathArray);
        this.doc = doc;
        this.error = false;
      } catch (error) {
        this.url = false;
        this.error = error;
      }
    },
    async goEdit() {
      let payload = {
        markdown: this.doc,
        pathToFile: this.url,
      };
      await this.setActiveDoc(payload);
      this.$router.push("markdown-editor");
    },
  },
};
</script>

<style></style>
