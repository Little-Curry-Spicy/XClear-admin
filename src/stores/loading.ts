/**
 * 全局请求 loading：与 axios 拦截器配合，可驱动顶部进度条
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const pending = ref(0)
  const active = ref(false)

  /** 开始一次请求，引用计数 +1 */
  function start() {
    pending.value += 1
    active.value = true
  }

  /** 结束一次请求，引用计数归零时关闭 loading */
  function finish() {
    pending.value = Math.max(0, pending.value - 1)
    if (pending.value === 0) active.value = false
  }

  /** 强制重置 */
  function reset() {
    pending.value = 0
    active.value = false
  }

  return { pending, active, start, finish, reset }
})
