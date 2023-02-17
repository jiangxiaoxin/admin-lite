import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router } from "./router/index"
import { install as installDirectives } from "@/directives/index"
import { createPinia } from "pinia"
import {installIcons, installDynamicIcon} from "@/icons/index"


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
installDirectives(app)
installIcons(app)
installDynamicIcon(app)
app.mount('#app')
