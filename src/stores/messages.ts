/**
 * 全局 Snackbar 消息队列，供 toast 与 v-snackbar-queue 使用
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface SnackbarMessage {
  text: string
  color?: 'success' | 'info' | 'error' | 'warning' | string
  timeout?: number
}

export const useMessagesStore = defineStore('messages', () => {
  const queue = ref<SnackbarMessage[]>([])

  function add(message: SnackbarMessage) {
    queue.value.push({
      timeout: 3000,
      ...message,
    })
  }

  /** v-snackbar-queue 会消费并更新 queue，需支持外部写入 */
  function setQueue(val: SnackbarMessage[]) {
    queue.value = val
  }

  return { queue, add, setQueue }
})
