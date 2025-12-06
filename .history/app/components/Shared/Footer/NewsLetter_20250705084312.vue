<template>
  <div class="newsletter">
    <div class="wrapper container">
      <div class="title" data-aos="zoom-out">
        {{ $t("Get In Touch") }}
      </div>
      <div class="field" data-aos="flip-down">
        <form @submit.prevent="submitNewsletter()">
          <div class="input-wrapper" :class="{ ar: $i18n.locale === 'ar' }">
            <div class="icon-wrapper">
              <Icon name="mdi:envelope" size="20px" />
            </div>
            <input
              :class="{ ar: $i18n.locale === 'ar' }"
              v-model="email"
              type="email"
              name="email"
              class="input"
              required
              :placeholder="$t('Enter your email')"
            />
            <button class="submit" :disabled="loading">
              <span v-if="!loading">
                {{ $t("Subscribe") }}
              </span>
              <span v-else>
                <Icon name="eos-icons:loading" size="20px" />
              </span>
            </button>
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="success" class="success-message">{{ success }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    // Here you would typically call your API
    // await subscribeToNewsletter(email.value);
    success.value = "Thank you for subscribing!";
    email.value = "";
    setTimeout(() => (success.value = ""), 3000);
  } catch (err) {
    error.value = "Subscription failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.newsletter {
  background-color: #000;
  padding: 2rem 0rem;

  .wrapper {
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #fff;
    padding-bottom: 30px;
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
  }

  .title {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
    width: 100%;
    text-align: start;
  }

  .description {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 1.5rem;
  }

  .field {
    width: 100%;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .input-wrapper {
      display: flex;
      width: 100%;
      max-width: 600px;
      background: white;
      border-radius: 0px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;

      &.ar {
        flex-direction: row-reverse;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        color: #7f8c8d;
      }

      .input {
        flex: 1;
        padding: 1rem;
        border: none;
        outline: none;
        font-size: 1rem;
        background: transparent;

        &::placeholder {
          color: #bdc3c7;
        }

        &.ar {
          text-align: right;
        }
      }

      .submit {
        background: linear-gradient(135deg, $second, #65a47b);
        color: white;
        border: none;
        padding: 0 2rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;

        &:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        &:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
      }
    }

    .error-message {
      color: #e74c3c;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    .success-message {
      color: #2ecc71;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 768px) {
  .newsletter {
    padding: 1.5rem 1rem;

    .title {
      font-size: 1.5rem;
    }

    .description {
      font-size: 0.9rem;
    }

    .field {
      .input-wrapper {
        .icon-wrapper {
          display: none;
        }

        .input {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #eee;
          width: calc(100% - 150px);
        }

        .submit {
          padding: 0.75rem;
          width: 150px;
        }
      }
    }
  }
}
</style>
