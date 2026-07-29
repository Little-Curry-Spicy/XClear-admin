/**
 * 侧栏/顶栏共用菜单配置（图标统一为 MDI 字符串，与 Vuetify 一致）
 */
export interface MenuItem {
  path: string
  label: string
  /** Material Design Icons 名称，如 mdi-home */
  icon: string
  roles?: string[]
}

/**
 * 获取静态菜单项（可按角色过滤）
 * @param t - i18n 翻译函数
 */
export function getMenuItems(t: (key: string) => string): MenuItem[] {
  return [
    { path: '/', label: t('menu.dashboard'), icon: 'mdi-view-dashboard', roles: ['admin', 'user'] },
    { path: '/users', label: t('menu.users'), icon: 'mdi-account-group', roles: ['admin', 'user', 'editor'] },
    { path: '/form', label: t('menu.form'), icon: 'mdi-form-select', roles: ['admin', 'user', 'editor'] },
    { path: '/table', label: t('menu.table'), icon: 'mdi-table', roles: ['admin', 'user', 'editor'] },
    { path: '/settings', label: t('menu.settings'), icon: 'mdi-cog', roles: ['admin'] },
  ]
}

/**
 * 根据当前用户角色过滤菜单（占位；实际过滤在 authStore.filterMenuByRoles）
 * @param items - 菜单列表
 * @param _roles - 角色列表
 */
export function filterMenuByRole(items: MenuItem[], _roles: string[]): MenuItem[] {
  return items
}
