<template>
  <section class="contact-section">
    <!-- Animated Background -->
    <div class="animated-background">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="container">
      <!-- Header with Animation -->
      <div class="header-wrapper">
        <div class="accent-badge">Let's Connect</div>
        <h1 class="main-heading">
          <span class="heading-line">Get in touch</span>
          <span class="highlight-gradient">with our team</span>
          <span class="star-icon">✦</span>
        </h1>
        <p class="subheading">
          Have a project in mind? Let's discuss how we can bring your vision to
          life.
        </p>
      </div>

      <!-- Main Content -->
      <div class="content-wrapper">
        <!-- Info Card with 3D Effect -->
        <div class="info-card-3d">
          <div class="card-inner">
            <div class="card-glow"></div>
            <div class="card-content">
              <div class="card-header">
                <h3 class="card-title">Contact Information</h3>
                <div class="pulse-indicator"></div>
              </div>

              <div class="info-list">
                <div
                  v-for="(item, index) in contactInfo"
                  :key="index"
                  class="info-item-hover"
                  :style="{ '--delay': index * 0.1 + 's' }"
                >
                  <div class="info-icon-wrapper">
                    <div class="icon-backdrop"></div>
                    <component :is="item.icon" />
                  </div>
                  <div class="info-content">
                    <span class="info-label">{{ item.label }}</span>
                    <a
                      v-if="item.href"
                      :href="item.href"
                      class="info-value interactive-link"
                    >
                      {{ item.value }}
                      <span class="link-arrow">↗</span>
                    </a>
                    <span v-else class="info-value">{{ item.value }}</span>
                  </div>
                  <div class="hover-line"></div>
                </div>
              </div>

              <div class="social-links">
                <p class="social-label">Follow us</p>
                <div class="social-icons">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.url"
                    class="social-icon"
                  >
                    <component :is="social.icon" />
                    <div class="social-tooltip">{{ social.name }}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Form -->
        <div class="contact-form-modern">
          <div class="form-header">
            <h3 class="form-title">
              <span class="form-icon">✉️</span>
              Send us a message
            </h3>
            <div class="form-progress">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: formProgress + '%' }"
                ></div>
              </div>
              <span class="progress-text"
                >{{ filledFields }}/5 fields completed</span
              >
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="form-body">
            <!-- Floating Label Inputs -->
            <div class="floating-input-group">
              <div class="floating-input">
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  @focus="activeField = 'name'"
                  @blur="activeField = null"
                  required
                />
                <label
                  for="name"
                  :class="{ active: form.name || activeField === 'name' }"
                >
                  Your Name
                </label>
                <div class="input-border"></div>
                <div class="input-focus-border"></div>
              </div>

              <div class="floating-input">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  @focus="activeField = 'email'"
                  @blur="activeField = null"
                  required
                />
                <label
                  for="email"
                  :class="{ active: form.email || activeField === 'email' }"
                >
                  Email Address
                </label>
                <div class="input-border"></div>
                <div class="input-focus-border"></div>
              </div>
            </div>

            <div class="floating-input">
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                @focus="activeField = 'phone'"
                @blur="activeField = null"
              />
              <label
                for="phone"
                :class="{ active: form.phone || activeField === 'phone' }"
              >
                Phone Number <span class="optional">(Optional)</span>
              </label>
              <div class="input-border"></div>
              <div class="input-focus-border"></div>
            </div>

            <!-- Interactive Time Selector -->
            <div class="time-selector-section">
              <label class="section-label">
                Preferred Meeting Time
                <span class="required-indicator">*</span>
              </label>
              <div class="time-selector">
                <div class="time-scroll-container">
                  <div
                    v-for="time in timeSlots"
                    :key="time"
                    :class="[
                      'time-option',
                      { active: form.selectedTime === time },
                    ]"
                    @click="selectTime(time)"
                  >
                    <div class="time-dot"></div>
                    <span class="time-value">{{ time }}</span>
                    <div class="time-glow"></div>
                  </div>
                </div>
                <div class="time-hint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 16V12M12 8H12.01"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  Click to select your preferred time
                </div>
              </div>
            </div>

            <!-- Message Input with Character Counter -->
            <div class="message-section">
              <div class="message-header">
                <label for="message" class="section-label">
                  Your Message
                  <span class="required-indicator">*</span>
                </label>
                <div class="char-counter">{{ form.message.length }}/500</div>
              </div>
              <div class="message-input-wrapper">
                <textarea
                  id="message"
                  v-model="form.message"
                  @input="limitMessage"
                  @focus="activeField = 'message'"
                  @blur="activeField = null"
                  :maxlength="500"
                  rows="4"
                  placeholder="Tell us about your project..."
                ></textarea>
                <div class="message-border"></div>
              </div>
            </div>

            <!-- Submit Button with Animation -->
            <div class="submit-section">
              <button
                type="submit"
                class="magic-button"
                :class="{ loading: isLoading }"
                :disabled="isLoading || !isFormValid"
              >
                <div class="button-content">
                  <span class="button-text">
                    {{ isLoading ? "Sending..." : "Send Message" }}
                  </span>
                  <div class="button-icons">
                    <span class="sparkle-icon">✨</span>
                    <span class="arrow-icon">→</span>
                  </div>
                </div>
                <div class="button-glow"></div>
                <div class="button-particles"></div>
              </button>

              <div class="form-footer">
                <div class="privacy-note">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  We respect your privacy. Your data is secure with us.
                </div>
                <div class="response-time">
                  <span class="response-badge">⚡</span>
                  Typically responds within 2 hours
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="success-modal"
      @click="showSuccessModal = false"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-icon">🎉</div>
        <h3 class="modal-title">Message Sent Successfully!</h3>
        <p class="modal-text">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button class="modal-close" @click="showSuccessModal = false">
          Continue
        </button>
        <div class="confetti"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-vue-next";

