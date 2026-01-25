<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ $t('form.title') }}</h2>
      <p class="text-muted-foreground">{{ $t('form.description') }}</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- 表单区域 -->
      <Card>
        <CardHeader>
          <CardTitle>{{ $t('form.basicForm') }}</CardTitle>
          <CardDescription>{{ $t('form.basicFormDesc') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <FormItem>
              <FormLabel for="name">{{ $t('form.name') }} <span class="text-destructive">*</span></FormLabel>
              <Input
                id="name"
                v-model="formData.name"
                :placeholder="$t('form.namePlaceholder')"
                :class="errors.name && 'border-destructive'"
              />
              <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="email">{{ $t('form.email') }} <span class="text-destructive">*</span></FormLabel>
              <Input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="$t('form.emailPlaceholder')"
                :class="errors.email && 'border-destructive'"
              />
              <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="phone">{{ $t('form.phone') }}</FormLabel>
              <Input
                id="phone"
                v-model="formData.phone"
                type="tel"
                :placeholder="$t('form.phonePlaceholder')"
                :class="errors.phone && 'border-destructive'"
              />
              <p v-if="errors.phone" class="text-sm text-destructive">{{ errors.phone }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="role">{{ $t('form.role') }} <span class="text-destructive">*</span></FormLabel>
              <Select v-model="formData.role">
                <SelectTrigger :class="errors.role && 'border-destructive'">
                  <SelectValue :placeholder="$t('form.selectRole')" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem :value="undefined">{{ $t('form.selectRole') }}</SelectItem>
                  <SelectItem value="admin">{{ $t('form.roleAdmin') }}</SelectItem>
                  <SelectItem value="user">{{ $t('form.roleUser') }}</SelectItem>
                  <SelectItem value="editor">{{ $t('form.roleEditor') }}</SelectItem>
                </SelectContent>
              </Select>
              <p v-if="errors.role" class="text-sm text-destructive">{{ errors.role }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="status">{{ $t('form.status') }}</FormLabel>
              <Select v-model="formData.status">
                <SelectTrigger :class="errors.status && 'border-destructive'">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{{ $t('form.statusActive') }}</SelectItem>
                  <SelectItem value="inactive">{{ $t('form.statusInactive') }}</SelectItem>
                </SelectContent>
              </Select>
              <p v-if="errors.status" class="text-sm text-destructive">{{ errors.status }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="description">{{ $t('form.description') }}</FormLabel>
              <Textarea
                id="description"
                v-model="formData.description"
                :placeholder="$t('form.descriptionPlaceholder')"
                :rows="4"
                :class="errors.description && 'border-destructive'"
              />
              <p v-if="errors.description" class="text-sm text-destructive">{{ errors.description }}</p>
            </FormItem>

            <div class="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" @click="handleReset">
                {{ $t('common.reset') }}
              </Button>
              <Button type="submit">{{ $t('common.submit') }}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <!-- 表单数据预览 -->
      <Card>
        <CardHeader>
          <CardTitle>{{ $t('form.formData') }}</CardTitle>
          <CardDescription>{{ $t('form.formDataDesc') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div>
              <Label class="mb-2 block text-sm font-medium">{{ $t('form.currentData') }}</Label>
              <pre class="rounded-md bg-muted p-4 text-sm overflow-auto">{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
            <div v-if="Object.keys(errors).some(key => errors[key])">
              <Label class="mb-2 block text-sm font-medium text-destructive">{{ $t('form.errors') }}</Label>
              <pre class="rounded-md bg-destructive/10 p-4 text-sm text-destructive overflow-auto">{{ JSON.stringify(errors, null, 2) }}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { FormItem, FormLabel } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useI18n } from 'vue-i18n'
import { toast } from '@/lib/toast'

const { t } = useI18n()

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: 'active',
  description: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: '',
  description: '',
})

const validate = () => {
  // 清空错误
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // 验证姓名
  if (!formData.name.trim()) {
    errors.name = t('form.required')
  }

  // 验证邮箱
  if (!formData.email.trim()) {
    errors.email = t('form.required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('form.email')
  }

  // 验证角色
  if (!formData.role) {
    errors.role = t('form.required')
  }

  // 验证手机号（如果填写了）
  if (formData.phone && !/^1[3-9]\d{9}$/.test(formData.phone)) {
    errors.phone = t('form.pattern')
  }

  return !Object.values(errors).some(error => error)
}

const handleSubmit = () => {
  if (validate()) {
    console.log('提交数据:', formData)
    // 这里可以添加提交逻辑
    toast.success(t('form.submitSuccess'))
  }
}

const handleReset = () => {
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.role = ''
  formData.status = 'active'
  formData.description = ''
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}
</script>
