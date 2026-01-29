<template>
  <Button
    type="button"
    icon="pi pi-globe"
    text
    rounded
    aria-haspopup="true"
    aria-controls="locale_menu"
    @click="menuRef?.toggle($event)"
  />
  <Menu ref="menuRef" id="locale_menu" :model="localeMenuItems" popup />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { useLocaleStore } from '@/stores/locale'
import type { Locale } from '@/i18n'

const localeStore = useLocaleStore()

const menuRef = ref<InstanceType<typeof Menu> | null>(null)

const locales: Array<{ value: Locale; label: string; flag: string }> = [
  { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
]

const localeMenuItems = computed<MenuItem[]>(() =>
  locales.map((loc) => ({
    label: `${loc.flag} ${loc.label}`,
    command: () => localeStore.setLocale(loc.value),
  }))
)
</script>
