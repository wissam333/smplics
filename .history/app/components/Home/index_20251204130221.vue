<template>
  <div style="overflow: hidden">
    <home-main-img></home-main-img>
    <lazy-home-show hydrate-on-visible></lazy-home-show>
  </div>
  <div></div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
</script>

<style lang="scss" scoped></style>
