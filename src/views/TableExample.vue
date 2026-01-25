<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('table.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('table.description') }}</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>用户列表</CardTitle>
        <CardDescription>使用 Table 组件展示数据</CardDescription>
      </CardHeader>
      <CardContent>
        <Table :columns="columns" :data="tableData" :loading="loading">
          <template #cell-status="{ value }">
            <span
              class="rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="
                value === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              "
            >
              {{ value === 'active' ? '活跃' : '禁用' }}
            </span>
          </template>
          <template #cell-operation="{ row }">
            <div class="flex gap-2">
              <Button variant="ghost" size="sm">编辑</Button>
              <Button variant="ghost" size="sm" class="text-destructive">
                删除
              </Button>
            </div>
          </template>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import Table, { type TableColumn } from '@/components/ui/Table.vue'
import { Button } from '@/components/ui/button'

const loading = ref(false)

const columns: TableColumn[] = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: '姓名' },
  { key: 'email', title: '邮箱' },
  { key: 'role', title: '角色' },
  { key: 'status', title: '状态' },
  { key: 'operation', title: '操作' },
]

const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '用户',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
  },
])
</script>
