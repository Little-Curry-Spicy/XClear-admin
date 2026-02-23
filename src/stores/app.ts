/**
 * 应用级配置：系统名称等，从环境变量读取，可在任意组件通过 useAppStore() 使用
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const systemName = ref(import.meta.env.VITE_SYSTEM_NAME ?? 'XClear Admin')
  
  return {
    systemName,
  }
})
