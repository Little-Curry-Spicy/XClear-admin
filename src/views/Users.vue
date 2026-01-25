<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">用户管理</h2>
        <p class="text-muted-foreground">管理系统中的所有用户</p>
      </div>
      <Button>
        <Plus class="mr-2 h-4 w-4" />
        添加用户
      </Button>
    </div>

    <Card>
      <CardContent class="pt-6">
        <div class="space-y-4">
          <div
            v-for="user in users"
            :key="user.id"
            class="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                {{ user.name.charAt(0) }}
              </div>
              <div>
                <p class="font-medium">{{ user.name }}</p>
                <p class="text-sm text-muted-foreground">{{ user.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                "
              >
                {{ user.role === 'admin' ? '管理员' : '用户' }}
              </span>
              <Button variant="ghost" size="icon">
                <MoreVertical class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Plus, MoreVertical } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'admin' },
]
</script>
