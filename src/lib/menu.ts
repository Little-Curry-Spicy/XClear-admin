/**
 * 侧栏/顶栏共用菜单配置
 * 动态菜单时可由 API 数据合并或覆盖
 */
import type { Component } from 'vue'
import { Home, Settings, FileEdit, Table, Users } from 'lucide-vue-next'

export interface MenuItem {
  path: string
  label: string
  icon: Component
  roles?: string[]
}

export function getMenuItems(t: (key: string) => string): MenuItem[] {
  return [
    { path: '/', label: t('menu.dashboard'), icon: Home, roles: ['admin', 'user'] },
    { path: '/users', label: t('menu.users'), icon: Users, roles: ['admin', 'user', 'editor'] },
    { path: '/form', label: t('menu.form'), icon: FileEdit, roles: ['admin', 'user', 'editor'] },
    { path: '/table', label: t('menu.table'), icon: Table, roles: ['admin', 'user', 'editor'] },
    { path: '/settings', label: t('menu.settings'), icon: Settings, roles: ['admin'] },
  ]
}

/** 根据当前用户角色过滤菜单（当前为前端写死角色，可改为从 auth store 取） */
export function filterMenuByRole(items: MenuItem[], _roles: string[]): MenuItem[] {
  return items
}
