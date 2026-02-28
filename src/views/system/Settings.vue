<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('settings.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('settings.description') }}</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <v-card>
        <v-card-title>{{ $t('settings.appearance') }}</v-card-title>
        <v-card-text>
          <div class="space-y-6">
            <div>
              <label class="text-sm font-medium">{{ $t('settings.themeMode') }}</label>
              <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.themeModeDesc') }}</p>
              <div class="flex flex-wrap gap-2">
                <v-btn
                  v-for="mode in themeModes"
                  :key="mode.value"
                  :color="themeStore.themeMode === mode.value ? 'primary' : undefined"
                  :variant="themeStore.themeMode === mode.value ? 'flat' : 'outlined'"
                  size="small"
                  @click="themeStore.setThemeMode(mode.value)"
                >
                  {{ mode.label }}
                </v-btn>
              </div>
            </div>
            <div>
              <label class="text-sm font-medium">{{ $t('settings.themeColor') }}</label>
              <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.themeColorDesc') }}</p>
              <div class="flex flex-wrap gap-2">
                <v-btn
                  v-for="c in themeColors"
                  :key="c.value"
                  :color="themeStore.themeColor === c.value ? 'primary' : undefined"
                  :variant="themeStore.themeColor === c.value ? 'flat' : 'outlined'"
                  size="small"
                  @click="themeStore.setThemeColor(c.value)"
                >
                  {{ c.label }}
                </v-btn>
              </div>
            </div>
            <div>
              <label class="text-sm font-medium">{{ $t('settings.layoutMode') }}</label>
              <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.layoutModeDesc') }}</p>
              <div class="flex flex-wrap gap-2">
                <v-btn
                  v-for="lay in layoutModes"
                  :key="lay.value"
                  :color="layoutStore.layoutMode === lay.value ? 'primary' : undefined"
                  :variant="layoutStore.layoutMode === lay.value ? 'flat' : 'outlined'"
                  size="small"
                  @click="layoutStore.setLayoutMode(lay.value)"
                >
                  {{ lay.label }}
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>{{ $t('settings.notifications') }}</v-card-title>
        <v-card-text>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">{{ $t('settings.emailNotification') }}</p>
                <p class="text-xs text-muted-foreground">{{ $t('settings.emailNotificationDesc') }}</p>
              </div>
              <v-switch v-model="emailNotify" hide-details />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">{{ $t('settings.pushNotification') }}</p>
                <p class="text-xs text-muted-foreground">{{ $t('settings.pushNotificationDesc') }}</p>
              </div>
              <v-switch v-model="pushNotify" hide-details />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore, type ThemeMode, type ThemeColor } from '@/stores/theme'
import { useLayoutStore, type LayoutMode } from '@/stores/layout'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
const emailNotify = ref(false)
const pushNotify = ref(true)

const themeModes = computed(() => [
  { value: 'system' as ThemeMode, label: t('settings.systemTheme') },
  { value: 'light' as ThemeMode, label: t('settings.lightTheme') },
  { value: 'dark' as ThemeMode, label: t('settings.darkTheme') },
])

const themeColors = computed(() => [
  { value: 'zinc' as ThemeColor, label: t('settings.themeColorZinc') },
  { value: 'blue' as ThemeColor, label: t('settings.themeColorBlue') },
  { value: 'green' as ThemeColor, label: t('settings.themeColorGreen') },
])

const layoutModes = computed(() => [
  { value: 'sidebar' as LayoutMode, label: t('settings.layoutSidebar') },
  { value: 'topnav' as LayoutMode, label: t('settings.layoutTopnav') },
])
</script>
