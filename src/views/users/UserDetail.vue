<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <Button icon="pi pi-arrow-left" text @click="router.push('/users')" />
      <div>
        <h2 class="text-2xl font-bold tracking-tight">{{ user?.name ?? '-' }}</h2>
        <p class="text-muted-foreground">{{ $t('users.description') }}</p>
      </div>
      <Button
        v-if="user"
        :label="$t('common.edit')"
        icon="pi pi-pencil"
        class="ml-auto"
        @click="router.push(`/users/${user.id}/edit`)"
      />
    </div>

    <Panel v-if="user">
      <template #header>
        <span class="font-semibold">{{ $t('profile.title') }}</span>
      </template>
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
            <Tag :value="getRoleLabel(user.role)" :severity="getRoleSeverity(user.role)" />
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-muted-foreground">{{ $t('table.status') }}</dt>
          <dd class="mt-1">
            <Tag
              :value="user.status === 'active' ? $t('table.statusActive') : $t('table.statusInactive')"
              :severity="user.status === 'active' ? 'success' : 'secondary'"
            />
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
    </Panel>

    <Panel v-else>
      <p class="py-8 text-center text-muted-foreground">{{ $t('table.noData') }}</p>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Tag from 'primevue/tag'
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

function getRoleSeverity(role: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
  if (role === 'admin') return 'danger'
  if (role === 'editor') return 'info'
  return 'secondary'
}
</script>
