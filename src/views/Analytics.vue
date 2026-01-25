<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">数据分析</h2>
      <p class="text-muted-foreground">查看系统各项数据指标和分析报告</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="metric in metrics" :key="metric.title">
        <CardHeader>
          <CardTitle class="text-base">{{ metric.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
          <p class="text-xs text-muted-foreground mt-1">{{ metric.description }}</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>数据趋势</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="h-[400px] flex items-center justify-center text-muted-foreground">
          图表区域（可集成 Chart.js 或 ECharts）
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

const metrics = [
  { title: '总访问量', value: '125,430', description: '较上月增长 12%' },
  { title: '活跃用户', value: '8,542', description: '较上月增长 8%' },
  { title: '转化率', value: '3.24%', description: '较上月增长 0.5%' },
  { title: '平均停留时间', value: '4m 32s', description: '较上月增长 15s' },
  { title: '跳出率', value: '42.3%', description: '较上月下降 2.1%' },
  { title: '新用户占比', value: '68.5%', description: '较上月增长 5.2%' },
]
</script>
