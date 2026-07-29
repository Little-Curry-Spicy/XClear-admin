/**
 * 主题色板：以 Vuetify 为唯一颜色源，供 light/dark × zinc/blue/green 使用。
 * 值需为 Vuetify 可识别的 hex；自定义 muted/accent 会生成 --v-theme-* 变量。
 */
export type ThemeColor = 'zinc' | 'blue' | 'green'

export interface ThemePaletteColors {
  primary: string
  'on-primary': string
  secondary: string
  'on-secondary': string
  background: string
  'on-background': string
  surface: string
  'on-surface': string
  'surface-variant': string
  'on-surface-variant': string
  outline: string
  muted: string
  'muted-foreground': string
  accent: string
  'accent-foreground': string
  border: string
  error: string
  success: string
  info: string
  warning: string
}

/** 浅色 / 深色各一套色板 */
export type ModePalette = {
  light: ThemePaletteColors
  dark: ThemePaletteColors
}

const zinc: ModePalette = {
  light: {
    primary: '#18181b',
    'on-primary': '#fafafa',
    secondary: '#71717a',
    'on-secondary': '#fafafa',
    background: '#ffffff',
    'on-background': '#09090b',
    surface: '#ffffff',
    'on-surface': '#09090b',
    'surface-variant': '#f4f4f5',
    'on-surface-variant': '#71717a',
    outline: '#e4e4e7',
    muted: '#f4f4f5',
    'muted-foreground': '#71717a',
    accent: '#f4f4f5',
    'accent-foreground': '#18181b',
    border: '#e4e4e7',
    error: '#dc2626',
    success: '#16a34a',
    info: '#2563eb',
    warning: '#d97706',
  },
  dark: {
    primary: '#fafafa',
    'on-primary': '#18181b',
    secondary: '#a1a1aa',
    'on-secondary': '#18181b',
    background: '#09090b',
    'on-background': '#fafafa',
    surface: '#18181b',
    'on-surface': '#fafafa',
    'surface-variant': '#27272a',
    'on-surface-variant': '#a1a1aa',
    outline: '#3f3f46',
    muted: '#27272a',
    'muted-foreground': '#a1a1aa',
    accent: '#27272a',
    'accent-foreground': '#fafafa',
    border: '#3f3f46',
    error: '#f87171',
    success: '#4ade80',
    info: '#60a5fa',
    warning: '#fbbf24',
  },
}

const blue: ModePalette = {
  light: {
    ...zinc.light,
    primary: '#2563eb',
    'on-primary': '#eff6ff',
    accent: '#eff6ff',
    'accent-foreground': '#1e3a8a',
    info: '#2563eb',
  },
  dark: {
    ...zinc.dark,
    primary: '#60a5fa',
    'on-primary': '#0f172a',
    accent: '#1e3a5f',
    'accent-foreground': '#dbeafe',
    info: '#60a5fa',
  },
}

const green: ModePalette = {
  light: {
    ...zinc.light,
    primary: '#16a34a',
    'on-primary': '#f0fdf4',
    accent: '#f0fdf4',
    'accent-foreground': '#14532d',
    success: '#16a34a',
  },
  dark: {
    ...zinc.dark,
    primary: '#4ade80',
    'on-primary': '#052e16',
    accent: '#14532d',
    'accent-foreground': '#dcfce7',
    success: '#4ade80',
  },
}

/** 主题色 → 明暗色板 */
export const themePalettes: Record<ThemeColor, ModePalette> = {
  zinc,
  blue,
  green,
}

/**
 * 按主题色与是否深色取当前色板
 * @param color - zinc | blue | green
 * @param isDark - 是否深色模式
 */
export function getPalette(color: ThemeColor, isDark: boolean): ThemePaletteColors {
  return themePalettes[color][isDark ? 'dark' : 'light']
}
