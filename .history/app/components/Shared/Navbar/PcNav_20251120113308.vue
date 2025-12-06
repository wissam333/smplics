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
          <ElementsLanguageToggle :color="`#fff`"></ElementsLanguageToggle>
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

// Define reactive state for dynamic colors based on scroll (assuming parent handles scroll state)
const scrolled = inject("scrolled", ref(false));

// Compute color based on scroll state
const menuLinkColor = computed(() => (scrolled.value ? "#000000" : "#ffffff"));
const socialIconColor = computed(() =>
  scrolled.value ? "#333333" : "#ffffff"
);
const toggleColor = computed(() => (scrolled.value ? "#333333" : "#ffffff"));

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
$default-text-color: #fff;
$scrolled-text-color: #333;
$active-color: $main; // Primary color for hover/active states

.router-link-active.router-link-exact-active {
  color: $active-color !important;
  font-weight: bold;

  &::after {
    background-color: $active-color !important;
    width: 100% !important;
  }
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
  flex-shrink: 0; // Prevent logo from shrinking
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
  flex-grow: 1; // Takes up remaining space
  padding-left: 20px; // Spacing between logo and menu
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
  position: relative; // For dropdown positioning
  .menu-button,
  .dropdown-arrow {
    color: v-bind(menuLinkColor);
    text-decoration: none;
    transition: color $transition-speed ease;
    padding: 20px 0; // Vertical padding for larger click area

    &:hover {
      color: $active-color;
    }
  }
}

// --- Hover Line Effect for All Links ---
.menu-button {
  display: inline-flex;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 10px; // Adjust based on header height
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: $active-color;
    transition: width $transition-speed ease;
  }

  &:hover::after {
    width: 100%;
  }
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
  :deep(svg) {
    color: v-bind(toggleColor) !important;
  }
}

.social-icons {
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);

  &.ar {
    margin-left: 0;
    margin-right: 20px;
    padding-left: 0;
    padding-right: 10px;
    border-left: none;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }
}

.Social-item {
  margin: 0 5px;

  svg {
    color: v-bind(socialIconColor);
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
