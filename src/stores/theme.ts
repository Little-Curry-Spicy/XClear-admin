import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null
  const themeMode = ref<ThemeMode>(
    savedTheme && (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'system'
  )

  const isDark = useDark({
    storageKey: 'theme-appearance',
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

  const applyThemeMode = () => {
    if (themeMode.value === 'system') {
      isDark.value = prefersDark.matches
    } else {
      isDark.value = themeMode.value === 'dark'
    }
  }

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    if (mode === 'light' || mode === 'dark') {
      localStorage.setItem('theme-mode', mode)
    } else {
      localStorage.removeItem('theme-mode')
    }
    applyThemeMode()
  }

  const initTheme = () => {
    applyThemeMode()
    prefersDark.addEventListener('change', () => {
      if (themeMode.value === 'system') applyThemeMode()
    })
  }

  watch(themeMode, () => applyThemeMode())

  return {
    themeMode,
    isDark,
    setThemeMode,
    initTheme,
  }
})
