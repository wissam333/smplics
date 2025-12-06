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
        <!-- Row 1: Scroll Left (Standard Direction) -->
        <div class="marquee-row">
          <div class="marquee-track scroll-left">
            <!-- Repeated 4 times to ensure seamless loop on wide screens -->
            <CardsClient
              v-for="(client, index) in quadrupledClients"
              :key="`r1-${client.id}-${index}`"
              :client="client"
              :is-rtl="isRtl"
            />
          </div>
        </div>

        <!-- Row 2: Scroll Right (Reverse Direction) -->
        <div class="marquee-row">
          <div class="marquee-track scroll-right">
            <!-- Repeated 4 times to ensure seamless loop on wide screens -->
            <ClientCard
              v-for="(client, index) in quadrupledClients"
              :key="`r2-${client.id}-${index}`"
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

// Create 4 copies of the list to ensure the track is wide enough
// for large screens (4k+) and allows for a seamless 25% shift.
const quadrupledClients = computed(() => {
  if (!clients.value.length) return [];
  return [
    ...clients.value,
    ...clients.value,
    ...clients.value,
    ...clients.value,
  ];
});

// Fetch Function
const fetchClients = async () => {
  pending.value = true;
  try {
    const { data, error } = await useFetch(`${BASE_API}/api/blocks`, {
      query: {
        pageNumber: 0,
        pageSize: 20,
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
    // Small delay to ensure DOM is ready for calculations if needed (though CSS handles it)
    setTimeout(() => {
      pending.value = false;
    }, 100);
  }
};

onMounted(() => {
  fetchClients();
});
</script>

<style lang="scss" scoped>
.clients-section {
  padding: 5rem 0;
  background-color: #ffffff;
  overflow: hidden;

  .container-fluid {
    width: 100%;
    overflow: hidden; // Ensures no scrollbars appear
  }
}

/* --- Header Styles --- */
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
  gap: 40px;
  width: 100%;
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
    black 5%,
    black 95%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
}

.marquee-track {
  display: inline-flex;
  gap: 0;
  will-change: transform;
  /* Important: The animation needs to be linear and infinite.
     We use a long duration (60s) for a smooth, slow scroll.
  */
}

/* Animation Logic for 4 duplicates:
   We shift by -25% (the width of one full set).
   Because set 1, 2, 3, 4 are identical, shifting from 0 to -25% 
   looks exactly like resetting to 0.
*/

.scroll-left {
  animation: scrollLeft 60s linear infinite;
}

.scroll-right {
  animation: scrollRight 60s linear infinite;
}

// Pause on hover
.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-25%);
  }
}

@keyframes scrollRight {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(0);
  }
}

/* RTL Support:
   In RTL mode, "Forward" is visually Right-to-Left.
   So we might need to invert logic depending on how the browser handles translateX in RTL.
   Usually, negative X moves left regardless of dir="rtl".
   So we just swap the class application or logic if we want "natural" reading direction flow.
*/
[dir="rtl"] {
  // If we want the top row to still go "forward" (visually R to L for Arabic)
  // we might want to swap the animations.
  // However, usually marquees are purely visual.
  // We keep the physics same: top goes Left, bottom goes Right.
  // Or we can flip them:
  .scroll-left {
    animation-name: scrollRight;
  }
  .scroll-right {
    animation-name: scrollLeft;
  }
}

/* --- Loading Spinner --- */
.loading-state {
  display: flex;
  justify-content: center;
  padding: 3rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
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
