<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('profile.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('profile.description') }}</p>
    </div>
    <v-card>
      <v-card-title>{{ $t('profile.title') }}</v-card-title>
      <v-card-text>
        <div class="grid gap-4 sm:grid-cols-2">
          <v-text-field
            :model-value="userDisplay.name"
            :label="$t('profile.name')"
            disabled
            density="comfortable"
          />
          <v-text-field
            :model-value="userDisplay.email"
            :label="$t('profile.email')"
            disabled
            density="comfortable"
          />
          <div class="space-y-2 sm:col-span-2">
            <label class="text-sm font-medium">{{ $t('profile.roles') }}</label>
            <div class="flex flex-wrap gap-2">
              <v-chip v-for="r in userDisplay.roles" :key="r" size="small">
                {{ r }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userDisplay = { name: t('common.guest'), email: '-', roles: [] as string[] }
</script>
