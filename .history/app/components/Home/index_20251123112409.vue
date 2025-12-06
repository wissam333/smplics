<template>
  <div style="overflow: hidden">
    <home-main-img></home-main-img>
    <home-about></home-about>
    <home-show></home-show>
    <home-banner></home-banner>
    <home-services></home-services>
    <home-clients></home-clients>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
</script>

<style lang="scss" scoped></style>
