<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="pink" dark v-bind="attrs" v-on="on" text>
        Preview
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Markdown Preview</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-5">
        <VueShowdown
          :markdown="text"
          flavor="github"
          :options="{ emoji: true }"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="pink" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="green" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VueShowdown } from "vue-showdown";
export default {
  name: "MarkdownPreview",
  props: ["text"],
  components: { VueShowdown },
  data() {
    return {
      dialogm1: "",
      dialog: false,
    };
  },
};
</script>

<style></style>
