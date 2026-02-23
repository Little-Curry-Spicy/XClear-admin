<template>
  <div class="flex min-h-screen items-center justify-center gap-6 bg-muted/30 p-4 flex-col lg:flex-row">
    <!-- Lottie 动画：支持 .json 与 .lottie (dotLottie) 格式 -->
    <div class="shrink-0 w-full max-w-[280px] lg:max-w-[320px] order-2 lg:order-1">
      <DotLottieVue
        src="/src/assets/lottie/login.lottie?url"
        style="height: 280px; width: 280px"
        class="mx-auto"
        autoplay
        loop
      />
    </div>
    <Card class="w-full max-w-md shrink-0 order-1 lg:order-2">
      <template #title>
        {{ $t('auth.login') }}
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-2">
            <label for="username" class="text-sm font-medium">{{ $t('auth.username') }}</label>
            <InputText
              id="username"
              v-model="username"
              :placeholder="$t('auth.usernamePlaceholder')"
              class="w-full"
              autocomplete="username"
              :invalid="!!errors.username"
            />
            <small v-if="errors.username" class="text-red-500">{{ errors.username }}</small>
          </div>
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">{{ $t('auth.password') }}</label>
            <Password
              id="password"
              v-model="password"
              :placeholder="$t('auth.passwordPlaceholder')"
              class="w-full"
              input-class="w-full"
              :feedback="false"
              toggle-mask
              autocomplete="current-password"
              :invalid="!!errors.password"
              @keyup.enter="handleSubmit"
            />
            <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-muted-foreground">{{ $t('auth.hint') }}</span>
              <Button type="submit" :loading="loading" :label="$t('auth.login')" class="min-w-[120px]" />
            </div>
            <RouterLink to="/register" class="text-center text-sm text-muted-foreground hover:text-foreground">
              {{ $t('auth.goToRegister') }}
            </RouterLink>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { toast } from '@/lib/toast'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errors = reactive<{ username?: string; password?: string }>({})

async function handleSubmit() {
  errors.username = undefined
  errors.password = undefined
  if (!username.value.trim()) {
    errors.username = t('auth.usernameRequired')
    return
  }
  if (!password.value) {
    errors.password = t('auth.passwordRequired')
    return
  }
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 400))
    // 演示：根据账号设置角色，admin 为管理员，其余为 user
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
