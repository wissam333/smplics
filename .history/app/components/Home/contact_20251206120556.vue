<template>
  <section class="contact-section">
    <!-- Simplified Background -->
    <div class="background">
      <div class="gradient-overlay"></div>
      <div class="grid-lines"></div>
    </div>

    <div class="container">
      <!-- Simplified Header -->
      <div class="header">
        <div class="section-badge">
          {{ $i18n.locale === "ar" ? "اتصل بنا" : "Contact Us" }}
        </div>
        <h1 class="title">
          <Icon name="ph:sparkle-fill" class="accent-sparkle" />
          {{ $i18n.locale === "ar" ? "ابقى على تواصل" : "Get in touch" }}
          <span class="title-accent">{{
            $i18n.locale === "ar" ? "مع فريقنا" : "with our team"
          }}</span>
        </h1>
        <p class="description">
          {{
            $i18n.locale === "ar"
              ? "هل لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكننا تحويل رؤيتك إلى واقع. نرد عادةً خلال ساعتين."
              : "Have a project in mind? Let's discuss how we can bring your vision to life. We typically respond within 2 hours."
          }}
        </p>
      </div>

      <!-- Main Content -->
      <div class="content" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
        <!-- Simplified Info Card -->
        <div class="info-card">
          <div class="card-header">
            <h3 class="card-title">
              {{
                $i18n.locale === "ar"
                  ? "معلومات الاتصال"
                  : "Contact Information"
              }}
            </h3>
          </div>

          <div class="contact-info">
            <div
              v-for="(item, index) in contactInfo"
              :key="index"
              class="contact-item"
            >
              <div class="contact-icon">
                <Icon :name="item.icon" />
              </div>
              <div class="contact-details">
                <span class="contact-label">{{
                  $i18n.locale === "ar" ? item.labelAr : item.label
                }}</span>
                <a
                  v-if="item.href"
                  :href="item.href"
                  class="contact-value link"
                >
                  {{ $i18n.locale === "ar" ? item.valueAr : item.value }}
                </a>
                <span v-else class="contact-value">{{
                  $i18n.locale === "ar" ? item.valueAr : item.value
                }}</span>
              </div>
            </div>
          </div>

          <div class="office-hours">
            <h4 class="hours-title">
              {{ $i18n.locale === "ar" ? "ساعات العمل" : "Office Hours" }}
            </h4>
            <p class="hours-info">
              {{
                $i18n.locale === "ar"
                  ? "الإثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً بتوقيت الخليج"
                  : "Mon - Fri: 9:00 AM - 6:00 PM GST"
              }}
            </p>
          </div>

          <div class="social-section">
            <p class="social-title">
              {{ $i18n.locale === "ar" ? "تابعنا" : "Follow us" }}
            </p>
            <div class="social-links">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                class="social-link"
                :aria-label="
                  $i18n.locale === 'ar' ? social.nameAr : social.name
                "
              >
                <Icon :name="social.icon" />
              </a>
            </div>
          </div>
        </div>

        <!-- Simplified Form -->
        <div class="contact-form">
          <div class="form-header">
            <h3 class="form-title">
              <span class="form-icon">✉️</span>
              {{ $i18n.locale === "ar" ? "أرسل رسالة" : "Send a message" }}
            </h3>
            <div class="form-status">
              <div class="status-bar">
                <div
                  class="status-fill"
                  :style="{ width: formProgress + '%' }"
                ></div>
              </div>
              <span class="status-text"
                >{{ filledFields }}/4
                {{ $i18n.locale === "ar" ? "مكتمل" : "completed" }}</span
              >
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="form">
            <!-- Input Group -->
            <div class="input-group">
              <div class="form-input">
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  placeholder=" "
                  :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
                />
                <label for="name">{{
                  $i18n.locale === "ar" ? "اسمك *" : "Your Name *"
                }}</label>
              </div>

              <div class="form-input">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  placeholder=" "
                  :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
                />
                <label for="email">{{
                  $i18n.locale === "ar"
                    ? "عنوان البريد الإلكتروني *"
                    : "Email Address *"
                }}</label>
              </div>
            </div>

            <div class="form-input">
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                placeholder=" "
                :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
              />
              <label for="phone">{{
                $i18n.locale === "ar"
                  ? "رقم الهاتف (اختياري)"
                  : "Phone Number (Optional)"
              }}</label>
            </div>

            <!-- Time Selection -->
            <div class="form-section">
              <label class="section-label">{{
                $i18n.locale === "ar"
                  ? "وقت الاجتماع المفضل *"
                  : "Preferred Meeting Time *"
              }}</label>
              <div class="time-grid">
                <button
                  v-for="time in timeSlots"
                  :key="time"
                  type="button"
                  :class="['time-slot', { active: form.selectedTime === time }]"
                  @click="selectTime(time)"
                >
                  {{ $i18n.locale === "ar" ? getArabicTime(time) : time }}
                </button>
              </div>
              <p class="help-text">
                {{
                  $i18n.locale === "ar"
                    ? "اختر الوقت المناسب لك"
                    : "Select your preferred time slot"
                }}
              </p>
            </div>

            <!-- Message -->
            <div class="form-section">
              <div class="message-header">
                <label class="section-label">{{
                  $i18n.locale === "ar" ? "رسالتك *" : "Your Message *"
                }}</label>
                <span class="char-count">{{ form.message.length }}/500</span>
              </div>
              <div class="message-input">
                <textarea
                  v-model="form.message"
                  @input="limitMessage"
                  :placeholder="
                    $i18n.locale === 'ar'
                      ? 'أخبرنا عن مشروعك، الجدول الزمني، والميزانية...'
                      : 'Tell us about your project, timeline, and budget...'
                  "
                  maxlength="500"
                  rows="4"
                  :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
                ></textarea>
              </div>
            </div>

            <!-- Submit -->
            <div class="form-footer">
              <button
                type="submit"
                class="submit-btn"
                :class="{ loading: isLoading }"
                :disabled="isLoading || !isFormValid"
              >
                <span class="btn-text">
                  {{
                    isLoading
                      ? $i18n.locale === "ar"
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : $i18n.locale === "ar"
                      ? "أرسل الرسالة"
                      : "Send Message"
                  }}
                </span>
                <span class="btn-icon">{{
                  $i18n.locale === "ar" ? "←" : "→"
                }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Simplified Success Modal -->
    <div
      v-if="showSuccessModal"
      class="success-modal"
      @click="showSuccessModal = false"
    >
      <div
        class="modal"
        @click.stop
        :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
      >
        <div class="modal-icon">✓</div>
        <h3 class="modal-title">
          {{ $i18n.locale === "ar" ? "تم إرسال الرسالة!" : "Message Sent!" }}
        </h3>
        <p class="modal-text">
          {{
            $i18n.locale === "ar"
              ? "شكرًا لتواصلك معنا. سنرد خلال 24 ساعة."
              : "Thank you for contacting us. We'll respond within 24 hours."
          }}
        </p>
        <button class="modal-btn" @click="showSuccessModal = false">
          {{ $i18n.locale === "ar" ? "استمر" : "Continue" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const { locale } = useI18n();

// Form State
const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
  selectedTime: "",
});

const isLoading = ref(false);
const showSuccessModal = ref(false);

// Contact Information
const contactInfo = [
  {
    icon: "mdi:location",
    label: "Location",
    labelAr: "الموقع",
    value: "AUE - Dubai",
    valueAr: "الإمارات - دبي",
  },
  {
    icon: "mdi:envelope",
    label: "Email",
    labelAr: "البريد الإلكتروني",
    value: "teamleader@smpllcs.com",
    valueAr: "teamleader@smpllcs.com",
    href: "mailto:teamleader@smpllcs.com",
  },
  {
    icon: "mdi:phone",
    label: "Phone",
    labelAr: "الهاتف",
    value: "+971 58584 0433",
    valueAr: "٩٧١+ ٥٨٥٨٤ ٠٤٣٣",
    href: "tel:+971585840433",
  },
];

// Social Links
const socialLinks = [
  {
    name: "LinkedIn",
    nameAr: "لينكدإن",
    url: "#",
    icon: "mdi:linkedin",
  },
  {
    name: "Twitter",
    nameAr: "تويتر",
    url: "#",
    icon: "mdi:twitter",
  },
  {
    name: "Instagram",
    nameAr: "انستغرام",
    url: "#",
    icon: "mdi:instagram",
  },
  {
    name: "Facebook",
    nameAr: "فيسبوك",
    url: "#",
    icon: "mdi:facebook",
  },
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

// Time conversion for Arabic
const getArabicTime = (time) => {
  const timeMap = {
    "9:00 AM": "٩:٠٠ صباحًا",
    "10:00 AM": "١٠:٠٠ صباحًا",
    "11:00 AM": "١١:٠٠ صباحًا",
    "12:00 PM": "١٢:٠٠ ظهرًا",
    "1:00 PM": "١:٠٠ مساءً",
    "2:00 PM": "٢:٠٠ مساءً",
    "3:00 PM": "٣:٠٠ مساءً",
    "4:00 PM": "٤:٠٠ مساءً",
    "5:00 PM": "٥:٠٠ مساءً",
  };
  return timeMap[time] || time;
};

// Computed Properties
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

<style scoped lang="scss">
/* Base Styles */
.contact-section {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
  padding: 3rem 1rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

/* Background */
.background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 20% 50%,
      rgba(var(--accent-rgb), 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(59, 130, 246, 0.05) 0%,
      transparent 50%
    );
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(var(--text-rgb), 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(var(--text-rgb), 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-badge {
  display: block;
  color: var(--accent-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    font-size: 0.9rem;
    padding: 6px 16px;
  }
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;

  .accent-sparkle {
    color: var(--accent-color);
    vertical-align: top;
    font-size: 0.6em;
    animation: sparkle 3s infinite ease-in-out;
  }
}

@media (min-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
}

.title-accent {
  color: var(--accent-color);
}

.description {
  font-size: 1rem;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  line-height: 1.6;
  transition: color 0.3s ease;
}

/* Content Layout */
.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .content {
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
  }
}

/* Info Card */
.info-card {
  background-color: color-mix(in srgb, var(--card-bg) 95%, transparent);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.status-text {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  transition: color 0.3s ease;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: color-mix(in srgb, var(--accent-color) 10%, transparent);
  border-radius: 10px;
  color: var(--accent-color);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.contact-icon svg {
  width: 20px;
  height: 20px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  transition: color 0.3s ease;
}

.contact-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.link {
  color: var(--accent-color);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
}

/* Office Hours */
.office-hours {
  padding: 1.5rem;
  background-color: color-mix(in srgb, var(--text-color) 3%, transparent);
  border-radius: 12px;
  margin-bottom: 2rem;
  transition: background-color 0.3s ease;
}

.hours-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--text-color) 80%, transparent);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.hours-info {
  font-size: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

/* Social Section */
.social-section {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.social-title {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: color-mix(in srgb, var(--text-color) 5%, transparent);
  border-radius: 10px;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: color-mix(in srgb, var(--accent-color) 10%, transparent);
    color: var(--accent-color);
    transform: translateY(-2px);
  }
}

.social-link svg {
  width: 18px;
  height: 18px;
}

/* Contact Form */
.contact-form {
  background-color: color-mix(in srgb, var(--card-bg) 95%, transparent);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.form-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.form-icon {
  font-size: 1.5rem;
}

.form-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-bar {
  flex: 1;
  height: 4px;
  background-color: color-mix(in srgb, var(--text-color) 10%, transparent);
  border-radius: 2px;
  overflow: hidden;
}

.status-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--accent-color),
    color-mix(in srgb, var(--accent-color) 80%, white)
  );
  border-radius: 2px;
  transition: width 0.3s ease;
}

.status-text {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  min-width: 100px;
  text-align: right;
  transition: color 0.3s ease;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .input-group {
    grid-template-columns: 1fr 1fr;
  }
}

/* Form Inputs */
.form-input {
  position: relative;
}

.form-input input,
.form-input textarea {
  width: 100%;
  background-color: color-mix(in srgb, var(--text-color) 5%, transparent);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--accent-color);
    background-color: color-mix(in srgb, var(--text-color) 7%, transparent);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--accent-color) 20%, transparent);
  }
}

