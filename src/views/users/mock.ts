/** 用户管理模块 mock 数据，对接后端时替换为 API 请求 */
export interface UserItem {
  id: number
  name: string
  email: string
  role: string
  status: string
  phone?: string
  createdAt?: string
}

export const mockUserList: UserItem[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', phone: '13800138001', createdAt: '2024-01-15' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user', status: 'active', phone: '13800138002', createdAt: '2024-02-20' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'editor', status: 'inactive', phone: '13800138003', createdAt: '2024-03-10' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'admin', status: 'active', phone: '13800138004', createdAt: '2024-04-05' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'user', status: 'active', phone: '13800138005', createdAt: '2024-05-12' },
]

export function getMockUser(id: number): UserItem | undefined {
  return mockUserList.find(u => u.id === Number(id))
}
