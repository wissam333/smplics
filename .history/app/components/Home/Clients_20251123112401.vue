<template>
  <section class="clients-section" :dir="isRtl ? 'rtl' : 'ltr'">
    <div class="container-fluid">
      <!-- Header -->
      <div class="header-content">
        <span class="subtitle">{{ t.subtitle }}</span>
        <h2 class="title">{{ t.title }}</h2>
        <p class="description">{{ t.description }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="loading-state">
        <div class="spinner"></div>
      </div>

      <!-- Marquee Content -->
      <div v-else class="marquee-wrapper">
        <!-- Row 1: Left to Right (Clockwise logic) -->
        <div class="marquee-row">
          <div class="marquee-track scroll-left">
            <!-- We repeat the list twice to create infinite loop illusion -->
            <ClientCard
              v-for="(client, index) in doubledClients"
              :key="`row1-${client.id}-${index}`"
              :client="client"
              :is-rtl="isRtl"
            />
          </div>
        </div>

        <!-- Row 2: Right to Left (Counter-Clockwise logic) -->
        <div class="marquee-row">
          <div class="marquee-track scroll-right">
            <CardsClient
              v-for="(client, index) in doubledClients"
              :key="`row2-${client.id}-${index}`"
              :client="client"
              :is-rtl="isRtl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();

// Configuration
const BASE_API = "https://admin.nerva-online.com";

// Computed
const isRtl = computed(() => locale.value === "ar");

const translations = {
  en: {
    subtitle: "OUR PARTNERS",
    title: "TRUSTED CLIENTS",
    description:
      "We are proud to have collaborated with some of the most respected organizations. Their trust drives our innovation.",
  },
  ar: {
    subtitle: "شركاء النجاح",
    title: "عملاؤنا",
    description:
      "نحن فخورون بالتعاون مع نخبة من المؤسسات المرموقة. ثقتكم هي دافعنا الدائم للابتكار والتميز.",
  },
};

const t = computed(() => translations[locale.value] || translations.en);

// State
const clients = ref([]);
const pending = ref(true);

// Computed list that doubles the items for seamless scrolling
const doubledClients = computed(() => {
  return [...clients.value, ...clients.value];
});

// Fetch Function
const fetchClients = async () => {
  pending.value = true;
  try {
    const { data, error } = await useFetch(`${BASE_API}/api/blocks`, {
      query: {
        pageNumber: 0,
        pageSize: 20, // Fetch enough to fill screen width
        orderBy: "RecordOrder",
        categoryId: 8,
      },
    });

    if (error.value) throw error.value;

    if (data.value && data.value.items) {
      clients.value = data.value.items;
    }
  } catch (err) {
    console.error("Error fetching clients:", err);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchClients();
});
</script>

<style lang="scss" scoped>
.clients-section {
  padding: 5rem 0; // Full width padding
  background-color: #ffffff;
  font-family: "Arial", sans-serif;
  overflow: hidden; // Hide scrollbars

  .container-fluid {
    width: 100%;
  }
}

/* --- Header Styles (Matches Services Component) --- */
.header-content {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

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

/* --- Marquee Styles --- */
.marquee-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px; // Gap between the two rows
}

.marquee-row {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  // Fade effect on edges
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.marquee-track {
  display: inline-flex;
  gap: 0; // Gap is handled by margin in ClientCard
  will-change: transform;
}

/* Animations */
.scroll-left {
  animation: scrollLeft 40s linear infinite;
}

.scroll-right {
  animation: scrollRight 40s linear infinite;
}

// Pause on hover for usability
.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* RTL Adjustments for Animation Directions */
[dir="rtl"] {
  .scroll-left {
    animation-name: scrollRight; // Flip direction logic for RTL
  }
  .scroll-right {
    animation-name: scrollLeft; // Flip direction logic for RTL
  }
}

/* --- Loading Spinner --- */
.loading-state {
  display: flex;
  justify-content: center;
  padding: 2rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #f2994a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
