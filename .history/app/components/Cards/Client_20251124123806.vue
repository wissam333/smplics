<template>
  <div class="client-card">
    <a
      :href="client.urlField || '#'"
      target="_blank"
      rel="noopener noreferrer"
      class="card-link"
    >
      <div class="logo-wrapper">
        <img
          :src="imageUrl"
          :alt="isRtl ? client.name : client.englishName"
          loading="lazy"
        />
      </div>

      <!-- Optional: Tooltip/Name on hover could go here -->
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  client: {
    type: Object,
    required: true,
  },
  isRtl: {
    type: Boolean,
    default: false,
  },
});

const imageUrl = computed(() => {
  const path = props.client.image1;
  if (!path) return "/placeholder-logo.png";
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `https://admin.nerva-online.com/${cleanPath}`;
});
</script>

<style lang="scss" scoped>
.client-card {
  flex: 0 0 auto; // Prevent shrinking in flex container
  width: 180px; // Fixed width for consistency
  height: 120px;
  background: #ffffff;
  border-radius: 12px;
  margin: 0 15px; // Gap between cards
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: 1px solid #f0f0f0;

  .card-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  }

  .logo-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain; // Ensures logo isn't cropped
      filter: grayscale(100%);
      opacity: 0.7;
      transition: filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
    }
  }

  // Hover Effects
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: #e2e8f0;

    .logo-wrapper img {
      filter: grayscale(0%); // Full color on hover
      opacity: 1;
      transform: scale(1.1);
    }
  }
}
</style>
