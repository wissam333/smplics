<template>
  <div class="contact-page nav-margin-mobile">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <NuxtImg
              width="60"
              height="30"
              format="webp"
              preload
              src="/logo/logo2.png"
              alt="Logo"
              class="logo-img"
            />
            {{ $i18n.locale === "ar" ? "اتصل بنا" : "Contact Us" }}
          </h1>
          <p class="hero-subtitle">
            {{
              $i18n.locale === "ar"
                ? "نحن هنا لمساعدتك، لا تتردد في التواصل معنا"
                : "We are here to help, feel free to reach out to us"
            }}
          </p>
        </div>
      </div>
    </section>

    <div class="content-sections">
      <section class="content-section">
        <div class="container">
          <div
            class="section-grid"
            :class="{ reversed: $i18n.locale === 'ar' }"
          >
            <div class="form-column">
              <div class="form-card">
                <h3 class="form-title">{{ $t("Send") }} {{ $t("Message") }}</h3>
                <form
                  @submit.prevent="sendContactForm"
                  :class="$i18n.locale == 'en' ? '' : 'form_ar'"
                >
                  <div class="input-group-row">
                    <div class="form-input half">
                      <label for="FirstName">{{ $t("FirstName") }}</label>
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        v-model="firstName"
                        required
                        placeholder="..."
                      />
                    </div>
                    <div class="form-input half">
                      <label for="LastName">{{ $t("LastName") }}</label>
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        v-model="lastName"
                        required
                        placeholder="..."
                      />
                    </div>
                  </div>

                  <div class="input-group-row">
                    <div class="form-input half">
                      <label for="Email">{{ $t("Email") }}</label>
                      <input
                        type="email"
                        name="Email"
                        id="Email"
                        v-model="email"
                        required
                        placeholder="name@example.com"
                      />
                    </div>
                    <div class="form-input half">
                      <label for="Phone">{{ $t("Phone") }}</label>
                      <input
                        name="Phone"
                        id="Phone"
                        v-model="phone"
                        required
                        type="tel"
                        placeholder="+1 234..."
                      />
                    </div>
                  </div>

                  <div class="form-input full">
                    <label for="Message">{{ $t("Message") }}</label>
                    <textarea
                      id="Message"
                      name="Message"
                      v-model="message"
                      required
                      placeholder="..."
                    ></textarea>
                  </div>

                  <div class="form-action">
                    <button :disabled="loading" class="btn-submit">
                      <span>
                        {{ loading ? $t("Loading") : $t("Send") }}
                      </span>
                      <Icon name="material-symbols:send" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="text-column">
              <div class="about-content info-wrapper">
                <div class="subheading">{{ $t("TITLE") }}</div>
                <h2 class="title">
                  {{
                    $i18n.locale === "ar" ? "معلومات التواصل" : "Get In Touch"
                  }}
                </h2>

                <div class="contact-list">
                  <div class="contact-item" v-if="descData">
                    <div class="icon-box">
                      <Icon name="mdi:information-outline" />
                    </div>
                    <div class="item-content">
                      <p>{{ descData }}</p>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="icon-box">
                      <Icon name="mdi:phone" />
                    </div>
                    <div class="item-content">
                      <p dir="ltr" class="text-start">{{ mobileData }}</p>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="icon-box">
                      <Icon name="mdi:envelope" />
                    </div>
                    <div class="item-content">
                      <p>{{ emailData }}</p>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="icon-box">
                      <Icon name="mdi:globe" />
                    </div>
                    <div class="item-content">
                      <p>{{ website }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="map-section" v-if="ContactsDetails?.geoLocation">
      <div class="container">
        <div class="map-frame">
          <iframe
            :src="ContactsDetails?.geoLocation"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
const { $awn } = useNuxtApp();
const { locale } = useI18n();

// get ContactData
const { data: ContactsDetails } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/4`
);

let descData = ref();
let mobileData = ref();
let emailData = ref();
let website = ref();

watchEffect(() => {
  if (process.client) {
    if (ContactsDetails.value) {
      const parser = new DOMParser();
      let doc;
      if (locale.value === "en") {
        doc = parser.parseFromString(
          ContactsDetails.value.englishDescription,
          "text/html"
        );
      } else {
        doc = parser.parseFromString(
          ContactsDetails.value.description,
          "text/html"
        );
      }

      const details = [...doc.querySelectorAll("p")].map((p) =>
        p.textContent.trim()
      );

      mobileData.value = details[0]?.trim();
      emailData.value = details[1]?.trim();
      website.value = details[2]?.trim();
      useWhatsup().value = mobileData.value;

      // Attempt to get description if it exists separately, or use a default
      descData.value = details.length > 3 ? details[3] : "";
    }
  }
});

let firstName = ref();
let lastName = ref();
let phone = ref();
let email = ref();
let message = ref();

let dataa = ref();
let loading = ref(false);

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

    firstName.value = "";
    lastName.value = "";
    phone.value = "";
    email.value = "";
    message.value = "";

    if (response.data.value.succeeded) {
      $awn.success(
        locale.value === "ar"
          ? "تم إرسال الطلب بنجاح"
          : "Request Sent Successfully",
        { durations: { global: 5000 } }
      );
    } else {
      $awn.alert(locale.value === "ar" ? "حدث خطأ" : "Error occurred", {
        durations: { global: 5000 },
      });
    }
  } catch (error) {
    $awn.alert(locale.value === "ar" ? "حدث خطأ" : "Error occurred", {
      durations: { global: 5000 },
    });
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
</script>

<style lang="scss" scoped>
// Variables assumed from context
$gold: #d4af37;
$gold-light: #f9d423;
$dark: #2d2d2d;
$grey-bg: #f8f9fa;

.contact-page {
  background: #fff;
  color: $dark;
}

/* --- 1. HERO SECTION (Identical to About Page) --- */
.hero-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 160px 0 80px;
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
  }

  .hero-title {
    font-weight: 700;
    margin-bottom: 20px;
    font-size: 3rem;
    background: linear-gradient(135deg, $gold 0%, $gold-light 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    img {
      filter: brightness(0) invert(1);
      opacity: 0.9;
      margin-inline-end: 10px;
      vertical-align: middle;
    }
  }

  .hero-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

/* --- 2. LAYOUT GRID --- */
.content-sections {
  padding: 60px 0;
}

.section-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; // Give form more space
  gap: 60px;
  align-items: start;

  &.reversed {
    direction: ltr; // Fix direction for grid but content handles RTL internally
    .form-column {
      order: 2;
    }
    .text-column {
      order: 1;
    }
  }

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
    &.reversed {
      .form-column {
        order: 1;
      }
      .text-column {
        order: 2;
      }
    }
  }
}

/* --- 3. FORM COLUMN STYLING --- */
.form-column {
  .form-card {
    background: #ffffff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    border: 1px solid #eee;

    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: $dark;
    position: relative;
    padding-bottom: 15px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      inset-inline-start: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, $gold, transparent);
    }
  }

  .input-group-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0;
    }
  }

  .form-input {
    width: 100%;
    margin-bottom: 20px;

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
      color: lighten($dark, 20%);
    }

    input,
    textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fff;
      transition: all 0.3s ease;
      font-size: 1rem;
      color: $dark;

      &:focus {
        outline: none;
        border-color: $gold;
        box-shadow: 0 0 0 4px rgba($gold, 0.1);
      }

      &::placeholder {
        color: #ccc;
      }
    }

    textarea {
      height: 150px;
      resize: vertical;
    }
  }

  .btn-submit {
    background: linear-gradient(135deg, $gold 0%, $gold-light 100%);
    color: #222;
    border: none;
    padding: 14px 40px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba($gold, 0.4);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

/* --- 4. TEXT/INFO COLUMN STYLING --- */
.text-column {
  .info-wrapper {
    position: relative;
    padding: 30px;
    background: $grey-bg;
    border-radius: 16px;

    // The "Gold Square" accent from About page
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      inset-inline-end: -10px;
      width: 50px;
      height: 50px;
      background-color: $gold;
      opacity: 0.8;
      border-radius: 4px;
      z-index: -1;
    }
  }

  .subheading {
    font-size: 14px;
    font-weight: 600;
    color: $gold;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 30px;
    font-weight: 700;
    color: $dark;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;

    .icon-box {
      min-width: 45px;
      height: 45px;
      background: rgba($gold, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: darken($gold, 10%);
      font-size: 1.2rem;
    }

    .item-content {
      p {
        margin: 0;
        font-size: 1.05rem;
        color: lighten($dark, 10%);
        line-height: 1.5;
        word-break: break-word;
      }
    }
  }
}

/* --- 5. MAP SECTION --- */
.map-section {
  padding-bottom: 80px;

  .map-frame {
    height: 450px;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 5px solid white;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
