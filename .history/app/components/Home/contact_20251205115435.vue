<template>
  <section class="contact-section">
    <div class="header">
      <h1>Contact us <span class="star">✦</span></h1>
    </div>

    <div class="container">
      <div class="info-card">
        <div class="glow-effect"></div>

        <div class="info-item">
          <div class="icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span>AUE - DubI</span>
        </div>

        <div class="info-item">
          <div class="icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <a href="mailto:teamleader@smpllcs.com">teamleader@smpllcs.com</a>
        </div>

        <div class="info-item">
          <div class="icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
          </div>
          <a href="tel:+971585840433">+(971) 58584-0433</a>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Your Name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="example@email.com"
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            placeholder="Phone Number"
          />
        </div>

        <div class="form-group">
          <label>Preferred Meeting Time <span class="required">*</span></label>
          <div class="time-grid">
            <button
              type="button"
              v-for="time in timeSlots"
              :key="time"
              :class="['time-btn', { active: form.selectedTime === time }]"
              @click="selectTime(time)"
            >
              {{ time }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="message">Message <span class="required">*</span></label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            placeholder="Write Your Message..."
          ></textarea>
        </div>

        <div class="submit-wrapper">
          <button type="submit" class="cta-button">
            <span class="sparkle-icon">✨</span>
            Get In Touch
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script setup>
// Form State
const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
  selectedTime: "",
});

// Time Slots Data
const timeSlots = [
  "12:00 AM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

const selectTime = (time) => {
  form.value.selectedTime = time;
};

const handleSubmit = () => {};
</script>
<style scoped>
.contact-section {
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 4rem 1rem;
  font-family: sans-serif; /* Replace with your font */
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.star {
  color: var(--accent-color);
  font-size: 1.5rem;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Tablet & Desktop Layout */
@media (min-width: 900px) {
  .container {
    flex-direction: row;
    align-items: flex-start;
  }
}

/* --- Left Info Card --- */
.info-card {
  flex: 1;
  background-color: #2e2a25; /* Fallback dark brown */
  /* Creating the gradient look from the image using your accent color */
  background: radial-gradient(
      circle at top left,
      rgba(238, 118, 57, 0.15),
      transparent 60%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 600;
}

.info-item a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.info-item a:hover {
  color: var(--accent-color);
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
}

/* --- Right Form --- */
.contact-form {
  flex: 2;
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.required {
  color: var(--danger);
}

input,
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

input:focus,
textarea:focus {
  border-color: var(--accent-color);
}

input::placeholder,
textarea::placeholder {
  color: #666; /* Subtle placeholder */
}

/* Time Grid */
.time-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 600px) {
  .time-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.time-btn {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.time-btn:hover {
  border-color: var(--accent-color);
}

.time-btn.active {
  background-color: var(--card-bg);
  border-color: var(--accent-color);
  /* Optional: Make text orange too if desired */
  /* color: var(--accent-color); */
  box-shadow: 0 0 0 1px var(--accent-color) inset;
}

/* Submit Button */
.submit-wrapper {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.cta-button {
  background-color: #2a2a2a; /* Dark button base */
  color: #fff;
  border: 1px solid var(--accent-color);
  padding: 12px 40px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s;

  /* The glow effect seen in image */
  box-shadow: 0 4px 15px rgba(238, 118, 57, 0.2);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(238, 118, 57, 0.3);
}

.cta-button:active {
  transform: translateY(0);
}
</style>
