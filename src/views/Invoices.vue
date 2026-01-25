<template>
  <div class="space-y-6">
    <!-- 页面标题和操作 -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">发票管理</h2>
        <p class="text-muted-foreground">管理和查看所有发票记录</p>
      </div>
      <Button>
        <Plus class="mr-2 h-4 w-4" />
        新建发票
      </Button>
    </div>

    <!-- 筛选和搜索 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="flex-1">
            <input
              type="text"
              placeholder="搜索发票..."
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Select v-model="filterStatus" class="w-full sm:w-[180px]">
            <SelectTrigger>
              <SelectValue placeholder="全部状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem :value="undefined">全部状态</SelectItem>
              <SelectItem value="paid">已支付</SelectItem>
              <SelectItem value="pending">待支付</SelectItem>
              <SelectItem value="overdue">已逾期</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- 发票列表 -->
    <div class="space-y-4">
      <Card v-for="invoice in invoices" :key="invoice.id">
        <CardContent class="pt-6">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-4">
                <div>
                  <p class="font-semibold">发票 #{{ invoice.number }}</p>
                  <p class="text-sm text-muted-foreground">{{ invoice.client }}</p>
                </div>
                <div
                  class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="getStatusClass(invoice.status)"
                >
                  {{ getStatusText(invoice.status) }}
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="font-semibold">¥{{ invoice.amount.toLocaleString() }}</p>
                <p class="text-sm text-muted-foreground">{{ invoice.date }}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, MoreVertical } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const filterStatus = ref('')

const invoices = [
  {
    id: 1,
    number: 'INV-001',
    client: 'Acme 公司',
    amount: 50000,
    date: '2024-01-15',
    status: 'paid',
  },
  {
    id: 2,
    number: 'INV-002',
    client: 'Tech Solutions',
    amount: 35000,
    date: '2024-01-20',
    status: 'pending',
  },
  {
    id: 3,
    number: 'INV-003',
    client: 'Global Corp',
    amount: 75000,
    date: '2024-01-10',
    status: 'overdue',
  },
  {
    id: 4,
    number: 'INV-004',
    client: 'Startup Inc',
    amount: 25000,
    date: '2024-01-25',
    status: 'paid',
  },
]

const getStatusClass = (status: string) => {
  const classes = {
    paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  }
  return classes[status as keyof typeof classes] || ''
}

const getStatusText = (status: string) => {
  const texts = {
    paid: '已支付',
    pending: '待支付',
    overdue: '已逾期',
  }
  return texts[status as keyof typeof texts] || status
}
</script>
