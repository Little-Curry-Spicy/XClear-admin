<template>
  <!-- key 用根级匹配路径：仪表盘/表单/表格/设置同属一个 layout，不重挂整页，只有 DefaultLayout 内中间内容做过渡 -->
  <RouterView />
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { setToastInstance } from '@/lib/toast'
import { usePreferencesStore } from '@/stores/preferences'

const toastService = useToast()
setToastInstance(toastService)

onMounted(() => {
  usePreferencesStore().initRtl()
})
</script>