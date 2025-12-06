<template>
  <div class="contact-page nav-margin-mobile">
    <!-- Enhanced Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="logo-title-wrapper">
            <NuxtImg
              width="60"
              height="30"
              format="webp"
              preload
              src="/logo/logo2.png"
              alt="Logo"
              class="logo-img"
            />
            <h1 class="hero-title">
              {{ $i18n.locale === "ar" ? "اتصل بنا" : "Contact Us" }}
            </h1>
          </div>
          <p class="hero-subtitle">
            {{
              $i18n.locale === "ar"
                ? "نحن هنا لمساعدتك، لا تتردد في التواصل معنا"
                : "We are here to help, feel free to reach out to us"
            }}
          </p>
          <div class="hero-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-circle"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Sections -->
    <div class="content-sections">
      <section class="content-section">
        <div class="container">
          <div class="section-grid">
            <!-- Contact Form Column -->
            <div class="form-column">
              <div class="form-card">
                <div class="form-header">
                  <h4 class="form-title">{{ $t("send_message") }}</h4>
                </div>
                <form
                  @submit.prevent="sendContactForm"
                  :class="$i18n.locale == 'en' ? '' : 'form_ar'"
                >
                  <div class="input-group-row">
                    <div class="form-input half">
                      <label for="FirstName">{{ $t("first_name") }}</label>
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        v-model="firstName"
                        required
                        :placeholder="
                          $i18n.locale === 'ar' ? 'الاسم الأول' : 'First Name'
                        "
                        :class="{ filled: firstName }"
                      />
                      <div class="input-underline"></div>
                    </div>
                    <div class="form-input half">
                      <label for="LastName">{{ $t("last_name") }}</label>
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        v-model="lastName"
                        required
                        :placeholder="
                          $i18n.locale === 'ar' ? 'اسم العائلة' : 'Last Name'
                        "
                        :class="{ filled: lastName }"
                      />
                      <div class="input-underline"></div>
                    </div>
                  </div>

                  <div class="input-group-row">
                    <div class="form-input half">
                      <label for="Email">{{ $t("email") }}</label>
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        v-model="email"
                        required
                        placeholder="name@example.com"
                        :class="{ filled: email }"
                      />
                      <div class="input-underline"></div>
                    </div>
                    <div class="form-input half">
                      <label for="Phone">{{ $t("phone") }}</label>
                      <input
                        name="Phone"
                        id="Phone"
                        v-model="phone"
                        required
                        type="tel"
                        :placeholder="
                          $i18n.locale === 'ar'
                            ? '+966 123 456 789'
                            : '+1 234 567 8900'
                        "
                        :class="{ filled: phone }"
                      />
                      <div class="input-underline"></div>
                    </div>
                  </div>

                  <div class="form-input full">
                    <label for="Message">{{ $t("message") }}</label>
                    <textarea
                      id="Message"
                      name="Message"
                      v-model="message"
                      required
                      :placeholder="
                        $i18n.locale === 'ar'
                          ? 'اكتب رسالتك هنا...'
                          : 'Type your message here...'
                      "
                      :class="{ filled: message }"
                    ></textarea>
                    <div class="input-underline"></div>
                  </div>

                  <div class="form-action">
                    <button :disabled="loading" class="btn-submit">
                      <span>
                        {{ loading ? $t("loading") : $t("send") }}
                      </span>
                      <div class="btn-icon">
                        <Icon name="material-symbols:send" />
                      </div>
                      <div class="btn-shine"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Contact Information Column -->
            <div class="text-column">
              <div class="contact-wrapper">
                <h4 class="section-title" :class="{ ar: isArabic }">
                  {{ isArabic ? "الاتصال بنا" : "Contact Us" }}
                </h4>

                <div class="contact-list">
                  <div class="contact-item" v-if="contactData.info">
                    <div class="icon-box"><Icon name="mdi:globe" /></div>
                    <div class="info-text ltr-force">
                      {{ contactData.info }}
                    </div>
                  </div>

                  <div class="contact-item" v-if="contactData.info2">
                    <div class="icon-box"><Icon name="mdi:phone" /></div>
                    <div class="info-text ltr-force">
                      {{ contactData.info2 }}
                    </div>
                  </div>

                  <div class="contact-item" v-if="contactData.info3">
                    <div class="icon-box">
                      <Icon name="mdi:email-outline" />
                    </div>
                    <div class="info-text">{{ contactData.info3 }}</div>
                  </div>

                  <div class="contact-item" v-if="contactData.info4">
                    <div class="icon-box"><Icon name="mdi:map-marker" /></div>
                    <div class="info-text">{{ contactData.info4 }}</div>
                  </div>

                  <div class="contact-item" v-if="contactData.info5">
                    <div class="icon-box"><Icon name="mdi:web" /></div>
                    <div class="info-text">{{ contactData.info5 }}</div>
                  </div>
                </div>

                <!-- Social Media Links -->
                <div
                  class="socials-section"
                  v-if="useMenusSocial().value?.items?.length > 0"
                >
                  <h5 class="socials-title">
                    {{ isArabic ? "تابعنا على" : "Follow Us" }}
                  </h5>
                  <div class="socials-container">
                    <a
                      v-for="social in useMenusSocial().value?.items"
                      :key="social.id"
                      :href="social?.url"
                      target="_blank"
                      class="social-btn"
                      v-show="social.isActive"
                      :aria-label="social.englishName"
                    >
                      <Icon
                        :name="`mdi:${social.englishName.toLowerCase()}`"
                        size="20"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Map Section -->
    <div class="map-section" v-if="ContactsDetails?.geoLocation">
      <div class="container">
        <div class="section-header">
          <h2>{{ $i18n.locale === "ar" ? "موقعنا" : "Our Location" }}</h2>
          <p>
            {{
              $i18n.locale === "ar"
                ? "تعرف على موقعنا الجغرافي"
                : "Find us on the map"
            }}
          </p>
        </div>
        <div class="map-frame">
          <iframe
            :src="ContactsDetails?.geoLocation"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="$i18n.locale === 'ar' ? 'موقع الشركة' : 'Company Location'"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Success/Error Message Toast -->
    <div v-if="showToast" class="toast" :class="toastType">
      <div class="toast-content">
        <Icon :name="toastIcon" class="toast-icon" />
        <p>{{ toastMessage }}</p>
      </div>
      <button class="toast-close" @click="hideToast">
        <Icon name="mdi:close" />
      </button>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
