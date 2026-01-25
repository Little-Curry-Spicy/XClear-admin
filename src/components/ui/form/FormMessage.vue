<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { useFormField } from "./useFormField"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { formMessageId } = useFormField()
</script>

<template>
  <p
    :id="formMessageId"
    :class="cn('text-sm font-medium text-destructive', props.class)"
  >
    <slot />
  </p>
</template>
