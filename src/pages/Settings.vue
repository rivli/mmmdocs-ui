<template>
  <div>
    <h1>Settings</h1>
    <v-row>
      <v-col cols="10">Use dark theme</v-col>
      <v-col cols="2"><v-switch v-model="darkTheme" inset></v-switch></v-col>
    </v-row>
  </div>
</template>

<script>
import Store from "electron-store";

const store = new Store();
export default {
  name: "settings",
  data() {
    return {
      darkTheme: store.get("darkTheme"),
    };
  },
  watch: {
    darkTheme() {
      this.$vuetify.theme.dark = this.darkTheme;
      store.set("darkTheme", this.darkTheme);
    },
  },
};
</script>

<style></style>
