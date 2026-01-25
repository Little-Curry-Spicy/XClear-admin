<template>
  <div class="space-y-6">
    <!-- 页面标题和操作 -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ $t('table.title') }}</h2>
        <p class="text-muted-foreground">{{ $t('table.description') }}</p>
      </div>
      <div class="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" @click="handleRefresh">
                <RefreshCw class="mr-2 h-4 w-4" :class="{ 'animate-spin': loading }" />
                {{ $t('table.refresh') }}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t('table.refresh') }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button @click="handleAdd">
                <Plus class="mr-2 h-4 w-4" />
                {{ $t('table.add') }}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t('table.addUser') }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="flex-1">
            <Input
              v-model="searchQuery"
              :placeholder="$t('table.searchPlaceholder')"
              class="w-full"
            />
          </div>
          <Select v-model="filterStatus" class="w-full sm:w-[180px]">
            <SelectTrigger>
              <SelectValue :placeholder="$t('table.allStatus')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="undefined">{{ $t('table.allStatus') }}</SelectItem>
              <SelectItem value="active">{{ $t('table.statusActive') }}</SelectItem>
              <SelectItem value="inactive">{{ $t('table.statusInactive') }}</SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="filterRole" class="w-full sm:w-[180px]">
            <SelectTrigger>
              <SelectValue :placeholder="$t('table.allRoles')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="undefined">{{ $t('table.allRoles') }}</SelectItem>
              <SelectItem value="admin">{{ $t('table.roleAdmin') }}</SelectItem>
              <SelectItem value="user">{{ $t('table.roleUser') }}</SelectItem>
              <SelectItem value="editor">{{ $t('table.roleEditor') }}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- 表格 -->
    <Card>
      <CardHeader>
        <CardTitle>{{ $t('table.userList') }}</CardTitle>
        <CardDescription>{{ $t('table.userListDesc') }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="overflow-x-auto">
          <div v-if="loading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-center gap-4">
              <Skeleton class="h-10 w-10 rounded-full" />
              <Skeleton class="h-4 flex-1" />
              <Skeleton class="h-4 w-20" />
              <Skeleton class="h-4 w-20" />
              <Skeleton class="h-4 w-24" />
            </div>
          </div>
          <Table v-else :columns="columns" :data="paginatedData" :loading="false">
            <template #cell-avatar="{ row }">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                {{ row.name.charAt(0) }}
              </div>
            </template>
            <template #cell-status="{ value }">
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="
                  value === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                "
              >
                {{ value === 'active' ? $t('table.statusActive') : $t('table.statusInactive') }}
              </span>
            </template>
            <template #cell-role="{ value }">
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="
                  value === 'admin'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                    : value === 'editor'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                "
              >
                {{ getRoleLabel(value) }}
              </span>
            </template>
            <template #cell-operation="{ row }">
              <div class="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button variant="ghost" size="sm" @click="handleEdit(row)">
                        <Edit class="mr-1 h-3 w-3" />
                        {{ $t('common.edit') }}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ $t('table.editUser', { name: row.name }) }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Button
                        variant="ghost"
                        size="sm"
                        class="text-destructive"
                        @click="handleDelete(row)"
                      >
                        <Trash2 class="mr-1 h-3 w-3" />
                        {{ $t('common.delete') }}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ $t('table.confirmDelete', { name: row.name }) }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </template>
          </Table>
        </div>

        <!-- 分页 -->
        <div class="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div class="text-sm text-muted-foreground">
            {{ $t('table.showing', { 
              from: filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0, 
              to: Math.min(currentPage * itemsPerPage, filteredData.length), 
              total: filteredData.length 
            }) }}
          </div>
          <Pagination
            v-slot="{ page }"
            :items-per-page="itemsPerPage"
            :total="filteredData.length"
            :default-page="currentPage"
            @update:page="currentPage = $event"
          >
            <PaginationContent v-slot="{ items }">
              <PaginationPrevious />
              <template v-for="(item, index) in items" :key="index">
                <PaginationItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  :is-active="item.value === page"
                >
                  {{ item.value }}
                </PaginationItem>
                <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :index="index" />
              </template>
              <PaginationNext />
            </PaginationContent>
          </Pagination>
        </div>

        <!-- 删除确认对话框 -->
        <AlertDialog v-model:open="deleteDialogOpen">
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{{ $t('common.confirm') }}</AlertDialogTitle>
              <AlertDialogDescription>
                {{ $t('table.confirmDelete', { name: itemToDelete?.name || '' }) }}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel @click="deleteDialogOpen = false">
                {{ $t('common.cancel') }}
              </AlertDialogCancel>
              <AlertDialogAction @click="confirmDelete" class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {{ $t('common.delete') }}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Plus, RefreshCw, Edit, Trash2 } from 'lucide-vue-next'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import Table, { type TableColumn } from '@/components/ui/Table.vue'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useI18n } from 'vue-i18n'
import { toast } from '@/lib/toast'
import { useDebounceFn } from '@vueuse/core'

const { t } = useI18n()

const loading = ref(false)
const searchQuery = ref('')
const filterStatus = ref<string | undefined>(undefined)
const filterRole = ref<string | undefined>(undefined)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const deleteDialogOpen = ref(false)
const itemToDelete = ref<any>(null)

const columns: TableColumn[] = [
  { key: 'avatar', title: t('table.avatar') },
  { key: 'id', title: 'ID' },
  { key: 'name', title: t('table.name') },
  { key: 'email', title: t('table.email') },
  { key: 'role', title: t('table.role') },
  { key: 'status', title: t('table.status') },
  { key: 'operation', title: t('common.operation') },
]

const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: 'editor',
    status: 'inactive',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    role: 'user',
    status: 'active',
  },
])

const filteredData = computed(() => {
  let result = [...tableData.value]

  // 搜索过滤（使用防抖后的值）
  if (debouncedSearchQuery.value) {
    const query = debouncedSearchQuery.value.toLowerCase()
    result = result.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    )
  }

  // 状态过滤
  if (filterStatus.value) {
    result = result.filter(item => item.status === filterStatus.value)
  }

  // 角色过滤
  if (filterRole.value) {
    result = result.filter(item => item.role === filterRole.value)
  }

  return result
})

// 分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

// 搜索防抖处理
const debouncedSearchQuery = ref('')
const debouncedSearch = useDebounceFn((value: string) => {
  debouncedSearchQuery.value = value
  currentPage.value = 1
}, 300)

watch(searchQuery, (value) => {
  debouncedSearch(value)
})

// 监听筛选条件变化，重置到第一页
watch([filterStatus, filterRole], () => {
  currentPage.value = 1
})

const getRoleLabel = (role: string) => {
  const roleMap: Record<string, string> = {
    admin: t('table.roleAdmin'),
    user: t('table.roleUser'),
    editor: t('table.roleEditor'),
  }
  return roleMap[role] || role
}

const handleRefresh = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const handleAdd = () => {
  toast.info(t('table.addUser'))
}

const handleEdit = (row: any) => {
  toast.info(t('table.editUser', { name: row.name }))
}

const handleDelete = (row: any) => {
  itemToDelete.value = row
  deleteDialogOpen.value = true
}

const confirmDelete = () => {
  if (itemToDelete.value) {
    const index = tableData.value.findIndex(item => item.id === itemToDelete.value.id)
    if (index > -1) {
      tableData.value.splice(index, 1)
      toast.success(t('table.deleteSuccess', { name: itemToDelete.value.name }))
    }
    deleteDialogOpen.value = false
    itemToDelete.value = null
  }
}
</script>
