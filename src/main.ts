import { createApp } from 'vue'
import './config/styles/style.css'

import App from './App.vue'
import { router } from '@/config/routing/routes.ts'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
