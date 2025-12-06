<template>
  <div
    class="pointer changelan"
    :class="$i18n.locale === 'ar' ? 'ar' : 'en'"
    :style="`color: ${color};`"
    @click="changeLang"
  >
    {{ $i18n.locale == "ar" ? "English" : "العربية" }}
  </div>
</template>

<script setup>
defineProps(["color"]);
// const { locale } = useI18n();
const { locale, setLocale } = useI18n();

const changeLang = () => {
  if (locale.value == "ar") {
    setLocale("en");
    localStorage.setItem("lang", "en");
  } else {
    setLocale("ar");
    localStorage.setItem("lang", "ar");
  }
};
</script>

<style lang="scss" scoped>
.changelan {
  &.en {
    font-family: alinma, "Arial", "sans-serif";
  }
  &.ar {
    font-family: Poppins, sans-serif;
  }
}
</style>
