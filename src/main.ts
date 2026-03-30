import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import './style.css'
import Aura from "@primevue/themes/aura"
import { definePreset } from "@primevue/themes"

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue, {
    zIndex: {
      modal: 1100, //dialog, drawer
      overlay: 1000, //select, popover
      menu: 1200, //overlay menus
      tooltip: 1100, //tooltip
    },
    theme: {
      preset: definePreset(Aura, {
        semantic: {
          primary: {
            50: "#EEF2FF",
            100: "#E0E7FF",
            200: "#C6D1FF",
            300: "#A4B3FD",
            400: "#7F8AFA",
            500: "#6164F3",
            600: "#4C43E8",
            700: "#4036CC",
            800: "#352EA5",
            900: "#302D82",
            950: "#1E1B4E",
          },
        },
      }),

      options: {
        darkModeSelector: ".dark", // set darkmode off
      },
    },
  })
app.mount('#app')
