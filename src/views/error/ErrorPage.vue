<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/30 p-6">
    <div class="error-page__lottie shrink-0 w-full max-w-[280px] sm:max-w-[320px]">
      <DotLottieVue src="/src/assets/lottie/404.lottie?url" style="height: 240px; width: 100%" class="mx-auto" autoplay loop />
    </div>
    <div class="error-page__text text-center space-y-2">
      <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">{{ $t('error.title') }}</h1>
      <p class="text-muted-foreground max-w-sm">{{ $t('error.description') }}</p>
    </div>
    <v-btn prepend-icon="mdi-home" color="primary" class="error-page__btn btn-hover-lift mt-2" @click="goHome">{{ $t('error.backHome') }}</v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<style scoped>
.error-page__lottie {
  animation: error-enter 0.5s cubic-bezier(0.25, 1, 0.5, 1) both;
}
.error-page__text {
  animation: error-enter 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.08s both;
}
.error-page__btn {
  animation: error-enter 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.16s both;
}
@keyframes error-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .error-page__lottie,
  .error-page__text,
  .error-page__btn {
    animation: none;
  }
}
</style>
