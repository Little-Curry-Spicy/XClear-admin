/**
 * 菜单 API：可从后端拉取菜单配置，用于动态菜单
 * 使用方式：在 App 初始化或登录后调用 fetchMenuFromApi()，将返回的菜单与角色过滤后写入 store，布局组件从 store 读取
 * 后端接口约定：GET /api/menu 返回 { path, label, icon?, roles? }[]
 */
import { request } from '@/lib/request'

/** 后端返回的菜单项 */
export interface ApiMenuItem {
  path: string
  label: string
  icon?: string
  roles?: string[]
}

export async function fetchMenuFromApi(): Promise<ApiMenuItem[] | null> {
  try {
    const { data } = await request.get<ApiMenuItem[]>('/api/menu')
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}
