<template>
  <div>
    <nuxt-link to="/" class="logo">
      <NuxtImg src="/logo/logo.png" alt="English Logo" loading="lazy" />
    </nuxt-link>
  </div>

  <div class="burger" :class="{ open: isNavOpen }" @click.stop="toggleNav">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div
    class="navCollapsed"
    :class="[isNavOpen ? 'open' : '', isEnglish ? 'en' : '']"
    @click.stop="isNavOpen = true"
  >
    <div class="container">
      <nuxt-link
        to="/"
        class="logoMob"
        style="border: none !important"
        :class="{ en: isEnglish }"
      >
        <NuxtImg src="/logo/logo.png" alt="English Logo" loading="lazy" />
      </nuxt-link>

      <ul>
        <li
          v-for="menu in menus"
          :key="menu.id"
          class="menu-item"
          v-show="menu.isActive"
        >
          <div class="paste-button" @click.stop="toggleDropdown(menu.id)">
            <div v-if="menu.type === 'Drop Down Menu'">
              <nuxt-link class="button">
                {{ getLocalizedName(menu) }}
                <font-awesome class="mx-1" :icon="['fas', 'caret-down']" />
              </nuxt-link>

              <div
                class="dropdown-content"
                :class="{ active: openMedia === menu.id }"
              >
                <nuxt-link
                  v-for="child in menu.children"
                  :key="child.id"
                  :to="`${child.pageUrl}`"
                  class="dropdown-item"
                  @click.stop="closeNav"
                >
                  {{ getLocalizedName(child) }}
                </nuxt-link>
              </div>
            </div>

            <div v-else>
              <nuxt-link
                class="button"
                :to="menu.pageUrl"
                @click.stop="closeNav"
              >
                {{ getLocalizedName(menu) }}
              </nuxt-link>
            </div>
          </div>
        </li>

        <li
          v-if="authStore.isAuthenticated"
          class="menu-item color"
          style="padding: 16px 12px"
        >
          <div @click="logoutModal = true">
            <font-awesome :icon="['fas', 'power-off']" />
            {{ isEnglish ? "Log out" : "تسجيل الخروج" }}
          </div>
        </li>
      </ul>
    </div>

    <ElementsAppModal :isOpen="logoutModal" @updateIsOpen="updateLogoutModal">
      <template #header>
        <h5 class="color">
          {{ isEnglish ? "Logging out" : "تسجيل الخروج" }}
        </h5>
      </template>
      <template #content>
        <p>
          {{ isEnglish ? "Do you want to log out?" : "هل تريد تسجيل الخروج؟" }}
        </p>
      </template>
      <template #footer>
        <button
          class="btn text-white"
          style="background-color: #bf9847"
          @click="logoutModal = false"
        >
          {{ isEnglish ? "Close" : "إغلاق" }}
        </button>
        <button class="btn" @click="handleLogout">
          {{ isEnglish ? "Log out" : "تسجيل الخروج" }}
        </button>
      </template>
    </ElementsAppModal>
  </div>
</template>

<script setup>
// --- Composables ---
const { locale } = useI18n();
const { $awn } = useNuxtApp();

// --- State Management ---
// Assign global state to local variables for better performance
const isNavOpen = useOpenNav();
const menus = useMenus();
const authStore = useAuth();
const cartStore = useCart();

// Local State
const openMedia = ref("");
const logoutModal = ref(false);

// --- Computed Properties ---
const isEnglish = computed(() => locale.value === "en");

// --- Helpers ---
const getLocalizedName = (item) => {
  return locale.value === "ar" ? item.name : item.englishName;
};

const updateLogoutModal = (value) => {
  logoutModal.value = value;
};

// --- Navigation Actions ---
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const closeNav = () => {
  isNavOpen.value = false;
};

const toggleDropdown = (id) => {
  openMedia.value = openMedia.value === id ? "" : id;
};

