import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  // 主题模式 - 默认使用 system，如果有保存的用户选择则使用保存的值
  const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null
  const themeMode = ref<ThemeMode>(
    savedTheme && (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'system'
  )

  // 使用 VueUse 的 useDark 来管理暗色模式
  const isDark = useDark({
    storageKey: 'theme-appearance',
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })

  // 根据系统偏好自动切换
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  
  // 应用主题模式
  const applyThemeMode = () => {
    if (themeMode.value === 'system') {
      isDark.value = prefersDark.matches
    } else {
      isDark.value = themeMode.value === 'dark'
    }
  }

  // 设置主题模式
  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    // 如果用户选择了 light 或 dark，保存到本地
    // 如果选择 system，清除保存的值（使用默认 system）
    if (mode === 'light' || mode === 'dark') {
      localStorage.setItem('theme-mode', mode)
    } else {
      localStorage.removeItem('theme-mode')
    }
    applyThemeMode()
  }

  // 初始化主题
  const initTheme = () => {
    applyThemeMode()
    
    // 监听系统主题变化
    prefersDark.addEventListener('change', () => {
      if (themeMode.value === 'system') {
        applyThemeMode()
      }
    })
  }

  // 监听主题模式变化
  watch(themeMode, () => {
    applyThemeMode()
  })

  return {
    themeMode,
    isDark,
    setThemeMode,
    initTheme,
  }
})
