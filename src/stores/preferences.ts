/**
 * 用户偏好：表格每页条数、列配置等，持久化到 localStorage
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'user-preferences'

export interface TablePreferences {
  rowsPerPage: number
  /** 列 key 顺序；空表示使用默认 */
  columnOrder?: string[]
  /** 列可见性；未列出的视为 true */
  columnVisibility?: Record<string, boolean>
}

const defaultTable: TablePreferences = {
  rowsPerPage: 10,
}

export interface UserPreferences {
  table: TablePreferences
  /** 从右到左布局（阿拉伯语等） */
  rtl: boolean
}

const defaults: UserPreferences = {
  table: { ...defaultTable },
  rtl: false,
}

function load(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaults }
    const parsed = JSON.parse(raw) as Partial<UserPreferences>
    return {
      table: { ...defaultTable, ...parsed?.table },
      rtl: parsed?.rtl ?? false,
    }
  } catch {
    return { ...defaults }
  }
}

function save(prefs: UserPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch (_) {}
}

export const usePreferencesStore = defineStore('preferences', () => {
  const prefs = ref<UserPreferences>(load())

  const table = computed({
    get: () => prefs.value.table,
    set: (t: TablePreferences) => {
      prefs.value.table = t
    },
  })

  function setTableRowsPerPage(rows: number) {
    prefs.value.table.rowsPerPage = rows
  }

  function setTableColumnOrder(columnOrder: string[]) {
    prefs.value.table.columnOrder = columnOrder
  }

  function setTableColumnVisibility(columnVisibility: Record<string, boolean>) {
    prefs.value.table.columnVisibility = columnVisibility
  }

  function setRtl(rtl: boolean) {
    prefs.value.rtl = rtl
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
  }

  const rtl = computed(() => prefs.value.rtl)

  /** 应用已保存的 RTL 到 document（首屏加载时调用） */
  function initRtl() {
    document.documentElement.setAttribute('dir', prefs.value.rtl ? 'rtl' : 'ltr')
  }

  watch(
    prefs,
    p => save({ ...p }),
    { deep: true }
  )

  return {
    table,
    rtl,
    setTableRowsPerPage,
    setTableColumnOrder,
    setTableColumnVisibility,
    setRtl,
    initRtl,
  }
})
