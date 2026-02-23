import { defineStore } from 'pinia'
import { ref } from 'vue'

const LAYOUT_MODE_KEY = 'layout-mode'

/** 布局模式：侧边栏 或 顶栏 */
export type LayoutMode = 'sidebar' | 'topnav'

function getSavedLayoutMode(): LayoutMode {
  const saved = localStorage.getItem(LAYOUT_MODE_KEY) || import.meta.env.VITE_LAYOUT_MODE
  return saved as LayoutMode
}

export const useLayoutStore = defineStore('layout', () => {
  const layoutMode = ref<LayoutMode>(getSavedLayoutMode())

  function setLayoutMode(mode: LayoutMode) {
    layoutMode.value = mode
    localStorage.setItem(LAYOUT_MODE_KEY, mode)
  }

  return { layoutMode, setLayoutMode }
})
