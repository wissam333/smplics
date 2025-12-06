<template>
  <div>
    <ClientOnly>
      <div :class="locale == 'ar' ? 'bodyAR' : 'bodyEN'">
        <SharedNavbar :social="data" />
        <slot />

        <LazySharedFooter hydrate-on-visible :social="data" />
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
</script>
<style lang="scss" scoped></style>
