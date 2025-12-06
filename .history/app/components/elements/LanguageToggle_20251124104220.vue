<template>
  <div
    class="pointer changelan"
    :class="$i18n.locale === 'ar' ? 'ar' : 'en'"
    :style="`color: ${color};`"
    @click="toggleLang"
  >
    {{ $i18n.locale == "ar" ? "English" : "العربية" }}
  </div>
</template>

<script setup>
defineProps(["color"]);
const { locale, setLocale } = useI18n();

const toggleLang = () => {
  const newLang = locale.value === "ar" ? "en" : "ar";
  setLocale(newLang); // This automatically updates the cookie
};
</script>
