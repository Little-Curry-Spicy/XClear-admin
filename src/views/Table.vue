<template>
  <div class="space-y-6">
    <Button label="提交" icon="pi pi-check" />
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ $t('table.title') }}</h2>
        <p class="text-muted-foreground">{{ $t('table.description') }}</p>
      </div>
      <div class="flex gap-2">
        <Button
          outlined
          :loading="loading"
          @click="handleRefresh"
          v-tooltip.top="$t('table.refresh')"
        >
          <i class="pi pi-refresh mr-2" :class="{ 'animate-spin': loading }" />
          {{ $t('table.refresh') }}
        </Button>
        <Button @click="handleAdd" v-tooltip.top="$t('table.addUser')">
          <i class="pi pi-plus mr-2" />
          {{ $t('table.add') }}
        </Button>
      </div>
    </div>

    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('table.searchAndFilter') }}</span>
      </template>
      <div class="flex flex-col gap-4 sm:flex-row">
        <div class="flex-1">
          <InputText
            v-model="searchQuery"
            :placeholder="$t('table.searchPlaceholder')"
            class="w-full"
          />
        </div>
        <Select
          v-model="filterStatus"
          :options="statusFilterOptions"
          option-label="label"
          option-value="value"
          :placeholder="$t('table.allStatus')"
          class="w-full sm:w-[180px]"
        />
        <Select
          v-model="filterRole"
          :options="roleFilterOptions"
          option-label="label"
          option-value="value"
          :placeholder="$t('table.allRoles')"
          class="w-full sm:w-[180px]"
        />
      </div>
    </Panel>

    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('table.userList') }}</span>
      </template>
      <p class="text-sm text-muted-foreground mb-4">{{ $t('table.userListDesc') }}</p>

      <DataTable
        :value="filteredData"
        :loading="loading"
        paginator
        :rows="itemsPerPage"
        :rows-per-page-options="[10, 20, 30]"
        :current-page-report-template="$t('table.currentPageReport')"
        striped-rows
        responsive-layout="scroll"
        class="p-datatable-sm"
      >
        <Column field="avatar" :header="$t('table.avatar')" style="width: 4rem">
          <template #body="{ data }">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              {{ data.name.charAt(0) }}
            </div>
          </template>
        </Column>
        <Column field="id" header="ID" style="width: 4rem" />
        <Column field="name" :header="$t('table.name')" />
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
                @click="handleEdit(data)"
                v-tooltip.top="$t('table.editUser', { name: data.name })"
              >
                {{ $t('common.edit') }}
              </Button>
              <Button
                text
                size="small"
                severity="danger"
                icon="pi pi-trash"
                @click="handleDelete(data)"
                v-tooltip.top="$t('table.confirmDelete', { name: data.name })"
              >
                {{ $t('common.delete') }}
              </Button>
            </div>
          </template>
        </Column>
        <template #empty>
          <p class="text-center text-muted-foreground py-4">{{ $t('table.noData') || '暂无数据' }}</p>
        </template>
      </DataTable>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import { toast } from '@/lib/toast'
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()
const confirm = useConfirm()

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
const itemsPerPage = ref(10)
const itemToDelete = ref<TableRow | null>(null)

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
</script>
