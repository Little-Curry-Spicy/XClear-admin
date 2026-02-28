<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('form.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('form.description') }}</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <v-card>
        <v-card-title>{{ $t('form.basicForm') }}</v-card-title>
        <v-card-text>
          <p class="text-sm text-muted-foreground mb-4">{{ $t('form.basicFormDesc') }}</p>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <v-text-field
              v-model="formData.name"
              :label="$t('form.name')"
              :placeholder="$t('form.namePlaceholder')"
              :error-messages="errors.name"
              density="comfortable"
              clearable
            />
            <v-text-field
              v-model="formData.email"
              :label="$t('form.email')"
              type="email"
              :placeholder="$t('form.emailPlaceholder')"
              :error-messages="errors.email"
              density="comfortable"
              clearable
            />
            <v-text-field
              v-model="formData.phone"
              :label="$t('form.phone')"
              type="tel"
              :placeholder="$t('form.phonePlaceholder')"
              :error-messages="errors.phone"
              density="comfortable"
              clearable
            />
            <v-select
              v-model="formData.role"
              :label="$t('form.role')"
              :items="roleOptions"
              item-title="label"
              item-value="value"
              :placeholder="$t('form.selectRole')"
              :error-messages="errors.role"
              density="comfortable"
              clearable
            />
            <v-select
              v-model="formData.status"
              :label="$t('form.status')"
              :items="statusOptions"
              item-title="label"
              item-value="value"
              density="comfortable"
            />
            <v-textarea
              v-model="formData.description"
              :label="$t('form.description')"
              :placeholder="$t('form.descriptionPlaceholder')"
              :error-messages="errors.description"
              rows="4"
              density="comfortable"
            />
            <div class="mt-6 flex justify-end gap-2">
              <v-btn variant="outlined" @click="handleReset">{{ $t('common.reset') }}</v-btn>
              <v-btn type="submit" color="primary">{{ $t('common.submit') }}</v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>{{ $t('form.formData') }}</v-card-title>
        <v-card-text>
          <p class="text-sm text-muted-foreground mb-4">{{ $t('form.formDataDesc') }}</p>
          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">{{ $t('form.currentData') }}</label>
              <pre class="rounded-md bg-muted p-4 text-sm overflow-auto">{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
            <div v-if="Object.keys(errors).some(key => errors[key as keyof typeof errors])">
              <label class="mb-2 block text-sm font-medium text-red-500">{{ $t('form.errors') }}</label>
              <pre class="rounded-md bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-600 overflow-auto">{{ JSON.stringify(errors, null, 2) }}</pre>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from '@/lib/toast'

const { t } = useI18n()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  role: '' as string | undefined,
  status: 'active',
  description: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: '',
  description: '',
})

const roleOptions = computed(() => [
  { label: t('form.roleAdmin'), value: 'admin' },
  { label: t('form.roleUser'), value: 'user' },
  { label: t('form.roleEditor'), value: 'editor' },
])

const statusOptions = computed(() => [
  { label: t('form.statusActive'), value: 'active' },
  { label: t('form.statusInactive'), value: 'inactive' },
])

const validate = () => {
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  if (!formData.name.trim()) {
    errors.name = t('form.required')
  }

  if (!formData.email.trim()) {
    errors.email = t('form.required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('form.email')
  }

  if (!formData.role) {
    errors.role = t('form.required')
  }

  if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
    errors.phone = t('form.pattern')
  }

  return !Object.values(errors).some(error => error)
}

const handleSubmit = () => {
  if (validate()) {
    toast.success(t('form.submitSuccess'))
  }
}

const handleReset = () => {
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.role = ''
  formData.status = 'active'
  formData.description = ''
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}
</script>
