import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Locale } from '@/i18n'
import i18n from '@/i18n'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref<Locale>(
    (localStorage.getItem('locale') as Locale) || 'zh-CN'
  )

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale
    localStorage.setItem('locale', newLocale)
    // 直接更新 i18n 实例的 locale
    i18n.global.locale.value = newLocale
  }

  return {
    currentLocale,
    setLocale,
  }
})
