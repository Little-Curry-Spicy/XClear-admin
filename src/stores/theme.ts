import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'

const THEME_MODE_KEY = 'theme-mode'

export type ThemeMode = 'light' | 'dark' | 'system'

function getSavedThemeMode(): ThemeMode {
  const saved = localStorage.getItem(THEME_MODE_KEY) || import.meta.env.VITE_THEME_MODE
  return saved as ThemeMode
}

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref<ThemeMode>(getSavedThemeMode())

  const isDark = useDark({
    storageKey: THEME_MODE_KEY,
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
      localStorage.setItem(THEME_MODE_KEY, mode)
    } else {
      localStorage.removeItem(THEME_MODE_KEY)
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
