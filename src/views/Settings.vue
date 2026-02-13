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
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">{{ $t('settings.themeMode') }}</label>
            <p class="text-xs text-muted-foreground mb-2">{{ $t('settings.themeMode') }}</p>
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
        </div>
      </Panel>

      <Panel>
        <template #header>
          <span class="font-semibold">{{ $t('settings.preferences') }}</span>
        </template>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">{{ $t('settings.tableRowsPerPage') }}</label>
            <p class="text-xs text-muted-foreground mb-2">{{ $t('table.pageSize') }}</p>
            <Select
              :model-value="preferencesStore.table.rowsPerPage"
              :options="rowsPerPageOptions"
              option-label="label"
              option-value="value"
              @update:model-value="preferencesStore.setTableRowsPerPage($event)"
              class="w-full sm:w-[140px]"
            />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">{{ $t('settings.rtlMode') }}</p>
              <p class="text-xs text-muted-foreground">{{ $t('settings.rtlModeDesc') }}</p>
            </div>
            <InputSwitch :model-value="preferencesStore.rtl" @update:model-value="preferencesStore.setRtl($event)" />
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
import { useThemeStore, type ThemeMode } from '@/stores/theme'
import { usePreferencesStore } from '@/stores/preferences'
import { useI18n } from 'vue-i18n'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'
import Select from 'primevue/select'

const { t } = useI18n()
const themeStore = useThemeStore()
const preferencesStore = usePreferencesStore()
const emailNotify = ref(false)
const pushNotify = ref(true)

const themeModes = computed(() => [
  { value: 'system' as ThemeMode, label: t('settings.systemTheme') },
  { value: 'light' as ThemeMode, label: t('settings.lightTheme') },
  { value: 'dark' as ThemeMode, label: t('settings.darkTheme') },
])

const rowsPerPageOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
  { label: '50', value: 50 },
]
</script>
