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

const { data: menusData } = await useGetSiteApi().GetAll(
  `${api.MenusMasterGetByCategoryApi}?categoryId=2`
);

const isArabic = computed(() => locale.value === "ar");

const usefulLinks = computed(() => {
  const items = menusData.value?.items || [];
  return items.filter((item) => item.type !== "Drop Down Menu");
});

const getLocalizedName = (item) => {
  return isArabic.value ? item.name : item.englishName;
};
</script>

<style lang="scss" scoped>
.links-container {
  width: 100%;
}

.title {
  color: $main;
  margin-bottom: 23px;

  &.ar {
    font-family: "alinma", sans-serif;
  }
}

.links-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; // Two columns
  gap: 10px 20px;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // One column on mobile
  }
}

.link-item {
  .link-anchor {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    line-height: 2;
    transition: all 0.3s ease-in-out;

    .arrow-icon {
      margin-inline-end: 8px;
      opacity: 0;
      transform: translateX(-5px);
      transition: all 0.3s ease;
      color: $main;
    }

    &.router-link-active {
      color: $main;
      font-weight: bold;
      padding-inline-start: 10px;

      .arrow-icon {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &:hover {
      color: $main;
      padding-inline-start: 10px;

      .arrow-icon {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
