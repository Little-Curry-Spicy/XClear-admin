<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('form.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('form.description') }}</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <Panel :header="$t('form.basicForm')">
        <p class="text-sm text-muted-foreground mb-4">{{ $t('form.basicFormDesc') }}</p>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="flex flex-col gap-2">
            <label for="name">{{ $t('form.name') }} <span class="text-red-500">*</span></label>
            <InputText
              id="name"
              v-model="formData.name"
              :placeholder="$t('form.namePlaceholder')"
              :class="{ 'p-invalid': errors.name }"
              class="w-full"
            />
            <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="email">{{ $t('form.email') }} <span class="text-red-500">*</span></label>
            <InputText
              id="email"
              v-model="formData.email"
              type="email"
              :placeholder="$t('form.emailPlaceholder')"
              :class="{ 'p-invalid': errors.email }"
              class="w-full"
            />
            <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="phone">{{ $t('form.phone') }}</label>
            <InputText
              id="phone"
              v-model="formData.phone"
              type="tel"
              :placeholder="$t('form.phonePlaceholder')"
              :class="{ 'p-invalid': errors.phone }"
              class="w-full"
            />
            <small v-if="errors.phone" class="text-red-500">{{ errors.phone }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="role">{{ $t('form.role') }} <span class="text-red-500">*</span></label>
            <Select
              id="role"
              v-model="formData.role"
              :options="roleOptions"
              option-label="label"
              option-value="value"
              :placeholder="$t('form.selectRole')"
              :class="{ 'p-invalid': errors.role }"
              class="w-full"
            />
            <small v-if="errors.role" class="text-red-500">{{ errors.role }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="status">{{ $t('form.status') }}</label>
            <Select
              id="status"
              v-model="formData.status"
              :options="statusOptions"
              option-label="label"
              option-value="value"
              class="w-full"
            />
            <small v-if="errors.status" class="text-red-500">{{ errors.status }}</small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="description">{{ $t('form.description') }}</label>
            <Textarea
              id="description"
              v-model="formData.description"
              :placeholder="$t('form.descriptionPlaceholder')"
              :rows="4"
              :class="{ 'p-invalid': errors.description }"
              class="w-full"
            />
            <small v-if="errors.description" class="text-red-500">{{ errors.description }}</small>
          </div>

          <div class="mt-6 flex justify-end gap-2">
            <Button type="button" severity="secondary" outlined @click="handleReset">
              {{ $t('common.reset') }}
            </Button>
            <Button type="submit">{{ $t('common.submit') }}</Button>
          </div>
        </form>
      </Panel>

      <Panel :header="$t('form.formData')">
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
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
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
    console.log('提交数据:', formData)
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
