<template>
  <div class="space-y-6">
    <!-- 统计卡片 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">{{ stat.title }}</CardTitle>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">{{ stat.change }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- 图表区域 -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>收入概览</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-[300px] flex items-center justify-center text-muted-foreground">
            图表区域（可集成 Chart.js 或 ECharts）
          </div>
        </CardContent>
      </Card>
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center gap-4"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full"
                :class="activity.bgColor"
              >
                <component :is="activity.icon" class="h-5 w-5" :class="activity.iconColor" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ activity.title }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-vue-next'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

const stats = [
  {
    title: '总营收',
    value: '¥45,231',
    change: '+20.1% 较上月',
    icon: DollarSign,
  },
  {
    title: '订阅用户',
    value: '+2,350',
    change: '+180.1% 较上月',
    icon: Users,
  },
  {
    title: '销售额',
    value: '+12,234',
    change: '+19% 较上月',
    icon: ShoppingCart,
  },
  {
    title: '活跃用户',
    value: '+573',
    change: '+201 较上月',
    icon: Activity,
  },
]

const recentActivities = [
  {
    id: 1,
    title: '新订单 #1234',
    time: '2 分钟前',
    icon: ShoppingCart,
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    title: '新用户注册',
    time: '5 分钟前',
    icon: Users,
    bgColor: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 3,
    title: '系统更新',
    time: '10 分钟前',
    icon: Activity,
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
]
</script>
