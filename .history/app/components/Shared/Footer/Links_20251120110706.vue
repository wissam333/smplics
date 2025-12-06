<template>
  <div class="links-container" data-aos="zoom-in">
    <h4 class="title" :class="{ ar: isArabic }">
      <span class="fw-bold">
        {{ isArabic ? "روابط مفيدة" : "Useful Links" }}
      </span>
    </h4>

    <ul class="links-grid">
      <li v-for="menu in usefulLinks" :key="menu.id" class="link-item">
        <nuxt-link :to="menu.pageUrl" class="link-anchor">
          <span class="arrow-icon" v-if="!isArabic">›</span>
          <span class="arrow-icon" v-else>‹</span>

          {{ getLocalizedName(menu) }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const {
  public: { api, apiBase },
} = useRuntimeConfig();
const { locale } = useI18n();

const { data: menusData } = await useAsyncData("footer-menus", () =>
  $fetch(`${api.MenusMasterGetByCategoryApi}?categoryId=2`, {
    baseURL: apiBase,
  })
);

// 2. Computed property for language check
const isArabic = computed(() => locale.value === "ar");

const usefulLinks = computed(() => {
  const items = menusData.value?.items || [];
  return items.filter((item) => item.type !== "Drop Down Menu");
});

//  Helper for name localization
const getLocalizedName = (item) => {
  return isArabic.value ? item.name : item.englishName;
};
</script>

<style lang="scss" scoped>
$main: #bf9847; // Assuming this variable exists

.links-container {
  width: 100%;
}

.title {
  color: $main;
  margin-bottom: 23px;

  &.ar {
    font-family: "alinma", sans-serif; // Ensure font matches if specific
  }
}

// CSS Grid handles the columns automatically
.links-grid {
  display: grid;
  // This creates 2 equal columns.
  // If you want it to be 1 column on mobile, see media query below.
  grid-template-columns: 1fr 1fr;
  gap: 10px 20px; // Row gap 10px, Column gap 20px
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stack on mobile
  }
}

.link-item {
  // Animation logic
  .link-anchor {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    line-height: 2;
    transition: all 0.3s ease-in-out;

    // Small arrow icon for decoration
    .arrow-icon {
      margin-inline-end: 8px; // Works for both RTL and LTR
      opacity: 0;
      transform: translateX(-5px);
      transition: all 0.3s ease;
      color: $main;
    }

    // Active State (Current Page)
    &.router-link-active {
      color: $main;
      font-weight: bold;
      padding-inline-start: 10px;

      .arrow-icon {
        opacity: 1;
        transform: translateX(0);
      }
    }

    // Hover State
    &:hover {
      color: $main;
      padding-inline-start: 10px; // Moves text slightly

      .arrow-icon {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
