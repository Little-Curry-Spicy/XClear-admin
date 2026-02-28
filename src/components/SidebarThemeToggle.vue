<template>
  <div :class="cn('flex items-center gap-1 rounded-lg p-1 bg-muted/50', !showLabels && 'flex-col')">
    <button
      v-for="mode in themeModes"
      :key="mode.value"
      type="button"
      :class="cn(
        'flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors',
        showLabels ? 'flex-1 px-3 py-2' : 'w-full p-2',
        isActive(mode.value)
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )"
      :title="mode.label"
      @click="themeStore.setThemeMode(mode.value)"
    >
      <i :class="mode.icon" class="shrink-0" />
      <span v-if="showLabels" class="whitespace-nowrap">{{ mode.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import { useSidebarStore } from '@/stores/sidebar'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()

const showLabels = computed(() => sidebarStore?.isExpanded ?? true)

/** 按当前实际生效的明暗状态高亮：浅色模式（含「跟随系统」且系统为浅色）高亮浅色，否则高亮深色 */
function isActive(mode: ThemeMode) {
  if (mode === 'light') return !themeStore.isDark
  if (mode === 'dark') return themeStore.isDark
  return false
}

const themeModes: Array<{ value: ThemeMode; label: string; icon: string }> = [
  { value: 'light', label: t('settings.lightTheme'), icon: 'mdi mdi-weather-sunny' },
  { value: 'dark', label: t('settings.darkTheme'), icon: 'mdi mdi-weather-night' },
]
</script>
