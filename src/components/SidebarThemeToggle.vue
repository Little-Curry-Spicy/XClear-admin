<template>
  <div :class="cn('flex items-center gap-1 rounded-lg p-1 bg-muted/50', !showLabels && 'flex-col')">
    <button
      v-for="mode in themeModes"
      :key="mode.value"
      type="button"
      :class="cn(
        'flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors',
        showLabels ? 'flex-1 px-3 py-2' : 'w-full p-2',
        themeStore.themeMode === mode.value
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

const showLabels = computed(() => sidebarStore.isExpanded)

const themeModes: Array<{ value: ThemeMode; label: string; icon: string }> = [
  { value: 'light', label: t('settings.lightTheme'), icon: 'pi pi-sun' },
  { value: 'dark', label: t('settings.darkTheme'), icon: 'pi pi-moon' },
]
</script>
