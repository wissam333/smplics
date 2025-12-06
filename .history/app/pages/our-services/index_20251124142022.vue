<template>
  <div class="services-page" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="container">
            <div class="hero-text">
              <Breadcrumbs />
              <h1 class="hero-title">{{ t.heroTitle }}</h1>
              <p class="hero-description">{{ t.heroDescription }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="all-services-section">
      <div class="container">
        <!-- Filter Tabs -->
        <div class="filter-tabs" v-if="categories.length > 0">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setActiveCategory(category.id)"
            :class="['tab-button', { active: activeCategory === category.id }]"
          >
            {{ isRtl ? category.name : category.englishName }}
          </button>
        </div>

        <!-- Services Grid -->
        <div class="services-grid-container">
          <!-- Loading State -->
          <template v-if="pending">
            <div class="loading-grid">
              <div v-for="n in 12" :key="n" class="service-card-skeleton">
                <ElementsSkeletonLoader />
              </div>
            </div>
          </template>

          <!-- Empty State -->
          <template v-else-if="filteredServices.length === 0">
            <div class="empty-state">
              <Icon name="heroicons:rectangle-stack" size="64" />
              <h3>{{ t.noServices }}</h3>
              <p>{{ t.noServicesDescription }}</p>
            </div>
          </template>

          <!-- Services Grid -->
          <template v-else>
            <transition-group name="staggered-fade" tag="div" class="services-grid">
              <CardsService
                v-for="service in filteredServices"
                :key="service.id"
                :item="service"
                :is-rtl="isRtl"
                class="service-item"
              />
            </transition-group>
          </template>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore && !pending" class="load-more-section">
          <button @click="loadMore" class="btn-load-more" :disabled="loadingMore">
            <span>{{ loadingMore ? t.loading : t.loadMore }}</span>
            <Icon name="heroicons:arrow-path" size="20" :class="{ spinning: loadingMore }" />
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>{{ t.ctaTitle }}</h2>
          <p>{{ t.ctaDescription }}</p>
          <button @click="goToContact" class="btn-cta">
            {{ t.ctaButton }}
            <Icon :name="isRtl ? 'heroicons:arrow-left' : 'heroicons:arrow-right'" size="20" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Composables
const { locale } = useI18n();
const route = useRoute();

// Configuration
const BASE_API = "https://admin.nerva-online.com";
const PAGE_SIZE = 12;

// State
const activeCategory = ref(route.query.category || 2); // Default to services category
const currentPage = ref(0);
const loadingMore = ref(false);
const hasMore = ref(true);

// Computed
const isRtl = computed(() => locale.value === "ar");

const translations = {
  en: {
    heroTitle: "Our Services",
    heroDescription: "Comprehensive solutions tailored to drive your business growth and digital transformation",
    noServices: "No services found",
    noServicesDescription: "We couldn't find any services matching your criteria",
    loadMore: "Load More Services",
    loading: "Loading...",
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Let's discuss how our services can help you achieve your goals",
    ctaButton: "Get Started Today"
  },
  ar: {
    heroTitle: "خدماتنا",
    heroDescription: "حلول شاملة مصممة لدفع نمو أعمالك والتحول الرقمي",
    noServices: "لم يتم العثور على خدمات",
    noServicesDescription: "لم نتمكن من العثور على خدمات تطابق معاييرك",
    loadMore: "تحميل المزيد من الخدمات",
    loading: "جاري التحميل...",
    ctaTitle: "مستعد لتحويل عملك؟",
    ctaDescription: "لنتناقش حول كيفية مساعدة خدماتك في تحقيق أهدافك",
    ctaButton: "ابدأ اليوم"
  }
};

const t = computed(() => translations[locale.value] || translations.en);

// Fetch Categories
const { data: categories } = await useFetch(`${BASE_API}/api/categories`, {
  transform: (res) => res.items || []
});

// Fetch Services
const { data: services, pending } = await useFetch(`${BASE_API}/api/blocks`, {
  query: {
    pageNumber: currentPage.value,
    pageSize: PAGE_SIZE,
    orderBy: "RecordOrder",
    categoryId: activeCategory.value
  },
  transform: (res) => res.items || []
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
  // Update URL without page reload
  navigateTo({
    path: route.path,
    query: { category: categoryId }
  }, { replace: true });
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
        categoryId: activeCategory.value
      },
      transform: (res) => res.items || []
    });

    if (newServices.value && newServices.value.length > 0) {
      services.value = [...services.value, ...newServices.value];
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Error loading more services:', error);
  } finally {
    loadingMore.value = false;
  }
};

const goToContact = () => {
  navigateTo('/contact');
};

// Watch for category changes
watch(activeCategory, async () => {
  // Refetch services when category changes
  await refresh();
});
</script>

<style lang="scss" scoped>
.services-page {
  min-height: 100vh;
}

/* Hero Section */
.page-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/services-hero-bg.jpg');
    background-size: cover;
    background-position: center;
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(26, 32, 44, 0.9) 0%,
      rgba(45, 55, 72, 0.8) 100%
    );
  }
  
  .hero-content {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
    
    .hero-text {
      max-width: 600px;
      
      .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero-description {
        font-size: 1.25rem;
        line-height: 1.6;
        color: #e2e8f0;
        margin-bottom: 2rem;
      }
    }
  }
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 2rem 0;
  
  .tab-button {
    padding: 0.75rem 1.5rem;
    border: 2px solid #e2e8f0;
    background: transparent;
    color: #4a5568;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #f2994a;
      color: #f2994a;
    }
    
    &.active {
      background: #f2994a;
      border-color: #f2994a;
      color: white;
    }
  }
}

/* Services Grid */
.all-services-section {
  padding: 5rem 0;
  background: #f9fafb;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}

.services-grid-container {
  min-height: 400px;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
  
  h3 {
    font-size: 1.5rem;
    margin: 1rem 0 0.5rem;
    color: #4a5568;
  }
  
  p {
    font-size: 1rem;
  }
}

/* Load More Section */
.load-more-section {
  text-align: center;
  margin-top: 4rem;
  
  .btn-load-more {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: #1a202c;
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #2d3748;
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .spinning {
      animation: spin 1s linear infinite;
    }
  }
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  text-align: center;
  
  .cta-content {
    max-width: 600px;
    margin: 0 auto;
    
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.125rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: #e2e8f0;
    }
    
    .btn-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      background: #f2994a;
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: #e68940;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(242, 153, 74, 0.3);
      }
    }
  }
}

/* Animations */
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-hero .hero-content .hero-text .hero-title {
    font-size: 2.5rem;
  }
  
  .filter-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding: 1rem 0;
    
    .tab-button {
      white-space: nowrap;
    }
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section .cta-content h2 {
    font-size: 2rem;
  }
}
</style>