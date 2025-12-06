<template>
  <div class="pc-nav-content">
    <nuxt-link
      to="/"
      class="nav-logo"
      :class="$i18n.locale === 'ar' ? 'ar' : ''"
    >
      <NuxtImg src="/logo/logo.png" alt="Logo Image" loading="lazy" />
    </nuxt-link>

    <div class="nav-links-and-aux">
      <ul class="main-menu">
        <li
          v-for="menu in useMenus().value"
          :key="menu?.id"
          class="menu-item"
          v-show="menu.isActive"
        >
          <div v-if="menu.type == 'Drop Down Menu'" class="dropdown-wrapper">
            <div
              class="menu-button has-dropdown"
              :class="locale === 'ar' ? 'ar-flex' : ''"
            >
              {{ locale === "ar" ? menu.name : menu.englishName }}
              <Icon
                size="20px"
                class="dropdown-arrow"
                :class="locale === 'ar' ? 'ms-1' : 'ms-1'"
                name="material-symbols:arrow-drop-down-rounded"
              />
            </div>
            <div class="dropdown-content" :class="locale === 'ar' ? 'ar' : ''">
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

          <div v-else>
            <nuxt-link class="menu-button" :to="menu.pageUrl">
              {{ locale === "ar" ? menu.name : menu.englishName }}
            </nuxt-link>
          </div>
        </li>
      </ul>

      <div class="aux-group">
        <div class="lang-toggle-wrapper">
          <ElementsLanguageToggle :color="toggleColor"></ElementsLanguageToggle>
        </div>

        <div
          v-if="Socials"
          class="social-icons"
          :class="locale === 'ar' ? 'ar' : ''"
        >
          <a
            :href="Socials?.items[1]?.url"
            v-if="Socials?.items[1]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="bi:instagram" size="20px" />
          </a>
          <a
            :href="Socials?.items[0]?.url"
            v-if="Socials?.items[0]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="ri:facebook-fill" size="20px" />
          </a>
          <a
            :href="Socials?.items[2]?.url"
            v-if="Socials?.items[2]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="ri:twitter-x-fill" size="20px" />
          </a>
          <a
            :href="Socials?.items[3]?.url"
            v-if="Socials?.items[3]?.isActive"
            target="_blank"
            class="Social-item"
          >
            <Icon name="qlementine-icons:youtube-16" size="20px" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watchEffect } from "vue";

const { locale } = useI18n();
const { $awn } = useNuxtApp();

// Define reactive state for dynamic colors based on scroll
const scrolled = inject("scrolled", ref(false));

// Compute color based on scroll state
// Assuming $main is the blue color: #69acdf
const menuLinkColor = computed(() => (scrolled.value ? "#69acdf" : "#ffffff"));
const toggleColor = computed(() => (scrolled.value ? "#69acdf" : "#ffffff"));

const {
  public: { api, apiBase },
} = useRuntimeConfig();
const Socials = ref(null);
const SocialMenusURL = `${api.GetMenuDetail}?categoryId=2`;
const { data } = useFetch(SocialMenusURL, {
  baseURL: apiBase,
});
watchEffect(() => {
  if (process.client) {
    if (data.value) {
      Socials.value = data.value;
      useMenusSocial().value = data.value;
    }
  }
});
</script>
<style lang="scss" scoped>
$transition-speed: 0.3s;
$link-font-size: 16px;
$padding-desktop: 15px;
$active-color: #f39200; // Orange

// ==========================================================
// ## Active Link Styles
// ==========================================================

.router-link-active.router-link-exact-active {
  color: $active-color !important;
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
    color: v-bind(menuLinkColor); // Dynamic color based on scroll
    text-decoration: none;
    transition: color $transition-speed ease;
    padding: 20px 0;

    &:hover {
      color: $active-color;
    }
  }
}

// --- Removed Hover Line Block (menu-button::after) ---
.menu-button {
  display: inline-flex;
  align-items: center;
  position: relative;
  // NOTE: ::after pseudo-element for the hover line has been removed
}

// ==========================================================
// ## Dropdown Menu
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
  margin-top: 10px;

  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 8px;
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
    background-color: $active-color;
    color: #fff !important;
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
  margin-bottom: 10px;
  :deep(.iconify) {
    color: v-bind(toggleColor) !important; // Dynamic color based on scroll
  }
}

.social-icons {
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 10px;
  // Dynamic border color based on scroll (lighter when transparent, darker when white)
  border-left: 1px solid v-bind(menuLinkColor);

  &.ar {
    margin-left: 0;
    margin-right: 20px;
    padding-left: 0;
    padding-right: 10px;
    border-left: none;
    // FIX: Use the same dynamic border color logic as LTR
    border-right: 1px solid v-bind(menuLinkColor);
  }
}

.Social-item {
  margin: 0 5px;

  .iconify {
    color: v-bind(menuLinkColor); // Dynamic color based on scroll
    transition: color $transition-speed ease;

    &:hover {
      color: $active-color;
      transform: translateY(-2px);
    }
  }
}

// ==========================================================
// ## Responsive Adjustments (Simplified)
// ==========================================================

@media (max-width: 1450px) {
  .menu-item {
    margin: 0 10px;
    font-size: 15px;
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
</style>
