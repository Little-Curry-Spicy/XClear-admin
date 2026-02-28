<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('changePassword.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('changePassword.description') }}</p>
    </div>
    <v-card>
      <v-card-title>{{ $t('changePassword.title') }}</v-card-title>
      <v-card-text>
        <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md">
          <v-text-field
            id="old"
            v-model="oldPassword"
            :label="$t('changePassword.oldPassword')"
            type="password"
            :error-messages="errors.oldPassword"
            density="comfortable"
            clearable
          />
          <v-text-field
            id="new"
            v-model="newPassword"
            :label="$t('changePassword.newPassword')"
            type="password"
            :error-messages="errors.newPassword"
            density="comfortable"
            clearable
          />
          <v-text-field
            id="confirm"
            v-model="confirmPassword"
            :label="$t('changePassword.confirmPassword')"
            type="password"
            :error-messages="errors.confirmPassword"
            density="comfortable"
            clearable
          />
          <v-btn type="submit" :loading="loading" color="primary">
            {{ $t('changePassword.submit') }}
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
  setTimeout(() => {
    loading.value = false
    toast.success(t('changePassword.success'))
    router.push('/login')
  }, 600)
}
</script>
