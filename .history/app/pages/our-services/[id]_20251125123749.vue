<template>
  <div class="service-detail-page nav-margin-mobile" v-if="!pending && service">
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
            {{ serviceTitle }}
          </h1>
        </div>
      </div>
    </section>

    <!-- Service Content -->
    <div class="service-content">
      <div class="cont">
        <div class="service-layout">
          <!-- Main Content -->
          <div class="service-main">
            <!-- Image Gallery -->
            <section class="image-gallery" v-if="hasImages">
              <div class="main-image">
                <NuxtImg
                  v-if="service.image1"
                  :src="`${BASE_API}/${service.image1}`"
                  :alt="serviceTitle"
                  format="webp"
                  quality="80"
                  class="gallery-image"
                  loading="lazy"
                />
              </div>
              <div class="thumbnail-grid" v-if="additionalImages.length > 0">
                <button
                  v-for="(image, index) in additionalImages"
                  :key="index"
                  @click="setMainImage(image)"
                  class="thumbnail-btn"
                  :class="{ active: mainImage === image }"
                >
                  <NuxtImg
                    :src="`${BASE_API}/${image}`"
                    :alt="`${serviceTitle} - Image ${index + 2}`"
                    format="webp"
                    quality="60"
                    class="thumbnail-image"
                  />
                </button>
              </div>
            </section>

            <!-- Description Sections -->
            <section class="description-sections">
              <div
                v-if="service.description1"
                class="description-section"
                :class="{ 'has-content': service.description1 }"
              >
                <h2 v-if="descriptions.length > 1">{{ t.description }} 1</h2>
                <div
                  class="description-content html-content"
                  v-html="service.description1"
                ></div>
              </div>

              <div
                v-if="service.description2"
                class="description-section"
                :class="{ 'has-content': service.description2 }"
              >
                <h2 v-if="descriptions.length > 1">{{ t.description }} 2</h2>
                <div
                  class="description-content html-content"
                  v-html="service.description2"
                ></div>
              </div>

              <div
                v-if="service.description3"
                class="description-section"
                :class="{ 'has-content': service.description3 }"
              >
                <h2 v-if="descriptions.length > 1">{{ t.description }} 3</h2>
                <div
                  class="description-content html-content"
                  v-html="service.description3"
                ></div>
              </div>

              <div
                v-if="service.description4"
                class="description-section"
                :class="{ 'has-content': service.description4 }"
              >
                <h2 v-if="descriptions.length > 1">{{ t.description }} 4</h2>
                <div
                  class="description-content html-content"
                  v-html="service.description4"
                ></div>
              </div>
            </section>

            <!-- Attachments -->
            <section class="attachments-section" v-if="hasAttachments">
              <h3>{{ t.attachments }}</h3>
              <div class="attachments-grid">
                <a
                  v-for="attachment in service.blockAttachements"
                  :key="attachment.id"
                  :href="`${BASE_API}/${attachment.file}`"
                  target="_blank"
                  class="attachment-card"
                >
                  <Icon
                    name="material-symbols:description"
                    class="attachment-icon"
                  />
                  <div class="attachment-info">
                    <span class="attachment-name">{{
                      attachment.name || t.downloadFile
                    }}</span>
                    <span class="attachment-size">{{
                      getFileSize(attachment.file)
                    }}</span>
                  </div>
                  <Icon
                    name="heroicons:arrow-down-tray"
                    class="download-icon"
                  />
                </a>
              </div>
            </section>

            <!-- Videos -->
            <section class="videos-section" v-if="hasVideos">
              <h3>{{ t.videos }}</h3>
              <div class="videos-grid">
                <div
                  v-for="video in service.blockVideos"
                  :key="video.id"
                  class="video-card"
                >
                  <div class="video-placeholder">
                    <Icon
                      name="material-symbols:play-circle"
                      class="play-icon"
                    />
                    <p>{{ video.name || t.watchVideo }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <aside class="service-sidebar">
            <!-- Service Info Card -->
            <div class="info-card">
              <h3>{{ t.serviceDetails }}</h3>
              <div class="info-list">
                <div class="info-item" v-if="service.categoryId">
                  <Icon name="material-symbols:category" class="info-icon" />
                  <span>{{ t.category }}:</span>
                  <strong>{{ getCategoryName(service.categoryId) }}</strong>
                </div>
                <div class="info-item" v-if="service.date">
                  <Icon
                    name="material-symbols:calendar-today"
                    class="info-icon"
                  />
                  <span>{{ t.date }}:</span>
                  <strong>{{ formatDate(service.date) }}</strong>
                </div>
                <div class="info-item" v-if="service.author">
                  <Icon name="material-symbols:person" class="info-icon" />
                  <span>{{ t.author }}:</span>
                  <strong>{{ service.author }}</strong>
                </div>
              </div>
            </div>

            <!-- CTA Card -->
            <div class="cta-card">
              <h4>{{ t.interestedInService }}</h4>
              <p>{{ t.contactUsDescription }}</p>
              <button @click="goToContact" class="btn-contact">
                {{ t.contactUs }}
                <Icon
                  :name="
                    isRtl ? 'heroicons:arrow-left' : 'heroicons:arrow-right'
                  "
                />
              </button>
            </div>

            <!-- Related Services -->
            <div class="related-services" v-if="relatedServices.length > 0">
              <h4>{{ t.relatedServices }}</h4>
              <div class="related-list">
                <a
                  v-for="related in relatedServices"
                  :key="related.id"
                  :href="`/services${related.pageUrl}`"
                  class="related-item"
                >
                  <Icon
                    name="material-symbols:arrow-forward"
                    class="related-icon"
                  />
                  <span>{{ isRtl ? related.name : related.englishName }}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="loading-state">
      <div class="loading-content">
        <div class="skeleton-hero"></div>
        <div class="skeleton-layout">
          <div class="skeleton-main">
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
          </div>
          <div class="skeleton-sidebar">
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-content">
        <Icon
          name="material-symbols:error-outline"
          size="64"
          class="error-icon"
        />
        <h3>{{ t.errorTitle }}</h3>
        <p>{{ t.errorDescription }}</p>
        <button @click="goToServices" class="btn-back">
          {{ t.backToServices }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { locale } = useI18n();
const route = useRoute();

// Configuration
const BASE_API = "https://admin.nerva-online.com";

// Route parameters
const serviceId = computed(() => route.params.id);

// State
const mainImage = ref("");

// Computed
const isRtl = computed(() => locale.value === "ar");

const translations = {
  en: {
    description: "Description",
    attachments: "Attachments",
    videos: "Videos",
    serviceDetails: "Service Details",
    category: "Category",
    date: "Date",
    author: "Author",
    interestedInService: "Interested in this service?",
    contactUsDescription: "Let's discuss how we can help you",
    contactUs: "Contact Us",
    relatedServices: "Related Services",
    downloadFile: "Download File",
    watchVideo: "Watch Video",
    errorTitle: "Service Not Found",
    errorDescription:
      "The service you're looking for doesn't exist or has been removed.",
    backToServices: "Back to Services",
  },
  ar: {
    description: "الوصف",
    attachments: "المرفقات",
    videos: "الفيديوهات",
    serviceDetails: "تفاصيل الخدمة",
    category: "الفئة",
    date: "التاريخ",
    author: "المؤلف",
    interestedInService: "مهتم بهذه الخدمة؟",
    contactUsDescription: "لنتناقش حول كيفية مساعدتك",
    contactUs: "اتصل بنا",
    relatedServices: "خدمات ذات صلة",
    downloadFile: "تحميل الملف",
    watchVideo: "مشاهدة الفيديو",
    errorTitle: "الخدمة غير موجودة",
    errorDescription: "الخدمة التي تبحث عنها غير موجودة أو تم إزالتها.",
    backToServices: "العودة إلى الخدمات",
  },
};

const t = computed(() => translations[locale.value] || translations.en);

// Fetch Service Details
const {
  data: service,
  pending,
  error,
} = await useFetch(`${BASE_API}/api/blocks/${serviceId.value}`, {
  transform: (res) => res || null,
});

// Fetch Categories for related services and category names
const { data: categories } = await useFetch(`${BASE_API}/api/categories`, {
  transform: (res) => res.items || [],
});

// Fetch Related Services
const { data: relatedServices } = await useFetch(`${BASE_API}/api/blocks`, {
  query: {
    pageNumber: 0,
    pageSize: 5,
    categoryId: service.value?.categoryId,
    orderBy: "RecordOrder",
  },
  transform: (res) => {
    const items = res.items || [];
    // Filter out current service
    return items.filter((item) => item.id !== service.value?.id);
  },
});

// Computed Properties
const serviceTitle = computed(() => {
  return isRtl.value
    ? service.value?.name
    : service.value?.englishName || service.value?.name;
});

const serviceDescription = computed(() => {
  return isRtl.value
    ? service.value?.description1
    : service.value?.englishDescription1 || service.value?.description1;
});

const breadcrumbName = computed(() => {
  return isRtl.value
    ? service.value?.name
    : service.value?.englishName || service.value?.name;
});

const links = computed(() => [
  { text: locale.value === "ar" ? "الرئيسية" : "Home", to: "/" },
  { text: locale.value === "ar" ? "الخدمات" : "Services", to: "/services" },
  { text: breadcrumbName.value, to: null },
]);

const hasImages = computed(() => {
  return (
    service.value?.image1 ||
    service.value?.image2 ||
    service.value?.image3 ||
    service.value?.image4
  );
});

const additionalImages = computed(() => {
  const images = [];
  if (service.value?.image2) images.push(service.value.image2);
  if (service.value?.image3) images.push(service.value.image3);
  if (service.value?.image4) images.push(service.value.image4);
  return images;
});

const descriptions = computed(() => {
  const descs = [];
  if (service.value?.description1) descs.push(service.value.description1);
  if (service.value?.description2) descs.push(service.value.description2);
  if (service.value?.description3) descs.push(service.value.description3);
  if (service.value?.description4) descs.push(service.value.description4);
  return descs;
});

const hasAttachments = computed(() => {
  return (
    service.value?.blockAttachements &&
    service.value.blockAttachements.length > 0
  );
});

const hasVideos = computed(() => {
  return service.value?.blockVideos && service.value.blockVideos.length > 0;
});

// Methods
const setMainImage = (image) => {
  mainImage.value = image;
};

const getCategoryName = (categoryId) => {
  const category = categories.value?.find((cat) => cat.id === categoryId);
  return isRtl.value ? category?.name : category?.englishName || category?.name;
};

const getFileSize = (fileUrl) => {
  // This would typically come from the API
  return "1.2 MB"; // Placeholder
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(locale.value);
};

const goToContact = () => {
  navigateTo("/contact");
};

const goToServices = () => {
  navigateTo("/services");
};

// Initialize main image
watch(
  service,
  (newService) => {
    if (newService?.image1) {
      mainImage.value = newService.image1;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.service-detail-page {
  background: #fff;
  color: #2d2d2d;
}

// Hero Section
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
    }

    .hero-title {
      font-weight: 700;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #d4af37 0%, #f9d423 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      font-weight: 300;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
}

// Service Content
.service-content {
  padding: 60px 0;

  .cont {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.service-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  align-items: start;
}

// Main Content
.service-main {
  min-height: 400px;
}

// Image Gallery
.image-gallery {
  margin-bottom: 3rem;

  .main-image {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

    .gallery-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  .thumbnail-grid {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 1rem 0;

    .thumbnail-btn {
      flex: 0 0 100px;
      border: 2px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        border-color: $main;
      }

      &:hover {
        transform: translateY(-2px);
      }

      .thumbnail-image {
        width: 100%;
        height: 80px;
        object-fit: cover;
      }
    }
  }
}

// Description Sections
.description-sections {
  .description-section {
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 12px;
    border-left: 4px solid $main;

    &.has-content {
      h2 {
        color: #2d2d2d;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }
}

// HTML Content Styling
.html-content {
  line-height: 1.7;
  color: #4a5568;

  // Headings
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #2d2d2d;
    margin: 1.5rem 0 1rem;
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  h5 {
    font-size: 1.1rem;
  }
  h6 {
    font-size: 1rem;
  }

  // Paragraphs
  p {
    margin-bottom: 1rem;
  }

  // Lists
  ul,
  ol {
    margin: 1rem 0;
    padding-left: 2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  // Links
  a {
    color: $main;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: darken($main, 10%);
      text-decoration: underline;
    }
  }

  // Images
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
  }

  // Blockquotes
  blockquote {
    border-left: 4px solid $main;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #718096;
  }

  // Code
  code {
    background: #e2e8f0;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: "Courier New", monospace;
  }

  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }

  // Tables
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;

    th,
    td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #f7fafc;
      font-weight: 600;
    }
  }

  // Responsive iframes
  iframe {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }
}

// Attachments & Videos
.attachments-section,
.videos-section {
  margin: 3rem 0;

  h3 {
    color: #2d2d2d;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
}

.attachments-grid {
  display: grid;
  gap: 1rem;
}

.attachment-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    background: $main;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    .attachment-icon,
    .download-icon {
      color: white;
    }
  }

  .attachment-icon {
    font-size: 2rem;
    color: $main;
  }

  .attachment-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .attachment-name {
      font-weight: 600;
    }

    .attachment-size {
      font-size: 0.875rem;
      opacity: 0.7;
    }
  }

  .download-icon {
    color: #718096;
  }
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.video-card {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .video-placeholder {
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #718096;

    .play-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-weight: 500;
    }
  }
}

// Sidebar
.service-sidebar {
  position: sticky;
  top: 100px;

  .info-card,
  .cta-card,
  .related-services {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #e2e8f0;
  }

  h3,
  h4 {
    color: #2d2d2d;
    margin-bottom: 1rem;
    font-weight: 600;
  }
}

.info-list {
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    .info-icon {
      color: $main;
      font-size: 1.25rem;
    }

    span {
      color: #718096;
    }

    strong {
      color: #2d2d2d;
      margin-left: auto;
    }
  }
}

.cta-card {
  background: linear-gradient(
    135deg,
    $main 0%,
    lighten($main, 10%) 100%
  ) !important;
  color: white;
  text-align: center;

  h4,
  p {
    color: white;
  }

  .btn-contact {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: white;
    color: $main;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
    }
  }
}