.form-input input::placeholder,
.form-input textarea::placeholder {
  color: transparent;
}

.form-input input:not(:placeholder-shown) + label,
.form-input input:focus + label,
.form-input textarea:not(:placeholder-shown) + label,
.form-input textarea:focus + label {
  transform: translateY(-2.4rem) scale(0.85);
  opacity: 1;
}

.form-input label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1rem;
  color: color-mix(in srgb, var(--text-color) 60%, transparent);
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: left top;
  background-color: transparent;
  padding: 0 4px;
}

/* Time Grid */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
}

.time-slot {
  background-color: color-mix(in srgb, var(--text-color) 5%, transparent);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 80%, transparent);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background-color: color-mix(in srgb, var(--accent-color) 10%, transparent);
    border-color: color-mix(in srgb, var(--accent-color) 30%, transparent);
  }

  &.active {
    background-color: color-mix(in srgb, var(--accent-color) 20%, transparent);
    border-color: var(--accent-color);
    color: var(--text-color);
    font-weight: 600;
  }
}

.help-text {
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--text-color) 50%, transparent);
  transition: color 0.3s ease;
}

/* Message Section */
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 50%, transparent);
  transition: color 0.3s ease;
}

.message-input textarea {
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
}

/* Form Footer */
.form-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.submit-btn {
  position: relative;
  background-color: var(--accent-color);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;

  &:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--accent-color) 80%, white);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px
      color-mix(in srgb, var(--accent-color) 30%, transparent);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.submit-btn.loading .btn-icon {
  display: none;
}

