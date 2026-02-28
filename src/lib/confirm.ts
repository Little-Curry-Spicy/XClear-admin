/**
 * 确认对话框封装：兼容原 PrimeVue useConfirm 的 require() 调用方式
 */
import { useConfirmStore } from '@/stores/confirm'

export interface ConfirmRequireOptions {
  header?: string
  message: string
  rejectLabel?: string
  acceptLabel?: string
  acceptClass?: string
  accept?: () => void | Promise<void>
  reject?: () => void
}

export function useConfirm() {
  const confirmStore = useConfirmStore()

  return {
    require: (opts: ConfirmRequireOptions) => {
      confirmStore.open({
        title: opts.header,
        message: opts.message,
        cancelText: opts.rejectLabel,
        confirmText: opts.acceptLabel,
        confirmColor: opts.acceptClass?.includes('danger') ? 'error' : 'primary',
        onConfirm: opts.accept,
        onCancel: opts.reject,
      })
    },
  }
}
