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
          <ElementsMarquee :pause-on-hover="true" :gap="'0'">
            <CardsClient
              v-for="client in clients"
              :key="`r1-${client.id}`"
              :client="client"
              :is-rtl="isRtl"
            />
          </ElementsMarquee>
        </div>

        <!-- Row 2: Scroll Right (Reverse Direction) -->
        <div class="marquee-row">
          <ElementsMarquee :reverse="true" :pause-on-hover="true" :gap="'0'">
            <CardsClient
              v-for="client in clients"
              :key="`r2-${client.id}`"
              :client="client"
              :is-rtl="isRtl"
            />
          </ElementsMarquee>
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
    pending.value = false;
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
  position: relative;
  overflow: hidden;
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
