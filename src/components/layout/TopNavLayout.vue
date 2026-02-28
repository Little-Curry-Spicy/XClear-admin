<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <!-- 顶栏：Logo + 导航 + 右侧用户 -->
    <header class="z-50 flex h-16 shrink-0 items-center gap-6 border-b bg-background px-4">
      <RouterLink to="/" class="flex shrink-0 items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <span class="text-sm font-bold">XC</span>
        </div>
        <span class="hidden text-lg font-semibold sm:inline">{{ appStore.systemName }}</span>
      </RouterLink>

      <nav class="flex flex-1 items-center gap-1 overflow-x-auto">
        <RouterLink
          v-for="item in visibleMenuItems"
          :key="item.path"
          :to="item.path"
          :class="cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
            isActive(item.path)
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex shrink-0 items-center gap-2">
        <SidebarThemeToggle />
        <LocaleToggle />
        <v-menu location="bottom">
          <template #activator="{ props: menuProps }">
            <v-btn
              v-bind="menuProps"
              variant="text"
              prepend-icon="mdi-account"
              class="text-muted-foreground"
            >
              {{ $t('common.currentUser') }}
            </v-btn>
          </template>
          <v-list>
            <template v-for="(action, i) in userMenuItems" :key="i">
              <v-divider v-if="action.separator" />
              <v-list-item v-else :prepend-icon="action.icon" @click="action.command?.()">
                {{ action.label }}
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </div>
    </header>

    <!-- 面包屑 -->
    <div class="shrink-0 border-b px-4 py-2">
      <v-breadcrumbs :items="breadcrumbItemsWithHome" class="pa-0">
        <template #item="{ item }">
          <RouterLink v-if="item.to" :to="item.to" class="text-muted-foreground hover:text-foreground">
            {{ item.title }}
          </RouterLink>
          <span v-else>{{ item.title }}</span>
        </template>
      </v-breadcrumbs>
    </div>

    <!-- 主内容区：仅此区域可滚动 -->
    <main class="min-h-0 flex-1 overflow-auto px-0 py-4 lg:px-6 lg:py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import SidebarThemeToggle from '@/components/SidebarThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import { getMenuItems } from '@/lib/menu'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { toast } from '@/lib/toast'
import { useI18n } from 'vue-i18n'

defineProps<{ title?: string }>()

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()
const { t } = useI18n()

const userMenuItems = [
  { label: t('profile.title'), icon: 'mdi-account', command: () => router.push('/profile') },
  { label: t('changePassword.title'), icon: 'mdi-lock', command: () => router.push('/profile/password') },
  { separator: true },
  { label: t('auth.logout'), icon: 'mdi-logout', command: () => { authStore.clearAuth(); toast.info(t('auth.logout')); router.push('/login') } },
]

const breadcrumbItemsWithHome = computed(() => [
  { title: 'Home', to: '/' },
  { title: (route.meta?.title as string) || '仪表盘' },
])

const visibleMenuItems = computed(() => authStore.filterMenuByRoles(getMenuItems(t)))

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
