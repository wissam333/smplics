<template>
  <section class="services-section" :dir="isRtl ? 'rtl' : 'ltr'">
    <div class="container">
      <!-- Header -->
      <div class="header-content">
        <span class="subtitle">{{ t.subtitle }}</span>
        <h2 class="title">{{ t.title }}</h2>
        <p class="description">{{ t.description }}</p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <!-- A. Loading State (Show 6 Skeleton Cards) -->
        <template v-if="pending">
          <div v-for="n in 6" :key="n" class="service-card-skeleton">
            <ElementsSkeletonLoader />
          </div>
        </template>

        <!-- B. Data Loaded State -->
        <template v-else>
          <CardsService
            v-for="item in services"
            :key="item.id"
            :item="item"
            :is-rtl="isRtl"
          />
        </template>
      </div>

      <!-- Navigation Action -->
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
const PREVIEW_SIZE = 6;

// Computed
const isRtl = computed(() => locale.value === "ar");

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
const pending = ref(true);

// Actions
const goToAllServices = () => {
  navigateTo("/services");
};

// Fetch Function
const fetchServices = async () => {
  pending.value = true;
  try {
    const { data, error } = await $fetch(`${BASE_API}/api/blocks`, {
      query: {
        pageNumber: 0,
        pageSize: PREVIEW_SIZE,
        orderBy: "RecordOrder",
        categoryId: 2,
      },
    });

    if (error) throw error;

    if (data && data.items) {
      services.value = data.items;
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  } finally {
    // Small timeout to prevent flicker if API is too fast,
    // and to let the skeleton animation play at least once
    setTimeout(() => {
      pending.value = false;
    }, 300);
  }
};

onMounted(() => {
  fetchServices();
});
</script>

<style lang="scss" scoped>
.services-section {
  padding: 5rem 1rem;
  background-color: #f9fafb;
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
    color: #f2994a;
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
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  // Skeleton Box Style matches ServiceCard dimensions
  .service-card-skeleton {
    aspect-ratio: 4/3;
    border-radius: 12px;
    overflow: hidden;
    background: #e5e7eb;
  }
}

/* --- Footer --- */
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
    border-radius: 50px;

    &:hover {
      background: #1a202c;
      color: #fff;
      padding-right: 40px;
      padding-left: 24px;
    }

    [dir="rtl"] &:hover {
      padding-right: 24px;
      padding-left: 40px;
    }
  }
}
</style>
