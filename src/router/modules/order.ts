import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'order',
  name: '',
  component: RouterView,
  meta: {
    title: '订单'
  },
  children: [
    {
      path: 'order_list',
      name: 'order_list',
      component: () => import('@/views/order/list/index.vue'),
      meta: {
        title: '订单列表'
      }
    },
    {
      path: 'order_offline',
      name: 'order_offline',
      component: () => import('@/views/order/offline/index.vue'),
      meta: {
        title: 'order_offline'
      }
    }
  ]
}

export default routes
