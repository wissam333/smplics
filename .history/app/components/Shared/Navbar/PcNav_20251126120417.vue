<template>
  <div class="pc-nav-content">
    <nuxt-link
      to="/"
      class="nav-logo"
      :class="$i18n.locale === 'ar' ? 'ar' : ''"
    >
      <NuxtImg
        :src="'/logo/logo.png'"
        alt="Logo Image"
        loading="lazy"
        :class="{ 'logo-hidden': scrolled }"
        class="logo-transition base"
      />
      <NuxtImg
        :src="'/logo/logo3.png'"
        alt="Logo Image"
        loading="lazy"
        :class="{ 'logo-hidden': !scrolled }"
        class="logo-transition scroll"
      />
    </nuxt-link>

    <div class="nav-links-and-aux">
      <ul class="main-menu">
        <li
          v-for="menu in useMenus().value"
          :key="menu?.id"
          class="menu-item"
          v-show="menu.isActive"
        >
          <!-- Mega Menu for ID 23 -->
          <div
            v-if="menu.id === 23 && menu.type == 'Drop Down Menu'"
            class="mega-menu-wrapper"
          >
            <div class="menu-button has-dropdown mega-menu-trigger">
              {{ locale === "ar" ? menu.name : menu.englishName }}
              <Icon
                size="20px"
                class="dropdown-arrow"
                name="material-symbols:arrow-drop-down-rounded"
              />
            </div>

            <!-- Mega Menu Content -->
            <div class="mega-menu" :class="{ scrolled: scrolled }">
              <div class="">
                <div class="row">
                  <!-- Children Items Column - Full Width -->
                  <div class="col-12">
                    <div class="mega-menu-section">
                      <ul class="mega-menu-list row">
                        <li
                          v-for="child in menu.children"
                          :key="child.id"
                          class="col-lg-3 col-md-4 col-sm-6"
                        >
                          <nuxt-link :to="child.pageUrl" class="mega-menu-item">
                            <div class="program-item">
                              <div class="program-details">
                                <span class="child-name">{{
                                  locale === "ar"
                                    ? child.name
                                    : child.englishName
                                }}</span>
                              </div>
                            </div>
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Normal Dropdown for other menus -->
          <div
            v-else-if="menu.type == 'Drop Down Menu'"
            class="dropdown-wrapper"
          >
            <div
              class="menu-button has-dropdown"
              :class="{ scrolled: scrolled }"
            >
              {{ locale === "ar" ? menu.name : menu.englishName }}
              <Icon
                size="20px"
                class="dropdown-arrow"
                :class="locale === 'ar' ? 'ms-1' : 'ms-1'"
                name="material-symbols:arrow-drop-down-rounded"
              />
            </div>
            <div
              class="dropdown-content"
              :class="{
                ar: $i18n.locale === 'ar',
              }"
            >
              <nuxt-link
                v-for="child in menu.children"
                :key="child.id"
                :to="`${child.pageUrl}`"
                class="dropdown-item"
              >
                {{ locale === "ar" ? child.name : child.englishName }}
              </nuxt-link>
            </div>
          </div>

          <!-- Simple menu item -->
          <div v-else>
            <nuxt-link class="menu-button" :to="menu.pageUrl">
              {{ locale === "ar" ? menu.name : menu.englishName }}
            </nuxt-link>
          </div>
        </li>
      </ul>

      <div class="aux-group">
        <div class="lang-toggle-wrapper">
          <ElementsLanguageToggle color="#fff"></ElementsLanguageToggle>
        </div>

        <div
          v-if="useMenusSocial().value"
          class="social-icons"
          :class="locale === 'ar' ? 'ar' : ''"
        >
          <a
            :href="useMenusSocial().value?.items[1]?.url"
            v-if="useMenusSocial().value?.items[1]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="bi:instagram" size="20px" />
          </a>
          <a
            :href="useMenusSocial().value?.items[0]?.url"
            v-if="useMenusSocial().value?.items[0]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="ri:facebook-fill" size="20px" />
          </a>
          <a
            :href="useMenusSocial().value?.items[2]?.url"
            v-if="useMenusSocial().value?.items[2]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="ri:twitter-x-fill" size="20px" />
          </a>
          <a
            :href="useMenusSocial().value?.items[3]?.url"
            v-if="useMenusSocial().value?.items[3]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="qlementine-icons:youtube-16" size="20px" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup>
const { locale } = useI18n();
defineProps(["scrolled"]);

// Mega menu functionality
const {
  public: { apiBase, api },
} = useRuntimeConfig();

// Get programs data for mega menu
const { data: programsData } = await useGetSiteApi().GetAll(
  `${api.ProductsCategories}?type=B2B&pageSize=100`
);

let filterOnline = ref(null);

const filterPrograms = (isOnline) => {
  filterOnline.value = filterOnline.value === isOnline ? null : isOnline;
};

const filteredPrograms = computed(() => {
  if (filterOnline.value === null) return programsData.value?.data || [];
  return (
    programsData.value?.data.filter((p) => p.isOnline === filterOnline.value) ||
    []
  );
});

// Sort programs by ID
watchEffect(() => {
  if (process.client && filteredPrograms.value) {
    filteredPrograms.value = filteredPrograms.value.sort((a, b) => b.id - a.id);
  }
});
</script>

<style lang="scss" scoped>
$transition-speed: 0.3s;
$link-font-size: 14px;
$padding-desktop: 15px;

