import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
  })

import axios from 'axios'
app.config.globalProperties.$axios=axios
import qs from 'qs'
app.config.globalProperties.$qs=qs
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(vuetify)
app.mount('#app')


