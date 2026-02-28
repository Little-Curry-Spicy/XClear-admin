<template>
  <v-menu location="bottom">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="menuProps"
        icon="mdi-palette"
        variant="text"
        rounded
        aria-haspopup="true"
        aria-controls="theme_menu"
      />
    </template>
    <v-list>
      <v-list-item
        v-for="mode in themeModes"
        :key="mode.value"
        :prepend-icon="mode.icon"
        @click="themeStore.setThemeMode(mode.value)"
      >
        {{ mode.label }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useThemeStore, type ThemeMode } from '@/stores/theme'

const themeStore = useThemeStore()

const themeModes: Array<{ value: ThemeMode; label: string; icon: string }> = [
  { value: 'light', label: '浅色', icon: 'mdi-weather-sunny' },
  { value: 'dark', label: '深色', icon: 'mdi-weather-night' },
]
</script>
