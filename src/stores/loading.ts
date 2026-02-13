/**
 * 全局请求 loading：配合 axios 拦截器，请求进行中时显示顶部进度条
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const count = ref(0)
  const loading = computed(() => count.value > 0)

  function start() {
    count.value += 1
  }

  function finish() {
    if (count.value > 0) count.value -= 1
  }

  return { loading, start, finish }
})
