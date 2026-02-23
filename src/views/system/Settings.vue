<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('settings.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('settings.description') }}</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Panel>
        <template #header>
          <span class="font-semibold">{{ $t('settings.appearance') }}</span>
        </template>
        <div class="space-y-6">
          <div>
            <label class="text-sm font-medium">{{ $t('settings.themeMode') }}</label>
            <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.themeModeDesc') }}</p>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="mode in themeModes"
                :key="mode.value"
                :label="mode.label"
                :severity="themeStore.themeMode === mode.value ? 'primary' : 'secondary'"
                :outlined="themeStore.themeMode !== mode.value"
                class="flex-1 min-w-[80px]"
                @click="themeStore.setThemeMode(mode.value)"
              />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">{{ $t('settings.themeColor') }}</label>
            <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.themeColorDesc') }}</p>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="c in themeColors"
                :key="c.value"
                :label="c.label"
                :severity="themeStore.themeColor === c.value ? 'primary' : 'secondary'"
                :outlined="themeStore.themeColor !== c.value"
                class="min-w-[80px]"
                @click="themeStore.setThemeColor(c.value)"
              />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">{{ $t('settings.layoutMode') }}</label>
            <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.layoutModeDesc') }}</p>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="lay in layoutModes"
                :key="lay.value"
                :label="lay.label"
                :severity="layoutStore.layoutMode === lay.value ? 'primary' : 'secondary'"
                :outlined="layoutStore.layoutMode !== lay.value"
                class="min-w-[100px]"
                @click="layoutStore.setLayoutMode(lay.value)"
              />
            </div>
          </div>
        </div>
      </Panel>

      <Panel>
        <template #header>
          <span class="font-semibold">{{ $t('settings.notifications') }}</span>
        </template>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">{{ $t('settings.emailNotification') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('settings.emailNotificationDesc') }}</p>
            </div>
            <InputSwitch v-model="emailNotify" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">{{ $t('settings.pushNotification') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('settings.pushNotificationDesc') }}</p>
            </div>
            <InputSwitch v-model="pushNotify" />
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore, type ThemeMode, type ThemeColor } from '@/stores/theme'
import { useLayoutStore, type LayoutMode } from '@/stores/layout'
import { useI18n } from 'vue-i18n'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'

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
