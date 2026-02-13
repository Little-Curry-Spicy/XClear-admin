<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('profile.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('profile.description') }}</p>
    </div>
    <Panel>
      <template #header>
        <span class="font-semibold">{{ $t('profile.title') }}</span>
      </template>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium">{{ $t('profile.name') }}</label>
          <InputText :model-value="userDisplay.name" class="w-full" disabled />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">{{ $t('profile.email') }}</label>
          <InputText :model-value="userDisplay.email" class="w-full" disabled />
        </div>
        <div class="space-y-2 sm:col-span-2">
          <label class="text-sm font-medium">{{ $t('profile.roles') }}</label>
          <div class="flex flex-wrap gap-2">
            <Tag v-for="r in userDisplay.roles" :key="r" :value="r" />
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

const { t } = useI18n()
const userDisplay = { name: t('common.guest'), email: '-', roles: [] as string[] }
</script>
