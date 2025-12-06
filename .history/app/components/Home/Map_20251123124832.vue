<template>
  <div class="map-container">
    <h3 class="visually-hidden">Location Map</h3>
    <iframe
      :src="mapEmbedUrl"
      width="100%"
      height="500"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Company Location Map"
    ></iframe>
  </div>
</template>

<script setup>
const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d153831.62340333333!2d-0.24168155919013756!3d51.528308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sae!4v1678895000000!5m2!1sen!2sae"; // Placeholder for London
</script>

<style lang="scss" scoped>
.map-container {
  width: 100vw;
  height: 500px;
  overflow: hidden;
}

.map-container iframe {
  display: block;
  border: none !important; /* Ensure no visible border from the iframe attribute or browser default */
}

.visually-hidden {
  width: 100vw;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
