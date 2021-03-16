<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        Add Base
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add Base</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-5">
        <v-select
          v-model="afterBase"
          hint="New base will be added after this base"
          :items="currentProject.navigation"
          item-text="title"
          item-value="title"
          label="Base"
          persistent-hint
          return-object
          single-line
        ></v-select>
        <v-text-field
          v-model="title"
          label="Title"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="pink" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="green" text @click="submit">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "add-base",
  computed: mapGetters(["currentProject"]),
  data() {
    return {
      dialogm1: "",
      dialog: false,
      afterBase: "",
      title: "",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
  },
  methods: {
    ...mapActions(["updateCurrentProject", "setSnackbar"]),
    async submit() {
      let newNav = [];
      this.currentProject.navigation.map((val) => {
        if (val.title !== this.afterBase.title) {
          newNav.push(val);
        } else {
          newNav.push(val);
          newNav.push({
            title: this.title,
            children: [],
          });
        }
      });

      try {
        await ipcRenderer.invoke("addBase", {
          pathToFolder: this.currentProject.path,
          newNav,
          title: this.title,
        });
        this.updateCurrentProject({ navigation: newNav });
        this.dialog = false;
        this.setSnackbar({ text: "base successfuly created" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
