<template>
  <div style="overflow: hidden">
    <home-main-img></home-main-img>
    <home-about></home-about>
    <LazyHomeShow></LazyHomeShow>
    <LazyHomeBanner></LazyHomeBanner>
    <LazyHomeServices></LazyHomeServices>
    <LazyHomeClients></LazyHomeClients>
    <LazyHomeContact></LazyHomeContact>
    <LazyHomeMap></LazyHomeMap>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
</script>
