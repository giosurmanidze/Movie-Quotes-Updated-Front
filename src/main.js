import './main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './lang'
import App from './App.vue'
import router from './router'
import './config/vee-validate/messages'
import './config/vee-validate/rules'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
