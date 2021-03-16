<template>
  <v-dialog v-model="dialog" scrollable max-width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        Add File
      </v-btn>
    </template>
    <v-card>
      <v-card-title>All File</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="py-5">
        <v-select
          v-model="afterBase"
          hint="Base"
          :items="currentProject.navigation"
          item-text="title"
          item-value="title"
          label="Base"
          persistent-hint
          return-object
          single-line
        ></v-select>
        <template v-if="children && children.length">
          <v-select
            v-model="afterChild"
            hint="Child"
            :items="children"
            item-text="title"
            item-value="title"
            label="Children"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </template>
        <template v-if="children && children.length === 0">
          <v-checkbox
            v-model="asChildOfBase"
            label="As child of this base / Else file will be added after this base as base"
          ></v-checkbox>
        </template>
        <v-text-field
          v-model="title"
          label="Title"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          v-model="url"
          label="Url"
          hint="not required, will be generated from file title"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="pink" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="green" text @click="submit2">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ipcRenderer } from "electron";

export default {
  name: "add-file",
  computed: mapGetters(["currentProject"]),
  data() {
    return {
      dialogm1: "",
      dialog: false,
      afterBase: "",
      asChildOfBase: false,
      children: "",
      afterChild: "",
      title: "",
      url: "",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
    };
  },
  methods: {
    ...mapActions(["updateCurrentProject", "setSnackbar"]),
    submit() {
      console.log(this.afterBase.title, this.afterChild.title, this.title);
    },
    async submit2() {
      let newNav = [];
      let url = this.url.length ? this.url : this.title;

      this.currentProject.navigation.map((val) => {
        if (val.title !== this.afterBase.title) {
          newNav.push(val);
        } else {
          if (!this.afterChild.title && !this.asChildOfBase) {
            newNav.push(val);
            newNav.push({
              title: this.title,
              url,
            });
          } else {
            this.asChildOfBase = false;
            let newChildren = [];
            if (val.children.length !== 0) {
              val.children.map((val) => {
                if (val.title !== this.afterChild.title) {
                  newChildren.push(val);
                } else {
                  newChildren.push(val);
                  newChildren.push({
                    title: this.title,
                    url,
                  });
                }
              });
              val.children = newChildren;
            } else {
              val.children.push({
                title: this.title,
                url,
              });
            }

            newNav.push(val);
          }
        }
      });

      this.updateCurrentProject({ navigation: newNav });
      this.dialog = false;
      this.setSnackbar({ text: "file successfuly created" });

      let base =
        this.afterChild.title || this.asChildOfBase
          ? this.afterBase.title
          : false;
      console.log({
        pathToFolder: this.currentProject.path,
        newNav,
        base,
        title: this.title,
        url,
      });

      try {
        await ipcRenderer.invoke("addFile", {
          pathToFolder: this.currentProject.path,
          newNav,
          base,
          title: this.title,
          url,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    afterBase: function() {
      Object.keys(this.currentProject.navigation).map((key) => {
        this.afterChild = "";
        if (this.currentProject.navigation[key].title === this.afterBase.title)
          this.children = this.currentProject.navigation[key].children;
      });
    },
  },
};
</script>

<style></style>
