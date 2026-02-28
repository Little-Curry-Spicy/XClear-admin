/**
 * Toast 通知封装：基于 Vuetify v-snackbar-queue + Pinia messages store
 */
import { useMessagesStore } from '@/stores/messages'

export const toast = {
  success: (message: string, description?: string) => {
    const msg = description ? `${message}\n${description}` : message
    useMessagesStore().add({ text: msg, color: 'success' })
  },
  error: (message: string, description?: string) => {
    const msg = description ? `${message}\n${description}` : message
    useMessagesStore().add({ text: msg, color: 'error' })
  },
  warning: (message: string, description?: string) => {
    const msg = description ? `${message}\n${description}` : message
    useMessagesStore().add({ text: msg, color: 'warning' })
  },
  info: (message: string, description?: string) => {
    const msg = description ? `${message}\n${description}` : message
    useMessagesStore().add({ text: msg, color: 'info' })
  },
  loading: (message: string) => {
    useMessagesStore().add({ text: message, color: 'info', timeout: 0 })
  },
}
