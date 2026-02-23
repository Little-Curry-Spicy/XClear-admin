/**
 * 认证状态：登录用户、token、角色
 * 演示环境使用 localStorage 持久化；生产环境可改为对接后端登录接口
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const TOKEN_KEY = 'xclear-admin-token'
const USER_KEY = 'xclear-admin-user'
const ROLES_KEY = 'xclear-admin-roles'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const username = ref<string | null>(localStorage.getItem(USER_KEY))
  let initialRoles: string[] = []
  try {
    const raw = localStorage.getItem(ROLES_KEY)
    initialRoles = raw ? JSON.parse(raw) : []
  } catch {
    /* ignore */
  }
  const roles = ref<string[]>(initialRoles)

  const isLoggedIn = computed(() => !!token.value)

  function setAuth(payload: { token: string; username: string; roles: string[] }) {
    token.value = payload.token
    username.value = payload.username
    roles.value = payload.roles
    localStorage.setItem(TOKEN_KEY, payload.token)
    localStorage.setItem(USER_KEY, payload.username)
    localStorage.setItem(ROLES_KEY, JSON.stringify(payload.roles))
  }

  function clearAuth() {
    token.value = null
    username.value = null
    roles.value = []
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(ROLES_KEY)
  }

  function hasRole(role: string) {
    return roles.value.includes(role)
  }

  function hasAnyRole(roleList: string[]) {
    return roleList.some(r => roles.value.includes(r))
  }

  /** 根据角色过滤菜单项（无 roles 或 用户具备任一 role 则显示） */
  function filterMenuByRoles<T extends { roles?: string[] }>(items: T[]): T[] {
    if (!roles.value.length) return items
    return items.filter(item => {
      if (!item.roles?.length) return true
      return hasAnyRole(item.roles)
    })
  }

  return {
    token,
    username,
    roles,
    isLoggedIn,
    setAuth,
    clearAuth,
    hasRole,
    hasAnyRole,
    filterMenuByRoles,
  }
})
