/**
 * Vuetify 4 插件：主题色板由 theme store 在运行时写入 light/dark。
 * 此处仅提供默认 zinc 色，避免首屏闪烁。
 */
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { themePalettes } from '@/lib/themePalettes'

const zincLight = themePalettes.zinc.light
const zincDark = themePalettes.zinc.dark

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: { ...zincLight },
      },
      dark: {
        dark: true,
        colors: { ...zincDark },
      },
    },
  },
})
