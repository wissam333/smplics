<template>
  <div class="links-wrapper">
    <h4 class="section-title" :class="{ ar: isArabic }">
      {{ isArabic ? "روابط مفيدة" : "Useful Links" }}
    </h4>

    <div class="links-grid">
      <nuxt-link
        v-for="menu in usefulLinks"
        :key="menu.id"
        :to="menu.pageUrl"
        class="link-item"
      >
        <span class="icon-wrapper">
          <Icon
            :name="isArabic ? 'mdi:chevron-left' : 'mdi:chevron-right'"
            size="18"
          />
        </span>
        <span class="link-text">{{ getLocalizedName(menu) }}</span>
      </nuxt-link>
    </div>
  </div>
  <div></div>
</template>

<script setup>
const {
  public: { api },
} = useRuntimeConfig();
const { locale } = useI18n();
const isArabic = computed(() => locale.value === "ar");

// Correctly fetch and assign data
const { data: menusData } = await useGetSiteApi().GetAll(
  `${api.MenusMasterGetByCategoryApi}?categoryId=1`
);

const usefulLinks = computed(() => {
  const items = menusData.value?.items || [];
  return items.filter((item) => item.type !== "Drop Down Menu");
});

const getLocalizedName = (item) => {
  return isArabic.value ? item.name : item.englishName;
};
</script>

<style lang="scss" scoped>
.section-title {
  color: $main;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 25px;
  position: relative;
  text-align: start;
  // Underline effect
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0; // LTR default
    width: 40px;
    height: 2px;
    background: $main;
  }

  &.ar::after {
    left: auto;
    right: 0;
  }
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 Columns
  gap: 20px 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 1 Column on mobile
  }
}

.link-item {
  display: flex;
  align-items: center;
  color: #ddd;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 15px;

  .icon-wrapper {
    color: $main;
    display: flex;
    opacity: 0.6;
    transition: transform 0.3s ease;
  }

  .link-text {
    margin-inline-start: 5px;
  }

  &:hover {
    color: $main;
    padding-inline-start: 5px; // Move text slightly

    .icon-wrapper {
      opacity: 1;
      transform: scale(1.2);
    }
  }
}
</style>
