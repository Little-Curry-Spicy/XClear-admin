import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'

const THEME_MODE_KEY = 'theme-mode'
const THEME_COLOR_KEY = 'theme-color'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemeColor = 'zinc' | 'blue' | 'green'

function getSavedThemeMode(): ThemeMode {
  const saved = localStorage.getItem(THEME_MODE_KEY) || import.meta.env.VITE_THEME_MODE
  return saved as ThemeMode
}

function getSavedThemeColor(): ThemeColor {
  const saved = localStorage.getItem(THEME_COLOR_KEY) || 'zinc'
  return saved as ThemeColor
}

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref<ThemeMode>(getSavedThemeMode())
  const themeColor = ref<ThemeColor>(getSavedThemeColor())

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

  const setThemeColor = (color: ThemeColor) => {
    themeColor.value = color
    localStorage.setItem(THEME_COLOR_KEY, color)
    document.documentElement.setAttribute('data-theme-color', color)
  }

  const applyThemeColor = () => {
    document.documentElement.setAttribute('data-theme-color', themeColor.value)
  }

  const initTheme = () => {
    applyThemeMode()
    applyThemeColor()
    prefersDark.addEventListener('change', () => {
      if (themeMode.value === 'system') applyThemeMode()
    })
  }

  watch(themeMode, () => applyThemeMode())
  watch(themeColor, () => applyThemeColor())

  return {
    themeMode,
    themeColor,
    isDark,
    setThemeMode,
    setThemeColor,
    initTheme,
  }
})
