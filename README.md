# XClear Admin - 后台管理系统

一个基于 Vue3 + Vite + TypeScript 构建的现代化后台管理系统，使用 Tailwind CSS 和 shadcn-vue 组件库，完全适配移动端，支持主题切换和主题色自定义。

## ✨ 特性

- 🚀 **Vue 3 + Vite + TypeScript** - 使用最新的前端技术栈
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🧩 **shadcn-vue** - 高质量的 Vue 组件库
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🌓 **主题切换** - 支持系统/浅色/深色三种模式
- 🎨 **主题色自定义** - 支持 6 种主题色选择（蓝、绿、紫、橙、红、粉）
- 🌍 **多语言支持** - 内置中文和英文，易于扩展
- 📊 **Table 组件** - 功能完整的数据表格组件
- 📝 **Form 表单** - 完整的表单组件库（Input、Textarea、Select 等）
- 📦 **组件化架构** - 基于 SOLID 原则设计，易于扩展
- 🔥 **TypeScript** - 完整的类型支持

## 📋 项目结构

```
XClear-admin/
├── src/
│   ├── assets/          # 静态资源
│   │   └── css/         # 全局样式
│   ├── components/      # 组件
│   │   ├── ui/          # 基础 UI 组件（shadcn-vue 风格）
│   │   ├── layout/      # 布局组件
│   │   └── ThemeToggle.vue  # 主题切换组件
│   ├── layouts/         # 布局页面
│   ├── lib/             # 工具函数
│   ├── router/          # 路由配置
│   ├── i18n/            # 国际化配置
│   │   ├── locales/     # 语言文件
│   │   └── index.ts     # i18n 配置
│   ├── stores/          # Pinia 状态管理
│   │   ├── theme.ts     # 主题状态管理
│   │   └── locale.ts    # 语言状态管理
│   ├── views/           # 页面视图
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── vite.config.ts       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── tsconfig.json        # TypeScript 配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🎨 主题系统

### 主题模式

系统支持三种主题模式：

- **system** - 跟随系统设置（默认）
- **light** - 浅色模式
- **dark** - 深色模式

### 主题色

支持 6 种主题色选择：

- 🔵 蓝色（默认）
- 🟢 绿色
- 🟣 紫色
- 🟠 橙色
- 🔴 红色
- 🩷 粉色

### 使用方法

#### 在组件中使用主题

```vue
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 切换主题模式
themeStore.setThemeMode('dark')

// 切换主题色
themeStore.setThemeColor('purple')
</script>
```

#### 在 CSS 中使用主题变量

```css
.my-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}
```

## 📱 响应式设计

系统采用移动优先的设计策略，使用 Tailwind CSS 的响应式断点：

- `sm:` - 640px 及以上
- `md:` - 768px 及以上
- `lg:` - 1024px 及以上

### 布局特性

- **移动端**：侧边栏以抽屉形式展示，可通过顶部按钮切换
- **桌面端**：侧边栏固定显示在左侧
- **自适应**：所有组件和布局都会根据屏幕尺寸自动调整

## 🧩 组件使用

### Button 组件

```vue
<template>
  <Button variant="default" size="default">按钮</Button>
  <Button variant="outline" size="sm">轮廓按钮</Button>
  <Button variant="ghost" size="lg">幽灵按钮</Button>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>
```

**Props:**
- `variant`: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`
- `size`: `'default' | 'sm' | 'lg' | 'icon'`

### Card 组件

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>标题</CardTitle>
    </CardHeader>
    <CardContent>
      内容区域
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
</script>
```

### DropdownMenu 组件

```vue
<template>
  <DropdownMenu>
    <template #trigger>
      <Button>打开菜单</Button>
    </template>
    <DropdownMenuItem @click="handleClick">选项 1</DropdownMenuItem>
    <DropdownMenuItem @click="handleClick">选项 2</DropdownMenuItem>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenuItem.vue'
import Button from '@/components/ui/Button.vue'
</script>
```

### Table 组件

```vue
<template>
  <Table :columns="columns" :data="tableData" :loading="loading">
    <template #cell-status="{ value }">
      <span :class="value === 'active' ? 'text-green-600' : 'text-gray-600'">
        {{ value === 'active' ? '活跃' : '禁用' }}
      </span>
    </template>
    <template #cell-operation="{ row }">
      <Button size="sm">编辑</Button>
    </template>
  </Table>
</template>

<script setup lang="ts">
import Table, { type TableColumn } from '@/components/ui/Table.vue'
import Button from '@/components/ui/Button.vue'

const columns: TableColumn[] = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: '姓名' },
  { key: 'email', title: '邮箱' },
  { key: 'status', title: '状态' },
  { key: 'operation', title: '操作' },
]

const tableData = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'lisi@example.com', status: 'inactive' },
]
</script>
```

**Props:**
- `columns`: `TableColumn[]` - 列配置
- `data`: `any[]` - 表格数据
- `loading`: `boolean` - 加载状态

**Slots:**
- `cell-{columnKey}` - 自定义单元格内容

### Form 表单组件

```vue
<template>
  <Form @submit="handleSubmit">
    <FormItem :error="errors.name">
      <Label for="name" :required="true">姓名</Label>
      <Input
        id="name"
        v-model="formData.name"
        placeholder="请输入姓名"
        :error="!!errors.name"
      />
    </FormItem>

    <FormItem :error="errors.email">
      <Label for="email" :required="true">邮箱</Label>
      <Input
        id="email"
        v-model="formData.email"
        type="email"
        :error="!!errors.email"
      />
    </FormItem>

    <FormItem>
      <Label for="description">描述</Label>
      <Textarea
        id="description"
        v-model="formData.description"
        placeholder="请输入描述"
      />
    </FormItem>

    <Button type="submit">提交</Button>
  </Form>