// --- Auth Actions ---
const handleLogout = async () => {
  logoutModal.value = false;

  // Clear Local Storage
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accountType");
  localStorage.removeItem("UserId");

  // Clear Cart if exists
  if (localStorage.getItem("cart")) {
    localStorage.removeItem("cart");
    cartStore.value.items = [];
    cartStore.value.totalPrice = 0;
    cartStore.value.totalQty = 0;
  }

  // Reset Auth State
  authStore.value.isAuthenticated = false;

  // Show Notification
  $awn.success(
    isEnglish.value
      ? "You have successfully logged out"
      : "تم تسجيل الخروج بنجاح",
    { durations: { global: 5000 } }
  );

  return navigateTo("/");
};
</script>

<style lang="scss" scoped>
// Variables (Assuming these exist globally, but using provided context)
$main: #bf9847; // Inferred from inline styles/context if not defined globally
$second: #af274c; // Inferred

.burger {
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 40px;
  justify-content: space-around;
  margin: 0px;
  z-index: 10001;
  padding: 5px;
  border-radius: 6px;

  &.open {
    span {
      &:nth-child(1) {
        transform: rotate(45deg) translate(6px, 8px);
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
    border-radius: 5px;
    background-color: $main;
    transition: all 0.3s ease-in-out;
  }
}

.navCollapsed {
  overflow-y: auto;
  position: fixed;
  width: 100vw;
  z-index: 1002;
  color: #fff;
  top: 0;
  left: 0;
  transform: translateX(100%);
  right: 0;
  bottom: 0;
  background: #af274cb5;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 100vh;
  transition: all 0.3s ease-in-out;
  border: 1px solid $second;

  &.en {
    transform: translateX(-100%);

    &.open {
      transform: translateX(-20%);
    }

    .container {
      padding-left: 20%;
      padding-right: 0% !important;
    }
  }

  &.open {
    transform: translateX(20%);
  }

  .container {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-right: 20%;
    padding-left: 0;
    margin-top: 124px;
    border-top: 2px solid $second;
    max-width: none;

    @media (max-width: 991px) {
      margin-top: 78px;
    }

    ul {
      margin: 0;
      color: #fff;
      padding: 20px 0px 0px 0px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      interpolate-size: allow-keywords;

      a {
        color: #fff;
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &.router-link-active.router-link-exact-active {
          color: $main !important;
        }
      }

      li {
        padding: 10px;
        font-size: 18px;
        margin: 0 15px;
        width: 100%;
        border-bottom: 1px solid #ccb47370;

        @media (max-width: 1480px) {
          padding: 16px 0px;
          font-size: 16px;
          margin: 0;
        }

        .paste-button {
          .button,
          a {
            padding: 0px 12px;
          }

          .dropdown-content {
            font-weight: 300 !important;
            display: flex;
            flex-direction: column;
            background: rgba(30, 30, 30, 0.34);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            height: 0;
            padding: 0px;
            width: 100%;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            opacity: 0;

            &.active {
              height: auto;
              padding: 0px 20px;
              opacity: 1;
              margin-top: 8px;
            }

            a {
              padding: 16px 0px;
            }
          }
        }
      }
    }
  }
}

.logoMob {
  position: absolute;
  top: -155px;
  right: 20%;
  padding: 16px 21px;

  @media (max-width: 991px) {
    padding: 72px 0;
    top: -150px;
  }

  @media (max-width: 768px) {
    padding: 62px 10px;
    top: -150px;
  }

  img {
    width: 200px;
    padding: 24px 29px;

    @media (max-width: 991px) {
      width: 80px;
      padding: 10px 0px;
    }
  }

  &.en {
    left: 20%;
    right: auto !important;
  }
}

.logo {
  display: flex;
  align-items: center;
  width: 80px;
  padding: 10px 28px;
  cursor: pointer;

  @media (max-width: 1250px) {
    width: 200px;
  }

  @media (max-width: 991px) {
    width: 80px;
    padding: 10px 0px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
