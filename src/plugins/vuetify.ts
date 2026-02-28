/**
 * Vuetify 4 插件配置
 * 主题与现有 theme store 同步：通过 class="dark" 在 html 上切换深色模式
 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#18181b', // zinc-900
          surface: '#ffffff',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#fafafa', // zinc-50
          surface: '#18181b',
        },
      },
    },
  },
  defaults: {
    // 全局统一表单密度（仍可在单个组件上覆盖）
    VTextField: { density: 'comfortable' },
    VTextarea: { density: 'comfortable' },
    VSelect: { density: 'comfortable' },
    VAutocomplete: { density: 'comfortable' },
    VCombobox: { density: 'comfortable' },
    VFileInput: { density: 'comfortable' },
    VSwitch: { density: 'comfortable' },
    VCheckbox: { density: 'comfortable' },
    VRadioGroup: { density: 'comfortable' },
  },
})
