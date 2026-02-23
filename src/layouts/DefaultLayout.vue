<template>
  <AppLayout v-if="layoutStore.layoutMode === 'sidebar'" :title="pageTitle">
    <RouterView v-slot="{ Component, route: routeItem }">
      <Transition
        :name="String(routeItem.meta?.transition || 'fade-slide')"
        mode="out-in"
      >
        <component :is="Component" :key="routeItem.path" />
      </Transition>
    </RouterView>
  </AppLayout>
  <TopNavLayout v-else :title="pageTitle">
    <RouterView v-slot="{ Component, route: routeItem }">
      <Transition
        :name="String(routeItem.meta?.transition || 'fade-slide')"
        mode="out-in"
      >
        <component :is="Component" :key="routeItem.path" />
      </Transition>
    </RouterView>
  </TopNavLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import TopNavLayout from '@/components/layout/TopNavLayout.vue'
import { useLayoutStore } from '@/stores/layout'

const route = useRoute()
const layoutStore = useLayoutStore()

const pageTitle = computed((): string => {
  const titleMap: Record<string, string> = {
    Dashboard: '仪表盘',
    Form: '表单管理',
    Table: '表格管理',
    Settings: '系统设置',
    Profile: '个人资料',
    ChangePassword: '修改密码',
    UserList: '用户管理',
    UserDetail: '用户详情',
    UserForm: '添加用户',
    UserEdit: '编辑用户',
  }
  const name = route.name != null ? String(route.name) : ''
  return titleMap[name] || (route.meta?.title as string) || '仪表盘'
})
</script>
