<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('changePassword.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('changePassword.description') }}</p>
    </div>
    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('changePassword.title') }}</span>
      </template>
      <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md">
        <div class="space-y-2">
          <label for="old" class="text-sm font-medium">{{ $t('changePassword.oldPassword') }}</label>
          <Password
            id="old"
            v-model="oldPassword"
            class="w-full"
            input-class="w-full"
            :feedback="false"
            toggle-mask
            :invalid="!!errors.oldPassword"
          />
          <small v-if="errors.oldPassword" class="text-red-500">{{ errors.oldPassword }}</small>
        </div>
        <div class="space-y-2">
          <label for="new" class="text-sm font-medium">{{ $t('changePassword.newPassword') }}</label>
          <Password
            id="new"
            v-model="newPassword"
            class="w-full"
            input-class="w-full"
            :feedback="true"
            toggle-mask
            :invalid="!!errors.newPassword"
          />
          <small v-if="errors.newPassword" class="text-red-500">{{ errors.newPassword }}</small>
        </div>
        <div class="space-y-2">
          <label for="confirm" class="text-sm font-medium">{{ $t('changePassword.confirmPassword') }}</label>
          <Password
            id="confirm"
            v-model="confirmPassword"
            class="w-full"
            input-class="w-full"
            :feedback="false"
            toggle-mask
            :invalid="!!errors.confirmPassword"
          />
          <small v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</small>
        </div>
        <Button type="submit" :loading="loading" :label="$t('changePassword.submit')" />
      </form>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Panel from 'primevue/panel'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { toast } from '@/lib/toast'

const { t } = useI18n()
const router = useRouter()
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errors = reactive<{ oldPassword?: string; newPassword?: string; confirmPassword?: string }>({})

function handleSubmit() {
  errors.oldPassword = undefined
  errors.newPassword = undefined
  errors.confirmPassword = undefined
  if (!oldPassword.value) {
    errors.oldPassword = t('auth.passwordRequired')
    return
  }
  if (!newPassword.value) {
    errors.newPassword = t('auth.passwordRequired')
    return
  }
  if (newPassword.value.length < 6) {
    errors.newPassword = t('auth.passwordMinLength')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = t('auth.passwordMismatch')
    return
  }
  loading.value = true
  // 模拟提交，实际对接 PUT /auth/password 等
  setTimeout(() => {
    loading.value = false
    toast.success(t('changePassword.success'))
    router.push('/login')
  }, 600)
}
</script>