// Form State
const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
  selectedTime: "",
});

const activeField = ref(null);
const isLoading = ref(false);
const showSuccessModal = ref(false);

// Contact Information
const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "AUE - Dubai",
  },
  {
    icon: Mail,
    label: "Email",
    value: "teamleader@smpllcs.com",
    href: "mailto:teamleader@smpllcs.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+971 58584 0433",
    href: "tel:+971585840433",
  },
];

// Social Links
const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: "#" },
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
];

// Time Slots
const timeSlots = ref([
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
]);

// Form Progress
const filledFields = computed(() => {
  const fields = [
    form.value.name,
    form.value.email,
    form.value.message,
    form.value.selectedTime,
  ];
  return fields.filter((field) => field.trim()).length;
});

const formProgress = computed(() => {
  return (filledFields.value / 4) * 100;
});

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    form.value.message &&
    form.value.selectedTime
  );
});

// Methods
const selectTime = (time) => {
  form.value.selectedTime = form.value.selectedTime === time ? "" : time;
};

const limitMessage = () => {
  if (form.value.message.length > 500) {
    form.value.message = form.value.message.substring(0, 500);
  }
};

const handleSubmit = async () => {
  if (!isFormValid.value || isLoading.value) return;

  isLoading.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Reset form
  form.value = {
    name: "",
    email: "",
    phone: "",
    message: "",
    selectedTime: "",
  };

  isLoading.value = false;
  showSuccessModal.value = true;

  // Auto-hide success modal
  setTimeout(() => {
    showSuccessModal.value = false;
  }, 5000);
};
</script>

<style scoped>
/* Base Styles */
.contact-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  color: #ffffff;
  overflow: hidden;
  padding: 4rem 1rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Animated Background */
.animated-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--accent-color, #ee7639) 0%,
    transparent 70%
  );
  opacity: 0.1;
  filter: blur(40px);
  animation: float 20s ease-in-out infinite;

  &.shape-1 {
    width: 400px;
    height: 400px;
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }

  &.shape-2 {
    width: 300px;
    height: 300px;
    bottom: -150px;
    left: -150px;
    animation-delay: 5s;
  }

  &.shape-3 {
    width: 200px;
    height: 200px;
    top: 50%;
    left: 20%;
    animation-delay: 10s;
  }
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    circle at center,
    black 30%,
    transparent 70%
  );
}

/* Header */
.header-wrapper {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out;
}

.accent-badge {
  display: inline-block;
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 20px rgba(238, 118, 57, 0.3);
}

