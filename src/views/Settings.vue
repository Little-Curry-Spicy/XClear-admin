<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">系统设置</h2>
      <p class="text-muted-foreground">管理系统配置和偏好设置</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>外观设置</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <label class="text-sm font-medium">主题模式</label>
            <p class="text-xs text-muted-foreground mb-2">选择系统主题显示模式</p>
            <div class="flex gap-2">
              <Button
                v-for="mode in themeModes"
                :key="mode.value"
                :variant="themeStore.themeMode === mode.value ? 'default' : 'outline'"
                @click="themeStore.setThemeMode(mode.value)"
                class="flex-1"
              >
                {{ mode.label }}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>通知设置</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">邮件通知</p>
              <p class="text-xs text-muted-foreground">接收邮件通知</p>
            </div>
            <input type="checkbox" class="h-4 w-4" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">推送通知</p>
              <p class="text-xs text-muted-foreground">接收推送通知</p>
            </div>
            <input type="checkbox" class="h-4 w-4" checked />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'

const themeStore = useThemeStore()

const themeModes: Array<{ value: ThemeMode; label: string }> = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
]
</script>
