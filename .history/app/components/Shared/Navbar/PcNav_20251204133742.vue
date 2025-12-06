<template>
  <div class="pc-nav-content">
    <nuxt-link
      to="/"
      class="nav-logo"
      :class="$i18n.locale === 'ar' ? 'ar' : ''"
    >
      <NuxtImg :src="'/logo/logo.webp'" alt="Logo Image" loading="lazy" />
    </nuxt-link>

    <div class="nav-links-and-aux">
      <ul class="main-menu">
        <li
          v-for="menu in Menus"
          :key="menu?.id"
          class="menu-item"
          v-show="menu.isActive"
        >
          <!-- Normal Dropdown for other menus -->
          <div v-if="menu.type == 'Drop Down Menu'" class="dropdown-wrapper">
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
            <div class="lang-toggle-wrapper">
          <ElementsLanguageToggle color="#fff"></ElementsLanguageToggle>
        </div>
      </ul>
    </div>
  </div>
  <div></div>
</template>

<script setup>
const { locale } = useI18n();

const Menus = ref([
  {
    id: 1,
    isActive: true,
    type: "Link",
    name: "الرئيسية",
    englishName: "Home",
    children: [],
    pageUrl: "/",
  },
  {
    id: 2,
    isActive: true,
    type: "Link",
    name: "من نحن",
    englishName: "About",
    children: [],
    pageUrl: "#about",
  },
  {
    id: 3,
    isActive: true,
    type: "Link",
    name: "خدماتنا",
    englishName: "Our Services",
    children: [],
    pageUrl: "#services",
  },
  {
    id: 4,
    isActive: true,
    type: "Link",
    name: "اتصل بنا",
    englishName: "Contact Us",
    children: [],
    pageUrl: "#contact",
  },
]);
</script>

<style lang="scss" scoped>
$transition-speed: 0.3s;
$link-font-size: 14px;
$padding-desktop: 15px;

// ==========================================================
// ## Active Link Styles
// ==========================================================

.router-link-active.router-link-exact-active {
  color: var(--accent-color) !important;
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
      color: var(--accent-color);
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

  .dropdown-content {
    transform: translateY(30px);
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
  border-top: 2px solid var(--accent-color);
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
    background-color: var(--accent-color);
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
      color: var(--accent-color);
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
  transform: translateY(30px); // Center and add initial offset
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
  border-top: 2px solid var(--accent-color);

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
  //   border-bottom: 10px solid var(--accent-color);
  // }
}

.mega-menu-section {
  max-height: 60vh;
  overflow-y: auto;
  padding: 10px 0px;
}

.mega-menu-heading {
  color: var(--accent-color);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(var(--accent-color), 0.2);
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
      border-color: var(--accent-color);
    }
  }
}

.program-item {
  background: #000;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 10px;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #cfcbcb3c;
  text-align: center;

  &:hover {
    .child-name {
      color: var(--accent-color);
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
  color: #cfcbcb;
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
      color: var(--accent-color);
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
    margin-block-start: -32px;
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
