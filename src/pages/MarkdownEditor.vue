<template>
  <v-row class="py-5">
    <v-col cols="12" sm="3">
      <v-card>
        <v-list dense>
          <v-subheader>Editor Actions</v-subheader>
          <v-list-item-group color="primary">
            <quik-tutorial />
            <v-divider></v-divider>
            <add-image :onSubmit="this.addToValue" />
            <add-link :onSubmit="this.addToValue" />
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer />
          <markdown-preview :text="activeDoc.markdown" />
        </v-card-actions>
      </v-card>
      <v-btn color="green" dark width="100%" class="my-5">
        Save
      </v-btn>
    </v-col>
    <v-col cols="12" sm="9">
      <h1>Markdown editor</h1>
      <v-card flat class="py-5 px-5">
        <v-textarea
          counter
          label="Text"
          auto-grow
          v-model="activeDoc.markdown"
        ></v-textarea>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import AddImage from "../components/EditorButtons/AddImage.vue";
import AddLink from "../components/EditorButtons/AddLink.vue";
import QuikTutorial from "../components/EditorButtons/QuikTutorial.vue";
import MarkdownPreview from "../components/MarkdownPreview.vue";
export default {
  name: "markdown-editor",
  computed: mapGetters(["activeDoc"]),
  components: { MarkdownPreview, AddImage, AddLink, QuikTutorial },
  data: () => ({
    value: "# Your markdown",
  }),
  methods: {
    addToValue(text) {
      this.value += text;
    },
  },
};
</script>

<style></style>
