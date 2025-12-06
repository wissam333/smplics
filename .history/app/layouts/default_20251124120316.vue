<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <SharedNavbar />
    <slot />
    <LazySharedFooter hydrate-on-visible />
  </div>
</template>

<script setup>
const { locale } = useI18n();

useHead({
  bodyAttrs: {
    class: computed(() => (locale.value === "ar" ? "bodyAR" : "bodyEN")),
  },
});

const {
  public: { api },
} = useRuntimeConfig();

const { data } = await useGetSiteApi().GetAll(
  `${api.GetMenuDetail}?categoryId=2`
);
provide("social", data.value);
</script>

<style lang="scss" scoped></style>
