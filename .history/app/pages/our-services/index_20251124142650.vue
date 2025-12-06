<template>
  <div class="services-page nav-margin-mobile" v-if="!pending">
    <!-- Breadcrumb Navigation -->
    <elementsLinks :links="links" />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="cont">
        <div class="hero-content">
          <h1 class="hero-title">
            <NuxtImg
              width="60"
              height="30"
              format="webp"
              preload
              src="/logo/logo2.png"
              alt="Nerva Logo"
              class="logo-img"
            />
            {{ t.heroTitle }}
          </h1>
          <p class="hero-subtitle">
            {{ t.heroDescription }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Content -->
    <div class="services-content">
      <!-- Filter Tabs -->
      <section class="filter-section">
        <div class="cont">
          <div class="filter-tabs">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="setActiveCategory(category.id)"
              :class="[
                'tab-button',
                { active: activeCategory === category.id },
              ]"
            >
              <Icon :name="getCategoryIcon(category.id)" class="tab-icon" />
              <span>{{ isRtl ? category.name : category.englishName }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="services-grid-section">
        <div class="cont">
          <!-- Loading State -->
          <template v-if="pending">
            <div class="loading-grid">
              <div v-for="n in 8" :key="n" class="service-card-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                  <div class="skeleton-title"></div>
                  <div class="skeleton-text"></div>
                </div>
              </div>
            </div>
          </template>

          <!-- Empty State -->
          <template v-else-if="filteredServices.length === 0">
            <div class="empty-state">
              <Icon
                name="material-symbols:work-outline"
                size="80"
                class="empty-icon"
              />
              <h3>{{ t.noServices }}</h3>
              <p>{{ t.noServicesDescription }}</p>
              <button @click="resetFilters" class="btn-reset">
                {{ t.resetFilters }}
              </button>
            </div>
          </template>

          <!-- Services Grid -->
          <template v-else>
            <transition-group
              name="staggered-fade"
              tag="div"
              class="services-grid"
            >
              <CardsService
                v-for="service in filteredServices"
                :key="service.id"
                :item="service"
                :is-rtl="isRtl"
                class="service-item"
              />
            </transition-group>
          </template>

          <!-- Load More -->
          <div v-if="hasMore && !pending" class="load-more-section">
            <button
              @click="loadMore"
              class="btn-load-more"
              :disabled="loadingMore"
            >
              <span>{{ loadingMore ? t.loading : t.loadMore }}</span>
              <Icon
                :name="
                  loadingMore ? 'svg-spinners:270-ring' : 'heroicons:arrow-down'
                "
                size="20"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cont">
          <div class="cta-content">
            <div class="cta-text">
              <h2>{{ t.ctaTitle }}</h2>
              <p>{{ t.ctaDescription }}</p>
            </div>
            <div class="cta-actions">
              <button @click="goToContact" class="btn-cta-primary">
                {{ t.ctaButton }}
                <Icon
                  :name="
                    isRtl ? 'heroicons:arrow-left' : 'heroicons:arrow-right'
                  "
                  size="20"
                />
              </button>
              <button @click="goToProjects" class="btn-cta-secondary">
                {{ t.viewProjects }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Composables
const { locale } = useI18n();
const route = useRoute();

// Configuration
const BASE_API = "https://admin.nerva-online.com";
const PAGE_SIZE = 8;

// State
const activeCategory = ref(route.query.category || 2);
const currentPage = ref(0);
const loadingMore = ref(false);
const hasMore = ref(true);

// Computed
const isRtl = computed(() => locale.value === "ar");

const translations = {
  en: {
    heroTitle: "Our Services",
    heroDescription:
      "Comprehensive digital solutions to transform your business and drive growth",
    noServices: "No services found",
    noServicesDescription:
      "We couldn't find any services matching the selected category",
    resetFilters: "Show All Services",
    loadMore: "Load More Services",
    loading: "Loading...",
    ctaTitle: "Ready to Start Your Project?",
    ctaDescription:
      "Let's discuss how our expertise can help you achieve your business goals",
    ctaButton: "Get Started",
    viewProjects: "View Our Work",
  },
  ar: {
    heroTitle: "خدماتنا",
    heroDescription: "حلول رقمية شاملة لتحويل عملك ودفع النمو",
    noServices: "لم يتم العثور على خدمات",
    noServicesDescription: "لم نتمكن من العثور على خدمات تطابق الفئة المحددة",
    resetFilters: "عرض جميع الخدمات",
    loadMore: "تحميل المزيد من الخدمات",
    loading: "جاري التحميل...",
    ctaTitle: "مستعد لبدء مشروعك؟",
    ctaDescription: "لنتناقش حول كيفية مساعدة خبراتنا في تحقيق أهداف عملك",
    ctaButton: "ابدأ الآن",
    viewProjects: "شاهد أعمالنا",
  },
};

const t = computed(() => translations[locale.value] || translations.en);

// Breadcrumbs
const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  { text: locale.value === "ar" ? "الخدمات" : "Services", to: null },
]);

// Category Icons
const categoryIcons = {
  2: "material-symbols:design-services", // Design
  3: "material-symbols:code", // Development
  4: "material-symbols:campaign", // Marketing
  5: "material-symbols:shopping-cart", // E-commerce
  6: "material-symbols:trending-up", // Strategy
};

