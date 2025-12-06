<template>
  <div class="pc-nav-content">
    <!-- Left: Logo -->
    <nuxt-link
      to="/"
      class="nav-logo"
      :class="$i18n.locale === 'ar' ? 'ar' : ''"
    >
      <img :src="'/logo/logo.webp'" alt="Logo Image" loading="lazy" />
    </nuxt-link>

    <!-- Center: Navigation Links -->
    <div class="nav-links-center">
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
      </ul>
    </div>

    <!-- Right: Contact Button + Lang + Theme -->
    <div class="nav-right-group">
      <!-- Contact Button -->
      <button class="contact-btn" @click="scrollToContact">
        <span>{{ locale === "ar" ? "اتصل بنا" : "Contact Us" }}</span>
        <Icon name="ic:round-arrow-outward" size="20" class="ms-1" />
      </button>

      <div class="aux-group">
        <div class="lang-toggle-wrapper">
          <ElementsLanguageToggle></ElementsLanguageToggle>
        </div>
        <!-- Theme Toggle -->
        <button class="aesthetic-btn-icon theme-toggle" @click="toggleTheme">
          <Icon
            :name="useIsDark().value ? 'i-ph-moon-stars-fill' : 'i-ph-sun'"
            size="22"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const props = defineProps({
  scrolled: {
    type: Boolean,
    default: false,
  },
});

const Menus = ref([
  {
    id: 1,
    isActive: true,
    type: "Link",
    name: "الرئيسية",
    englishName: "Home",
    children: [],
    pageUrl: "#home",
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
const toggleTheme = () => {
  useIsDark().value = !useIsDark().value;
  if (process.client) {
    if (useIsDark().value) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("isDark", true);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("isDark", false);
    }
  }
};

// Contact button scroll function
const scrollToContact = () => {
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};
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
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    transition: transform $transition-speed ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.nav-links-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-right-group {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

// ==========================================================
// ## Contact Button
// ==========================================================

.contact-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all $transition-speed ease;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ee7639;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    transition: transform $transition-speed ease;
  }

  &:hover .icon {
    transform: translate(2px, -2px);
  }
}

// ==========================================================
// ## Aux Group (Lang + Theme)
// ==========================================================

.aux-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.aesthetic-btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all $transition-speed ease;

  &:hover {
    background-color: rgba(238, 118, 57, 0.1);
    color: var(--accent-color);
  }
}

.lang-toggle-wrapper {
  display: flex;
  align-items: center;
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

  .nav-right-group {
    gap: 15px;
  }

  .contact-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}

@media (max-width: 1300px) {
  .nav-links-center {
    position: static;
    transform: none;
    flex-grow: 1;
    justify-content: center;
  }

  .nav-right-group {
    margin-left: auto;
  }
}

@media (max-width: 991px) {
  .pc-nav-content {
    display: none;
  }
}

// RTL Support for Arabic
.bodyAR {
  .nav-links-center {
    left: auto;
    right: 50%;
    transform: translateX(50%);
  }

  .nav-right-group {
    flex-direction: row-reverse;
  }

  .contact-btn {
    .icon {
      margin-right: 8px;
      margin-left: 0;
      transform: rotate(180deg);
    }
  }

  .aux-group {
    flex-direction: row-reverse;
  }
}
</style>
