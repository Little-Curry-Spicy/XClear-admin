import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  // 侧边栏是否展开（桌面端）
  const isExpanded = ref<boolean>(
    localStorage.getItem('sidebar-expanded') !== 'false'
  )

  // 侧边栏是否打开（移动端）
  const isOpen = ref(false)

  // 切换展开/收缩状态
  const toggle = () => {
    isExpanded.value = !isExpanded.value
    localStorage.setItem('sidebar-expanded', String(isExpanded.value))
  }

  // 设置展开状态
  const setExpanded = (expanded: boolean) => {
    isExpanded.value = expanded
    localStorage.setItem('sidebar-expanded', String(expanded))
  }

  // 切换移动端打开状态
  const toggleMobile = () => {
    isOpen.value = !isOpen.value
  }

  // 关闭移动端侧边栏
  const closeMobile = () => {
    isOpen.value = false
  }

  return {
    isExpanded,
    isOpen,
    toggle,
    setExpanded,
    toggleMobile,
    closeMobile,
  }
})
