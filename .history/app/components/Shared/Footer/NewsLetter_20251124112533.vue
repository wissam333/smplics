<template>
  <div class="newsletter-container">
    <div class="text-content">
      <h3 class="heading">{{ $t("GetInTouch") }}</h3>
      <p class="sub-heading">
        {{ $t("Subscribe to our newsletter for latest updates") }}
      </p>
    </div>

    <div class="form-content">
      <form @submit.prevent="submitNewsletter">
        <div 
          class="input-group" 
          :class="{ 
            // 🚨 FIXED: Only apply the 'ar' class if the component is mounted
            ar: isMounted && $i18n.locale === 'ar' 
          }"
        >
          <div class="icon-box">
            <Icon name="mdi:envelope-outline" size="22" />
          </div>
          <input
            v-model="email"
            type="email"
            :placeholder="$t('Enter your email')"
            class="email-input"
            required
          />
          <button class="submit-btn" :disabled="loading">
            <span v-if="!loading">{{ $t("Subscribe") }}</span>
            <Icon v-else name="svg-spinners:ring-resize" size="20" />
          </button>
        </div>
        <div class="messages">
          <span v-if="error" class="msg error">{{ error }}</span>
          <span v-if="success" class="msg success">{{ success }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Import necessary functions

// 🚨 NEW: Flag to control class rendering during hydration
const isMounted = ref(false); 

const email = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");

const submitNewsletter = async () => {
  if (!email.value) {
    error.value = "Please enter your email";
    return;
  }
  try {
    loading.value = true;
    error.value = "";
    // await apiCall(email.value); // API call placeholder
    success.value = "Thank you for subscribing!";
    email.value = "";
    setTimeout(() => (success.value = ""), 3000);
  } catch (err) {
    error.value = "Subscription failed.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // Set mounted flag to true after the component is attached to the DOM
  isMounted.value = true; 
});
</script>

<style lang="scss" scoped>
.newsletter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }
}

.text-content {
  .heading {
    font-size: 24px;
    font-weight: bold;
    color: #fff; // Placeholder color, use your Sass variable
    margin-bottom: 5px;
    color: $main; // Placeholder color
  }
  .sub-heading {
    color: #aaa;
    font-size: 14px;
    margin: 0;
  }
}

.form-content {
  flex-grow: 1;
  max-width: 500px;
  width: 100%;
}

.input-group {
  display: flex;
  background: #fff;
  border-radius: 50px; // Pill shape
  overflow: hidden;
  padding: 3px;
  transition: box-shadow 0.3s;

  &:focus-within {
    box-shadow: 0 0 0 3px rgba($main, 0.3); // Placeholder color
  }

  &.ar {
    flex-direction: row-reverse;
    .email-input {
      text-align: right;
    }
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    color: #888;
  }

  .email-input {
    border: none;
    outline: none;
    flex: 1;
    padding: 12px 10px;
    font-size: 15px;
    color: #333;
    min-width: 0; // Fix flexbox overflow
  }

  .submit-btn {
    background: $main; // Placeholder color
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 10px 25px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: $main; // Placeholder color
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
}

.messages {
  margin-top: 8px;
  font-size: 13px;
  height: 20px; // Prevent layout jump
  .msg.error {
    color: #ff4d4d;
  }
  .msg.success {
    color: #4caf50;
  }
}
</style>