</template>

<script setup lang="ts">
import Form from '@/components/ui/Form.vue'
import FormItem from '@/components/ui/FormItem.vue'
import Label from '@/components/ui/Label.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Button from '@/components/ui/Button.vue'
</script>
```

**Form 组件 Props:**
- `onSubmit`: `(event: Event) => void` - 提交回调

**FormItem 组件 Props:**
- `error`: `string` - 错误信息
- `description`: `string` - 描述信息

**Input/Textarea 组件 Props:**
- `modelValue`: `string | number` - 绑定值
- `type`: `string` - 输入类型（Input）
- `placeholder`: `string` - 占位符
- `disabled`: `boolean` - 禁用状态
- `required`: `boolean` - 必填
- `error`: `boolean` - 错误状态
- `rows`: `number` - 行数（Textarea）

### Card 组件系列

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>标题</CardTitle>
      <CardDescription>描述信息</CardDescription>
    </CardHeader>
    <CardContent>
      内容区域
    </CardContent>
    <CardFooter>
      底部操作区域
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
</script>
```

## 🌍 多语言支持

项目使用 `vue-i18n` 实现多语言支持，目前支持中文和英文。

### 切换语言

在顶部栏点击语言切换按钮，可以在中文和英文之间切换。

### 在组件中使用

```vue
<template>
  <div>
    <h1>{{ $t('dashboard.title') }}</h1>
    <p>{{ $t('dashboard.description') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
console.log(t('common.save'))
</script>
```

### 添加新语言

1. 在 `src/i18n/locales/` 目录下创建新的语言文件（如 `ja-JP.json`）
2. 在 `src/i18n/index.ts` 中导入并添加到 messages
3. 在 `src/components/LocaleToggle.vue` 中添加语言选项

### 语言文件结构

语言文件采用 JSON 格式，支持嵌套结构：

```json
{
  "common": {
    "save": "保存",
    "cancel": "取消"
  },
  "dashboard": {
    "title": "仪表盘"
  }
}
```

## 📄 页面说明

### 仪表盘 (Dashboard)

- 显示关键指标统计卡片
- 收入概览图表（可集成 Chart.js 或 ECharts）
- 最近活动列表

### 发票管理 (Invoices)

- 发票列表展示
- 搜索和筛选功能
- 发票状态管理（已支付/待支付/已逾期）

### 用户管理 (Users)

- 用户列表展示
- 用户角色管理
- 用户信息查看

### 数据分析 (Analytics)

- 数据指标展示
- 数据趋势图表
- 统计分析报告

### 系统设置 (Settings)

- 外观设置（主题模式、主题色）
- 通知设置
- 系统配置

## 🎨 图标使用

项目使用 Lucide Vue Next 图标库，所有图标都以组件形式使用：

```vue
<template>
  <Home class="h-5 w-5" />
  <User class="h-6 w-6" />
</template>

<script setup lang="ts">
import { Home, User } from 'lucide-vue-next'
</script>
```

**常用图标：**
- `Home` - 首页
- `Users` - 用户
- `FileText` - 文件/文档
- `Settings` - 设置
- `BarChart3` - 图表
- `Menu` - 菜单
- `Sun` - 太阳（浅色主题）
- `Moon` - 月亮（深色主题）
- `Monitor` - 电脑（系统主题）
- `Plus` - 加号
- `MoreVertical` - 更多
- `DollarSign` - 美元/货币
- `ShoppingCart` - 购物车
- `Activity` - 活动

更多图标请访问 [Lucide 官网](https://lucide.dev/) 查看。

## 🔧 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **TypeScript** - JavaScript 的超集
- **Vue Router** - Vue.js 官方路由管理器
- **Pinia** - Vue 的状态管理库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **VueUse** - Vue Composition API 工具集
- **Lucide Vue Next** - 图标库
- **Vue I18n** - 国际化插件
- **class-variance-authority** - 组件变体管理
- **clsx & tailwind-merge** - 类名工具

## 📝 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 最佳实践
- 组件使用 `<script setup>` 语法
- 使用 ESLint 进行代码检查

### 组件设计原则

- **单一职责**：每个组件只负责一个功能
- **可复用性**：组件设计时考虑复用场景
- **可维护性**：代码结构清晰，注释完善
- **类型安全**：充分利用 TypeScript 类型系统

## 🐛 问题排查

### 主题不生效

确保在 `main.ts` 中已初始化主题：

```typescript
const themeStore = useThemeStore()
themeStore.initTheme()
```

### 样式不显示

检查：
1. Tailwind CSS 配置是否正确
2. `main.css` 是否已导入
3. PostCSS 配置是否正确

### 移动端布局异常

检查：
1. `viewport` meta 标签是否正确设置
2. Tailwind 响应式类名是否正确使用
3. 侧边栏组件状态管理是否正确

## 🔮 未来计划

- [ ] 集成图表库（Chart.js 或 ECharts）
- [ ] 添加更多 UI 组件（Dialog、Toast、Pagination 等）
- [ ] 实现权限管理系统
- [ ] 添加表单验证库（如 VeeValidate）
- [ ] Table 组件添加排序、筛选、分页功能
- [ ] 性能优化和代码分割
- [ ] 添加单元测试和 E2E 测试

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：这是一个基础的后台管理系统模板，您可以根据实际需求进行扩展和定制。
