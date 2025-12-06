<template>
  <div class="links" data-aos="zoom-in">
    <h4 class="title" :class="$i18n.locale === 'ar' ? 'ar' : ''">
      <span class="fw-bold">
        {{ $i18n.locale === "ar" ? "روابط مفيدة" : "Useful Links" }}
      </span>
    </h4>
    <div class="d-flex align-items-start justify-content-start menu-wrapper">
      <ul class="menu-list">
        <li
          v-for="menu in Menus?.items.slice(0, 5)"
          :key="menu.id"
          class="menu-item"
          v-show="menu.type !== 'Drop Down Menu'"
        >
          <div class="paste-button">
            <div>
              <nuxt-link class="button" :to="menu.pageUrl">
                {{ locale === "ar" ? menu.name : menu.englishName }}
              </nuxt-link>
            </div>
          </div>
        </li>
      </ul>
      <ul class="menu-list">
        <li
          v-for="menu in Menus?.items.slice(5)"
          :key="menu.id"
          class="menu-item"
          v-show="menu.type !== 'Drop Down Menu'"
        >
          <div class="paste-button">
            <div>
              <nuxt-link class="button" :to="menu.pageUrl">
                {{ locale === "ar" ? menu.name : menu.englishName }}
              </nuxt-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
const { locale } = useI18n();

const { data: Menus } = await useGetSiteApi().GetAll(
  `${api.MenusMasterGetByCategoryApi}?categoryId=2`
);
</script>
<style lang="scss" scoped>
.menu-wrapper {
  margin-top: 23px;
  @media (max-width: 768px) {
    flex-direction: column;
    ul {
      padding: 0 !important;
    }
  }
}
.menu-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.menu-item {
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  list-style: none; /* Remove bullet points */
  padding: 0.5rem; /* Optional: add padding for spacing */
  white-space: nowrap;
  text-wrap: nowrap;
}

.router-link-active.router-link-exact-active {
  color: #fff !important;
  transform: scale(1.1);
}
.menu-list {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  &:nth-child(2) {
    padding: 0px 20px;
  }
}

.menu-item {
  flex: 0 0 50%; /* Each item takes up 50% of the container's width */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  list-style: none; /* Remove bullet points */
  padding: 0.5rem; /* Optional: add padding for spacing */
  white-space: nowrap;
  text-wrap: nowrap;
}
.links {
  width: 100%;
}
ul {
  padding: 0;
  a {
    &.router-link-active {
      li {
        font-size: 18px;
        color: $main;
        @media (max-width: 1300px) {
          font-size: 16px;
        }
      }
    }
  }

  li {
    font-size: 16px;
    line-height: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    a {
      color: #fff;
      transition: all 0.3s ease;
    }

    &:hover {
      transform: translateX(10px);
      .paste-button a {
        color: $main;
      }
    }
  }
}
.title {
  color: $main;
}
</style>
