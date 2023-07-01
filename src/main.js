import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import axios from 'axios'
app.config.globalProperties.$axios=axios
import qs from 'qs'
app.config.globalProperties.$qs=qs
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
