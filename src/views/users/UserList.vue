<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ $t('users.title') }}</h2>
        <p class="text-muted-foreground">{{ $t('users.description') }}</p>
      </div>
      <Button :label="$t('users.addUser')" icon="pi pi-plus" @click="router.push('/users/add')" />
    </div>

    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('table.searchAndFilter') }}</span>
      </template>
      <div class="flex flex-col gap-4 sm:flex-row">
        <InputText
          v-model="searchQuery"
          :placeholder="$t('table.searchPlaceholder')"
          class="flex-1"
        />
        <Select
          v-model="filterStatus"
          :options="statusOptions"
          option-label="label"
          option-value="value"
          :placeholder="$t('table.allStatus')"
          class="w-full sm:w-[160px]"
        />
        <Select
          v-model="filterRole"
          :options="roleOptions"
          option-label="label"
          option-value="value"
          :placeholder="$t('table.allRoles')"
          class="w-full sm:w-[160px]"
        />
      </div>
    </Panel>

    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('table.userList') }}</span>
      </template>
      <div class="w-full overflow-x-auto min-w-0">
        <DataTable
          :value="filteredList"
          :loading="loading"
          paginator
          :rows="10"
          :rows-per-page-options="[10, 20, 30]"
          striped-rows
          responsive-layout="scroll"
          class="p-datatable-sm"
        >
        <Column field="id" header="ID" style="width: 4rem" />
        <Column field="name" :header="$t('table.name')">
          <template #body="{ data }">
            <RouterLink :to="`/users/${data.id}`" class="font-medium text-primary hover:underline">
              {{ data.name }}
            </RouterLink>
          </template>
        </Column>
        <Column field="email" :header="$t('table.email')" />
        <Column field="role" :header="$t('table.role')">
          <template #body="{ data }">
            <Tag :value="getRoleLabel(data.role)" :severity="getRoleSeverity(data.role)" />
          </template>
        </Column>
        <Column field="status" :header="$t('table.status')">
          <template #body="{ data }">
            <Tag
              :value="data.status === 'active' ? $t('table.statusActive') : $t('table.statusInactive')"
              :severity="data.status === 'active' ? 'success' : 'secondary'"
            />
          </template>
        </Column>
        <Column :header="$t('common.operation')" style="width: 12rem">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                text
                size="small"
                icon="pi pi-pencil"
                :label="$t('common.edit')"
                @click="router.push(`/users/${data.id}/edit`)"
              />
              <Button
                text
                size="small"
                severity="danger"
                icon="pi pi-trash"
                :label="$t('common.delete')"
                @click="handleDelete(data)"
              />
            </div>
          </template>
        </Column>
        <template #empty>
          <p class="py-4 text-center text-muted-foreground">{{ $t('table.noData') }}</p>
        </template>
      </DataTable>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDebounceFn } from '@vueuse/core'
import { useConfirm } from 'primevue/useconfirm'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
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
