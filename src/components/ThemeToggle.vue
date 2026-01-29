<template>
  <Button
    type="button"
    icon="pi pi-palette"
    text
    rounded
    aria-haspopup="true"
    aria-controls="theme_menu"
    @click="menuRef?.toggle($event)"
  />
  <Menu ref="menuRef" id="theme_menu" :model="themeMenuItems" popup />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'

const themeStore = useThemeStore()

const menuRef = ref<InstanceType<typeof Menu> | null>(null)

const themeModes: Array<{ value: ThemeMode; label: string; icon: string }> = [
  { value: 'light', label: '浅色', icon: 'pi pi-sun' },
  { value: 'dark', label: '深色', icon: 'pi pi-moon' },
]

const themeMenuItems = computed<MenuItem[]>(() =>
  themeModes.map((mode) => ({
    label: mode.label,
    icon: mode.icon,
    command: () => themeStore.setThemeMode(mode.value),
  }))
)
</script>
