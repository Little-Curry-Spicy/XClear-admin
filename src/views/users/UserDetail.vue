<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <v-btn icon="mdi-arrow-left" variant="text" @click="router.push('/users')" />
      <div>
        <h2 class="text-2xl font-bold tracking-tight">{{ user?.name ?? '-' }}</h2>
        <p class="text-muted-foreground">{{ $t('users.description') }}</p>
      </div>
      <v-btn
        v-if="user"
        :label="$t('common.edit')"
        prepend-icon="mdi-pencil"
        color="primary"
        class="ml-auto"
        @click="router.push(`/users/${user.id}/edit`)"
      />
    </div>

    <v-card v-if="user">
      <v-card-title>{{ $t('profile.title') }}</v-card-title>
      <v-card-text>
        <dl class="grid gap-4 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-muted-foreground">{{ $t('table.name') }}</dt>
            <dd class="mt-1">{{ user.name }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-muted-foreground">{{ $t('table.email') }}</dt>
            <dd class="mt-1">{{ user.email }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-muted-foreground">{{ $t('table.role') }}</dt>
            <dd class="mt-1">
              <v-chip :color="getRoleSeverity(user.role) === 'danger' ? 'error' : getRoleSeverity(user.role) === 'info' ? 'info' : 'default'" size="small">
                {{ getRoleLabel(user.role) }}
              </v-chip>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-muted-foreground">{{ $t('table.status') }}</dt>
            <dd class="mt-1">
              <v-chip :color="user.status === 'active' ? 'success' : 'default'" size="small">
                {{ user.status === 'active' ? $t('table.statusActive') : $t('table.statusInactive') }}
              </v-chip>
            </dd>
          </div>
          <div v-if="user.phone">
            <dt class="text-sm font-medium text-muted-foreground">{{ $t('form.phone') }}</dt>
            <dd class="mt-1">{{ user.phone }}</dd>
          </div>
          <div v-if="user.createdAt">
            <dt class="text-sm font-medium text-muted-foreground">{{ $t('common.createTime') }}</dt>
            <dd class="mt-1">{{ user.createdAt }}</dd>
          </div>
        </dl>
      </v-card-text>
    </v-card>

    <v-card v-else>
      <v-card-text>
        <p class="py-8 text-center text-muted-foreground">{{ $t('table.noData') }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getMockUser } from './mock'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const user = computed(() => getMockUser(Number(route.params.id)))

function getRoleLabel(role: string) {
  const map: Record<string, string> = {
    admin: t('table.roleAdmin'),
    user: t('table.roleUser'),
    editor: t('table.roleEditor'),
  }
  return map[role] || role
}

function getRoleSeverity(role: string): string {
  if (role === 'admin') return 'danger'
  if (role === 'editor') return 'info'
  return 'secondary'
}
</script>
