<template>
  <nav class="breadcrumbs" :dir="isRtl ? 'rtl' : 'ltr'">
    <NuxtLink to="/" class="breadcrumb-item">{{ t.home }}</NuxtLink>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item current">{{ t.services }}</span>
  </nav>
</template>

<script setup>
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

const translations = {
  en: {
    home: "Home",
    services: "Services",
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
  },
};

const t = computed(() => translations[locale.value] || translations.en);
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;

  .breadcrumb-item {
    color: #e2e8f0;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover:not(.current) {
      color: #f2994a;
    }

    &.current {
      color: #f2994a;
      font-weight: 600;
    }
  }

  .breadcrumb-separator {
    color: #a0aec0;
  }
}
</style>
