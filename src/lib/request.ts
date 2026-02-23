/**
 * 请求封装：自动携带 token、统一错误提示、请求级 loading、baseURL 配置
 */
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { toast } from '@/lib/toast'
import { useLoadingStore } from '@/stores/loading'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

export const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('xclear-admin-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  useLoadingStore().start()
  return config
})

request.interceptors.response.use(
  response => {
    useLoadingStore().finish()
    return response
  },
  error => {
    useLoadingStore().finish()
    const message = error.response?.data?.message ?? error.response?.data?.error ?? error.message
    const status = error.response?.status
    if (status === 401) {
      localStorage.removeItem('xclear-admin-token')
      localStorage.removeItem('xclear-admin-user')
      localStorage.removeItem('xclear-admin-roles')
      toast.error('未授权', '请重新登录')
      return Promise.reject(error)
    }
    if (status && status >= 400) {
      toast.error('请求失败', message || `HTTP ${status}`)
    } else {
      toast.error('网络错误', message)
    }
    return Promise.reject(error)
  }
)

export default request
