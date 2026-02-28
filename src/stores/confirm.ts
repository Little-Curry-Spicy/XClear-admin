/**
 * 全局确认对话框状态，替代 PrimeVue ConfirmDialog
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ConfirmOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmColor?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

export const useConfirmStore = defineStore('confirm', () => {
  const visible = ref(false)
  const options = ref<ConfirmOptions | null>(null)
  const loading = ref(false)

  function open(opts: ConfirmOptions) {
    options.value = opts
    visible.value = true
  }

  function close() {
    visible.value = false
    options.value = null
    loading.value = false
  }

  async function confirm() {
    const opts = options.value
    if (!opts?.onConfirm) {
      close()
      return
    }
    loading.value = true
    try {
      await opts.onConfirm()
      close()
    } finally {
      loading.value = false
    }
  }

  function cancel() {
    options.value?.onCancel?.()
    close()
  }

  return { visible, options, loading, open, close, confirm, cancel }
})
