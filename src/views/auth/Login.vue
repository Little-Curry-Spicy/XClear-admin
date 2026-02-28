<template>
  <div class="login-page">
    <div class="login-page__bg" aria-hidden="true" />
    <div class="login-page__content">
      <!-- 左侧：插画区 -->
      <div
        class="login-visual"
        :class="{ 'login-lottie-dark': isDark }"
      >
        <div class="login-visual__shape" aria-hidden="true" />
        <DotLottieVue
          src="/src/assets/lottie/RunningCat.lottie"
          class="login-visual__lottie"
          autoplay
          loop
        />
      </div>

      <!-- 右侧：表单区 -->
      <v-card class="login-card" elevation="2">
        <div class="login-card__brand">
          <div class="login-card__logo">XC</div>
          <h1 class="login-card__title">{{ $t('auth.login') }}</h1>
          <p class="login-card__tagline">{{ $t('auth.loginTagline') }}</p>
        </div>
        <v-card-text class="login-card__body">
          <v-form
            class="login-form"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="username"
              :label="$t('auth.username')"
              :placeholder="$t('auth.usernamePlaceholder')"
              :error-messages="errors.username"
              autocomplete="username"
              variant="filled"
              hide-details="auto"
              class="w-full"
              @keyup.enter="onSubmit"
            />
            <v-text-field
              v-model="password"
              :label="$t('auth.password')"
              :placeholder="$t('auth.passwordPlaceholder')"
              :error-messages="errors.password"
              type="password"
              autocomplete="current-password"
              variant="filled"
              hide-details="auto"
              class="w-full"
              @keyup.enter="onSubmit"
            />
            <p class="text-xs text-muted-foreground login-form__hint">{{ $t('auth.hint') }}</p>
            <v-btn
              type="submit"
              block
              size="large"
              :loading="loading"
              color="primary"
              class="login-form__submit"
            >
              {{ $t('auth.login') }}
            </v-btn>
            <div class="text-center mt-2">
              <RouterLink
                to="/register"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
              >
                {{ $t('auth.goToRegister') }}
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
import { useRouter, useRoute } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { toast } from '@/lib/toast'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const username = ref('')
const password = ref('')
const loading = ref(false)
const errors = reactive<{ username?: string; password?: string }>({})

function validate(): boolean {
  errors.username = undefined
  errors.password = undefined
  if (!username.value.trim()) {
    errors.username = t('auth.usernameRequired')
    return false
  }
  if (!password.value) {
    errors.password = t('auth.passwordRequired')
    return false
  }
  return true
}

async function onSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 400))
    const roles = username.value.toLowerCase() === 'admin' ? ['admin'] : ['user']
    authStore.setAuth({
      token: 'mock-token-' + Date.now(),
      username: username.value.trim(),
      roles,
    })
    toast.success(t('auth.loginSuccess'))
    const redirect = (route.query.redirect as string) || '/'
    await router.push(redirect)
  } catch (e) {
    toast.error(t('auth.loginFailed'), (e as Error)?.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 整页：占满父容器，回退进入时父容器可能暂未撑开，用 min-height 兜底 */
.login-page {
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
}

/* 渐变背景：固定铺满视口，内容滚动时背景不动 */
.login-page__bg {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 50%);
}
.dark .login-page__bg {
  background: linear-gradient(135deg, hsl(222.2 47.4% 12%) 0%, hsl(var(--background)) 50%);
}

/* 内容区：左右分栏（大屏）或上下堆叠（小屏） */
.login-page__content {
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
  .login-page__content {
    flex-direction: row;
    gap: 3rem;
  }
}

/* 表单卡片：加大宽度与内边距 */
.login-card {
  width: 100%;
  max-width: 28rem;
  border-radius: 1rem;
  overflow: hidden;
}
@media (min-width: 640px) {
  .login-card {
    max-width: 32rem;
  }
}

.login-card__brand {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.login-card__body {
  padding: 0 2rem 2rem !important;
  padding-top: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 0.5rem;
}

.login-form__hint {
  margin-top: 0.25rem;
}

.login-form__submit {
  margin-top: 0.5rem;
}

.login-card__logo {
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

.login-card__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin: 0 0 0.5rem;
}

.login-card__tagline {
  font-size: 0.9375rem;
  color: hsl(var(--muted-foreground));
  margin: 0;
}

/* 右侧插画区 */
.login-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  max-width: 22rem;
}
@media (min-width: 1024px) {
  .login-visual {
    min-height: 320px;
    max-width: 380px;
  }
}

.login-visual__shape {
  position: absolute;
  width: 85%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, hsl(var(--muted)) 0%, transparent 65%);
  pointer-events: none;
}
.dark .login-visual__shape {
  background: radial-gradient(circle at 30% 30%, hsl(222.2 47.4% 18%) 0%, transparent 65%);
}

.login-visual__lottie {
  position: relative;
  width: 100%;
  height: auto;
  max-height: 240px;
}
@media (min-width: 1024px) {
  .login-visual__lottie {
    max-height: 320px;
  }
}

/* 深色模式下 Lottie 提亮 */
.login-lottie-dark .login-visual__lottie {
  filter: brightness(1.15) contrast(1.05);
  transition: filter 0.2s ease;
}
</style>