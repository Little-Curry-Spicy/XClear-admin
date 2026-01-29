/**
 * Toast 通知封装：基于 PrimeVue ToastService
 * 需在 App.vue 中调用 setToastInstance(useToast()) 初始化
 */
import type { ToastServiceMethods } from 'primevue/toastservice'

let toastInstance: ToastServiceMethods | null = null

export function setToastInstance(instance: ToastServiceMethods) {
  toastInstance = instance
}

export const toast = {
  success: (message: string, description?: string) => {
    toastInstance?.add({
      severity: 'success',
      summary: message,
      detail: description,
    })
  },
  error: (message: string, description?: string) => {
    toastInstance?.add({
      severity: 'error',
      summary: message,
      detail: description,
    })
  },
  warning: (message: string, description?: string) => {
    toastInstance?.add({
      severity: 'warn',
      summary: message,
      detail: description,
    })
  },
  info: (message: string, description?: string) => {
    toastInstance?.add({
      severity: 'info',
      summary: message,
      detail: description,
    })
  },
  loading: (message: string) => {
    return toastInstance?.add({
      severity: 'info',
      summary: message,
      life: 0,
    })
  },
}
