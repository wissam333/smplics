<template>
  <section
    class="faq-section relative overflow-hidden"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="text-center mb-16 max-w-4xl mx-auto">
        <h2 class="section-title fade-in" style="--delay: 0.1s">
          {{ $t("faq_title", "Frequently Asked Questions") }}
        </h2>
      </div>

      <div class="faq-grid">
        <div
          v-for="(item, index) in faqItems"
          :key="item.id"
          class="faq-item fade-in"
          :style="{ '--delay': `${0.2 + index * 0.1}s` }"
        >
          <div
            class="faq-header"
            @click="toggleFaq(item.id)"
            :class="{ active: activeFaqId === item.id }"
          >
            <h3 class="faq-question">{{ item.question }}</h3>
            <Icon
              :name="
                activeFaqId === item.id
                  ? 'ph:caret-up-bold'
                  : 'ph:caret-down-bold'
              "
              class="toggle-icon"
            />
          </div>

          <div
            class="faq-body"
            :class="{ open: activeFaqId === item.id }"
            :style="{
              maxHeight: activeFaqId === item.id ? `${item.height}px` : '0',
            }"
            ref="faqContentRefs"
          >
            <p class="faq-answer">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const { t } = useI18n();
const isDark = useIsDark();

// Mock Data - Based on your screenshot
const faqItems = ref([
  {
    id: 1,
    question: t("faq_q1", "How quickly do you respond to inquiries?"),
    answer: t(
      "faq_a1",
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line."
    ),
    height: 0, // Calculated dynamically
    isOpen: true, // Set to open by default
  },
  {
    id: 2,
    question: t("faq_q2", "Do you offer free consultations?"),
    answer: t(
      "faq_a2",
      "Yes, we offer an initial free 30-minute consultation to understand your project scope and digital needs. This helps us provide a tailored proposal."
    ),
    height: 0,
    isOpen: false,
  },
  {
    id: 3,
    question: t("faq_q3", "What industries do you specialize in?"),
    answer: t(
      "faq_a3",
      "While we are sector-agnostic, we have extensive experience in FinTech, E-commerce, SaaS, and B2B professional services. Our core strength is building powerful, scalable platforms regardless of the industry."
    ),
    height: 0,
    isOpen: false,
  },
  {
    id: 4,
    question: t("faq_q4", "Can I visit your office for a meeting?"),
    answer: t(
      "faq_a4",
      "We primarily operate remotely to maintain flexibility and competitive pricing, but we are happy to schedule in-person meetings for kick-offs and strategy sessions upon request."
    ),
    height: 0,
    isOpen: false,
  },
]);

// State management for the open FAQ item
const activeFaqId = ref(1); // Set the first item (id: 1) to be open by default
const faqContentRefs = ref([]);

const calculateHeights = () => {
  if (!faqContentRefs.value.length) return;

  faqItems.value.forEach((item, index) => {
    // Check if the ref exists for the item
    const contentElement = faqContentRefs.value.find((el) =>
      el &&
      el.parentElement
        .querySelector(".faq-header")
        .classList.contains("active") &&
      el.classList.contains("open")
        ? el
        : el
    );

    if (contentElement) {
      // We set the height to the scroll height of the inner content element
      // We use the inner <p> element's height + margin for safer calculation
      const innerP = contentElement.querySelector(".faq-answer");
      if (innerP) {
        // 40px for padding/margin within the body container
        item.height = innerP.scrollHeight + 40;
      }
    }
  });
};

const toggleFaq = (id) => {
  // If the clicked item is already open, close it. Otherwise, open the new one.
  activeFaqId.value = activeFaqId.value === id ? null : id;

  // Recalculate heights on toggle to ensure smooth transition
  nextTick(() => {
    calculateHeights();
  });
};

onMounted(() => {
  // Wait for the DOM to render the content fully before calculating height
  nextTick(() => {
    calculateHeights();
  });
});
</script>

<style lang="scss" scoped>
/* --- Use provided CSS variables for theming --- */
.faq-section {
  padding: 120px 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease;

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 2rem;
    line-height: 1.2;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
}

/* --- FAQ Grid (Max width to center the accordion) --- */
.faq-grid {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  /* Use very dark background for the card body in dark mode */
  [data-theme="dark"] & {
    background-color: #0d0d0d;
    box-shadow: var(--shadow); /* Using the global shadow var */

    &:hover {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
    }
  }

  /* Use light background for the card body in light mode */
  [data-theme="light"] & {
    background-color: #f7f7f7;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
}

/* --- FAQ Header (The button/trigger) --- */
.faq-header {
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease, color 0.3s ease;

  /* Separator for inactive/closed items */
  &:not(.active) {
    border-bottom: 1px solid rgba(148, 161, 178, 0.1); /* Use border-color or a lightened version */
  }

  /* Active state styling */
  &.active {
    color: var(--accent-color);
    border-bottom: 1px solid var(--accent-color);

    .faq-question {
      font-weight: 700;
    }
  }

  .faq-question {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
    transition: color 0.3s ease;
    flex-grow: 1;
    text-align: left;

    /* Revert color to text-color when not active */
    &:not(.active) {
      color: var(--text-color);
    }
  }

  .toggle-icon {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
    margin-left: 1rem;
    color: var(--text-color);

    .faq-header.active & {
      color: var(--accent-color);
    }
  }
}

/* --- FAQ Body (The content/answer) --- */
.faq-body {
  max-height: 0; /* Default closed state */
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.5, 0, 0.1, 1);
  background-color: transparent;

  &.open {
    padding-bottom: 2rem;
  }

  .faq-answer {
    padding: 0 1.5rem;
    font-size: 0.95rem;
    line-height: 1.7;
    margin-top: 1rem;
    margin-bottom: 0;
    color: var(--text-color);
    opacity: 0.8;
    text-align: left;
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
</style>
