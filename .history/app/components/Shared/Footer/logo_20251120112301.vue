<template>
  <div class="logo-wrapper" data-aos="fade-down">
    <nuxt-link to="/" class="logo-link">
      <NuxtImg
        src="/logo/logo.png"
        loading="lazy"
        alt="Logo Image"
        class="logo-img"
      />
    </nuxt-link>

    <div class="socials-container">
      <a
        v-for="social in activeSocials"
        :key="social.id"
        :href="social?.urlField"
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
// Using computed to filter active socials cleanly
const activeSocials = computed(() => {
  return useMenusSocial().value?.filter((s) => s.isActive) || [];
});
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Default Left align

  @media (max-width: 991px) {
    align-items: center; // Center on tablet/mobile
  }
}

.logo-img {
  width: 200px;
  height: auto;
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
    color: #000; // Dark icon on gold bg
    transform: translateY(-3px);
  }
}
</style>
