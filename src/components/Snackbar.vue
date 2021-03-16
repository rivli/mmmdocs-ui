<template>
  <v-snackbar v-model="snackbar.isShown" :timeout="snackbar.timeout">
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Snackbar",
  computed: mapGetters(["snackbar"]),
};
</script>
