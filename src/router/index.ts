import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/Login/login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/Main/Main.vue'),
      children: [
        {
          path: '/main/analysis/dashboard',
          component: () =>
            import('@/views/Main/Analysis/Dashboard/Dashboard.vue')
        },
        {
          path: '/main/analysis/overview',
          component: () => import('@/views/Main/Analysis/Overview/Overview.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/NotFound/NotFound.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
