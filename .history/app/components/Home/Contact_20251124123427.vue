<template>
  <section
    class="contact-section"
    :dir="isRtl ? 'rtl' : 'ltr'"
    :style="backgroundStyle"
  >
    <!-- Dark Overlay for Readability -->
    <div class="overlay"></div>

    <!-- Form Container -->
    <div class="contact-container">
      <!-- Header Content -->
      <div class="header-content">
        <p class="subtitle">{{ t.subtitle }}</p>
        <h2 class="title">{{ t.title }}</h2>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="submitForm" class="contact-form">
        <!-- Row 1: Name, Email, Phone -->
        <div class="form-row">
          <div class="input-group">
            <label for="name">{{ t.nameLabel }} *</label>
            <input
              id="name"
              type="text"
              v-model="form.name"
              required
              :placeholder="t.namePlaceholder"
            />
          </div>

          <div class="input-group">
            <label for="email">{{ t.emailLabel }} *</label>
            <input
              id="email"
              type="email"
              v-model="form.email"
              required
              :placeholder="t.emailPlaceholder"
            />
          </div>

          <div class="input-group">
            <label for="phone">{{ t.phoneLabel }}</label>
            <input
              id="phone"
              type="tel"
              v-model="form.phone"
              :placeholder="t.phonePlaceholder"
            />
          </div>
        </div>

        <!-- Row 2: Message (Full Width) -->
        <div class="input-group full-width">
          <label for="message">{{ t.messageLabel }} *</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            required
            :placeholder="t.messagePlaceholder"
          ></textarea>
        </div>

        <!-- Submission Button and Status -->
        <div class="submit-area">
          <button type="submit" :disabled="isSubmitting" class="submit-button">
            <span v-if="!isSubmitting">{{ t.buttonText }}</span>
            <span v-else class="flex items-center justify-center">
              <div class="spinner"></div>
              {{ t.submitting }}
            </span>
          </button>

          <!-- Success/Error Message -->
          <p v-if="statusMessage" :class="['status-message', statusType]">
            {{ statusMessage }}
          </p>
        </div>
      </form>
    </div>
  </section>
    <div></div>
</template>

<script setup>
const { locale } = useI18n();

// Computed
const isRtl = computed(() => locale.value === "ar");

// Translations
const translations = {
  en: {
    subtitle: "WE WOULD LOVE TO HEAR FROM YOU",
    title: "GET IN TOUCH WITH US",
    nameLabel: "Your Name",
    namePlaceholder: "Write your full name",
    emailLabel: "Your Email",
    emailPlaceholder: "e.g., hello@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Write your phone number",
    messageLabel: "Your Message",
    messagePlaceholder: "Tell us about your project or inquiry...",
    buttonText: "SEND MESSAGE",
    submitting: "Sending...",
    success: "Thank you! Your message has been sent successfully.",
    error: "Failed to send message. Please try again later.",
  },
  ar: {
    subtitle: "نحن في انتظار رسالتك",
    title: "تواصل معنا",
    nameLabel: "اسمك",
    namePlaceholder: "اكتب اسمك الكامل",
    emailLabel: "بريدك الإلكتروني",
    emailPlaceholder: "مثال: hello@example.com",
    phoneLabel: "رقم الهاتف",
    phonePlaceholder: "اكتب رقم هاتفك",
    messageLabel: "رسالتك",
    messagePlaceholder: "أخبرنا عن مشروعك أو استفسارك...",
    buttonText: "إرسال الرسالة",
    submitting: "جاري الإرسال...",
    success: "شكراً لك! تم إرسال رسالتك بنجاح.",
    error: "فشل إرسال الرسالة. الرجاء المحاولة مرة أخرى لاحقاً.",
  },
};

const t = computed(() => translations[locale.value] || translations.en);

// Form State
const form = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const isSubmitting = ref(false);
const statusMessage = ref("");
const statusType = ref(""); // 'success' or 'error'

// Styles for the Background Image
const backgroundStyle = computed(() => ({
  backgroundImage: `url('/contact.jpg')`,
  // The rest is handled by CSS classes for positioning and size
}));

// Methods
const submitForm = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  statusMessage.value = "";
  statusType.value = "";

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    // In a real application, you would make a fetch or axios POST request here
    console.log("Submitting form data:", form);

    // Simulating success
    statusType.value = "success";
    statusMessage.value = t.value.success;

    // Clear form on success
    form.name = "";
    form.email = "";
    form.phone = "";
    form.message = "";
  } catch (error) {
    console.error("Submission error:", error);
    statusType.value = "error";
    statusMessage.value = t.value.error;
  } finally {
    isSubmitting.value = false;
    // Clear status message after 5 seconds
    setTimeout(() => {
      statusMessage.value = "";
    }, 5000);
  }
};
</script>

<style lang="scss" scoped>
.contact-section {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 5rem 1rem;
}

.contact-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  padding: 3rem;
  background: rgba(
    255,
    255,
    255,
    0.05
  ); /* Slightly transparent card background */
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 991px) {
    padding: 1rem;
  }
}

/* --- Header Styles --- */
.header-content {
  text-align: center;
  margin-bottom: 3rem;

  .subtitle {
    font-size: 0.9rem;
    letter-spacing: 2px;
    color: #f2994a; /* Orange accent */
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -1px;
    margin: 0;
  }
}

/* --- Form Styles --- */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.input-group {
  display: flex;
  flex-direction: column;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    color: #f0f0f0;
    margin-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  input,
  textarea {
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: #ffffff;
    font-size: 1rem;
    transition: all 0.3s ease;
    width: 100%;

    // Ensure placeholder text is visible
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: #f2994a;
      box-shadow: 0 0 0 3px rgba(242, 153, 74, 0.5);
      background: rgba(255, 255, 255, 0.15);
    }
  }

  textarea {
    resize: vertical;
  }
}

/* --- Submit Area --- */
.submit-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 1rem;
}

.submit-button {
  width: 100%;
  max-width: 300px;
  padding: 15px 30px;
  background: #f2994a; /* Orange background */
  color: #1a202c;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease, opacity 0.3s ease;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: #e67e22; /* Slightly darker orange on hover */
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

/* --- Status Messages --- */
.status-message {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
}

.status-message.success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

/* --- Spinner for Submitting State --- */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* RTL Adjustments */
[dir="rtl"] {
  .header-content {
    direction: rtl;
  }
  .contact-form {
    direction: rtl;
  }
}
</style>
