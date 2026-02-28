<template>
  <!-- 根：固定视口高度、不撑开整页，仅主内容区 main 内部滚动 -->
  <div class="flex h-screen flex-col overflow-hidden">
    <!-- 移动端顶部栏 -->
    <header class="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 lg:hidden">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
        @click="sidebarStore?.toggleMobile?.()"
      >
        <Menu class="h-6 w-6" />
      </button>
      <div class="min-w-0 flex-1">
        <h1 class="truncate text-lg font-semibold">{{ title }}</h1>
      </div>
      <LocaleToggle />
    </header>

    <!-- 主体：横向 flex，侧边栏 + 主内容 -->
    <div class="flex min-h-0 flex-1">
      <!-- 侧边栏：flex 参与流式布局，宽度 + 缓动过渡 -->
      <aside
        :class="cn(
          'flex shrink-0 flex-col border-r border-border bg-background overflow-hidden',
          'transition-[width,min-width] duration-300 ease-in-out',
          // 移动端：仅打开时显示
          sidebarStore?.isOpen ? 'w-64' : 'w-0',
          // 桌面端 lg 及以上：始终显示，宽度由 isExpanded 决定
          (sidebarStore?.isExpanded ?? true) ? 'lg:w-64 lg:min-w-64' : 'lg:w-16 lg:min-w-16'
        )"
      >
        <div class="flex h-full w-full min-w-0 flex-col">
          <!-- Logo 区域：仅 Logo + 系统名，展开/收缩按钮已移至主内容区顶栏左侧 -->
          <div class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span class="text-sm font-bold">XC</span>
            </div>
            <Transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <span
                v-if="(sidebarStore?.isExpanded ?? true)"
                class="min-w-0 flex-1 truncate text-lg font-semibold"
              >
                {{ appStore.systemName }}
              </span>
            </Transition>
          </div>

          <!-- 导航菜单 -->
          <nav class="min-h-0 flex-1 space-y-1 overflow-y-auto p-4">
            <router-link
              v-for="item in visibleMenuItems"
              :key="item.path"
              :to="item.path"
              :class="cn(
                'flex items-center rounded-lg text-sm font-medium transition-colors',
                (sidebarStore?.isExpanded ?? true) ? 'gap-3 px-3 py-2' : 'justify-center px-2 py-2',
                isActive(item.path)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )"
              :title="!(sidebarStore?.isExpanded ?? true) ? item.label : undefined"
              @click="sidebarStore?.closeMobile?.()"
            >
              <component :is="item.icon" class="h-5 w-5 shrink-0" />
              <Transition
                enter-active-class="transition-opacity duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <span v-if="(sidebarStore?.isExpanded ?? true)" class="whitespace-nowrap">{{ item.label }}</span>
              </Transition>
            </router-link>
          </nav>

          <!-- 底部主题切换 -->
          <div class="shrink-0 border-t p-4">
            <SidebarThemeToggle />
          </div>
        </div>
      </aside>

      <!-- 主内容区：可滚动容器内顶栏 sticky，滚动时内容从顶栏下穿过并产生毛玻璃 -->
      <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
        <!-- 桌面端：可滚动区域包含顶栏+内容，顶栏 sticky 以便内容滚到其下方 -->
        <div
          ref="scrollContainerRef"
          class="min-h-0 flex-1 overflow-auto"
          @scroll="onMainScroll"
        >
          <header
            :class="[
              'app-layout-header sticky top-0 z-10 hidden h-16 shrink-0 items-center gap-3 border-b bg-background transition-[background,backdrop-filter] duration-200 lg:flex lg:px-4',
              mainScrolled && 'app-layout-header--blur'
            ]"
          >
            <button
              type="button"
              class="flex shrink-0 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              :title="(sidebarStore?.isExpanded ?? true) ? '收缩侧边栏' : '展开侧边栏'"
              @click="sidebarStore?.toggle?.()"
            >
              <ChevronLeft
                :class="cn(
                  'h-5 w-5 transition-transform duration-300',
                  !(sidebarStore?.isExpanded ?? true) && 'rotate-180'
                )"
              />
            </button>
            <div class="flex min-w-0 flex-1 items-center justify-between">
              <v-breadcrumbs :items="breadcrumbItemsWithHome" class="pa-0">
                <template #item="{ item }">
                  <RouterLink
                    v-if="item.to"
                    :to="item.to"
                    class="text-muted-foreground hover:text-foreground"
                  >
                    {{ item.title }}
                  </RouterLink>
                  <span v-else>{{ item.title }}</span>
                </template>
              </v-breadcrumbs>
              <div class="flex shrink-0 items-center gap-2">
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
                      <v-list-item
                        v-else
                        :prepend-icon="action.icon"
                        @click="action.command?.()"
                      >
                        {{ action.label }}
                      </v-list-item>
                    </template>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </header>

          <!-- 页面内容区：grid 叠放遮罩与内容 -->
          <div class="grid grid-rows-1 grid-cols-1">
            <div
              v-if="sidebarStore?.isOpen"
              class="col-start-1 row-start-1 z-10 bg-black/50 lg:hidden cursor-pointer"
              aria-hidden="true"
              @click="sidebarStore?.closeMobile?.()"
            />
            <main class="col-start-1 row-start-1 p-4 lg:p-6">
              <slot />
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, ChevronLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import SidebarThemeToggle from '@/components/SidebarThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useAppStore } from '@/stores/app'
import { getMenuItems } from '@/lib/menu'
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
// 确保在 setup 中同步获取 store，避免模板中未就绪
const sidebarStore = useSidebarStore()
const appStore = useAppStore()
const authStore = useAuthStore()
const { t } = useI18n()
const userMenuItems = [
  { label: t('profile.title'), icon: 'mdi-account', command: () => router.push('/profile') },
  { label: t('changePassword.title'), icon: 'mdi-lock', command: () => router.push('/profile/password') },
  { separator: true },
  { label: t('auth.logout'), icon: 'mdi-logout', command: handleLogout },
]

const breadcrumbItemsWithHome = computed(() => [
  { title: 'Home', to: '/' },
  { title: props.title },
])

const visibleMenuItems = computed(() => authStore.filterMenuByRoles(getMenuItems(t)))

// 主内容区滚动时顶栏毛玻璃（监听滚动容器）
const scrollContainerRef = ref<HTMLElement | null>(null)
const mainScrolled = ref(false)
function onMainScroll() {
  mainScrolled.value = (scrollContainerRef.value?.scrollTop ?? 0) > 0
}
onMounted(() => {
  if (scrollContainerRef.value) mainScrolled.value = scrollContainerRef.value.scrollTop > 0
})

function handleLogout() {
  authStore.clearAuth()
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

<style scoped>
/* 主内容有滚动时，顶栏毛玻璃 */
.app-layout-header--blur {
  background: hsl(var(--background) / 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>
