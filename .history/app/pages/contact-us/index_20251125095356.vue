<template>
  <div
    class="contact pb-10 nav-margin"
    :class="$i18n.locale == 'ar' ? 'ar' : ''"
  >
    <div class="title-container mt-4">
      <h1 class="text-center page-title mb-2">
        <span>
          <!-- <NuxtImg
            width="40"
            format="webp"
            preload
            src="/logo/webLogo.png"
            alt="Logo"
          /> -->
          {{ $i18n.locale === "ar" ? "اتصل بنا" : "Contact Us" }}
        </span>
      </h1>
    </div>
    <div class="form mt-10 py-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <form
              @submit.prevent="sendContactForm"
              class="card-body text-left mt-10"
              :class="$i18n.locale == 'en' ? '' : 'form_ar'"
            >
              <div class="d-flex wrap">
                <div class="col-md-5 col-lg-5 mb-4">
                  <div class="form-input">
                    <label for="FirstName">{{ $t("FirstName") }}</label>
                    <input
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      v-model="firstName"
                      required
                    />
                  </div>
                </div>
                <div
                  class="ml col-md-5 col-lg-5 mb-4"
                  :class="$i18n.locale === 'ar' ? 'ar' : ''"
                >
                  <div class="form-input">
                    <label for="LastName">{{ $t("LastName") }}</label>
                    <input
                      type="text"
                      name="LastName"
                      id="LastName"
                      v-model="lastName"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="d-flex wrap">
                <div class="col-md-5 col-lg-5 mb-4">
                  <div class="form-input">
                    <label for="Email">{{ $t("Email") }}</label>
                    <input
                      type="eamil"
                      name="Email"
                      id="Email"
                      v-model="email"
                      required
                    />
                  </div>
                </div>
                <div
                  class="ml col-md-5 col-lg-5 mb-4"
                  :class="$i18n.locale === 'ar' ? 'ar' : ''"
                >
                  <div class="form-input">
                    <label for="Phone">{{ $t("Phone") }}</label>
                    <input name="Phone" id="Phone" v-model="phone" required />
                  </div>
                </div>
              </div>

              <div class="col-sm-9 col-lg-10 col-lg-11 mb-2">
                <div class="form-input">
                  <label for="Message">{{ $t("Message") }}</label>
                  <textarea
                    style="height: 150px"
                    id="Message"
                    name="Message"
                    v-model="message"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="col-lg-11 d-flex justify-content-center my-3">
                <button :disabled="loading" class="btn-second">
                  <span>
                    {{ loading ? $t("Loading") : $t("Send") }}
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div class="col-lg-5 contact-text">
            <ul class="info">
              <h4 class="">
                <span>
                  {{ $t("TITLE") }}
                </span>
              </h4>
              <div
                class="d-flex align-items-start justify-content-start flex-column"
              >
                <div class="d-flex align-items-center contacts-content">
                  <div
                    class="contacts-info"
                    :class="$i18n.locale === 'ar' ? 'ar' : ''"
                  >
                    <p>{{ descData }}</p>
                  </div>
                </div>
                <div class="d-flex align-items-center contacts-content">
                  <Icon name="mdi:phone" class="text-gold" />
                  <div
                    class="contacts-info"
                    :class="$i18n.locale === 'ar' ? 'ar' : ''"
                  >
                    <p>{{ mobileData }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center contacts-content">
                  <Icon name="mdi:envelope" class="text-gold" />
                  <div
                    class="contacts-info"
                    :class="$i18n.locale === 'ar' ? 'ar' : ''"
                  >
                    <p>{{ emailData }}</p>
                  </div>
                </div>

                <div class="d-flex align-items-center contacts-content">
                  <Icon name="mdi:globe" class="text-gold" />
                  <div
                    class="contacts-info"
                    :class="$i18n.locale === 'ar' ? 'ar' : ''"
                  >
                    <p>{{ website }}</p>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="map" v-if="ContactsDetails?.geoLocation">
    <iframe
      :src="ContactsDetails?.geoLocation"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
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
  `${api.GetPagesDetail}/3`
);

// get header photo
const { data: BG, pending } = await useGetSiteApi().GetAll(`${api.Blocks}/10`);

