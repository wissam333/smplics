<template>
  <div ref="mapContainer" class="map-container">
    <iframe
      v-if="isVisible"
      :src="mapEmbedUrl"
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

// Placeholder map URL - **Ensure this is a correct, valid URL for production**
const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.7289520027!2d-0.2458421458925501!3d51.52873516520556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2snl!4v1678886400000!5m2!1sen!2snl";

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
  width: 100vw;
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
