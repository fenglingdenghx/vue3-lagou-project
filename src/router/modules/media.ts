import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'media',
  component: RouterView,
  children: [
    {
      path: '',
      name: 'media',
      component: () => import('@/views/media/index.vue'),
      meta: {
        title: '媒体'
      }
    }
  ]
}

export default routes
