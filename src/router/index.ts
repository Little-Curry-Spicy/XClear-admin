import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/** 需要登录才能访问的路由，可配置 meta.roles 限制角色 */
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { public: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { roles: ['admin', 'user'] },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/Form.vue'),
        meta: { roles: ['admin', 'user', 'editor'] },
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/Table.vue'),
        meta: { roles: ['admin', 'user', 'editor'] },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
        meta: { roles: ['admin'] },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/ErrorPage.vue'),
    meta: { public: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  const isPublic = to.meta.public === true
  const requiresAuth = to.meta.requiresAuth !== false && !isPublic

  if (to.path === '/login' || to.path === '/register') {
    if (authStore.isAuthenticated) {
      next((to.query.redirect as string) || '/')
      return
    }
    next()
    return
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  const roles = to.meta.roles as string[] | undefined
  if (roles?.length && !authStore.hasAnyRole(roles)) {
    next({ path: '/' })
    return
  }

  next()
})

export default router
