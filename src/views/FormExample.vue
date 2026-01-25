<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">表单示例</h2>
      <p class="text-muted-foreground">使用 Form 组件创建表单</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>基础表单</CardTitle>
          <CardDescription>包含输入框、文本域、选择框等</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <FormItem>
              <FormLabel for="name">姓名 <span class="text-destructive">*</span></FormLabel>
              <Input
                id="name"
                v-model="formData.name"
                placeholder="请输入姓名"
                :class="errors.name && 'border-destructive'"
              />
              <p v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="email">邮箱 <span class="text-destructive">*</span></FormLabel>
              <Input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="请输入邮箱"
                :class="errors.email && 'border-destructive'"
              />
              <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="role">角色 <span class="text-destructive">*</span></FormLabel>
              <Select v-model="formData.role">
                <SelectTrigger :class="errors.role && 'border-destructive'">
                  <SelectValue placeholder="请选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem :value="undefined">请选择角色</SelectItem>
                  <SelectItem value="admin">管理员</SelectItem>
                  <SelectItem value="user">用户</SelectItem>
                </SelectContent>
              </Select>
              <p v-if="errors.role" class="text-sm text-destructive">{{ errors.role }}</p>
            </FormItem>

            <FormItem>
              <FormLabel for="description">描述</FormLabel>
              <Textarea
                id="description"
                v-model="formData.description"
                placeholder="请输入描述"
                :class="errors.description && 'border-destructive'"
              />
              <p v-if="errors.description" class="text-sm text-destructive">{{ errors.description }}</p>
            </FormItem>

            <div class="flex justify-end gap-2">
              <Button type="button" variant="outline" @click="handleReset">
                重置
              </Button>
              <Button type="submit">提交</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>表单数据</CardTitle>
          <CardDescription>实时显示表单数据</CardDescription>
        </CardHeader>
        <CardContent>
          <pre class="rounded-md bg-muted p-4 text-sm">{{ JSON.stringify(formData, null, 2) }}</pre>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
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
import { toast } from '@/lib/toast'

const formData = reactive({
  name: '',
  email: '',
  role: '',
  description: '',
})

const errors = reactive({
  name: '',
  email: '',
  role: '',
  description: '',
})

const validate = () => {
  errors.name = ''
  errors.email = ''
  errors.role = ''
  errors.description = ''

  if (!formData.name) {
    errors.name = '姓名不能为空'
  }

  if (!formData.email) {
    errors.email = '邮箱不能为空'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = '邮箱格式不正确'
  }

  if (!formData.role) {
    errors.role = '请选择角色'
  }

  return !errors.name && !errors.email && !errors.role
}

const handleSubmit = () => {
  if (validate()) {
    console.log('提交数据:', formData)
    toast.success('表单提交成功！')
  }
}

const handleReset = () => {
  formData.name = ''
  formData.email = ''
  formData.role = ''
  formData.description = ''
  errors.name = ''
  errors.email = ''
  errors.role = ''
  errors.description = ''
}
</script>
