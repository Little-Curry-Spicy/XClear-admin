<template>
  <div class="auth-page">
    <div class="auth-page__bg" aria-hidden="true" />
    <div class="auth-page__content">
      <!-- 左侧：插画区 -->
      <div
        class="auth-visual"
        :class="{ 'auth-lottie-dark': isDark }"
      >
        <div class="auth-visual__shape" aria-hidden="true" />
        <DotLottieVue
          src="/src/assets/lottie/RunningCat.lottie"
          class="auth-visual__lottie"
          autoplay
          loop
        />
      </div>

      <!-- 右侧：表单区 -->
      <v-card class="auth-card" elevation="2">
        <div class="auth-card__brand">
          <div class="auth-card__logo">XC</div>
          <h1 class="auth-card__title">{{ $t('auth.register') }}</h1>
          <p class="auth-card__tagline">{{ $t('auth.registerTagline') }}</p>
        </div>
        <v-card-text class="auth-card__body">
          <v-form
            class="auth-form"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="username"
              :label="$t('auth.username')"
              :placeholder="$t('auth.usernamePlaceholder')"
              :error-messages="errors.username"
              autocomplete="username"
              density="comfortable"
              variant="filled"
              hide-details="auto"
              clearable
              class="w-full"
              @keyup.enter="onSubmit"
            />
            <v-text-field
              v-model="email"
              :label="$t('auth.email')"
              :placeholder="$t('auth.emailPlaceholder')"
              :error-messages="errors.email"
              type="email"
              autocomplete="email"
              density="comfortable"
              variant="filled"
              hide-details="auto"
              clearable
              class="w-full"
              @keyup.enter="onSubmit"
            />
            <v-text-field
              v-model="password"
              :label="$t('auth.password')"
              :placeholder="$t('auth.passwordPlaceholder')"
              :error-messages="errors.password"
              type="password"
              autocomplete="new-password"
              density="comfortable"
              variant="filled"
              hide-details="auto"
              clearable
              class="w-full"
              @keyup.enter="onSubmit"
            />
            <v-text-field
              v-model="confirmPassword"
              :label="$t('auth.confirmPassword')"
              :placeholder="$t('auth.confirmPasswordPlaceholder')"
              :error-messages="errors.confirmPassword"
              type="password"
              autocomplete="new-password"
              density="comfortable"
              variant="filled"
              hide-details="auto"
              clearable
              class="w-full"
              @keyup.enter="onSubmit"
            />
            <v-btn
              type="submit"
              block
              size="large"
              :loading="loading"
              color="primary"
              class="auth-form__submit"
            >
              {{ $t('auth.register') }}
            </v-btn>
            <div class="text-center mt-2">
              <RouterLink
                to="/login"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {{ $t('auth.goToLogin') }}
              </RouterLink>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { toast } from '@/lib/toast'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const router = useRouter()
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errors = reactive<{ username?: string; email?: string; password?: string; confirmPassword?: string }>({})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.username = undefined
  errors.email = undefined
  errors.password = undefined
  errors.confirmPassword = undefined
  if (!username.value.trim()) {
    errors.username = t('auth.usernameRequired')
    return false
  }
  if (!email.value.trim()) {
    errors.email = t('auth.emailRequired')
    return false
  }
  if (!emailRegex.test(email.value.trim())) {
    errors.email = t('auth.invalidEmail')
    return false
  }
  if (!password.value) {
    errors.password = t('auth.passwordRequired')
    return false
  }
  if (password.value.length < 6) {
    errors.password = t('auth.passwordMinLength')
    return false
  }
  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = t('auth.passwordMismatch')
    return false
  }
  return true
}

async function onSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 500))
    toast.success(t('auth.registerSuccess'))
    await router.push('/')
  } catch (e) {
    toast.error(t('auth.registerFailed'), (e as Error)?.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 渐变背景：随主题变量变化（浅色/深色） */
.auth-page__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 50%);
}

.auth-page__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 1100px;
}
@media (min-width: 1024px) {
  .auth-page__content {
    flex-direction: row;
    gap: 3rem;
  }
}

.auth-card {
  width: 100%;
  max-width: 28rem;
  border-radius: 1rem;
  overflow: hidden;
}
@media (min-width: 640px) {
  .auth-card {
    max-width: 32rem;
  }
}

.auth-card__brand {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.auth-card__body {
  padding: 0 2rem 2rem !important;
  padding-top: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 0.5rem;
}

.auth-form__submit {
  margin-top: 0.5rem;
}

.auth-card__logo {
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  color: hsl(var(--primary-foreground));
  background: hsl(var(--primary));
  border-radius: 0.5rem;
}

.auth-card__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin: 0 0 0.5rem;
}

.auth-card__tagline {
  font-size: 0.9375rem;
  color: hsl(var(--muted-foreground));
  margin: 0;
}

.auth-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  max-width: 22rem;
}
@media (min-width: 1024px) {
  .auth-visual {
    min-height: 320px;
    max-width: 380px;
  }
}

/* 插画圆形装饰：随主题变量变化 */
.auth-visual__shape {
  position: absolute;
  width: 85%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, hsl(var(--muted)) 0%, transparent 65%);
  pointer-events: none;
}

.auth-visual__lottie {
  position: relative;
  width: 100%;
  height: auto;
  max-height: 240px;
}
@media (min-width: 1024px) {
  .auth-visual__lottie {
    max-height: 320px;
  }
}

.auth-lottie-dark .auth-visual__lottie {
  filter: brightness(1.15) contrast(1.05);
  transition: filter 0.2s ease;
}
</style>
