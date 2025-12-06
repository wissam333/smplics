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
  background: #0a0a0a;
  color: #ffffff;
  overflow: hidden;
  padding: 3rem 1rem;
  display: flex;
  align-items: center;
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
      rgba(238, 118, 57, 0.1) 0%,
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
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
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
  color: #ffffff;
}

@media (min-width: 768px) {
  .title {
    font-size: 3rem;
  }
}

.title-accent {
  color: #ee7639;
}

.description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.status-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
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
  background: rgba(238, 118, 57, 0.1);
  border-radius: 10px;
  color: #ee7639;
  flex-shrink: 0;
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
  color: rgba(255, 255, 255, 0.6);
}

.contact-value {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}

.link {
  color: #ee7639;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.link:hover {
  opacity: 0.8;
}

/* Office Hours */
.office-hours {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.hours-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.hours-info {
  font-size: 1rem;
  color: #ffffff;
}

/* Social Section */
.social-section {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-title {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
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
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: rgba(238, 118, 57, 0.1);
  color: #ee7639;
  transform: translateY(-2px);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

/* Contact Form */
.contact-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.form-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.form-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.status-fill {
  height: 100%;
  background: linear-gradient(90deg, #ee7639, #ff9a3d);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.status-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  min-width: 100px;
  text-align: right;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
}

.form-input input:focus,
.form-input textarea:focus {
  border-color: #ee7639;
  background: rgba(255, 255, 255, 0.07);
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
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  transition: all 0.2s ease;
  transform-origin: left top;
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
  color: #ffffff;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
}

.time-slot {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.time-slot:hover {
  background: rgba(238, 118, 57, 0.1);
  border-color: rgba(238, 118, 57, 0.3);
}

.time-slot.active {
  background: rgba(238, 118, 57, 0.2);
  border-color: #ee7639;
  color: #ffffff;
  font-weight: 600;
}

.help-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Message Section */
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
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
  background: #ee7639;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
}

.submit-btn:hover:not(:disabled) {
  background: #ff8a52;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(238, 118, 57, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Success Modal */
.success-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  animation: scaleIn 0.3s ease-out;
}

.modal-icon {
  width: 60px;
  height: 60px;
  background: #10b981;
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
  color: #ffffff;
}

.modal-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.modal-btn {
  background: #ee7639;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
}

.modal-btn:hover {
  background: #ff8a52;
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

/* RTL Support for Contact Section */
[dir="rtl"] {
  .contact-section {
    .info-card,
    .contact-form {
      text-align: right;
    }

    .contact-item {
      flex-direction: row-reverse;
    }

    .contact-details {
      text-align: right;
    }

    .social-links {
      flex-direction: row-reverse;
    }

    /* Form Inputs */
    .form-input label {
      left: auto;
      right: 1rem;
      text-align: right;
    }

    .form-input input:not(:placeholder-shown) + label,
    .form-input input:focus + label,
    .form-input textarea:not(:placeholder-shown) + label,
    .form-input textarea:focus + label {
      transform-origin: right top;
    }

    /* Time Grid */
    .time-grid {
      direction: rtl;
    }

    /* Form Status */
    .form-status {
      flex-direction: row-reverse;
    }

    .status-text {
      text-align: left;
      min-width: 90px;
    }

    /* Message Header */
    .message-header {
      flex-direction: row-reverse;
    }

    /* Submit Button */
    .submit-btn {
      flex-direction: row-reverse;
    }

    .submit-btn.loading::after {
      right: auto;
      left: 2rem;
    }

    /* Card Header */
    .card-header {
      text-align: right;
    }

    /* Modal */
    .modal {
      text-align: right;
    }
  }

  /* Adjust spacing for RTL */
  .contact-icon {
    margin-right: 0;
    margin-left: 1rem;
  }

  .form-title {
    flex-direction: row-reverse;
  }

  .form-icon {
    margin-right: 0;
    margin-left: 0.75rem;
  }
}

/* Arabic font styling */
[lang="ar"] {
  .contact-section {
    .title,
    .description,
    .card-title,
    .contact-label,
    .contact-value,
    .hours-title,
    .hours-info,
    .social-title,
    .form-title,
    .section-label,
    .time-slot,
    .help-text,
    .char-count,
    .btn-text,
    .modal-title,
    .modal-text,
    .modal-btn {
      font-family: "Segoe UI", "Noto Sans Arabic", sans-serif;
    }

    .title {
      line-height: 1.3;
    }

    .description {
      line-height: 1.8;
    }

    .contact-value {
      direction: ltr; /* Keep numbers/emails LTR */
      unicode-bidi: embed;
    }

    input,
    textarea {
      font-family: "Segoe UI", "Noto Sans Arabic", sans-serif;
    }

    textarea {
      line-height: 1.8;
      text-align: right;
    }
  }
}

/* Bi-directional text support */
.contact-value,
input,
textarea {
  unicode-bidi: plaintext;
}

/* Ensure proper text direction for mixed content */
[dir="rtl"] {
  .contact-value.link {
    direction: ltr;
    display: inline-block;
    unicode-bidi: embed;
  }

  input[type="email"],
  input[type="tel"] {
    direction: ltr;
    text-align: right;
  }
}

/* RTL responsive adjustments */
@media (max-width: 768px) {
  [dir="rtl"] {
    .contact-section {
      .input-group {
        direction: rtl;
      }

      .submit-btn.loading::after {
        left: 1.5rem;
      }
    }
  }
}

/* Fix for Arabic time slots */
.time-slot {
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}

/* Center align time grid in RTL */
[dir="rtl"] .time-grid {
  justify-items: start;
}

/* Adjust form input padding for RTL */
[dir="rtl"] {
  .form-input input,
  .form-input textarea {
    padding: 1rem 1rem 1rem 2.5rem;
  }
}

/* Icon positioning in contact items */
[dir="rtl"] .contact-item .contact-icon {
  order: 2;
}
</style>
