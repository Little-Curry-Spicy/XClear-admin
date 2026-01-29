<template>
  <div class="space-y-6">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in stats" :key="stat.title">
        <template #header>
          <div class="flex items-center justify-between p-4">
            <span class="text-sm font-medium">{{ stat.title }}</span>
            <i :class="stat.icon" class="text-muted-foreground text-lg" />
          </div>
        </template>
        <template #content>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground mt-1">{{ stat.change }}</p>
        </template>
      </Card>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Panel class="col-span-4">
        <template #header>
          <span class="font-semibold">收入概览</span>
        </template>
        <div class="h-[300px] flex items-center justify-center text-muted-foreground">
          图表区域（可集成 Chart.js 或 ECharts）
        </div>
      </Panel>
      <Panel class="col-span-3">
        <template #header>
          <span class="font-semibold">最近活动</span>
        </template>
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
              <i :class="[activity.icon, activity.iconColor]" class="text-lg" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">{{ activity.title }}</p>
              <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Panel from 'primevue/panel'

const stats = [
  { title: '总营收', value: '¥45,231', change: '+20.1% 较上月', icon: 'pi pi-dollar' },
  { title: '订阅用户', value: '+2,350', change: '+180.1% 较上月', icon: 'pi pi-users' },
  { title: '销售额', value: '+12,234', change: '+19% 较上月', icon: 'pi pi-shopping-cart' },
  { title: '活跃用户', value: '+573', change: '+201 较上月', icon: 'pi pi-chart-line' },
]

const recentActivities = [
  {
    id: 1,
    title: '新订单 #1234',
    time: '2 分钟前',
    icon: 'pi pi-shopping-cart',
    bgColor: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
  {
    id: 2,
    title: '新用户注册',
    time: '5 分钟前',
    icon: 'pi pi-users',
    bgColor: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
  {
    id: 3,
    title: '系统更新',
    time: '10 分钟前',
    icon: 'pi pi-chart-line',
    bgColor: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
]
</script>
