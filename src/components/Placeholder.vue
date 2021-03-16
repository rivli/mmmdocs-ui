<template>
  <v-card class="placeholder">
    {{ text !== "" ? text : "it's empty" }}
  </v-card>
</template>

<script>
export default {
  name: "placeholder",
  props: ["text"],
};
</script>

<style>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 40px;
}
</style>
