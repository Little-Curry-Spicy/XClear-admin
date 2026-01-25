<template>
  <AppLayout :title="pageTitle">
    <RouterView v-slot="{ Component, route: routeItem }">
      <Transition
        :name="routeItem.meta.transition || 'fade-slide'"
        mode="out-in"
      >
        <component :is="Component" :key="routeItem.path" />
      </Transition>
    </RouterView>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const route = useRoute()

const pageTitle = computed(() => {
  const titleMap: Record<string, string> = {
    Dashboard: '仪表盘',
    Form: '表单管理',
    Table: '表格管理',
    Settings: '系统设置',
  }
  return titleMap[route.name as string] || '仪表盘'
})
</script>
