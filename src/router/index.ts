import * as VueRouter from "vue-router"
import { RouteRecordRaw } from "vue-router"
import PageA from "@/test/PageA.vue"
import PageB from "@/test/PageB.vue"
import PageC from "@/test/PageC.vue"
import NotFoundPage from "@/pages/404.vue"
import LayoutDefault from "@/layout/default.vue"
import HomeVue from "@/pages/home/index.vue"
import Login from "@/pages/login/index.vue"
import About from "@/test/About.vue"
import Desc from "@/test/Desc.vue"

/**
 * meta
 *    hidden 本级路由是否在菜单里隐藏。默认空，不隐藏。明确为true则隐藏。隐藏后，此级路由及其以下路由不显示。
 *    对于根路由/，它进来之后并没有对应的组件，而是直接重定向走了。像这种特殊情况，要么代码里兼容处理，要么就直接配置成hidden:true直接隐藏。它并不影响实际的路由跳转，/依然是有效的，只不过是又重定向其他位置。但是菜单里就不会显示个空的菜单了。
 *  
 */

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home/index',
    meta: {
      hidden: true
    }
  },
  {
    path: '/home',
    component: LayoutDefault,
    redirect: '/home/index',
    meta: {
      title: '首页1'
    },
    children: [
      {
        path: 'index',
        component: HomeVue,
        meta: {
          title:'首页2'
        }
      }
    ]
  },
  {
    path: "/desc",
    component: LayoutDefault,
    redirect: '/desc/index',
    meta: {
      title: '父级的名字'
    },
    children: [
      {
        path: 'index',
        component: Desc,
        meta: {
          title: '子级的名字'
        }
      }
    ]
  },
  /**
   * 以about 这里的配置为例。这里的路由存在多级的情况
   * 按照普通判断，/about 这个路由下，只有1个路由，就是/about/index，所以会把/about/index 这个提级到父级来显示，并且显示成一个menu-item，但实际上/about/index 下还有两个子路由,这时候就无法显示了。
   * 通过添加alwaysShow，跳过合并阶段，直接往下走
   * 
   */
  {
    path: "/about",
    component: LayoutDefault,
    redirect: '/about/index',
    meta: {
      title: '关于的根',
      alwaysShow: true
    },
    children: [
      {
        path: 'index',
        component: About,
        meta: {
          title:'关于的1级-1'
        },
        children: [
          {
            path: 'a',
            component: PageA,
            meta: {
              title: '关于a'
            }
          },
          {
            path: 'b',
            component: PageB,

            meta: {
              title: '关于b',
              alwaysShow: true,
              jump: true,
            },
            children: [
              {
                path: 'cc',
                component: PageC,
                meta: {
                  title: '还有1级'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'foo',
        component: About,
        meta: {
          title: '关于的1级-2'
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: {
      hidden: true
    }
  }
];

export const router = VueRouter.createRouter({
  routes: routes,
  history: VueRouter.createWebHashHistory()
})