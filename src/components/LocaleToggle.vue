<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="h-9 w-9">
        <Languages class="h-5 w-5" />
        <span class="sr-only">切换语言</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
      v-for="locale in locales"
      :key="locale.value"
      @click="localeStore.setLocale(locale.value)"
      :class="cn(
        'flex items-center justify-between',
        localeStore.currentLocale === locale.value && 'bg-accent'
      )"
    >
      <span>{{ locale.label }}</span>
      <span class="text-lg">{{ locale.flag }}</span>
    </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Languages } from 'lucide-vue-next'
import { useLocaleStore } from '@/stores/locale'
import { cn } from '@/lib/utils'
import type { Locale } from '@/i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const localeStore = useLocaleStore()

const locales: Array<{ value: Locale; label: string; flag: string }> = [
  { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
]
</script>
