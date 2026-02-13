/**
 * 认证状态：登录态、用户信息、角色/权限、登出
 * 当前为前端模拟，实际需对接后端登录接口
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

export interface UserInfo {
  id: string
  name: string
  email: string
  roles: string[]
}

function loadToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function loadUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UserInfo
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(loadToken())
  const user = ref<UserInfo | null>(loadUser())

  const isAuthenticated = computed(() => !!token.value)

  /** 是否拥有某角色（用于菜单/按钮权限） */
  function hasRole(role: string): boolean {
    if (!user.value?.roles?.length) return false
    return user.value.roles.includes(role)
  }

  /** 是否拥有任一角色 */
  function hasAnyRole(roles: string[]): boolean {
    if (!roles?.length) return true
    return roles.some(r => hasRole(r))
  }

  /**
   * 模拟登录：任意账号/密码
   * 实际项目替换为 request.post('/auth/login', { username, password })
   */
  async function login(username: string, _password: string): Promise<void> {
    await new Promise(r => setTimeout(r, 400))
    const mockToken = 'mock-jwt-' + Date.now()
    const mockUser: UserInfo = {
      id: '1',
      name: username === 'admin' ? 'Admin' : username,
      email: `${username}@example.com`,
      roles: username === 'admin' ? ['admin', 'user'] : ['user'],
    }
    token.value = mockToken
    user.value = mockUser
    localStorage.setItem(TOKEN_KEY, mockToken)
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser))
  }

  /**
   * 模拟注册：提交后直接以新用户身份登录
   * 实际项目替换为 request.post('/auth/register', { username, email, password })
   */
  async function register(username: string, email: string, _password: string): Promise<void> {
    await new Promise(r => setTimeout(r, 500))
    const mockToken = 'mock-jwt-' + Date.now()
    const mockUser: UserInfo = {
      id: String(Date.now()),
      name: username.trim(),
      email: email.trim(),
      roles: ['user'],
    }
    token.value = mockToken
    user.value = mockUser
    localStorage.setItem(TOKEN_KEY, mockToken)
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser))
  }

  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    user,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    login,
    register,
    logout,
  }
})
