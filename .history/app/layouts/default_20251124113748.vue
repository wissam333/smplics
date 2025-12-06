<template>
  <div>
    <ClientOnly>
      <div :class="locale == 'ar' && isMounted ? 'bodyAR' : 'bodyEN'">
        <SharedNavbar class="" />
        <slot />

        <LazySharedFooter hydrate-on-visible />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>
<style lang="scss" scoped></style>
