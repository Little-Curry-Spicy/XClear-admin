<template>
  <v-menu location="bottom">
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="menuProps"
        icon="mdi-earth"
        variant="text"
        rounded
        aria-haspopup="true"
        aria-controls="locale_menu"
      />
    </template>
    <v-list>
      <v-list-item
        v-for="loc in locales"
        :key="loc.value"
        @click="localeStore.setLocale(loc.value)"
      >
        {{ loc.flag }} {{ loc.label }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'
import type { Locale } from '@/i18n'

const localeStore = useLocaleStore()

const locales: Array<{ value: Locale; label: string; flag: string }> = [
  { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
]
</script>
