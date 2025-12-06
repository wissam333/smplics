<template>
  <div
    class="three-d-card-container"
    style="perspective: 1000px"
  >
    <div
      ref="containerRef"
      class="three-d-card-inner"
      style="transform-style: preserve-3d"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const containerRef = ref(null);
const mouseState = useMouseState();
provide("use3DCardMouseState", mouseState);

function handleMouseMove(e) {
  if (!containerRef.value) return;
  
  const { left, top, width, height } = containerRef.value.getBoundingClientRect();
  const x = (e.clientX - left - width / 2) / 15;
  const y = (e.clientY - top - height / 2) / 15;
  
  containerRef.value.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
}

function handleMouseEnter() {
  mouseState.setMouseEntered(true);
}

function handleMouseLeave() {
  if (!containerRef.value) return;

  mouseState.setMouseEntered(false);
  containerRef.value.style.transform = `rotateY(0deg) rotateX(0deg)`;
}
</script>

<style scoped>
.three-d-card-container {
  width: 100%;
  height: 100%;
}

.three-d-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-out;
  will-change: transform;
}
</style>