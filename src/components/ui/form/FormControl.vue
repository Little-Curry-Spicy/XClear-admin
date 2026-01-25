<script lang="ts" setup>
import { Slot } from "reka-ui"
import { useFormField } from "./useFormField"

const { formItemId, formDescriptionId, formMessageId } = useFormField()
</script>

<template>
  <Slot
    :id="formItemId"
    :aria-describedby="`${formDescriptionId} ${formMessageId}`"
  >
    <slot />
  </Slot>
</template>
