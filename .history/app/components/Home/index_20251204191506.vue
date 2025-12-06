<template>
  <div class="home-wrapper">
    <home-main></home-main>
    <lazy-home-about hydrate-on-visible></lazy-home-about>
  </div>
  <div></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home-wrapper {
  overflow: hidden;
  margin-top: 120px;
  @media (max-width: 991px) {
    margin-top: 160px;
  }
  @media (max-width: 768px) {
    margin-top: 140px;
  }
}
</style>
