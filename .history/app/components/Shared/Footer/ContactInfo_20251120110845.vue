<template>
  <div
    class="contact w-100"
    :data-aos="$i18n.locale === 'ar' ? 'fade-right' : 'fade-left'"
  >
    <h4 class="title" :class="$i18n.locale === 'ar' ? 'ar' : ''">
      <span class="fw-bold">
        {{ $i18n.locale === "ar" ? "الاتصال بنا" : "Contact Us" }}</span
      >
    </h4>

    <br />

    <div class="d-flex align-items-start justify-content-start flex-column">
      <div class="d-flex align-items-center contacts-content">
        <Icon name="mdi:phone" class="text-gold" />
        <div class="contacts-info" :class="$i18n.locale === 'ar' ? 'ar' : ''">
          <p>{{ mobileData }}</p>
        </div>
      </div>

      <div class="d-flex align-items-center contacts-content">
        <Icon name="mdi:phone" class="text-gold" />

        <div class="contacts-info" :class="$i18n.locale === 'ar' ? 'ar' : ''">
          <p>{{ mobileData2 }}</p>
        </div>
      </div>

      <div class="d-flex align-items-center contacts-content">
        <Icon name="mdi:envelope" class="text-gold" />
        <div class="contacts-info" :class="$i18n.locale === 'ar' ? 'ar' : ''">
          <p>{{ emailData }}</p>
        </div>
      </div>

      <div class="d-flex align-items-center contacts-content">
        <Icon name="mdi:location" class="text-gold" />
        <div class="contacts-info" :class="$i18n.locale === 'ar' ? 'ar' : ''">
          <p>{{ locationDate }}</p>
        </div>
      </div>

      <div class="d-flex align-items-center contacts-content">
        <Icon name="mdi:earth" class="text-gold" />
        <div class="contacts-info" :class="$i18n.locale === 'ar' ? 'ar' : ''">
          <p>{{ websiteData }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const {
  public: { apiBase, api },
} = useRuntimeConfig();
const { locale } = useI18n();

const { data: ContactsDetails, pending } = await useGetSiteApi().GetAll(
  `${api.GetPagesDetail}/3`
);

let mobileData = ref();
let mobileData2 = ref();
let emailData = ref();
let locationDate = ref();
let websiteData = ref();

watchEffect(() => {
  if (process.client) {
    if (ContactsDetails.value) {
      // Create a DOMParser to parse the string as HTML
      const parser = new DOMParser();
      let doc;
      if (locale.value === "en") {
        doc = parser.parseFromString(
          ContactsDetails.value.englishDescription1,
          "text/html"
        );
      } else {
        doc = parser.parseFromString(
          ContactsDetails.value.description1,
          "text/html"
        );
      }

      // Use querySelectorAll to find all <p> elements
      const details = [...doc.querySelectorAll("p")].map((p) =>
        p.textContent.trim()
      );

      // Now we can extract the relevant details
      mobileData.value = details[3].trim();
      mobileData2.value = details[4].trim();
      emailData.value = details[6].trim();
      locationDate.value = details[2].trim();
      websiteData.value = details[5].trim();
    }
  }
});
</script>
<style lang="scss" scoped>
.contacts-info {
  // word-break: break-all;
  font-size: 16px;
  color: #fff;
  line-height: 20px;
}

.contacts {
  margin: 0px;
  @media (max-width: 991px) {
    margin: 0px;
  }
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }
}
.contacts-content {
  .iconify {
    width: 20px;
    font-size: 20px;
    margin-right: 10px;
    margin-bottom: 15px;
  }
}
.foot {
  &.ar {
    .contacts-content {
      .iconify {
        width: 20px;
        font-size: 20px;
        margin-left: 10px;
        margin-right: 0px !important;
        margin-bottom: 10px;
      }
    }
  }
}
.title {
  color: $main;
}
</style>
