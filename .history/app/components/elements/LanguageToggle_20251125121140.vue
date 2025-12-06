<template>
  <ClientOnly>
    <div
      class="pointer changelan"
      :class="$i18n.locale === 'ar' ? 'ar' : 'en'"
      :style="`color: ${color};`"
      @click="toggleLang"
    >
      {{ $i18n.locale == "ar" ? "English" : "العربية" }}
    </div>

    <template #fallback>
      <div class="pointer changelan" :style="`color: ${color};`">
        <span style="opacity: 0">...</span>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
defineProps(["color"]);
const { locale, setLocale } = useI18n();

const toggleLang = () => {
  const newLang = locale.value === "ar" ? "en" : "ar";
  setLocale(newLang);
};
</script>

<style lang="scss" scoped>
.changelan {
  font-size: 14px;
  &.en {
    font-family: alinma, "Arial", "sans-serif";
  }
  &.ar {
    font-family: Poppins, sans-serif;
  }
}
</style>
