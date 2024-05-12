/*
 * @Author: kasuie
 * @Date: 2024-05-02 16:53:58
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-02 20:16:59
 * @Description:
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