.submit-btn.loading::after {
  content: "";
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: absolute;
  right: 2rem;
}

.form-note {
  display: flex;
  justify-content: center;
}

.privacy-note {
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--text-color) 50%, transparent);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

/* Success Modal */
.success-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background-color: color-mix(in srgb, var(--card-bg) 95%, transparent);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: scaleIn 0.3s ease-out;
  backdrop-filter: blur(10px);
}

.modal-icon {
  width: 60px;
  height: 60px;
  background-color: var(--success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
  color: white;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.modal-text {
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  margin-bottom: 2rem;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.modal-btn {
  background-color: var(--accent-color);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;

  &:hover {
    background-color: color-mix(in srgb, var(--accent-color) 80%, white);
  }
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
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

/* Responsive Adjustments */
@media (max-width: 768px) {
  .contact-section {
    padding: 2rem 1rem;
  }

  .header {
    margin-bottom: 3rem;
  }

  .title {
    font-size: 2rem;
  }

  .info-card,
  .contact-form {
    padding: 1.5rem;
  }

  .time-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* RTL Support Adjustments */
[dir="rtl"] {
  .form-input label {
    left: auto;
    right: 1rem;
    transform-origin: right top;
  }

  .submit-btn.loading::after {
    right: auto;
    left: 2rem;
  }

  .status-text {
    text-align: left;
  }
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
}
textarea {
  width: 100%;
  background-color: var(--card-bg); /* Matches provided theme var */
  border: 1px solid var(--border-color); /* Matches provided theme var */
  color: var(--text-color);
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.7;
  }
}
</style>
