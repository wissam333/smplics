<template>
  <div class="home-wrapper">
    <home-main></home-main>
    <lazy-home-show hydrate-on-visible></lazy-home-show>
  </div>
  <div></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-wrapper {
  overflow: hidden;
  margin-top: 150px;
  height: 200vh;
}
</style>
