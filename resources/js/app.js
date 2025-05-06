import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './routes'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'auth-token'
)}`

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')