// ==========================================================
// ## Active Link Styles
// ==========================================================

.router-link-active.router-link-exact-active {
  color: $second !important;
  font-weight: bold;
}

// ==========================================================
// ## Layout & Structure
// ==========================================================

.pc-nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.nav-logo {
  flex-shrink: 0;
  width: 120px;
  margin-top: 5px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}

.nav-links-and-aux {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding-inline-start: 20px;
}

// ==========================================================
// ## Menu Links
// ==========================================================

.main-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  flex-grow: 1;
}

.menu-item {
  margin: 0 $padding-desktop;
  padding: 0;
  font-size: $link-font-size;
  position: relative;

  .menu-button,
  .dropdown-arrow {
    color: #fff;
    text-decoration: none;
    transition: color $transition-speed ease;
    padding: 20px 0;

    &.scrolled {
      padding: 12px 0;
    }
    &:hover {
      color: $second;
    }
  }
}

.menu-button {
  display: inline-flex;
  align-items: center;
  position: relative;
}

// ==========================================================
// ## Normal Dropdown Menu
// ==========================================================

.dropdown-wrapper {
  position: relative;

  .has-dropdown {
    cursor: pointer;
  }

  &:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-content {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(10px);
  z-index: 1001;
  min-width: 200px;
  margin-top: 0px;

  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 5px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  transition: opacity $transition-speed ease, transform $transition-speed ease,
    visibility $transition-speed ease;

  &.ar {
    left: auto;
    right: 0;
    text-align: right;
  }
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: #fff !important;
  font-size: 14px;
  transition: background-color $transition-speed, color $transition-speed;

  &:hover {
    background-color: $second;
    color: #fff !important;
  }
}

// ==========================================================
// ## Mega Menu Styles
// ==========================================================


.mega-menu-wrapper {
  position: relative;
  display: inline-block;

  &:hover {
    .mega-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .mega-menu-trigger {
      color: $second;
    }
  }
}

.mega-menu-trigger {
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
  cursor: pointer;
}

.mega-menu {
  position: fixed; // Changed from fixed to absolute
  inset-inline-start: 20px; // Center the mega menu
  transform: translateX(-50%) translateY(10px); // Center and add initial offset
  top: 115px;
  width: 90vw; // Use viewport width but with some margin
  max-width: 1200px; // Maximum width
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 5px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  border-radius: 0 0 8px 8px;
  border-top: 3px solid $main;

  &.scrolled {
    top: 65px;
  }
  // // Triangle indicator
  // &::before {
  //   content: "";
  //   position: absolute;
  //   top: -10px;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   width: 0;
  //   height: 0;
  //   border-left: 10px solid transparent;
  //   border-right: 10px solid transparent;
  //   border-bottom: 10px solid $main;
  // }
}

.mega-menu-section {
  max-height: 60vh;
  overflow-y: auto;
  padding: 10px 0px;
}

.mega-menu-heading {
  color: $main;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba($main, 0.2);
  text-align: center;
}

.mega-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;
  }
}

.mega-menu-item {
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  height: 100%;

  &:hover {
    text-decoration: none;

    .program-item {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      border-color: $second;
    }
  }
}

.program-item {
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 10px;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid transparent;
  text-align: center;

  &:hover {
    .child-name {
      color: $second;
    }
  }
}

.program-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}

.child-name {
  font-size: 0.8rem;
  color: #2d3748;
  transition: color 0.3s ease;
  text-align: center;
  line-height: 1.4;
}

// Responsive adjustments
@media (max-width: 768px) {
  .mega-menu {
    padding: 1rem;
    width: 95vw;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
  }

  .mega-menu-heading {
    font-size: 1.1rem;
  }

  .child-name {
    font-size: 0.9rem;
  }

  .program-item {
    padding: 15px;
  }
}

@media (max-width: 576px) {
  .mega-menu {
    width: 98vw;
  }
}

// ==========================================================
// ## Auxiliary Group (Socials & Language)
// ==========================================================
.aux-group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 20px;
}

.lang-toggle-wrapper {
  margin-bottom: 6px;
  :deep(.iconify) {
    color: #fff !important;
  }
}

.social-icons {
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid #fff;

  &.ar {
    margin-left: 0;
    margin-right: 20px;
    padding-left: 0;
    padding-right: 10px;
    border-left: none;
    border-right: 1px solid #fff;
  }
}

.Social-item {
  margin: 0 5px;

  .iconify {
    color: #fff;
    transition: color $transition-speed ease;

    &:hover {
      color: $second;
      transform: translateY(-2px);
    }
  }
}

// ==========================================================
// ## Responsive Adjustments
// ==========================================================

@media (max-width: 1450px) {
  .menu-item {
    margin: 0 10px;
    font-size: 14px;
  }
  .dropdown-item {
    font-size: 13px;
  }
}

@media (max-width: 1250px) {
  .pc-nav-content {
    display: none;
  }
}

.logo-transition {
  transition: all 0.4s ease-in-out;
  max-height: 102px;
  overflow: hidden;

  &.scroll {
    margin-block-start: -24px;
  }

  &.base {
    margin-block-start: 24px;
  }
}

.logo-hidden {
  opacity: 0;
  max-height: 0;
  pointer-events: none;
}

// Mobile handling for mega menu
@media (max-width: 768px) {
  .mega-menu-wrapper:hover .mega-menu {
    display: none;
  }
}
</style>
