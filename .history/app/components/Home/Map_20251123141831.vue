<template>
  <div ref="mapContainer" class="map-container" v-if="useMap().value">
    
    <iframe
      v-if="isVisible"
      :src="useMap().value"
      width="100%"
      height="500"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Company Location Map"
    ></iframe>
    <div v-else class="map-placeholder">
      Loading map... (Scroll down to view)
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const mapContainer = ref(null);
const isVisible = ref(false);

// Function to check visibility
const checkVisibility = () => {
  if (mapContainer.value) {
    const rect = mapContainer.value.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Load map if the top of the container is within 1000px of the viewport,
    // giving a generous buffer for a smooth appearance.
    if (rect.top <= windowHeight + 1000) {
      isVisible.value = true;
      // Stop checking once visible
      window.removeEventListener("scroll", checkVisibility);
    }
  }
};

onMounted(() => {
  // Check once on mount (for already visible content)
  checkVisibility();

  // Add scroll listener for when the user scrolls down
  window.addEventListener("scroll", checkVisibility);
});

onUnmounted(() => {
  // Clean up the listener when the component is destroyed
  window.removeEventListener("scroll", checkVisibility);
});
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative; /* For the placeholder */
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 1.1rem;
}

.map-container iframe {
  display: block;
  border: none !important;
}
</style>
