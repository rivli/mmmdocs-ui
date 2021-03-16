<template>
  <div>
    <h1>About</h1>
    <p>Here will be data about app</p>
    <input type="text" placeholder="Note's title" v-model="title" />
    <input type="text" placeholder="Note's body" v-model="text" />
    <v-btn text v-on:click="showNotification">
      show notification from main process
    </v-btn>
    <v-divider></v-divider>
    <v-btn text @click="showSnackbar">show snack</v-btn>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapActions } from "vuex";

ipcRenderer.on("noteClicked", () => {
  alert("note clicked lelel");
});

export default {
  name: "About",
  data: () => ({
    title: "",
    text: "",
  }),
  methods: {
    ...mapActions(["setSnackbar"]),
    showNotification() {
      ipcRenderer.send("showNote", { title: this.title, text: this.text });
    },
    showSnackbar() {
      this.setSnackbar({ text: "sadas" });
    },
  },
};
</script>

<style></style>
