<template>
  <div class="logo-wrapper">
    <nuxt-link to="/" class="logo-link">
      <NuxtImg
        src="/logo/logo.png"
        loading="lazy"
        alt="Logo Image"
        width="300"
        height="180"
        class="logo-img"
        placeholder
      />
    </nuxt-link>

    <div class="socials-container">
      <a
        v-for="social in activeSocials"
        :key="social.id"
        :href="social?.url"
        target="_blank"
        class="social-btn"
        :aria-label="social.englishName"
      >
        <Icon :name="`mdi:${social.englishName.toLowerCase()}`" size="20" />
      </a>
    </div>
  </div>
</template>

<script setup>
const activeSocials = computed(() => {
  if (useMenusSocial().value) {
    return useMenusSocial().value?.items?.filter((s) => s.isActive) || [];
  }
});
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 991px) {
    align-items: center;
  }
}

.logo-img {
  width: 200px;
  height: auto;
  aspect-ratio: 200/80; // Fixes CLS by enforcing ratio before image loads
  object-fit: contain;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    width: 180px;
  }
}

.socials-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 40px; // Reserve space for icons
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
  background: transparent;

  &:hover {
    background: $main;
    border-color: $main;
    color: #000;
    transform: translateY(-3px);
  }
}
</style>