const { $awn } = useNuxtApp();
const { locale, t } = useI18n();

// get ContactData
const { data: ContactsDetails } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/3`
);

let firstName = ref();
let lastName = ref();
let phone = ref();
let email = ref();
let message = ref();

let dataa = ref();
let loading = ref(false);

// Toast notification
let showToast = ref(false);
let toastMessage = ref("");
let toastType = ref("success"); // 'success' or 'error'
let toastIcon = ref("");

const hideToast = () => {
  showToast.value = false;
};

const showNotification = (type, message) => {
  toastType.value = type;
  toastMessage.value = message;
  toastIcon.value =
    type === "success" ? "mdi:check-circle" : "mdi:alert-circle";
  showToast.value = true;

  // Auto hide after 5 mains
  setTimeout(() => {
    showToast.value = false;
  }, 5000);
};

const sendContactForm = async () => {
  try {
    loading.value = true;
    dataa.value = {
      name: firstName.value + " " + lastName.value,
      phone: phone.value,
      email: email.value,
      message: message.value,
    };
    const response = await useHttpForUserApi().post(api.Contact, dataa.value);

    if (response.data.value.succeeded) {
      showNotification(
        "success",
        locale.value === "ar"
          ? "تم إرسال الطلب بنجاح"
          : "Request Sent Successfully"
      );

      // Reset form
      firstName.value = "";
      lastName.value = "";
      phone.value = "";
      email.value = "";
      message.value = "";
    } else {
      showNotification(
        "error",
        locale.value === "ar"
          ? "حدث خطأ أثناء الإرسال"
          : "Error occurred while sending"
      );
    }
  } catch (error) {
    showNotification(
      "error",
      locale.value === "ar" ? "حدث خطأ غير متوقع" : "Unexpected error occurred"
    );
  } finally {
    loading.value = false;
  }
};

const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  {
    text: locale.value === "ar" ? "اتصل بنا" : "Contact Us",
    to: null,
  },
]);

const isArabic = computed(() => locale.value === "ar");

// Use useAsyncData for better hydration mismatch handling
const { data: pageDetails } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/3`
);

// COMPUTED: This runs on Server AND Client.
// No layout shift because HTML arrives populated.
const contactData = computed(() => {
  if (!pageDetails.value) return {};

  const description =
    locale.value === "en"
      ? pageDetails.value.englishDescription1
      : pageDetails.value.description1;

  if (!description) return {};

  try {
    // Regex matches content between <p> tags.
    // Works in Node.js (Server) and Browser.
    const matches = [...description.matchAll(/<p[^>]*>(.*?)<\/p>/g)].map((m) =>
      m[1].trim()
    );

    if (matches.length) {
      return {
        info: matches[0] || "",
        info2: matches[1] || "",
        info3: matches[2] || "",
        info4: matches[3] || "",
        info5: matches[4] || "",
      };
    }
  } catch (e) {
    console.error("Error parsing contact details", e);
  }
  return {};
});

// Set page metadata
useSeoMeta({
  title: locale.value === "ar" ? "اتصل بنا" : "Contact Us",
  description:
    locale.value === "ar"
      ? "تواصل معنا للحصول على المساعدة والدعم"
      : "Get in touch with us for help and support",
});
</script>

<style lang="scss" scoped>
// Variables
$dark: #2d2d2d;
$dark-light: #4a4a4a;
$grey-bg: #f8f9fa;
$grey-light: #f0f0f0;
$grey-border: #e0e0e0;
$white: #ffffff;
$success: #10b981;
$error: #ef4444;

