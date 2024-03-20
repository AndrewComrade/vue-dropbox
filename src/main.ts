import { createApp } from 'vue'
import './config/styles/style.css'
import App from './App.vue'

import { router } from '@/config/routing/routes.ts'

createApp(App).use(router).mount('#app')
