/**
 * 按当前语言/区域格式化日期、数字、货币（面向全球后台）
 */
import type { Locale } from '@/i18n'

const localeToBCP: Record<Locale, string> = {
  'zh-CN': 'zh-CN',
  'en-US': 'en-US',
}

/**
 * 获取当前 i18n locale 对应的 BCP 47 字符串（用于 Intl）
 */
export function getFormatLocale(): string {
  try {
    const locale = (localStorage.getItem('locale') as Locale) || 'zh-CN'
    return localeToBCP[locale] ?? locale
  } catch {
    return 'en-US'
  }
}

/**
 * 格式化日期（按当前语言）
 */
export function formatDate(
  value: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
): string {
  const date = typeof value === 'object' && value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(getFormatLocale(), options).format(date)
}

/**
 * 格式化日期时间
 */
export function formatDateTime(
  value: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'short' }
): string {
  const date = typeof value === 'object' && value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(getFormatLocale(), options).format(date)
}

/**
 * 格式化数字（千分位等）
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }
): string {
  return new Intl.NumberFormat(getFormatLocale(), options).format(value)
}

/**
 * 格式化货币
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(getFormatLocale(), {
    style: 'currency',
    currency,
    ...options,
  }).format(value)
}