.contact-page {
  background: #fff;
  color: $dark;
}

/* --- 1. ENHANCED HERO SECTION --- */
.hero-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 160px 0 100px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .hero-content {
    text-align: center;
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto;
  }

  .logo-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .logo-img {
      filter: brightness(0) invert(1);
      opacity: 0.9;
      margin-inline-end: 15px;
    }
  }

  .hero-title {
    font-weight: 800;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .hero-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .hero-decoration {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
}

/* --- 2. LAYOUT GRID --- */
.content-sections {
  padding: 80px 0;
}

.section-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

/* --- 3. ENHANCED FORM COLUMN STYLING --- */
.form-column {
  height: 100%;
  .form-card {
    height: 100%;
    background: #ffffff;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba($main, 0.1);
    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
      padding: 30px 20px;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(to bottom, $main, $main);
    }
  }

  .form-header {
    margin-bottom: 30px;

    .form-title {
      font-weight: 700;
      margin-bottom: 10px;
      color: $dark;
      position: relative;
      display: inline-block;
    }

    .form-subtitle {
      color: $dark-light;
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  .input-group-row {
    display: flex;
    gap: 10px;

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0;
    }
  }

  .form-input {
    width: 100%;
    margin-bottom: 25px;
    position: relative;

    &.half {
      width: 50%;
      @media (max-width: 576px) {
        width: 100%;
      }
    }

    label {
      display: block;
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 8px;
      color: $dark-light;
      transition: color 0.3s ease;
    }

    input,
    textarea {
      width: 100%;
      padding: 14px 0;
      border: none;
      border-radius: 0;
      background: transparent;
      transition: all 0.3s ease;
      font-size: 1rem;
      color: $dark;
      border-bottom: 1px solid $grey-border;

      &:focus {
        outline: none;
        border-bottom-color: $main;

        + .input-underline {
          transform: scaleX(1);
        }

        ~ label {
          color: $main;
        }
      }

      &.filled {
        ~ label {
          color: $main;
        }

        + .input-underline {
          transform: scaleX(1);
          background: $main;
        }
      }

      &::placeholder {
        color: #aaa;
        transition: opacity 0.3s ease;
      }

      &:focus::placeholder {
        opacity: 0.5;
      }
    }

    .input-underline {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: $main;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    textarea {
      height: 50px;
      resize: vertical;
      min-height: 100px;
    }
  }

  .btn-submit {
    background: linear-gradient(135deg, $main 0%, $main 100%);
    color: $dark;
    border: none;
    padding: 16px 40px;
    border-radius: 50px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba($main, 0.3);

    &:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba($main, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .btn-icon {
      transition: transform 0.3s ease;
    }

    &:hover:not(:disabled) .btn-icon {
      transform: translateX(3px);
    }

    .btn-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%
      );
      transform: skewX(-25deg);
      transition: left 0.75s ease;
    }

    &:hover:not(:disabled) .btn-shine {
      left: 150%;
    }
  }
}

/* --- 4. TEXT/INFO COLUMN STYLING --- */
.text-column {
  height: 100%;
}

/* --- 5. ENHANCED MAP SECTION --- */
.map-section {
  padding: 80px 0;
  background: $grey-bg;

  .section-header {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: $dark;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    p {
      font-size: 1.1rem;
      color: $dark-light;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .map-frame {
    height: 450px;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    border: 8px solid white;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}

/* --- 6. TOAST NOTIFICATION --- */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 350px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  border-left: 4px solid $success;

  &.error {
    border-left-color: $error;
  }

  @media (max-width: 576px) {
    right: 20px;
    left: 20px;
    max-width: none;
  }

  .toast-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;

    .toast-icon {
      font-size: 1.5rem;

      .toast.success & {
        color: $success;
      }

      .toast.error & {
        color: $error;
      }
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: $dark;
    }
  }

  .toast-close {
    background: none;
    border: none;
    color: $dark-light;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;

    &:hover {
      color: $dark;
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.contact-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  height: fit-content;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    inset-inline-end: -10px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
    opacity: 0.9;
    border-radius: 8px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
}

.section-title {
  color: #2d2d2d;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
  position: relative;
  display: inline-block;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 200px;
  margin-bottom: 30px;
}

.contact-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 15px;
  align-items: start;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);

  &:hover {
    background: rgba(212, 175, 55, 0.05);
    transform: translateX(5px);
  }

  .icon-box {
    color: #d4af37;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  &:hover .icon-box {
    background: rgba(212, 175, 55, 0.2);
    transform: scale(1.05);
  }

  .info-text {
    color: #2d2d2d;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
    align-self: center;
  }
}

.socials-section {
  padding-top: 25px;
  border-top: 1px solid rgba(224, 224, 224, 0.5);

  .socials-title {
    color: #2d2d2d;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .socials-container {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .social-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(212, 175, 55, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d4af37;
    font-size: 20px;
    transition: all 0.3s ease;

    &:hover {
      background: #d4af37;
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    }
  }
}
</style>
