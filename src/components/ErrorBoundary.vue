<template>
  <div v-if="error" class="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-6">
    <p class="font-medium text-red-600 dark:text-red-400">{{ $t('errorBoundary.title') }}</p>
    <p class="text-muted-foreground text-sm max-w-md text-center">{{ error.message }}</p>
    <div class="flex gap-2">
      <Button :label="$t('errorBoundary.retry')" icon="pi pi-refresh" @click="retry" />
      <Button :label="$t('errorBoundary.backHome')" icon="pi pi-home" outlined @click="goHome" />
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const error = ref<Error | null>(null)
const router = useRouter()

onErrorCaptured((err: unknown) => {
  error.value = err instanceof Error ? err : new Error(String(err))
  return false
})

function retry() {
  error.value = null
}

function goHome() {
  error.value = null
  router.push('/')
}
</script>
