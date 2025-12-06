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
        <!-- 4. THEME TOGGLE -->
        <button class="aesthetic-btn-icon theme-toggle" @click="toggleTheme">
          <Icon
            :name="isDark ? 'i-ph-moon-stars-fill' : 'i-ph-sun'"
            size="22"
          />
        </button>
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

// -- Theme Logic --
const isDark = useState("theme-dark", () => true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (process.client) {
    if (isDark.value) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }
};

// Initialize on mount
onMounted(() => {
  if (process.client) {
    // Restore theme
    if (isDark.value)
      document.documentElement.setAttribute("data-theme", "dark");
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
  width: 188px;
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
    color: var(--text-color);
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
  color: var(--text-color) !important;
  font-size: 14px;
  transition: background-color $transition-speed, color $transition-speed;

  &:hover {
    background-color: var(--accent-color);
    color: var(--text-color) !important;
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
</style>
