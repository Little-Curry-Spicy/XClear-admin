<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ $t('table.title') }}</h2>
        <p class="text-muted-foreground">{{ $t('table.description') }}</p>
      </div>
      <div class="flex gap-2">
        <v-btn :loading="loading"  prepend-icon="mdi-refresh" @click="handleRefresh">
          {{ $t('table.refresh') }}
        </v-btn>
        <v-btn  prepend-icon="mdi-plus" @click="handleAdd">{{ $t('table.add') }}</v-btn>
        <v-btn prepend-icon="mdi-download" @click="handleExportCsv">
          {{ $t('table.exportCsv') }}
        </v-btn>
      </div>
    </div>

    <v-card>
      <v-card-title>{{ $t('table.searchAndFilter') }}</v-card-title>
      <v-card-text>
        <v-form>
          <div class="flex flex-col gap-4 sm:flex-row">
            <v-text-field
              v-model="searchQuery"
              :placeholder="$t('table.searchPlaceholder')"
              class="flex-1"
              hide-details
            />
            <v-select
              v-model="filterStatus"
              :items="statusFilterOptions"
              item-title="label"
              item-value="value"
              :placeholder="$t('table.allStatus')"
              class="w-full sm:w-[180px]"
              hide-details
            />
            <v-select
              v-model="filterRole"
              :items="roleFilterOptions"
              item-title="label"
              item-value="value"
              :placeholder="$t('table.allRoles')"
              class="w-full sm:w-[180px]"
              hide-details
            />
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>{{ $t('table.userList') }}</v-card-title>
      <v-card-text>
        <p class="text-sm text-muted-foreground mb-4">{{ $t('table.userListDesc') }}</p>
        <v-data-table
          :headers="headers"
          :items="filteredData"
          :loading="loading"
          :items-per-page="rowsPerPage"
          :items-per-page-options="[10, 20, 30, 50]"
          class="elevation-0"
        >
          <template #item.avatar="{ item }">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {{ item.name.charAt(0) }}
            </div>
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
              <v-btn size="small" variant="text" prepend-icon="mdi-pencil" @click="handleEdit(item)">
                {{ $t('common.edit') }}
              </v-btn>
              <v-btn size="small" variant="text" color="error" prepend-icon="mdi-delete" @click="handleDelete(item)">
                {{ $t('common.delete') }}
              </v-btn>
            </div>
          </template>
          <template #no-data>
            <p class="text-center text-muted-foreground py-4">{{ $t('table.noData') || '暂无数据' }}</p>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirm } from '@/lib/confirm'
import { toast } from '@/lib/toast'
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()
const confirm = useConfirm()
const rowsPerPage = ref(10)

interface TableRow {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const loading = ref(false)
const searchQuery = ref('')
const filterStatus = ref<string | undefined>(undefined)
const filterRole = ref<string | undefined>(undefined)
const itemToDelete = ref<TableRow | null>(null)

const headers = computed(() => [
  { title: t('table.avatar'), key: 'avatar', width: '4rem', sortable: false },
  { title: 'ID', key: 'id', width: '4rem' },
  { title: t('table.name'), key: 'name' },
  { title: t('table.email'), key: 'email' },
  { title: t('table.role'), key: 'role' },
  { title: t('table.status'), key: 'status' },
  { title: t('common.operation'), key: 'actions', sortable: false, width: '12rem' },
])

const statusFilterOptions = computed(() => [
  { label: t('table.allStatus'), value: undefined },
  { label: t('table.statusActive'), value: 'active' },
  { label: t('table.statusInactive'), value: 'inactive' },
])

const roleFilterOptions = computed(() => [
  { label: t('table.allRoles'), value: undefined },
  { label: t('table.roleAdmin'), value: 'admin' },
  { label: t('table.roleUser'), value: 'user' },
  { label: t('table.roleEditor'), value: 'editor' },
])

const tableData = ref<TableRow[]>([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'editor', status: 'inactive' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'admin', status: 'active' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'user', status: 'active' },
])

const debouncedSearchQuery = ref('')
const debouncedSearch = useDebounceFn((value: string) => {
  debouncedSearchQuery.value = value
}, 300)

watch(searchQuery, (value) => debouncedSearch(value))

const filteredData = computed(() => {
  let result = [...tableData.value]
  if (debouncedSearchQuery.value) {
    const q = debouncedSearchQuery.value.toLowerCase()
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

const handleRefresh = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 1000)
}

const handleAdd = () => {
  toast.info(t('table.addUser'))
}

const handleEdit = (row: TableRow) => {
  toast.info(t('table.editUser', { name: row.name }))
}

const handleDelete = (row: TableRow) => {
  itemToDelete.value = row
  confirm.require({
    header: t('common.confirm'),
    message: t('table.confirmDelete', { name: row.name }),
    rejectLabel: t('common.cancel'),
    acceptLabel: t('common.delete'),
    acceptClass: 'p-button-danger',
    accept: confirmDelete,
  })
}

function confirmDelete() {
  const item = itemToDelete.value
  if (!item) return
  const index = tableData.value.findIndex(row => row.id === item.id)
  if (index > -1) {
    tableData.value.splice(index, 1)
    toast.success(t('table.deleteSuccess', { name: item.name }))
  }
  itemToDelete.value = null
}

function handleExportCsv() {
  const cols = ['id', 'name', 'email', 'role', 'status']
  const headerLabels = ['ID', t('table.name'), t('table.email'), t('table.role'), t('table.status')]
  const rows = filteredData.value.map(row => cols.map(c => (row as Record<string, unknown>)[c] ?? ''))
  const BOM = '\uFEFF'
  const csv = BOM + [headerLabels.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `table-export-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success(t('table.exportSuccess'))
}
</script>
