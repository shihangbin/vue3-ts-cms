import 'normalize.css'
import '@/assets/css/index.css'
import 'element-plus/theme-chalk/el-message.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
// 针对 loading 样式引入
import registerIcons from './global/register-icons'

createApp(App).use(router).use(pinia).use(registerIcons).mount('#app')
