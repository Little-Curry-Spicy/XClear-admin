<template>
  <!-- 请求级 loading：顶部细进度条 -->
  <div
    v-show="loadingStore.loading"
    class="fixed top-0 left-0 right-0 z-10000 h-0.5 bg-primary transition-opacity duration-200"
    role="progressbar"
    aria-busy="true"
  >
    <div class="h-full w-1/3 bg-primary animate-loading-bar" />
  </div>
  <ErrorBoundary>
    <RouterView v-slot="{ Component, route: r }">
      <Transition name="fade-slide" mode="out-in">
        <component :is="Component" :key="r.matched[0]?.path ?? r.path" />
      </Transition>
    </RouterView>
  </ErrorBoundary>
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { setToastInstance } from '@/lib/toast'
import { useLoadingStore } from '@/stores/loading'
import ErrorBoundary from '@/components/ErrorBoundary.vue'

const toastService = useToast()
setToastInstance(toastService)
const loadingStore = useLoadingStore()

</script>
<style>
.p-panel-content-container {
 overflow: auto;
}
</style>