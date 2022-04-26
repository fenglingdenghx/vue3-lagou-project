import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
