import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import { useThemeStore } from './stores/theme'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vuetify)

const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
