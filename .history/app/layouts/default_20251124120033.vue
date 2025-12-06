<template>
  <div>
    <ClientOnly>
      <div :class="locale == 'ar' ? 'bodyAR' : 'bodyEN'">
        <SharedNavbar />
        <slot />
        <LazySharedFooter hydrate-on-visible />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const {
  public: { api, apiBase },
} = useRuntimeConfig();

const { data } = await useGetSiteApi().GetAll(
  `${api.GetMenuDetail}?categoryId=2`
);
if (data.value) {
  provide("userName", data.value);
}
</script>
<style lang="scss" scoped></style>
