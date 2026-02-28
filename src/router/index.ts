import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/examples/Form.vue'),
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/examples/Table.vue'),
      },
      {
        path: 'users',
        name: 'UserList',
        meta: { title: '用户管理' },
        component: () => import('@/views/users/UserList.vue'),
      },
      {
        path: 'users/add',
        name: 'UserForm',
        meta: { title: '添加用户' },
        component: () => import('@/views/users/UserForm.vue'),
      },
      {
        path: 'users/:id',
        name: 'UserDetail',
        meta: { title: '用户详情' },
        component: () => import('@/views/users/UserDetail.vue'),
      },
      {
        path: 'users/:id/edit',
        name: 'UserEdit',
        meta: { title: '编辑用户' },
        component: () => import('@/views/users/UserForm.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/system/Settings.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/account/Profile.vue'),
      },
      {
        path: 'profile/password',
        name: 'ChangePassword',
        component: () => import('@/views/account/ChangePassword.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/ErrorPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫：未登录时访问需登录页则跳转登录
router.beforeEach((to, _from, next) => {
  NProgress.start()
  const publicPaths = ['/login', '/register']
  if (publicPaths.some(p => to.path.startsWith(p))) {
    next()
    return
  }
  const token = localStorage.getItem('xclear-admin-token')
  if (!token) {
    next({ path: '/login', query: to.path !== '/' ? { redirect: to.fullPath } : undefined })
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
