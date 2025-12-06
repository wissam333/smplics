<template>
  <section class="services-section">
    <div class="container">
      <div class="header-content">
        <span class="subtitle">WHAT WE DO !</span>
        <h2 class="title">OUR SERVICE</h2>
        <p class="description">
          Our in-house staff has hands-on experience in design, art, media
          planning and buying, web development, e-commerce, advertising and
          marketing and communication solutions. Nerva offers full-service
          solutions for big and small projects alike.
        </p>
      </div>

      <div class="filter-bar">
        <div class="custom-select">
          <span>ALL</span>
          <i class="arrow-down"></i>
        </div>
      </div>

      <div class="services-grid">
        <div v-for="item in services" :key="item.id" class="service-card">
          <NuxtLink :to="`/services/${item.id}`" class="card-link">
            <div class="image-wrapper">
              <img
                :src="getImageUrl(item.image1)"
                :alt="item.englishName"
                loading="lazy"
              />
              <div class="overlay"></div>
            </div>

            <div class="card-content">
              <h3>{{ item.englishName }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="footer-action" v-if="hasMore">
        <button @click="loadMore" :disabled="pending" class="btn-load-more">
          <span v-if="!pending">LOAD MORE</span>
          <span v-else class="loader">Loading...</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Configuration
const BASE_API = "https://admin.nerva-online.com";
const PAGE_SIZE = 6; // Set to 6 or 9 to match grid layout

// State
const services = ref([]);
const pageNumber = ref(0);
const hasMore = ref(true);
const pending = ref(false);

// Helper: Fix image URL path
const getImageUrl = (path) => {
  if (!path) return "/placeholder-image.png"; // Fallback
  // Ensure path doesn't start with slash if we append
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${BASE_API}/${cleanPath}`;
};

// Fetch Function
const fetchServices = async () => {
  pending.value = true;

  try {
    const { data, error } = await useFetch(`${BASE_API}/api/blocks`, {
      query: {
        pageNumber: pageNumber.value,
        pageSize: PAGE_SIZE,
        orderBy: "RecordOrder",
        categoryId: 2,
      },
    });

    if (error.value) throw error.value;

    if (data.value && data.value.items) {
      const newItems = data.value.items;

      // Append new items to existing list
      services.value.push(...newItems);

      // Check if we reached the end (if returned items < page size, no more data)
      if (newItems.length < PAGE_SIZE) {
        hasMore.value = false;
      }
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  } finally {
    pending.value = false;
  }
};

// Load More Action
const loadMore = () => {
  pageNumber.value++;
  fetchServices();
};

// Initial Load
onMounted(() => {
  fetchServices();
});
</script>

<style lang="scss" scoped>
.services-section {
  padding: 5rem 1rem;
  background-color: #ffffff;
  font-family: "Arial", sans-serif; // Or your theme font

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* --- Header Styles --- */
.header-content {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  .subtitle {
    display: block;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #666;
    margin-bottom: 0.5rem;
    position: relative;

    // The small line above "WHAT WE DO"
    &::before {
      content: "";
      display: block;
      width: 1px;
      height: 20px;
      background: #ccc;
      margin: 0 auto 10px;
    }
  }

  .title {
    font-size: 2.5rem;
    font-weight: 400; // Look appears thin/regular in design
    color: #111;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .description {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #555;
    text-align: center;
  }
}

/* --- Filter Styles --- */
.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .custom-select {
    background: #222;
    color: #fff;
    padding: 10px 20px;
    font-size: 0.8rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    min-width: 150px;
    justify-content: space-between;

    .arrow-down {
      border: solid white;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(45deg);
      margin-bottom: 2px;
    }
  }
}

/* --- Grid Styles --- */
.services-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px; // Small gap between images as per design

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .service-card {
    position: relative;
    aspect-ratio: 4/3; // Maintains rectangle shape
    overflow: hidden;
    background: #000;
    cursor: pointer;

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
        // The Grayscale Effect
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
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8) 0%,
          transparent 50%
        );
        opacity: 0.6;
        transition: opacity 0.3s ease;
      }
    }

    .card-content {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
      z-index: 2;
      padding: 0 15px;

      h3 {
        color: #fff;
        font-size: 1.1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
    }

    // Hover Effects
    &:hover {
      .image-wrapper img {
        filter: grayscale(0%); // Restore color
        transform: scale(1.1); // Zoom in
      }

      .image-wrapper .overlay {
        opacity: 0.3; // Lighten overlay on hover
      }
    }
  }
}

/* --- Footer / Load More --- */
.footer-action {
  text-align: center;
  margin-top: 4rem;

  .btn-load-more {
    background: transparent;
    border: 1px solid #333;
    color: #333;
    padding: 12px 30px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
      background: #333;
      color: #fff;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
