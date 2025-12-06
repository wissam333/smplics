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
  position: relative;
  img {
    width: 100%;
  }
  .info {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;

    color: white;
    text-align: center;
    padding: 20px;

    h2 {
      margin-bottom: 5px;
    }

    p {
      margin-top: 5px;
      margin-bottom: 15px;
    }

    button {
      background-color: transparent;
      color: #333; // Dark text color
      padding: 10px 20px;
      border: 1px solid #fff;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }
}
</style>