.main-heading {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.heading-line {
  display: block;
}

.highlight-gradient {
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.star-icon {
  display: inline-block;
  margin-left: 1rem;
  font-size: 2rem;
  animation: spin 20s linear infinite;
}

.subheading {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Content Layout */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

@media (min-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
  }
}

/* 3D Info Card */
.info-card-3d {
  perspective: 1000px;
}

.card-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.info-card-3d:hover .card-inner {
  transform: rotateY(5deg) rotateX(2deg) translateY(-10px);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    45deg,
    var(--accent-color, #ee7639),
    transparent 30%
  );
  border-radius: 24px;
  filter: blur(20px);
  opacity: 0.4;
  z-index: -1;
}

.card-content {
  background: linear-gradient(
    145deg,
    rgba(30, 30, 30, 0.8),
    rgba(20, 20, 20, 0.9)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pulse-indicator {
  width: 12px;
  height: 12px;
  background: var(--accent-color, #ee7639);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

/* Info List */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.info-item-hover {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  animation: slideInRight 0.5s ease-out var(--delay) both;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(10px);
  }
}

.info-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.icon-backdrop {
  position: absolute;
  inset: -8px;
  background: var(--accent-color, #ee7639);
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(8px);
}

.info-icon-wrapper svg {
  width: 24px;
  height: 24px;
  color: var(--accent-color, #ee7639);
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}

.interactive-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color, #ee7639);

    .link-arrow {
      transform: translate(3px, -3px);
    }
  }
}

.link-arrow {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
}

.hover-line {
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent-color, #ee7639),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-item-hover:hover .hover-line {
  opacity: 1;
}

/* Social Links */
.social-links {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-color, #ee7639);
    color: white;
    transform: translateY(-2px);

    .social-tooltip {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.social-icon svg {
  width: 18px;
  height: 18px;
}

.social-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
}

/* Modern Form */
.contact-form-modern {
  background: linear-gradient(
    145deg,
    rgba(30, 30, 30, 0.8),
    rgba(20, 20, 20, 0.9)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
}

.form-header {
  margin-bottom: 2.5rem;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
}

.form-icon {
  font-size: 1.5rem;
}

.form-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.progress-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  min-width: 120px;
}

/* Floating Inputs */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.floating-input-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.floating-input {
  position: relative;
  height: 60px;
}

.floating-input input,
.floating-input textarea {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 12px;
  padding: 1.5rem 1rem 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
}

.floating-input label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  transition: all 0.3s ease;

  &.active {
    top: 0.5rem;
    font-size: 0.75rem;
    color: var(--accent-color, #ee7639);
  }
}

.optional {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}

.input-border {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 12px;
  pointer-events: none;
  transition: border-color 0.3s ease;
}

.input-focus-border {
  position: absolute;
  inset: -2px;
  border: 2px solid transparent;
  border-radius: 14px;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  background-clip: padding-box;
  -webkit-background-clip: padding-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  transition: opacity 0.3s ease;
}

.floating-input input:focus ~ .input-focus-border {
  opacity: 1;
}

/* Time Selector */
.time-selector-section {
  margin-top: 1rem;
}

.section-label {
  display: block;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
}

.required-indicator {
  color: var(--accent-color, #ee7639);
  margin-left: 0.25rem;
}

.time-selector {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
}

.time-scroll-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.time-option {
  position: relative;
  flex: 1;
  min-width: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: rgba(238, 118, 57, 0.3);
    transform: translateY(-2px);
  }

  &.active {
    background: rgba(238, 118, 57, 0.1);
    border-color: var(--accent-color, #ee7639);

    .time-dot {
      background: var(--accent-color, #ee7639);
      box-shadow: 0 0 10px rgba(238, 118, 57, 0.5);
    }

    .time-glow {
      opacity: 1;
    }
  }
}

.time-dot {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  transition: all 0.3s ease;
}

.time-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
}

.time-glow {
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  background: linear-gradient(
    45deg,
    transparent,
    var(--accent-color, #ee7639),
    transparent
  );
  opacity: 0;
  filter: blur(8px);
  z-index: -1;
  transition: opacity 0.3s ease;
}

.time-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Message Section */
.message-section {
  margin-top: 1rem;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.char-counter {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.message-input-wrapper {
  position: relative;
}

.message-input-wrapper textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--accent-color, #ee7639);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
}

.message-border {
  position: absolute;
  inset: -2px;
  border: 2px solid transparent;
  border-radius: 14px;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  background-clip: padding-box;
  -webkit-background-clip: padding-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  transition: opacity 0.3s ease;
}

.message-input-wrapper textarea:focus ~ .message-border {
  opacity: 1;
}

/* Submit Button */
.submit-section {
  margin-top: 2rem;
}

.magic-button {
  position: relative;
  width: 100%;
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  border: none;
  border-radius: 16px;
  padding: 1.25rem;
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(238, 118, 57, 0.4);

    .arrow-icon {
      transform: translateX(5px);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.loading {
    .button-text {
      opacity: 0.8;
    }

    .arrow-icon {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  z-index: 2;
}

.button-icons {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.sparkle-icon {
  animation: sparkle 2s ease-in-out infinite;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.button-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.magic-button:hover .button-glow {
  opacity: 1;
  animation: shimmer 1.5s ease-in-out infinite;
}

.button-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.privacy-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.response-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.response-badge {
  animation: pulse 2s ease-in-out infinite;
}

/* Success Modal */
.success-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: linear-gradient(
    145deg,
    rgba(30, 30, 30, 0.95),
    rgba(20, 20, 20, 0.98)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative;
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: bounce 1s ease-in-out;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
}

.modal-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.modal-close {
  background: linear-gradient(90deg, var(--accent-color, #ee7639), #ff9a3d);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.confetti {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;

  &::before,
  &::after {
    content: "✦";
    position: absolute;
    color: var(--accent-color, #ee7639);
    animation: confetti 1s ease-out;
  }

  &::before {
    top: 20%;
    left: 20%;
    animation-delay: 0.1s;
  }

  &::after {
    top: 30%;
    right: 20%;
    animation-delay: 0.2s;
  }
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50px) rotate(180deg);
    opacity: 0;
  }
}
</style>