const getCategoryIcon = (categoryId) => {
  return categoryIcons[categoryId] || "material-symbols:work";
};

// Fetch Categories
const { data: categories } = await useFetch(`${BASE_API}/api/categories`, {
  transform: (res) => res.items || [],
});

// Fetch Services
const {
  data: services,
  pending,
  refresh,
} = await useFetch(`${BASE_API}/api/blocks`, {
  query: {
    pageNumber: currentPage.value,
    pageSize: PAGE_SIZE,
    orderBy: "RecordOrder",
    categoryId: activeCategory.value,
  },
  transform: (res) => res.items || [],
});

// Computed
const filteredServices = computed(() => {
  return services.value || [];
});

// Methods
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId;
  currentPage.value = 0;
  hasMore.value = true;

  navigateTo(
    {
      path: route.path,
      query: { category: categoryId },
    },
    { replace: true }
  );
};

const resetFilters = () => {
  setActiveCategory(2); // Default services category
};

const loadMore = async () => {
  loadingMore.value = true;
  currentPage.value += 1;

  try {
    const { data: newServices } = await useFetch(`${BASE_API}/api/blocks`, {
      query: {
        pageNumber: currentPage.value,
        pageSize: PAGE_SIZE,
        orderBy: "RecordOrder",
        categoryId: activeCategory.value,
      },
      transform: (res) => res.items || [],
    });

    if (newServices.value && newServices.value.length > 0) {
      services.value = [...services.value, ...newServices.value];
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error("Error loading more services:", error);
  } finally {
    loadingMore.value = false;
  }
};

const goToContact = () => {
  navigateTo("/contact");
};

const goToProjects = () => {
  navigateTo("/projects");
};

// Watch for category changes
watch(activeCategory, async () => {
  await refresh();
});
</script>

<style lang="scss" scoped>
.services-page {
  background: #fff;
  color: #2d2d2d;
}

// Hero Section - Matching your theme
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

    .logo-img {
      filter: brightness(0) invert(1);
      opacity: 0.9;
      margin-bottom: 20px;
    }

    .hero-title {
      font-weight: 700;
      background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .hero-subtitle {
      opacity: 0.9;
      font-weight: 300;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
}

// Filter Section
.filter-section {
  padding: 60px 0 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);

  .filter-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

    .tab-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border: 2px solid #e2e8f0;
      background: transparent;
      color: #4a5568;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      .tab-icon {
        transition: transform 0.3s ease;
      }

      &:hover {
        border-color: $main;
        color: $main;
        transform: translateY(-2px);

        .tab-icon {
          transform: scale(1.1);
        }
      }

      &.active {
        background: $main;
        border-color: $main;
        color: white;

        .tab-icon {
          transform: scale(1.1);
        }
      }
    }
  }
}

// Services Grid Section
.services-grid-section {
  padding: 60px 0;

  .cont {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

// Loading Grid
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  .service-card-skeleton {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    .skeleton-image {
      height: 200px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-content {
      padding: 1.5rem;

      .skeleton-title {
        height: 20px;
        background: #f0f0f0;
        border-radius: 4px;
        margin-bottom: 1rem;
        animation: loading 1.5s infinite 0.2s;
      }

      .skeleton-text {
        height: 16px;
        background: #f0f0f0;
        border-radius: 4px;
        animation: loading 1.5s infinite 0.4s;
      }
    }
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// Services Grid
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

// Empty State
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;

  .empty-icon {
    color: #cbd5e0;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem;
    color: #4a5568;
  }

  p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .btn-reset {
    padding: 0.75rem 1.5rem;
    background: $main;
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken($main, 10%);
      transform: translateY(-2px);
    }
  }
}

// Load More Section
.load-more-section {
  text-align: center;
  margin-top: 4rem;

  .btn-load-more {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: $main;
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: darken($main, 10%);
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

// CTA Section
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;

  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;

    .cta-text {
      margin-bottom: 3rem;

      h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        font-size: 1.125rem;
        line-height: 1.6;
        color: #e2e8f0;
      }
    }

    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;

      .btn-cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2.5rem;
        background: $main;
        color: white;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1.125rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: darken($main, 10%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }
      }

      .btn-cta-secondary {
        padding: 1rem 2rem;
        background: transparent;
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border-color: $main;
          color: $main;
          transform: translateY(-2px);
        }
      }
    }
  }
}

// Animations
.staggered-fade-move {
  transition: transform 0.5s ease;
}

.staggered-fade-enter-active {
  transition: all 0.5s ease;
}

.staggered-fade-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.staggered-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

// Responsive Design
@media (max-width: 768px) {
  .hero-section {
    padding: 120px 0 60px;

    .hero-content .hero-title {
      flex-direction: column;
      gap: 10px;
    }
  }

  .filter-section {
    padding: 40px 0 20px;

    .filter-tabs {
      justify-content: flex-start;
      overflow-x: auto;
      padding: 1rem 0;

      .tab-button {
        white-space: nowrap;
      }
    }
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 60px 0;

    .cta-content .cta-text h2 {
      font-size: 2rem;
    }

    .cta-actions {
      flex-direction: column;
      align-items: center;

      .btn-cta-primary,
      .btn-cta-secondary {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }
    }
  }
}
</style>
