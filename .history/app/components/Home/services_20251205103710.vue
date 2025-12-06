<template>
  <section
    class="services-section relative overflow-hidden"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <div class="bg-glow top-glow"></div>
    <div class="bg-glow bottom-glow"></div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="text-center mb-16 max-w-4xl mx-auto">
        <span class="label fade-in" style="--delay: 0.1s">
          {{ $t("our_services", "Our Services") }}
        </span>

        <h2 class="section-title fade-in" style="--delay: 0.2s">
          {{
            $t(
              "services_title",
              "Digital solutions that move your business forward"
            )
          }}
          <Icon name="ph:sparkle-fill" class="accent-sparkle" />
        </h2>

        <p class="description-text fade-in" style="--delay: 0.3s">
          {{
            $t(
              "services_desc",
              "We Provide End-to-end Digital Services That Help Businesses Thrive In An Ever-evolving Digital World. Our Solutions Combine Design, Development, And Strategy To Deliver Results That Matter."
            )
          }}
        </p>
      </div>

      <div class="tabs-container fade-in" style="--delay: 0.4s">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
        >
          <span>
            {{ tab.label }}
          </span>
        </button>
      </div>

      <div class="services-grid">
        <div
          v-for="(service, index) in filteredServices"
          :key="service.id"
          class="service-card fade-in"
          :style="{ '--delay': `${0.5 + index * 0.1}s` }"
        >
          <div class="card-bg-reveal">
            <img :src="service.bgImage" alt="" class="bg-img" />
            <div class="bg-overlay"></div>
          </div>

          <div class="card-content relative z-10">
            <div class="icon-wrapper">
              <div class="icon-circle">
                <img
                  :src="service.icon"
                  :alt="service.title"
                  class="service-icon"
                />
              </div>
            </div>

            <h3 class="service-title">{{ service.title }}</h3>

            <p class="service-desc">{{ service.description }}</p>

            <div class="offer-section">
              <span class="offer-label">{{
                $t("what_we_offer", "What we offer:")
              }}</span>
              <ul class="offer-list">
                <li v-for="(item, i) in service.offers" :key="i">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Assuming you have i18n setup similar to reference
const { t } = useI18n();
const isDark = useIsDark(); // Using your composable

const activeTab = ref("all");

const tabs = [
  { id: "design", label: "Design" },
  { id: "all", label: "All Services" },
  { id: "dev", label: "Development" },
];

// Mock Data - Replace image paths with your assets
const services = [
  {
    id: 1,
    category: "design",
    title: "UI/UX Design",
    description:
      "We craft user journeys that are smooth, clear, and built for conversion.",
    offers: ["User Research", "Wireframing", "Prototyping", "UI Design"],
    // Placeholders
    icon: "/icon-3.webp",
    bgImage: "/bg-m.svg",
  },
  {
    id: 2,
    category: "design",
    title: "Brand Identity",
    description:
      "A brand that speaks before you do. We create cohesive brand systems that leave a lasting impression.",
    offers: [
      "Logo Design",
      "Brand Guidelines",
      "Brand Strategy",
      "Digital Graphics",
    ],
    icon: "/icon-3.webp",
    bgImage: "/bg-m.svg",
  },
  {
    id: 3,
    category: "design", // Added to design for demo, usually Graphic Design is design
    title: "Graphic Design",
    description:
      "Visual communication that captures attention and conveys your message effectively.",
    offers: [
      "Print Materials",
      "Digital Graphics",
      "Brand Collateral",
      "Logo Design",
    ],
    icon: "/icon-3.webp",
    bgImage: "/bg-m.svg",
  },
];

const filteredServices = computed(() => {
  if (activeTab.value === "all") return services;
  // Simple filter logic
  return services.filter(
    (s) => s.category === activeTab.value || activeTab.value === "all"
  );
});
</script>

<style lang="scss" scoped>
/* --- Use specific vars from your prompt --- */
/* Note: We use CSS variables (var(--name)) so they react to the global theme switching automatically */

.services-section {
  position: relative;
  padding: 120px 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;

  /* Typography matches reference */
  .label {
    display: block;
    color: var(--accent-color);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    .accent-sparkle {
      color: var(--accent-color);
      font-size: 0.6em;
      vertical-align: top;
    }
  }

  .description-text {
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.8;
    max-width: 700px;
    margin: 0 auto;
  }
}

/* --- Tabs --- */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.8rem 2.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  color: var(--text-color);
  font-size: 16px;
  z-index: 1;

  /* Active State */
  &.active {
    background-color: var(--card-bg); /* Or specific active color */
    border-color: var(--accent-color);
    box-shadow: 0 0 15px rgba(238, 118, 57, 0.2);
  }

  /* Inactive State with Background Image */
  &:not(.active) {
    // opacity: 0.7;
    /* Simulate the "bg image on non active buttons" */
    /* Replace url with your actual texture image */
    background-color: transparent;
    background-image: url("/card-3.svg");
    background-size: cover;
    background-position: 100% 100%;
    border: 1px solid var(--border-color);

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
    }
  }
}

/* --- Grid --- */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

/* --- Card Styles --- */
.service-card {
  position: relative;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: center;

  /* --- The Hover Effect Logic --- */
  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color);

    /* Inset Box Shadow as requested */
    box-shadow: inset 0 0 30px rgba(238, 118, 57, 0.15),
      0 10px 30px -10px rgba(0, 0, 0, 0.5);

    /* Show Hidden BG */
    .card-bg-reveal {
      opacity: 1;
    }

    /* Glow up the icon border */
    .icon-circle {
      border-color: var(--accent-color);
      box-shadow: 0 0 15px rgba(238, 118, 57, 0.3);
    }
  }
}

/* Hidden Background inside Card */
.card-bg-reveal {
  position: absolute;
  inset: 0;
  opacity: 0; /* Hidden by default */
  transition: opacity 0.4s ease;
  z-index: 0;
  pointer-events: none;

  .bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Adds a dark wash over the image so text stays readable */
  .bg-overlay {
    position: absolute;
    inset: 0;
  }
}

/* Icon Area */
.icon-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  .service-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
}

/* Text Content */
.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.service-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 2rem;
  max-width: 90%;
}

.offer-section {
  margin-top: auto; /* Pushes to bottom if card heights vary */
  width: 100%;
}

.offer-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.8rem;
  text-align: center;
}

.offer-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 0.85rem;
    padding: 0.3rem 0;
    color: var(--text-color);
    opacity: 0.9;
    font-weight: 500;
  }
}

/* --- Animations (Same as Ref) --- */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s cubic-bezier(0.5, 0, 0, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(#ee7639, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.top-glow {
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-glow {
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
