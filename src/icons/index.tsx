import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { App, createVNode } from "vue";

export function installIcons(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}

const Icon = (props: { icon: string, size:number|string|undefined }) => {
  // @ts-ignore
  return <el-icon size={props.size}>{createVNode(ElementPlusIconsVue[props.icon])}</el-icon>;
};

export function installDynamicIcon(app: App) {
  app.component("DynamicIcon", Icon);
}


/**
 * element-plus修改了原来的icon用法，每个icon都是单独的组件，那将全部icon的组件全局注册后，用动态组件component就可以通过名字来渲染出对应的icon。这正好也跟router/index 里配置路由记录时用字符串来声明icon匹配起来。
 * 
 * 或者用 DynamicIcon组件，通过icon名称的字符串获取对应的真正的icon组件后，创建虚拟节点在el-icon组件里渲染
 */