.related-list {
  .related-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    color: #4a5568;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: $main;
      transform: translateX(5px);
    }

    .related-icon {
      color: $main;
      transition: transform 0.3s ease;
    }

    &:hover .related-icon {
      transform: translateX(3px);
    }
  }
}

// Loading State
.loading-state {
  padding: 2rem 0;

  .skeleton-hero {
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .skeleton-layout {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;

    .skeleton-main {
      .skeleton-image {
        height: 300px;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite 0.2s;
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      .skeleton-text {
        height: 16px;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite 0.4s;
        border-radius: 4px;
        margin-bottom: 1rem;

        &.short {
          width: 60%;
        }
      }
    }

    .skeleton-sidebar {
      .skeleton-card {
        height: 150px;
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: loading 1.5s infinite 0.6s;
        border-radius: 8px;
        margin-bottom: 1rem;
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

// Error State
.error-state {
  padding: 4rem 0;
  text-align: center;

  .error-content {
    max-width: 500px;
    margin: 0 auto;

    .error-icon {
      color: #e53e3e;
      margin-bottom: 1.5rem;
    }

    h3 {
      color: #2d2d2d;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    p {
      color: #718096;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .btn-back {
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
}

// Responsive Design
@media (max-width: 1024px) {
  .service-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .service-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 120px 0 60px;
  }

  .service-content {
    padding: 40px 0;
  }

  .image-gallery {
    .main-image .gallery-image {
      height: 250px;
    }

    .thumbnail-grid {
      .thumbnail-btn {
        flex: 0 0 80px;
      }
    }
  }

  .description-sections .description-section {
    padding: 1.5rem;
  }

  .videos-grid {
    grid-template-columns: 1fr;
  }

  .loading-state .skeleton-layout {
    grid-template-columns: 1fr;
  }
}
</style>
