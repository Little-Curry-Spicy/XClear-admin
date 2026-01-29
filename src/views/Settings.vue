<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">系统设置</h2>
      <p class="text-muted-foreground">管理系统配置和偏好设置</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Panel>
        <template #header>
          <span class="font-semibold">外观设置</span>
        </template>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">主题模式</label>
            <p class="text-xs text-muted-foreground mb-2">选择系统主题显示模式</p>
            <div class="flex gap-2">
              <Button
                v-for="mode in themeModes"
                :key="mode.value"
                :label="mode.label"
                :severity="themeStore.themeMode === mode.value ? 'primary' : 'secondary'"
                :outlined="themeStore.themeMode !== mode.value"
                class="flex-1"
                @click="themeStore.setThemeMode(mode.value)"
              />
            </div>
          </div>
        </div>
      </Panel>

      <Panel>
        <template #header>
          <span class="font-semibold">通知设置</span>
        </template>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">邮件通知</p>
              <p class="text-xs text-muted-foreground">接收邮件通知</p>
            </div>
            <InputSwitch v-model="emailNotify" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">推送通知</p>
              <p class="text-xs text-muted-foreground">接收推送通知</p>
            </div>
            <InputSwitch v-model="pushNotify" />
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'

const themeStore = useThemeStore()
const emailNotify = ref(false)
const pushNotify = ref(true)

const themeModes: Array<{ value: ThemeMode; label: string }> = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
]
</script>
