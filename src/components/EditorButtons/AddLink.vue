<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>
            mdi-link
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Add link</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Image</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>

            <v-text-field
              v-model="url"
              :rules="urlRules"
              label="Url"
              required
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="validate">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "add-link",
  props: ["onSubmit"],
  data: () => ({
    dialog: false,
    title: "",
    url: "",
    valid: true,
    titleRules: [(v) => !!v || "Title is required"],
    urlRules: [(v) => !!v || "Url is required"],
    errors: [],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        let text = "";
        text = "[" + this.title + "](" + this.url + ")";
        this.onSubmit(text);
        this.title = "";
        this.url = "";
        this.dialog = false;
      }
    },
  },
};
</script>

<style></style>
