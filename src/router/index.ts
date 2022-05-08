import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '../layout/app-layout.vue'
// routes
import productRoutes from './modules/product'
import promissionRoutes from './modules/promission'
import orderRoutes from './modules/order'
import mediaRoutes from './modules/media'

// nprogress
import nprogress from 'nprogress' // ts 中使用这个包记得添加第三方的类型声明包名为 @types/nprogress
import 'nprogress/nprogress.css'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      productRoutes,
      promissionRoutes,
      orderRoutes,
      mediaRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(() => {
  nprogress.start()
})
router.afterEach(() => {
  nprogress.done()
})

export default router
