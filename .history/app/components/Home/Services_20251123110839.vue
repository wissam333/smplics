<template>
  <section class="services-section" :dir="isRtl ? 'rtl' : 'ltr'">
    <div class="container">
      <div class="header-content">
        <span class="subtitle">{{ t.subtitle }}</span>
        <h2 class="title">{{ t.title }}</h2>
        <p class="description">{{ t.description }}</p>
      </div>

      <div class="services-grid">
        <div v-for="item in services" :key="item.id" class="service-card">
          <NuxtLink :to="`/services/${item.id}`" class="card-link">
            <div class="image-wrapper">
              <img
                :src="getImageUrl(item.image1)"
                :alt="isRtl ? item.name : item.englishName"
                loading="lazy"
              />
              <div class="overlay"></div>
            </div>

            <div class="card-content">
              <h3>{{ isRtl ? item.name : item.englishName }}</h3>
              <div class="icon-indicator">
                <Icon
                  :name="
                    isRtl ? 'heroicons:arrow-left' : 'heroicons:arrow-right'
                  "
                  class="action-icon"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="footer-action">
        <button @click="goToAllServices" class="btn-view-all">
          <span>{{ t.buttonText }}</span>
          <Icon
            :name="
              isRtl ? 'heroicons:arrow-long-left' : 'heroicons:arrow-long-right'
            "
            size="20"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();

// Configuration
const BASE_API = "https://admin.nerva-online.com";
const PREVIEW_SIZE = 6; // We only show 6 items on this specific component

// Computed Properties
const isRtl = computed(() => locale.value === "ar");

// Simple Internal Translation Map
// (Ideally, move these to your i18n locales files)
const translations = {
  en: {
    subtitle: "WHAT WE DO!",
    title: "OUR SERVICE",
    description:
      "Our in-house staff has hands-on experience in design, art, media planning and buying, web development, e-commerce, advertising and marketing and communication solutions. Nerva offers full-service solutions for big and small projects alike.",
    buttonText: "VIEW ALL SERVICES",
  },
  ar: {
    subtitle: "ماذا نقدم!",
    title: "خدماتنا",
    description:
      "يمتلك فريقنا الداخلي خبرة عملية في التصميم والفنون وتخطيط وسائل الإعلام والشراء وتطوير الويب والتجارة الإلكترونية وحلول الإعلان والتسويق والاتصالات. تقدم نيرفا حلولاً متكاملة للمشاريع الكبيرة والصغيرة على حد سواء.",
    buttonText: "عرض جميع الخدمات",
  },
};

const t = computed(() => translations[locale.value] || translations.en);

// State
const services = ref([]);
const pending = ref(false);

// Helper: Fix image URL path
const getImageUrl = (path) => {
  if (!path) return "/placeholder-image.png";
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${BASE_API}/${cleanPath}`;
};

// Actions
const goToAllServices = () => {
  navigateTo("/services");
};

// Fetch Function (Only fetches the first page)
const fetchServices = async () => {
  pending.value = true;
  try {
    const { data, error } = await useFetch(`${BASE_API}/api/blocks`, {
      query: {
        pageNumber: 0,
        pageSize: PREVIEW_SIZE,
        orderBy: "RecordOrder",
        categoryId: 2,
      },
    });

    if (error.value) throw error.value;

    if (data.value && data.value.items) {
      services.value = data.value.items;
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<style lang="scss" scoped>
.services-section {
  padding: 5rem 1rem;
  background-color: #f9fafb; // Slightly off-white for better contrast
  font-family: "Arial", sans-serif;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* --- Header Styles --- */
.header-content {
  text-align: center;
  margin-bottom: 3.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  .subtitle {
    display: block;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #f2994a; // Using the Orange accent from logo
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 2px;
      height: 25px;
      background: #f2994a;
      margin: 0 auto 10px;
    }
  }

  .title {
    font-size: 2.75rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: -1px;
  }

  .description {
    font-size: 1rem;
    line-height: 1.8;
    color: #4a5568;
  }
}

/* --- Grid Styles --- */
.services-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px; // Increased gap for better breathing room

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .service-card {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
    background: #000;
    border-radius: 12px; // Modern rounded corners
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    .card-link {
      display: block;
      width: 100%;
      height: 100%;
    }

    .image-wrapper {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(100%);
        transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
          filter 0.6s ease;
      }

      .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // Stronger gradient at bottom for text readability
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.9) 0%,
          rgba(0, 0, 0, 0.4) 40%,
          transparent 100%
        );
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }
    }

    .card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      z-index: 2;

      h3 {
        color: #fff;
        font-size: 1.25rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
        text-align: start; // Align text based on direction
        max-width: 85%;
      }

      .icon-indicator {
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
        color: #f2994a;
      }
    }

    // Hover Effects
    &:hover {
      transform: translateY(-5px); // Lift effect
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);

      .image-wrapper img {
        filter: grayscale(0%);
        transform: scale(1.05);
      }

      .card-content .icon-indicator {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

/* --- Footer / Navigation Action --- */
.footer-action {
  text-align: center;
  margin-top: 4rem;

  .btn-view-all {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    border: 2px solid #1a202c;
    color: #1a202c;
    padding: 14px 32px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-radius: 50px; // Pill shape button

    &:hover {
      background: #1a202c;
      color: #fff;
      padding-right: 40px; // Subtle animation
      padding-left: 24px;
    }

    // Reverse hover padding for RTL
    [dir="rtl"] &:hover {
      padding-right: 24px;
      padding-left: 40px;
    }
  }
}
</style>
