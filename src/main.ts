import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import { definePreset } from '@primeuix/themes'
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { useThemeStore } from "./stores/theme";
import "primeicons/primeicons.css";
import Aura from '@primeuix/themes/aura'
const app = createApp(App);
const LaraNoir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
      },
    },
  },
})
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: LaraNoir,
    options: {
      darkModeSelector: ".dark",
    },
  },
});
app.use(ToastService);
app.use(ConfirmationService);
app.directive("tooltip", Tooltip);

const themeStore = useThemeStore();
themeStore.initTheme();

app.mount("#app");