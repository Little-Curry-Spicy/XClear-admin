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
      @click="onSelect($event, mode.value)"
    >
      <v-icon :icon="mode.icon" size="18" class="shrink-0" />
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
import { withThemeCircleTransition } from '@/lib/themeTransition'

const { t } = useI18n()
const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()

const showLabels = computed(() => sidebarStore?.isExpanded ?? true)

/**
 * 按当前实际生效的明暗状态高亮
 * @param mode - 主题模式
 */
function isActive(mode: ThemeMode) {
  if (mode === 'light') return !themeStore.isDark
  if (mode === 'dark') return themeStore.isDark
  return false
}

/**
 * 带圆形扩散的主题切换
 * @param event - 点击事件，作为扩散圆心
 * @param mode - 目标主题
 */
function onSelect(event: MouseEvent, mode: ThemeMode) {
  if (isActive(mode)) return
  void withThemeCircleTransition(event, () => {
    themeStore.setThemeMode(mode)
  })
}

const themeModes: Array<{ value: ThemeMode; label: string; icon: string }> = [
  { value: 'light', label: t('settings.lightTheme'), icon: 'mdi-weather-sunny' },
  { value: 'dark', label: t('settings.darkTheme'), icon: 'mdi-weather-night' },
]
</script>
