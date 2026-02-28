<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ $t('users.title') }}</h2>
        <p class="text-muted-foreground">{{ $t('users.description') }}</p>
      </div>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="router.push('/users/add')">
        {{ $t('users.addUser') }}
      </v-btn>
    </div>

    <v-card>
      <v-card-title>{{ $t('table.searchAndFilter') }}</v-card-title>
      <v-card-text>
        <div class="flex flex-col gap-4 sm:flex-row">
          <v-text-field
            v-model="searchQuery"
            :placeholder="$t('table.searchPlaceholder')"
            density="comfortable"
            clearable
            hide-details
            class="flex-1"
          />
          <v-select
            v-model="filterStatus"
            :items="statusOptions"
            item-title="label"
            item-value="value"
            :placeholder="$t('table.allStatus')"
            density="comfortable"
            hide-details
            class="w-full sm:w-[160px]"
          />
          <v-select
            v-model="filterRole"
            :items="roleOptions"
            item-title="label"
            item-value="value"
            :placeholder="$t('table.allRoles')"
            density="comfortable"
            hide-details
            class="w-full sm:w-[160px]"
          />
        </div>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>{{ $t('table.userList') }}</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="filteredList"
          :loading="loading"
          :items-per-page="10"
          :items-per-page-options="[10, 20, 30]"
          class="elevation-0"
        >
          <template #item.name="{ item }">
            <RouterLink :to="`/users/${item.id}`" class="font-medium text-primary hover:underline">
              {{ item.name }}
            </RouterLink>
          </template>
          <template #item.role="{ item }">
            <v-chip :color="getRoleSeverity(item.role) === 'danger' ? 'error' : getRoleSeverity(item.role) === 'info' ? 'info' : 'default'" size="small">
              {{ getRoleLabel(item.role) }}
            </v-chip>
          </template>
          <template #item.status="{ item }">
            <v-chip :color="item.status === 'active' ? 'success' : 'default'" size="small">
              {{ item.status === 'active' ? $t('table.statusActive') : $t('table.statusInactive') }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <div class="flex gap-2">
              <v-btn size="small" variant="text" prepend-icon="mdi-pencil" @click="router.push(`/users/${item.id}/edit`)">
                {{ $t('common.edit') }}
              </v-btn>
              <v-btn size="small" variant="text" color="error" prepend-icon="mdi-delete" @click="handleDelete(item)">
                {{ $t('common.delete') }}
              </v-btn>
            </div>
          </template>
          <template #no-data>
            <p class="py-4 text-center text-muted-foreground">{{ $t('table.noData') }}</p>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDebounceFn } from '@vueuse/core'
import { useConfirm } from '@/lib/confirm'
import { toast } from '@/lib/toast'
import { mockUserList } from './mock'

const { t } = useI18n()
const router = useRouter()
const confirm = useConfirm()
const loading = ref(false)
const searchQuery = ref('')
const debouncedQuery = ref('')
const filterStatus = ref<string | undefined>(undefined)
const filterRole = ref<string | undefined>(undefined)

const headers = computed(() => [
  { title: 'ID', key: 'id', width: '4rem' },
  { title: t('table.name'), key: 'name' },
  { title: t('table.email'), key: 'email' },
  { title: t('table.role'), key: 'role' },
  { title: t('table.status'), key: 'status' },
  { title: t('common.operation'), key: 'actions', sortable: false, width: '12rem' },
])

const statusOptions = [
  { label: t('table.allStatus'), value: undefined },
  { label: t('table.statusActive'), value: 'active' },
  { label: t('table.statusInactive'), value: 'inactive' },
]
const roleOptions = [
  { label: t('table.allRoles'), value: undefined },
  { label: t('table.roleAdmin'), value: 'admin' },
  { label: t('table.roleUser'), value: 'user' },
  { label: t('table.roleEditor'), value: 'editor' },
]

const list = ref(mockUserList)
const debounceSearch = useDebounceFn((v: string) => { debouncedQuery.value = v }, 300)
watch(searchQuery, v => debounceSearch(v))

const filteredList = computed(() => {
  let result = [...list.value]
  if (debouncedQuery.value) {
    const q = debouncedQuery.value.toLowerCase()
    result = result.filter(
      item =>
        item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q)
    )
  }
  if (filterStatus.value) result = result.filter(item => item.status === filterStatus.value)
  if (filterRole.value) result = result.filter(item => item.role === filterRole.value)
  return result
})

function getRoleLabel(role: string) {
  const map: Record<string, string> = {
    admin: t('table.roleAdmin'),
    user: t('table.roleUser'),
    editor: t('table.roleEditor'),
  }
  return map[role] || role
}

function getRoleSeverity(role: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
  if (role === 'admin') return 'danger'
  if (role === 'editor') return 'info'
  return 'secondary'
}

function handleDelete(row: { id: number; name: string }) {
  confirm.require({
    header: t('common.confirm'),
    message: t('table.confirmDelete', { name: row.name }),
    rejectLabel: t('common.cancel'),
    acceptLabel: t('common.delete'),
    acceptClass: 'p-button-danger',
    accept: () => {
      const index = list.value.findIndex(item => item.id === row.id)
      if (index > -1) {
        list.value.splice(index, 1)
        toast.success(t('table.deleteSuccess', { name: row.name }))
      }
    },
  })
}
</script>
