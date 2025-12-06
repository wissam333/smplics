<template>
  <section
    class="faq-section relative overflow-hidden py-5"
    :class="{ 'dark-mode': isDark, 'light-mode': !isDark }"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="floating-blob blob-1"></div>
      <div class="floating-blob blob-2"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="container mx-auto px-4 md:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <div
          class="inline-flex items-center mb-6 fade-in"
          style="--delay: 0.1s"
        >
          <div class="w-8 h-0.5 bg-accent mr-4"></div>
          <span class="accent-badge">
            {{ $t("faq_subtitle", "Need Help? We've Got Answers") }}
          </span>
          <div class="w-8 h-0.5 bg-accent ml-4"></div>
        </div>

        <h2 class="section-title fade-in" style="--delay: 0.2s">
          {{ $t("faq_title", "Frequently Asked Questions") }}
        </h2>

        <p class="section-subtitle fade-in" style="--delay: 0.3s">
          {{
            $t(
              "faq_description",
              "Find quick answers to common questions about our services and processes"
            )
          }}
        </p>
      </div>

      <!-- FAQ Container -->
      <div class="faq-container fade-in" style="--delay: 0.4s">
        <!-- FAQ Categories (Optional) -->
        <div class="faq-categories" v-if="showCategories">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'category-btn',
              { active: activeCategory === category.id },
            ]"
          >
            <Icon :name="category.icon" class="mr-2" />
            {{ category.name }}
          </button>
        </div>

        <!-- FAQ Items -->
        <div class="faq-items">
          <div
            v-for="(item, index) in filteredFaqItems"
            :key="item.id"
            class="faq-item-wrapper"
            :style="{ '--index': index }"
          >
            <!-- Decorative element -->
            <div class="faq-decorative"></div>

            <!-- Main FAQ Item -->
            <div
              class="faq-item"
              :class="{ active: activeFaqId === item.id }"
              @mouseenter="hoveredFaq = item.id"
              @mouseleave="hoveredFaq = null"
            >
              <!-- Question Header -->
              <div class="faq-header" @click="toggleFaq(item.id)">
                <div class="faq-question-content">
                  <!-- Number indicator -->
                  <div class="faq-number">
                    {{ String(index + 1).padStart(2, "0") }}
                  </div>

                  <!-- Question text -->
                  <div class="faq-text-content">
                    <h3 class="faq-question">{{ item.question }}</h3>
                    <div class="faq-preview" v-if="!item.isOpen">
                      {{ truncateText(item.answer, 60) }}
                    </div>
                  </div>
                </div>

                <!-- Toggle button -->
                <button
                  class="faq-toggle"
                  :class="{ open: activeFaqId === item.id }"
                  @click.stop="toggleFaq(item.id)"
                >
                  <div class="toggle-line toggle-line-1"></div>
                  <div class="toggle-line toggle-line-2"></div>
                </button>
              </div>

              <!-- Answer Content -->
              <div
                class="faq-content-wrapper"
                :class="{ open: activeFaqId === item.id }"
                ref="faqContentRefs"
              >
                <div class="faq-content">
                  <!-- Answer text -->
                  <div class="faq-answer">
                    <p>{{ item.answer }}</p>

                    <!-- Additional info if present -->
                    <div v-if="item.additionalInfo" class="additional-info">
                      <div class="info-header">
                        <Icon name="ph:info-bold" />
                        <span>Additional Information</span>
                      </div>
                      <div class="info-content">
                        {{ item.additionalInfo }}
                      </div>
                    </div>
                  </div>

                  <!-- Related actions -->
                  <div class="faq-actions" v-if="item.actions">
                    <button
                      v-for="action in item.actions"
                      :key="action.label"
                      class="action-btn"
                      @click="handleAction(action)"
                    >
                      <Icon :name="action.icon" />
                      <span>{{ action.label }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";

const { t } = useI18n();
const isDark = useIsDark();

// Emit events for parent components
const emit = defineEmits(["contact"]);

// State
const activeFaqId = ref(1);
const hoveredFaq = ref(null);
const activeCategory = ref("all");
const showCategories = ref(true);

// FAQ Categories
const categories = ref([
  { id: "all", name: "All Questions", icon: "ph:grid-four" },
  { id: "general", name: "General", icon: "ph:info" },
  { id: "services", name: "Services", icon: "ph:briefcase" },
  { id: "pricing", name: "Pricing", icon: "ph:currency-dollar" },
  { id: "support", name: "Support", icon: "ph:headset" },
]);

// Enhanced FAQ Items
const faqItems = ref([
  {
    id: 1,
    question: t("faq_q1", "How quickly do you respond to inquiries?"),
    answer: t(
      "faq_a1",
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line directly. Our team is available Monday through Friday from 9 AM to 6 PM EST."
    ),
    category: "general",
    isOpen: true,
    actions: [
      { label: "Call Support", icon: "ph:phone", action: "call" },
      { label: "Email Us", icon: "ph:envelope", action: "email" },
    ],
  },
  {
    id: 2,
    question: t("faq_q2", "Do you offer free consultations?"),
    answer: t(
      "faq_a2",
      "Yes, we offer an initial free 30-minute consultation to understand your project scope and digital needs. This helps us provide a tailored proposal that aligns with your business goals and budget constraints."
    ),
    category: "services",
    isOpen: false,
    additionalInfo:
      "Consultations can be scheduled online through our booking system. Weekend slots are available upon request.",
  },
  {
    id: 3,
    question: t("faq_q3", "What industries do you specialize in?"),
    answer: t(
      "faq_a3",
      "While we are sector-agnostic, we have extensive experience in FinTech, E-commerce, SaaS, and B2B professional services. Our core strength is building powerful, scalable platforms regardless of the industry."
    ),
    category: "services",
    isOpen: false,
    additionalInfo:
      "We've successfully delivered over 50 projects across 15 different industries in the past 3 years.",
  },
  {
    id: 4,
    question: t("faq_q4", "Can I visit your office for a meeting?"),
    answer: t(
      "faq_a4",
      "We primarily operate remotely to maintain flexibility and competitive pricing, but we are happy to schedule in-person meetings for kick-offs and strategy sessions upon request."
    ),
    category: "general",
    isOpen: false,
    actions: [
      { label: "Book Meeting", icon: "ph:calendar", action: "meeting" },
    ],
  },
  {
    id: 5,
    question: t("faq_q5", "What's your typical project timeline?"),
    answer: t(
      "faq_a5",
      "Project timelines vary based on complexity. Small websites typically take 2-3 weeks, while custom web applications can range from 1-3 months. We provide detailed timelines during the proposal phase."
    ),
    category: "services",
    isOpen: false,
  },
  {
    id: 6,
    question: t("faq_q6", "Do you offer ongoing maintenance?"),
    answer: t(
      "faq_a6",
      "Yes, we offer comprehensive maintenance plans starting at $99/month. This includes security updates, performance monitoring, regular backups, and minor content updates."
    ),
    category: "pricing",
    isOpen: false,
  },
]);

// Refs
const faqContentRefs = ref([]);

// Computed
const filteredFaqItems = computed(() => {
  if (activeCategory.value === "all") return faqItems.value;
  return faqItems.value.filter(
    (item) => item.category === activeCategory.value
  );
});

// Methods
const toggleFaq = async (id) => {
  const wasOpen = activeFaqId.value === id;
  activeFaqId.value = wasOpen ? null : id;

  // Update the item's isOpen state
  const item = faqItems.value.find((item) => item.id === id);
  if (item) {
    item.isOpen = !wasOpen;
  }

  // Smooth scroll into view if opening
  if (!wasOpen) {
    await nextTick();
    const element = document.querySelector(`[data-faq-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
};

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const handleAction = (action) => {
  switch (action.action) {
    case "call":
      window.open("tel:+1234567890");
      break;
    case "email":
      window.location.href = "mailto:support@example.com";
      break;
    case "meeting":
      window.open("https://calendly.com/your-link", "_blank");
      break;
  }
};

// Initialize first item as open
onMounted(() => {
  if (faqItems.value.length > 0) {
    faqItems.value[0].isOpen = true;
  }
});
</script>

<style lang="scss" scoped>
$accent: #ee7639;
$dark-bg: #181815;
$dark-card: #1e1e1b;
$light-bg: #ffffff;
$light-card: #f3f4f6;

.faq-section {
  position: relative;
  transition: background-color 0.3s ease;

  &.dark-mode {
    background-color: $dark-bg;
    color: white;

    .section-subtitle {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &.light-mode {
    background-color: $light-bg;
    color: #1a1a1a;

    .section-subtitle {
      color: #666;
    }
  }
}

/* Background Elements */
.floating-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.1;
  z-index: 0;

  &.blob-1 {
    width: 500px;
    height: 500px;
    background: $accent;
    top: -250px;
    right: -250px;
    animation: float 20s ease-in-out infinite;
  }

  &.blob-2 {
    width: 400px;
    height: 400px;
    background: $accent;
    bottom: -200px;
    left: -200px;
    animation: float 25s ease-in-out infinite reverse;
  }
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba($accent, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba($accent, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black, transparent 70%);
}

/* Section Header */
.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
}

.section-subtitle {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  margin-bottom: 25px;
  opacity: 0.8;
}

/* FAQ Categories */
.faq-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 3rem;

  .category-btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    background: transparent;
    border: 2px solid rgba($accent, 0.2);
    color: currentColor;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    span {
      margin-inline-end: 10px;
    }
    &:hover {
      border-color: rgba($accent, 0.4);
      transform: translateY(-2px);
    }

    &.active {
      background: rgba($accent, 0.1);
      border-color: $accent;
      color: $accent;
      box-shadow: 0 4px 15px rgba($accent, 0.2);
    }
  }
}

/* FAQ Container */
.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 4rem;
}

.faq-item-wrapper {
  position: relative;

  .faq-decorative {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent, rgba($accent, 0.03));
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;

    .faq-item:hover & {
      opacity: 1;
    }
  }
}

.faq-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;

  .dark-mode & {
    background: linear-gradient(
      145deg,
      rgba($dark-card, 0.8),
      rgba($dark-card, 0.6)
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);

    &:hover {
      border-color: rgba($accent, 0.2);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba($accent, 0.1);
    }

    &.active {
      border-color: rgba($accent, 0.3);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba($accent, 0.2);
    }
  }

  .light-mode & {
    background: linear-gradient(
      145deg,
      rgba($light-card, 0.8),
      rgba(255, 255, 255, 0.6)
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 0, 0, 0.05);

    &:hover {
      border-color: rgba($accent, 0.2);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba($accent, 0.1);
    }

    &.active {
      border-color: rgba($accent, 0.3);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba($accent, 0.2);
    }
  }
}

/* FAQ Header */
.faq-header {
  padding: 24px 32px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    .faq-question {
      color: $accent;
    }
  }
}

.faq-question-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
  min-width: 0; /* Prevents flex overflow */
}

.faq-number {
  font-size: 0.9rem;
  font-weight: 700;
  color: $accent;
  opacity: 0.7;
  margin-top: 2px;
  min-width: 40px;
}

.faq-text-content {
  flex: 1;
  min-width: 0; /* Prevents flex overflow */
}

.faq-question {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
  transition: color 0.3s ease;
  word-wrap: break-word;

  .faq-item.active & {
    color: $accent;
  }
}

.faq-preview {
  font-size: 0.95rem;
  color: currentColor;
  opacity: 0.6;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  .faq-item.active & {
    display: none;
  }
}

/* Toggle Button */
.faq-toggle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba($accent, 0.2);
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  margin-left: 16px;

  &:hover {
    background: rgba($accent, 0.1);
    border-color: rgba($accent, 0.4);
    transform: rotate(90deg);
  }

  &.open {
    background: rgba($accent, 0.1);
    border-color: $accent;

    .toggle-line-2 {
      opacity: 0;
    }
  }
}

.toggle-line {
  position: absolute;
  background: $accent;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.toggle-line-1 {
  width: 16px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.toggle-line-2 {
  width: 2px;
  height: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* FAQ Content */
.faq-content-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &.open {
    max-height: 1000px; /* Large enough to accommodate content */

    .faq-content {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.faq-content {
  padding: 0 32px 32px 92px; /* 92px = 40px (number) + 20px (gap) + 32px (left padding) */
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.4s ease 0.1s;
}

.faq-answer {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 24px;
  color: currentColor;
  opacity: 0.9;

  p {
    margin: 0;
  }
}

.additional-info {
  background: rgba($accent, 0.05);
  border-left: 3px solid $accent;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;

  .info-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $accent;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  .info-content {
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.8;
  }
}

.faq-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: rgba($accent, 0.1);
    border: 1px solid rgba($accent, 0.2);
    color: $accent;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba($accent, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba($accent, 0.2);
    }
  }
}

/* CTA Section */
.faq-cta {
  background: linear-gradient(135deg, rgba($accent, 0.05), rgba($accent, 0.02));
  border: 2px dashed rgba($accent, 0.2);
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba($accent, 0.03),
      transparent
    );
    animation: shimmer 3s infinite;
  }
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-icon {
  font-size: 3rem;
  color: $accent;
  margin-bottom: 20px;
  opacity: 0.8;
}

.cta-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: $accent;
}

.cta-text {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  background: $accent;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: lighten($accent, 5%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba($accent, 0.3);

    .icon {
      transform: translateX(4px);
    }
  }

  .icon {
    transition: transform 0.3s ease;
  }
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(20px);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.5, 0, 0, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }

  .faq-header {
    padding: 20px;
  }

  .faq-question-content {
    gap: 12px;
  }

  .faq-number {
    min-width: 32px;
  }

  .faq-content {
    padding: 0 20px 20px 64px; /* Adjusted for mobile */
  }

  .faq-categories {
    .category-btn {
      padding: 8px 16px;
      font-size: 0.85rem;
    }
  }

  .faq-cta {
    padding: 32px 24px;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .faq-toggle {
    width: 36px;
    height: 36px;
  }

  .faq-actions {
    flex-direction: column;
    width: 100%;

    .action-btn {
      width: 100%;
      justify-content: center;
    }
  }
}

.accent-badge {
  display: block;
  color: var(--accent-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
</style>
