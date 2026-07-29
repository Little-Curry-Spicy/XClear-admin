import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'
import { getPalette, type ThemeColor } from '@/lib/themePalettes'

const THEME_MODE_KEY = 'theme-mode'
const THEME_COLOR_KEY = 'theme-color'

export type ThemeMode = 'light' | 'dark' | 'system'
export type { ThemeColor }

/**
 * 读取本地或环境变量中的主题模式；兼容 env 里的 `auto` → `system`
 */
function getSavedThemeMode(): ThemeMode {
  const raw = localStorage.getItem(THEME_MODE_KEY) || import.meta.env.VITE_THEME_MODE || 'system'
  if (raw === 'auto') return 'system'
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  return 'system'
}

/**
 * 读取已保存的主题色，非法值回退 zinc
 */
function getSavedThemeColor(): ThemeColor {
  const saved = localStorage.getItem(THEME_COLOR_KEY) || 'zinc'
  if (saved === 'zinc' || saved === 'blue' || saved === 'green') return saved
  return 'zinc'
}

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref<ThemeMode>(getSavedThemeMode())
  const themeColor = ref<ThemeColor>(getSavedThemeColor())

  /** 是否深色：由 html.classList 与 VueUse 同步 */
  const isDark = useDark({
    storageKey: THEME_MODE_KEY,
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

  /**
   * 按 themeMode 把 isDark 写成实际生效值
   */
  const applyThemeMode = () => {
    if (themeMode.value === 'system') {
      isDark.value = prefersDark.matches
    } else {
      isDark.value = themeMode.value === 'dark'
    }
  }

  /**
   * 切换浅色 / 深色 / 跟随系统
   * @param mode - 主题模式
   */
  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    if (mode === 'light' || mode === 'dark') {
      localStorage.setItem(THEME_MODE_KEY, mode)
    } else {
      localStorage.removeItem(THEME_MODE_KEY)
    }
    applyThemeMode()
  }

  /**
   * 切换主题色（zinc / blue / green），写入 data-theme-color 供调试与兼容
   * @param color - 主题色
   */
  const setThemeColor = (color: ThemeColor) => {
    themeColor.value = color
    localStorage.setItem(THEME_COLOR_KEY, color)
    document.documentElement.setAttribute('data-theme-color', color)
  }

  /**
   * 将当前色板应用到已挂载的 Vuetify theme 实例
   * @param vuetifyTheme - useTheme() 返回值
   */
  const applyVuetifyTheme = (vuetifyTheme: unknown) => {
    const theme = vuetifyTheme as {
      change: (name: string) => void
      themes: { value: Record<string, { colors?: Record<string, string> }> }
    }
    const mode = isDark.value ? 'dark' : 'light'
    const palette = getPalette(themeColor.value, isDark.value)
    const target = theme.themes?.value?.[mode]
    if (target?.colors) {
      Object.assign(target.colors, palette)
    }
    theme.change(mode)
  }

  const applyThemeColorAttr = () => {
    document.documentElement.setAttribute('data-theme-color', themeColor.value)
  }

  /**
   * 应用启动时初始化主题监听
   */
  const initTheme = () => {
    applyThemeMode()
    applyThemeColorAttr()
    prefersDark.addEventListener('change', () => {
      if (themeMode.value === 'system') applyThemeMode()
    })
  }

  watch(themeMode, () => applyThemeMode())
  watch(themeColor, () => applyThemeColorAttr())

  return {
    themeMode,
    themeColor,
    isDark,
    setThemeMode,
    setThemeColor,
    applyVuetifyTheme,
    initTheme,
  }
})
