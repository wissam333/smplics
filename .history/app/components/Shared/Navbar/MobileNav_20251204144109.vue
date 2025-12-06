<template>
  <div class="mobile-nav-container">
    <!-- Logo -->
    <nuxt-link to="/" class="logo">
      <NuxtImg src="/logo/logo.webp" alt="Company Logo" loading="lazy" />
    </nuxt-link>

    <!-- Burger Menu -->
    <div class="burger" @click.stop="toggleNav" :class="{ open: isNavOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Navigation Menu -->
    <div
      class="mobile-nav-menu"
      :class="[isNavOpen ? 'open' : '', isEnglish ? 'en' : '']"
      @click.stop="isNavOpen = true"
    >
      <div class="nav-content">
        <!-- Mobile Logo -->
        <nuxt-link to="/" class="mobile-logo" @click.stop="closeNav">
          <NuxtImg src="/logo/logo.webp" alt="Company Logo" loading="lazy" />
        </nuxt-link>

        <!-- Navigation Links -->
        <ul class="nav-list">
          <li
            v-for="menu in menus"
            :key="menu.id"
            class="nav-item"
            v-show="menu.isActive"
            @click.stop="handleMenuItemClick(menu)"
          >
            <template v-if="menu.type === 'Drop Down Menu'">
              <div class="dropdown-item" @click.stop="toggleDropdown(menu.id)">
                <span>{{ getLocalizedName(menu) }}</span>
                <Icon
                  name="material-symbols:arrow-drop-down-rounded"
                  size="20"
                  class="dropdown-icon"
                  :class="{ rotated: openDropdown === menu.id }"
                />
              </div>
              <div
                class="dropdown-content"
                :class="openDropdown === menu.id ? 'active' : ''"
              >
                <nuxt-link
                  v-for="child in menu.children"
                  :key="child.id"
                  :to="child.pageUrl"
                  class="dropdown-child"
                  @click.stop="closeNav"
                >
                  {{ getLocalizedName(child) }}
                </nuxt-link>
              </div>
            </template>
            <template v-else>
              <nuxt-link
                :to="menu.pageUrl"
                class="nav-link"
                @click.stop="closeNav"
              >
                {{ getLocalizedName(menu) }}
              </nuxt-link>
            </template>
          </li>
        </ul>

        <!-- Theme Toggle and Language Switcher -->
        <div class="mobile-nav-footer">
          <div class="action-buttons">
            <button class="theme-toggle" @click.stop="toggleTheme">
              <Icon
                :name="isDark ? 'i-ph-moon-stars-fill' : 'i-ph-sun'"
                size="22"
              />
              <span>{{
                isDark
                  ? locale === "ar"
                    ? "الوضع النهاري"
                    : "Light Mode"
                  : locale === "ar"
                  ? "الوضع الليلي"
                  : "Dark Mode"
              }}</span>
            </button>

            <div class="theme-toggle" @click.stop>
              <Icon name="i-ph-translate-bold" size="22" />
              <ElementsLanguageToggle color="#fff"></ElementsLanguageToggle>
            </div>
          </div>

          <!-- Contact Button -->
          <button class="contact-btn" @click.stop="scrollToContact">
            <span>{{ locale === "ar" ? "اتصل بنا" : "Contact Us" }}</span>
            <Icon name="ic:round-arrow-outward" size="20" class="ms-1" />
          </button>

          <!-- Social Icons -->
          <div class="mobile-socials" @click.stop>
            <a href="#" class="social-icon">
              <Icon name="mdi:twitter" size="20" />
            </a>
            <a href="#" class="social-icon">
              <Icon name="mdi:linkedin" size="20" />
            </a>
            <a href="#" class="social-icon">
              <Icon name="mdi:facebook" size="20" />
            </a>
            <a href="#" class="social-icon">
              <Icon name="mdi:instagram" size="20" />
            </a>
            <a href="#" class="social-icon">
              <Icon name="mdi:youtube" size="20" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// --- Composables ---
const { locale } = useI18n();

// --- State ---
const isNavOpen = ref(false);
const openDropdown = ref("");
const isDark = useState("theme-dark", () => true);

