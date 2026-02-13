<template>
  <div class="min-h-screen">
    <!-- 移动端顶部栏 -->
    <header class="sticky top-0 z-50 flex h-16 items-center gap-4 border-b  px-4 lg:hidden">
      <button @click="sidebarStore.toggleMobile()"
        class="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent">
        <Menu class="h-6 w-6" />
      </button>
      <div class="flex-1">
        <h1 class="text-lg font-semibold">{{ title }}</h1>
      </div>
      <LocaleToggle />
    </header>

    <!-- 侧边栏遮罩层（移动端） -->
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="sidebarStore.isOpen" class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        @click="sidebarStore.closeMobile()" />
    </Transition>

    <!-- 侧边栏 -->
    <aside :class="cn(
      'fixed inset-y-0 left-0 z-50 border-r  transition-all duration-300 lg:translate-x-0',
      sidebarStore.isExpanded ? 'w-64' : 'w-16',
      sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    )">
      <div class="flex h-full flex-col">
        <!-- Logo 区域 -->
        <div class="relative flex h-16 items-center border-b px-4">
          <!-- Logo -->
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span class="text-sm font-bold">XC</span>
          </div>

          <!-- Logo 文字 -->
          <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <span v-if="sidebarStore.isExpanded" class="ml-2 flex-1 text-lg font-semibold whitespace-nowrap">
              XClear Admin
            </span>
          </Transition>

          <!-- 桌面端收缩/展开按钮 - 始终在右侧，收缩时使用绝对定位 -->
          <button @click="sidebarStore.toggle()" :class="cn(
            'rounded-md hidden items-center justify-center border border-border bg-background p-1.5 hover:bg-accent transition-all duration-300 lg:flex',
            sidebarStore.isExpanded
              ? 'ml-auto shrink-0'
              : 'absolute -right-5 top-1/2 -translate-y-1/2'
          )" :title="sidebarStore.isExpanded ? '收缩侧边栏' : '展开侧边栏'">
            <ChevronLeft :class="cn(
              'h-4 w-4 transition-transform duration-300',
              !sidebarStore.isExpanded && 'rotate-180'
            )" />
          </button>
        </div>

        <!-- 导航菜单 -->
        <nav class="flex-1 space-y-1 overflow-y-auto p-4">
          <router-link v-for="item in visibleMenuItems" :key="item.path" :to="item.path" @click="sidebarStore.closeMobile()"
            :class="cn(
              'flex items-center rounded-lg text-sm font-medium transition-colors',
              sidebarStore.isExpanded ? 'gap-3 px-3 py-2' : 'justify-center px-2 py-2',
              isActive(item.path)
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )" :title="!sidebarStore.isExpanded ? item.label : undefined">
            <component :is="item.icon" class="h-5 w-5 shrink-0" />
            <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
              enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
              leave-from-class="opacity-100" leave-to-class="opacity-0">
              <span v-if="sidebarStore.isExpanded" class="whitespace-nowrap">{{ item.label }}</span>
            </Transition>
          </router-link>
        </nav>

        <!-- 底部区域 - 主题切换 -->
        <div class="border-t p-4">
          <SidebarThemeToggle />
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <div :class="cn('transition-all duration-300', sidebarStore.isExpanded ? 'lg:pl-64' : 'lg:pl-16')">
      <!-- 桌面端顶部栏 -->
      <header class="sticky top-0 z-40 hidden h-16 items-center gap-4 border-b w-full bg-background lg:flex">
        <div class="flex-1 flex items-center justify-between">
          <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems">
            <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate">{{ item.label }}</a>
              </router-link>
              <span v-else>{{ item.label }}</span>
            </template>
          </Breadcrumb>
          <div class="flex items-center gap-2">
            <LocaleToggle />
            <Button text :label="$t('auth.logout')" icon="pi pi-sign-out" @click="handleLogout" class="text-muted-foreground" />
          </div>
          </div>
      </header>

      <!-- 页面内容 -->
      <main class="p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Home, Settings, FileEdit, Table, ChevronLeft } from 'lucide-vue-next'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import { cn } from '@/lib/utils'
import SidebarThemeToggle from '@/components/SidebarThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { toast } from '@/lib/toast'
import { useI18n } from 'vue-i18n'

export interface AppLayoutProps {
  title?: string
}

const props = withDefaults(defineProps<AppLayoutProps>(), {
  title: '仪表盘',
})

const route = useRoute()
const router = useRouter()
const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const { t } = useI18n()

const breadcrumbHome = { icon: 'pi pi-home', route: '/' }
const breadcrumbItems = computed(() => [{ label: props.title }])

// 菜单项配置（roles 为空表示不限制）
const menuItems = [
  { path: '/', label: t('menu.dashboard'), icon: Home, roles: ['admin', 'user'] },
  { path: '/form', label: t('menu.form'), icon: FileEdit, roles: ['admin', 'user', 'editor'] },
  { path: '/table', label: t('menu.table'), icon: Table, roles: ['admin', 'user', 'editor'] },
  { path: '/settings', label: t('menu.settings'), icon: Settings, roles: ['admin'] },
]
const visibleMenuItems = computed(() =>
  menuItems.filter(item => !item.roles?.length || authStore.hasAnyRole(item.roles))
)

function handleLogout() {
  authStore.logout()
  toast.info(t('auth.logout'))
  router.push('/login')
}

// 检查路由是否激活
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
