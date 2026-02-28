<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <v-btn icon="mdi-arrow-left" variant="text" @click="goBack" />
      <div>
        <h2 class="text-2xl font-bold tracking-tight">{{ isEdit ? $t('common.edit') : $t('users.addUser') }}</h2>
        <p class="text-muted-foreground">{{ $t('users.description') }}</p>
      </div>
    </div>

    <v-card>
      <v-card-title>{{ $t('form.basicForm') }}</v-card-title>
      <v-card-text>
        <form @submit.prevent="handleSubmit" class="flex max-w-xl flex-col gap-4">
          <v-text-field
            v-model="form.name"
            :label="$t('table.name')"
            :placeholder="$t('form.namePlaceholder')"
            :error-messages="errors.name"
            density="comfortable"
            clearable
          />
          <v-text-field
            v-model="form.email"
            :label="$t('table.email')"
            :placeholder="$t('form.emailPlaceholder')"
            :error-messages="errors.email"
            density="comfortable"
            clearable
          />
          <v-text-field
            v-model="form.phone"
            :label="$t('form.phone')"
            :placeholder="$t('form.phonePlaceholder')"
            density="comfortable"
            clearable
          />
          <v-select
            v-model="form.role"
            :label="$t('table.role')"
            :items="roleOptions"
            item-title="label"
            item-value="value"
            :placeholder="$t('form.selectRole')"
            :error-messages="errors.role"
            density="comfortable"
            clearable
          />
          <v-select
            v-model="form.status"
            :label="$t('table.status')"
            :items="statusOptions"
            item-title="label"
            item-value="value"
            density="comfortable"
          />
          <div class="flex gap-2 pt-2">
            <v-btn type="submit" :loading="loading" color="primary">
              {{ $t('common.save') }}
            </v-btn>
            <v-btn variant="outlined" @click="goBack">
              {{ $t('common.cancel') }}
            </v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from '@/lib/toast'
import { getMockUser, mockUserList, type UserItem } from './mock'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id ? Number(route.params.id) : null)
const isEdit = computed(() => !!id.value)

const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: 'active',
})
const errors = reactive<Record<string, string>>({})

const roleOptions = [
  { label: t('table.roleAdmin'), value: 'admin' },
  { label: t('table.roleUser'), value: 'user' },
  { label: t('table.roleEditor'), value: 'editor' },
]
const statusOptions = [
  { label: t('table.statusActive'), value: 'active' },
  { label: t('table.statusInactive'), value: 'inactive' },
]

onMounted(() => {
  if (isEdit.value && id.value) {
    const u = getMockUser(id.value)
    if (u) {
      form.name = u.name
      form.email = u.email
      form.phone = u.phone ?? ''
      form.role = u.role
      form.status = u.status
    }
  }
})

function goBack() {
  if (isEdit.value && id.value) router.push(`/users/${id.value}`)
  else router.push('/users')
}

function validate(): boolean {
  errors.name = ''
  errors.email = ''
  errors.role = ''
  if (!form.name.trim()) errors.name = t('form.required')
  if (!form.email.trim()) errors.email = t('form.required')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('auth.invalidEmail')
  if (!form.role) errors.role = t('form.required')
  return !errors.name && !errors.email && !errors.role
}

function handleSubmit() {
  if (!validate()) return
  loading.value = true
  setTimeout(() => {
    if (isEdit.value && id.value) {
      const index = mockUserList.findIndex(u => u.id === id.value)
      if (index > -1) {
        mockUserList[index] = {
          ...mockUserList[index],
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          role: form.role,
          status: form.status,
        }
      }
      toast.success(t('form.submitSuccess'))
      router.push(`/users/${id.value}`)
    } else {
      const newUser: UserItem = {
        id: Math.max(...mockUserList.map(u => u.id), 0) + 1,
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        role: form.role,
        status: form.status,
        createdAt: new Date().toISOString().slice(0, 10),
      }
      mockUserList.push(newUser)
      toast.success(t('form.submitSuccess'))
      router.push(`/users/${newUser.id}`)
    }
    loading.value = false
  }, 400)
}
</script>
