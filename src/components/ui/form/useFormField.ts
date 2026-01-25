import { inject } from "vue"
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys"

export function useFormField() {
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY)

  if (!fieldItemContext)
    throw new Error("useFormField should be used within <FormItem>")

  const id = fieldItemContext

  return {
    id,
    name: undefined,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: undefined,
    valid: undefined,
    isDirty: undefined,
    isTouched: undefined,
  }
}