// --- Menus ---
const menus = ref([
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

// --- Computed ---
const isEnglish = computed(() => locale.value === "en");

// --- Methods ---
const getLocalizedName = (item) => {
  return locale.value === "ar" ? item.name : item.englishName;
};

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
  if (isNavOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeNav = () => {
  isNavOpen.value = false;
  openDropdown.value = "";
  document.body.style.overflow = "";
};

const toggleDropdown = (id) => {
  openDropdown.value = openDropdown.value === id ? "" : id;
};

const handleMenuItemClick = (menu) => {
  if (menu.type !== "Drop Down Menu") {
    closeNav();
  }
};

// Theme toggle
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

// Contact button scroll
const scrollToContact = () => {
  closeNav();
  setTimeout(() => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 300);
};

// Close nav when clicking outside
const handleClickOutside = (event) => {
  const navMenu = document.querySelector(".mobile-nav-menu");
  const burger = document.querySelector(".burger");

  if (
    navMenu &&
    !navMenu.contains(event.target) &&
    !burger.contains(event.target) &&
    isNavOpen.value
  ) {
    closeNav();
  }
};

// Initialize theme on mount
onMounted(() => {
  if (process.client) {
    // Restore theme
    if (isDark.value)
      document.documentElement.setAttribute("data-theme", "dark");

    document.addEventListener("click", handleClickOutside);
  }
});

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener("click", handleClickOutside);
    document.body.style.overflow = "";
  }
});
</script>

<style lang="scss" scoped>
.mobile-nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

// --- Logo ---
.logo {
  flex-shrink: 0;
  width: 100px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
}

// --- Burger Menu ---
.burger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  padding: 8px;
  cursor: pointer;
  z-index: 1003;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(var(--accent-color-rgb, 238, 118, 57), 0.1);
  }

  &.open {
    span {
      &:nth-child(1) {
        transform: rotate(45deg) translate(4px, 6px);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -8px);
      }
    }
  }

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--accent-color);
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

// --- Mobile Navigation Menu ---
.mobile-nav-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--bg-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1002;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;

  &.open {
    transform: translateX(0);
  }

  &.en {
    transform: translateX(-100%);

    &.open {
      transform: translateX(0);
    }
  }
}

.nav-content {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-logo {
  width: 120px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: auto;
  }
}

// --- Navigation List ---
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.nav-item {
  margin-bottom: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
}

.nav-link {
  display: block;
  padding: 18px 0;
  color: var(--text-color);
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover,
  &.router-link-active {
    color: var(--accent-color);
  }
}

// --- Dropdown Styles ---
.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
}

.dropdown-icon {
  transition: transform 0.3s ease;

  &.rotated {
    transform: rotate(180deg);
  }
}

.dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;

  &.active {
    max-height: 500px;
  }
}

.dropdown-child {
  display: block;
  padding: 15px 0 15px 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color);
    border-left-color: var(--accent-color);
    padding-left: 30px;
  }

  &.router-link-active {
    color: var(--accent-color);
    border-left-color: var(--accent-color);
  }
}

// --- Mobile Navigation Footer ---
.mobile-nav-footer {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #8585853e;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--accent-color);
  }
}

.lang-toggle-wrapper {
  display: flex;
  align-items: center;
}

.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: darken(#ee7639, 10%);
    transform: translateY(-2px);
  }
}

.mobile-socials {
  display: flex;
  justify-content: center;
  gap: 15px;

  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
      transform: translateY(-3px);
    }
  }
}

// --- RTL Support ---
.bodyAR {
  .mobile-nav-menu {
    right: auto;
    left: 0;
    transform: translateX(-100%);

    &.open {
      transform: translateX(0);
    }
  }

  .nav-link:hover,
  .nav-link.router-link-active {
    padding-left: 0;
  }

  .dropdown-child {
    padding: 15px 20px 15px 0;
    border-left: none;
    border-right: 2px solid transparent;

    &:hover {
      padding-left: 0;
      padding-right: 30px;
      border-left: none;
      border-right-color: var(--accent-color);
    }
  }

  .dropdown-icon {
    transform: rotate(180deg);

    &.rotated {
      transform: rotate(0deg);
    }
  }

  .contact-btn .icon {
    transform: rotate(180deg);
  }
}

// --- Responsive Adjustments ---
@media (max-width: 768px) {
  .mobile-logo {
    width: 100px;
  }

  .nav-link {
    font-size: 16px;
    padding: 16px 0;
  }

  .dropdown-item {
    font-size: 16px;
    padding: 16px 0;
  }

  .dropdown-child {
    font-size: 14px;
    padding: 12px 0 12px 15px;
  }

  .contact-btn {
    padding: 12px;
    font-size: 14px;
  }

  .mobile-socials .social-icon {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .action-buttons {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }

  .mobile-socials {
    gap: 10px;
  }
}
</style>
