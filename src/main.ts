import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router } from "./router/index"
import { install as installDirectives } from "@/directives/index"

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
installDirectives(app)
app.mount('#app')
