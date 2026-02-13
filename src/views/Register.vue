<template>
  <div class="flex min-h-screen items-center justify-center gap-6 bg-muted/30 p-4 flex-col lg:flex-row">
    <!-- Lottie 动画：支持 .json 与 .lottie (dotLottie) 格式 -->
    <div class="shrink-0 w-full max-w-[280px] lg:max-w-[320px] order-2 lg:order-1">
      <DotLottieVue
        src="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"
        style="height: 280px; width: 280px"
        class="mx-auto"
        autoplay
        loop
      />
    </div>
    <Card class="w-full max-w-md shrink-0 order-1 lg:order-2">
      <template #title>
        {{ $t('auth.register') }}
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-2">
            <label for="reg-username" class="text-sm font-medium">{{ $t('auth.username') }}</label>
            <InputText
              id="reg-username"
              v-model="username"
              :placeholder="$t('auth.usernamePlaceholder')"
              class="w-full"
              autocomplete="username"
              :invalid="!!errors.username"
            />
            <small v-if="errors.username" class="text-red-500">{{ errors.username }}</small>
          </div>
          <div class="space-y-2">
            <label for="reg-email" class="text-sm font-medium">{{ $t('auth.email') }}</label>
            <InputText
              id="reg-email"
              v-model="email"
              type="email"
              :placeholder="$t('auth.emailPlaceholder')"
              class="w-full"
              autocomplete="email"
              :invalid="!!errors.email"
            />
            <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
          </div>
          <div class="space-y-2">
            <label for="reg-password" class="text-sm font-medium">{{ $t('auth.password') }}</label>
            <Password
              id="reg-password"
              v-model="password"
              :placeholder="$t('auth.passwordPlaceholder')"
              class="w-full"
              input-class="w-full"
              :feedback="true"
              toggle-mask
              autocomplete="new-password"
              :invalid="!!errors.password"
            />
            <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>
          </div>
          <div class="space-y-2">
            <label for="reg-confirm" class="text-sm font-medium">{{ $t('auth.confirmPassword') }}</label>
            <Password
              id="reg-confirm"
              v-model="confirmPassword"
              :placeholder="$t('auth.confirmPasswordPlaceholder')"
              class="w-full"
              input-class="w-full"
              :feedback="false"
              toggle-mask
              autocomplete="new-password"
              :invalid="!!errors.confirmPassword"
              @keyup.enter="handleSubmit"
            />
            <small v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</small>
          </div>
          <div class="flex flex-col gap-3">
            <Button type="submit" :loading="loading" :label="$t('auth.register')" class="w-full min-w-[120px]" />
            <RouterLink to="/login" class="text-center text-sm text-muted-foreground hover:text-foreground">
              {{ $t('auth.goToLogin') }}
            </RouterLink>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth'
import { toast } from '@/lib/toast'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

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

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    await authStore.register(username.value.trim(), email.value.trim(), password.value)
    toast.success(t('auth.registerSuccess'))
    await router.push('/')
  } catch (e) {
    toast.error(t('auth.registerFailed'), (e as Error)?.message)
  } finally {
    loading.value = false
  }
}
</script>
