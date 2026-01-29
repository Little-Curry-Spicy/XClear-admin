<template>
  <RouterView />
  <Toast />
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { setToastInstance } from '@/lib/toast'

const toastService = useToast()
setToastInstance(toastService)
</script>