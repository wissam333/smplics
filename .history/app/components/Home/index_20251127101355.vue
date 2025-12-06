<template>
  <div style="overflow: hidden">
    <home-main-img></home-main-img>
    <home-about></home-about>
    <lazy-home-show hydrate-on-visible></lazy-home-show>
    <lazy-home-banner hydrate-on-visible></lazy-home-banner>
    <lazy-home-services hydrate-on-visible></lazy-home-services>
    <lazy-home-clients hydrate-on-visible></lazy-home-clients>
    <lazy-home-contact hydrate-on-visible></lazy-home-contact>
    <lazy-home-map hydrate-on-visible></lazy-home-map>
  </div>
  <div></div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();

console.log("menus store:", useMenus().value);
</script>

<style lang="scss" scoped></style>
