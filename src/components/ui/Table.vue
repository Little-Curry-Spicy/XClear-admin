<template>
  <div class="w-full overflow-auto">
    <table :class="cn('w-full caption-bottom text-sm', $attrs.class)">
      <thead>
        <tr class="border-b transition-colors hover:bg-muted/50">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="cn(
              'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
              column.class
            )"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="loading"
          class="border-b transition-colors hover:bg-muted/50"
        >
          <td :colspan="columns.length" class="h-24 text-center">
            <div class="flex items-center justify-center">
              <div class="text-muted-foreground">{{ $t('table.loading') }}</div>
            </div>
          </td>
        </tr>
        <tr
          v-else-if="!data || data.length === 0"
          class="border-b transition-colors hover:bg-muted/50"
        >
          <td :colspan="columns.length" class="h-24 text-center">
            <div class="flex items-center justify-center">
              <div class="text-muted-foreground">{{ $t('table.noData') }}</div>
            </div>
          </td>
        </tr>
        <tr
          v-else
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="cn('p-4 align-middle', column.class)"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
              :column="column"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

export interface TableColumn {
  key: string
  title: string
  class?: string
}

export interface TableProps {
  columns: TableColumn[]
  data?: any[]
  loading?: boolean
}

withDefaults(defineProps<TableProps>(), {
  data: () => [],
  loading: false,
})
</script>
