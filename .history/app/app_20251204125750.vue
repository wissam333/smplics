<template>
  <div>
    <ElementsLoader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const titles = { en: "Smplics", ar: "سمبلكس" };
useHead({
  title: () => titles[locale.value],
});
</script>

<style lang="scss" scoped></style>
