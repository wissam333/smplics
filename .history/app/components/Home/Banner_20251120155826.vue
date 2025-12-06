<template>
  <div class="banner">
    <img src="/banner.jpg" alt="" />

    <div class="info">
      <h2>Lorem ipsum, dolor sit ame</h2>
      <p>Nerv Profile</p>
      <button>Download</button>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
  }
  .info {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
}
</style>
