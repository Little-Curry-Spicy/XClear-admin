<template>
  <div class="min-h-screen">
    <!-- 顶栏：Logo + 导航 + 右侧用户 -->
    <header class="sticky top-0 z-50 flex h-16 items-center gap-6 border-b bg-background px-4">
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
        <Button
          :label="$t('common.currentUser')"
          icon="pi pi-user"
          text
          class="text-muted-foreground"
          @click="(e: Event) => userMenu?.toggle(e)"
          aria-haspopup="true"
          aria-controls="user-menu-top"
        />
        <PrimeMenu id="user-menu-top" ref="userMenu" :model="userMenuItems" :popup="true" />
      </div>
    </header>

    <!-- 面包屑 + 主内容 -->
    <div class="border-b px-4 py-2">
      <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">{{ item.label }}</a>
          </router-link>
          <span v-else>{{ item.label }}</span>
        </template>
      </Breadcrumb>
    </div>

    <!-- 移动端左右无内边距以占满全屏，桌面端保留内边距 -->
    <main class="px-0 py-4 lg:px-6 lg:py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import PrimeMenu from 'primevue/menu'
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
const userMenu = ref<InstanceType<typeof PrimeMenu> | null>(null)

const userMenuItems = [
  { label: t('profile.title'), icon: 'pi pi-user', command: () => router.push('/profile') },
  { label: t('changePassword.title'), icon: 'pi pi-lock', command: () => router.push('/profile/password') },
  { separator: true },
  { label: t('auth.logout'), icon: 'pi pi-sign-out', command: () => { authStore.clearAuth(); toast.info(t('auth.logout')); router.push('/login') } },
]

const breadcrumbHome = { icon: 'pi pi-home', route: '/' }
const breadcrumbItems = computed(() => [{ label: route.meta?.title as string || '仪表盘' }])

const visibleMenuItems = computed(() => authStore.filterMenuByRoles(getMenuItems(t)))

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
