<template>
  <div class="block_404">
    <div class="num404">404</div>
    <div class="desc">
      Sorry, but page not found
    </div>
  </div>
</template>

<script>
export default {
  name: "page-not-found",
};
</script>

<style scoped>
.block_404 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.num404 {
  font-size: 150px;
  font-weight: bold;
}
.desc {
  font-weight: bold;
}
</style>
