import * as VueRouter from "vue-router"
import { RouteRecordRaw } from "vue-router"
import PageA from "@/test/PageA.vue"
import PageB from "@/test/PageB.vue"
import PageC from "@/test/PageC.vue"
import NotFoundPage from "@/pages/404.vue"
import LayoutDefault from "@/layout/default.vue"
import AppVue from "@/App.vue"
import HomeVue from "@/pages/home/index.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    component: LayoutDefault,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: HomeVue
      }
    ]
  },
  {
    path: "/a",
    component: LayoutDefault,
    redirect: '/a/b',
    children: [
      {
        path: 'b',
        component: PageC
      }
    ]
  },
  {
    path: '/b',
    component: PageB
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
];

export const router = VueRouter.createRouter({
  routes: routes,
  history: VueRouter.createWebHashHistory()
})