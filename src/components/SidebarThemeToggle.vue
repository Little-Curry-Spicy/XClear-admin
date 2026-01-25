<template>
  <div>
    <!-- 主题模式切换 -->
    <div :class="cn('flex items-center gap-1 rounded-lg bg-muted p-1', !showLabels && 'flex-col')">
      <button
        v-for="mode in themeModes"
        :key="mode.value"
        @click="themeStore.setThemeMode(mode.value)"
        :class="cn(
          'flex items-center justify-center rounded-md text-xs font-medium transition-colors',
          showLabels ? 'flex-1 gap-1.5 px-2.5 py-1.5' : 'w-full p-2',
          themeStore.themeMode === mode.value
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )"
        :title="mode.label"
      >
        <component :is="mode.icon" class="h-3.5 w-3.5 shrink-0" />
        <Transition
          enter-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <span v-if="showLabels" class="whitespace-nowrap">{{ mode.label }}</span>
        </Transition>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import { useSidebarStore } from '@/stores/sidebar'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()

const showLabels = computed(() => sidebarStore.isExpanded)

const themeModes: Array<{ value: ThemeMode; label: string; icon: any }> = [
  { value: 'light', label: t('settings.lightTheme'), icon: Sun },
  { value: 'dark', label: t('settings.darkTheme'), icon: Moon },
]
</script>
