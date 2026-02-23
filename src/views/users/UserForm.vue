<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <Button icon="pi pi-arrow-left" text @click="goBack" />
      <div>
        <h2 class="text-2xl font-bold tracking-tight">{{ isEdit ? $t('common.edit') : $t('users.addUser') }}</h2>
        <p class="text-muted-foreground">{{ $t('users.description') }}</p>
      </div>
    </div>

    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('form.basicForm') }}</span>
      </template>
      <form @submit.prevent="handleSubmit" class="flex max-w-xl flex-col gap-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">{{ $t('table.name') }}</label>
          <InputText
            id="name"
            v-model="form.name"
            :placeholder="$t('form.namePlaceholder')"
            class="w-full"
            :invalid="!!errors.name"
          />
          <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
        </div>
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">{{ $t('table.email') }}</label>
          <InputText
            id="email"
            v-model="form.email"
            :placeholder="$t('form.emailPlaceholder')"
            class="w-full"
            :invalid="!!errors.email"
          />
          <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
        </div>
        <div class="space-y-2">
          <label for="phone" class="text-sm font-medium">{{ $t('form.phone') }}</label>
          <InputText
            id="phone"
            v-model="form.phone"
            :placeholder="$t('form.phonePlaceholder')"
            class="w-full"
          />
        </div>
        <div class="space-y-2">
          <label for="role" class="text-sm font-medium">{{ $t('table.role') }}</label>
          <Select
            id="role"
            v-model="form.role"
            :options="roleOptions"
            option-label="label"
            option-value="value"
            :placeholder="$t('form.selectRole')"
            class="w-full"
            :invalid="!!errors.role"
          />
          <small v-if="errors.role" class="text-red-500">{{ errors.role }}</small>
        </div>
        <div class="space-y-2">
          <label for="status" class="text-sm font-medium">{{ $t('table.status') }}</label>
          <Select
            id="status"
            v-model="form.status"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            class="w-full"
          />
        </div>
        <div class="flex gap-2 pt-2">
          <Button type="submit" :loading="loading" :label="$t('common.save')" />
          <Button type="button" severity="secondary" :label="$t('common.cancel')" @click="goBack" />
        </div>
      </form>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
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