let descData = ref();
let mobileData = ref();
let emailData = ref();
let website = ref();

watchEffect(() => {
  if (process.client) {
    if (ContactsDetails.value) {
      // Create a DOMParser to parse the string as HTML
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

      // Use querySelectorAll to find all <p> elements
      const details = [...doc.querySelectorAll("p")].map((p) =>
        p.textContent.trim()
      );

      // Now we can extract the relevant details
      mobileData.value = details[0].trim();
      emailData.value = details[1].trim();
      website.value = details[2].trim();
      useWhatsup().value = mobileData.value;
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
    // rest values
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
    email.value = "";
    message.value = "";
    // toast
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
    text:
      locale.value === "ar"
        ? ContactsDetails.value?.name
        : ContactsDetails.value?.englishName,
    to: null,
  },
]);
</script>

<style lang="scss" scoped>
.contact {
  .container {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border: 1px solid $main;
    border-radius: 16px;
    backdrop-filter: blur(5px);

    @media (max-width: 500px) {
      margin: 0px 10px;
      width: calc(100% - 20px);
    }
    form {
      padding: 20px;
      @media (max-width: 991px) {
        padding: 5px;
      }
    }
  }
  .col-lg-11 {
    width: 86%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.row {
  position: relative;
  @media (max-width: 991px) {
    flex-direction: column-reverse;
  }
  ul {
    padding: 0px 12px;
  }
}

.wrap {
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .ml {
    margin-left: 20px;
    @media (max-width: 768px) {
      margin-left: 0px;
    }
    &.ar {
      margin-right: 20px;
    }
  }
}

.map {
  background-color: $main;
  border: 2px solid $main;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 100px;
  iframe {
    border: none;
    width: 100%;
    height: 500px;
  }
}

.info {
  margin-top: 60px;
  color: #333;
  line-height: 20px;

  @media (max-width: 991px) {
    margin-top: 20px;
  }
  .iconify {
    width: 25px;
    font-size: 25px;
    color: $main;
    margin-inline-end: 10px;
    margin-bottom: 20px;
  }

  li {
    font-size: 18px;
    margin-left: 14px;
    margin-right: 14px;
    @media (max-width: 991px) {
      font-size: 14px !important;
    }
  }

  h4 {
    margin-bottom: 20px;
    span {
      -webkit-background-clip: text;
      font-weight: bold;
      background-color: $main;
      background-image: linear-gradient(45deg, $main, $second, $main);
      background-repeat: repeat;
      background-size: 100%;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }
  }

  h4,
  .icon {
    color: $basic;
  }
}

.contacts-content {
  margin-bottom: 10px;
  svg {
    width: 25px;
    font-size: 25px;
    margin-right: 10px;
    margin-bottom: 15px;
    color: $second;
  }
}

.contact {
  &.ar {
    .contacts-content {
      svg {
        width: 25px;
        font-size: 25px;
        margin-left: 10px;
        margin-right: 0px !important;
      }
    }
    .info {
      img {
        margin-left: 10px;
        margin-right: -20px !important;
      }
    }
  }
}

@media (max-width: 768px) {
  .ml {
    margin: 0 !important;
  }
  .contact-text {
    img {
      display: none;
    }
  }
}

@media (max-width: 350px) {
  .contact-text {
    padding: 0 !important;
  }
  .col-lg-8 {
    padding: 0 !important;
  }
  .card-body {
    padding: 10px !important;
  }
}

.back {
  width: 100%;
  height: auto;
  position: relative;
  aspect-ratio: 3.2;
  .back-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0000007b;
  }
}

.form-input {
  display: flex;
  flex-direction: column;
  padding-bottom: 6px;
  width: 100%;
  label {
    color: $main;
    margin-bottom: 8px;
    text-align: justify;
  }
  input,
  textarea {
    background-color: #e8e8e8;
    padding: 10px 20px;
    color: #333;
    border: 1px solid $main;
    border-radius: 8px;
    &:focus-visible {
      outline: none !important;
    }
  }
}

.contacts-info {
  &.ar {
    text-align: right;
    direction: ltr;
  }
}
</style>
