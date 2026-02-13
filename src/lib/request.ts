/**
 * 请求封装：自动携带 token、统一错误提示、baseURL 配置
 */
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { toast } from '@/lib/toast'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

export const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (_) {}
  return config
})

request.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message ?? error.response?.data?.error ?? error.message
    const status = error.response?.status
    if (status === 401) {
      toast.error('未授权', '请重新登录')
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
      window.location.href = '/login'
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
