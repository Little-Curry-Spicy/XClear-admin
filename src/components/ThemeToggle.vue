<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-9 w-9">
        <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">切换主题</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <!-- 主题模式选择 -->
      <div class="px-2 py-1.5">
        <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">主题模式</div>
        <DropdownMenuItem
          v-for="mode in themeModes"
          :key="mode.value"
          @click="themeStore.setThemeMode(mode.value)"
          :class="cn(
            'flex items-center justify-between',
            themeStore.themeMode === mode.value && 'bg-accent'
          )"
        >
          <span>{{ mode.label }}</span>
          <component :is="mode.icon" class="h-4 w-4" />
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const themeStore = useThemeStore()

const themeModes: Array<{ value: ThemeMode; label: string; icon: any }> = [
  { value: 'light', label: '浅色', icon: Sun },
  { value: 'dark', label: '深色', icon: Moon },
]
</script>
