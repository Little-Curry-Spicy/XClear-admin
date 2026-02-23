# XClear Admin - 后台管理系统

一个基于 Vue3 + Vite + TypeScript 构建的现代化后台管理系统，使用 Tailwind CSS 和 **PrimeVue** 组件库，完全适配移动端，支持主题切换。

## ✨ 特性

- 🚀 **Vue 3 + Vite + TypeScript** - 使用最新的前端技术栈
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 🧩 **PrimeVue** - 功能丰富的 Vue UI 组件库（Toast、ConfirmDialog、Panel、Button、Select 等）
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🌓 **主题切换** - 支持浅色/深色/跟随系统
- 🌍 **多语言支持** - 内置中文和英文，易于扩展
- 🔐 **认证与权限** - 登录/登出、路由守卫、按角色显示菜单与按钮
- 📡 **请求封装** - axios 封装、自动携带 token、统一错误 Toast、401 跳转登录
- ⏳ **请求级 Loading** - 全局顶部进度条，请求进行时自动显示/结束
- 👤 **用户信息与安全** - 顶栏用户菜单（个人资料、修改密码、退出登录），个人资料页与修改密码页
- 🛡️ **错误边界** - 组件或异步报错时展示友好错误页，支持重试或返回首页
- 📅 **区域格式化** - 日期/数字/货币按当前语言格式化（`@/lib/format`）
- ⚙️ **用户偏好** - 表格每页条数、RTL 布局等持久化到 localStorage
- 📤 **表格导出** - 表格页支持导出 CSV
- 🔄 **RTL** - 设置中可开启从右到左布局（面向阿拉伯语等市场）
- 📦 **组件化架构** - 基于 SOLID 原则设计，易于扩展
- 🔥 **TypeScript** - 完整的类型支持

## 📋 项目结构

```
XClear-admin/
├── src/
│   ├── assets/          # 静态资源
│   │   └── css/         # 全局样式
│   ├── components/      # 组件
│   │   ├── ui/          # 自定义 Table 等（其余使用 PrimeVue）
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
│   ├── views/           # 页面视图（按功能分目录）
│   │   ├── auth/        # 认证：登录、注册
│   │   ├── dashboard/  # 仪表盘
│   │   ├── account/     # 个人账户：资料、修改密码
│   │   ├── users/       # 用户管理业务
│   │   ├── system/      # 系统设置
│   │   ├── examples/    # 示例页：表单、表格
│   │   └── error/       # 错误页（404 等）
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
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

访问 http://localhost:5173 查看应用。首次访问会进入**登录页**，演示环境任意账号/密码即可登录。登录账号 `admin` 为管理员角色（可见「系统设置」等菜单），其他账号为普通用户角色。

### 构建生产版本

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run preview
```

## 📖 快速对接指南

二次开发时常见修改如下：

- **修改 Logo / 系统名**：在 `AppLayout.vue`、`TopNavLayout.vue` 中搜索「XC」「XClear Admin」替换为自有 logo 或文字。
- **修改菜单**：在 `src/lib/menu.ts` 的 `getMenuItems(t)` 中增删或修改 path、label、icon、roles。
- **接口 baseURL**：在项目根目录创建 `.env` 或 `.env.production`，配置 `VITE_API_BASE_URL=https://你的后端地址`，可参考 `.env.example`。
- **登录对接**：在 `src/views/auth/Login.vue` 中将模拟登录改为调用 `request.post('/api/login', ...)`，用返回的 token、username、roles 调用 `authStore.setAuth()`；`src/stores/auth.ts` 已提供 setAuth/clearAuth。
- **请求头 token**：`src/lib/request.ts` 已从 localStorage 读取 `xclear-admin-token` 并写入 `Authorization: Bearer`；401 时会清除本地登录态。
- **动态菜单**：后端提供 `GET /api/menu` 返回 `{ path, label, icon?, roles? }[]` 时，可使用 `src/lib/menuApi.ts` 的 `fetchMenuFromApi()`，在布局中优先使用 API 结果并做角色过滤。
- **用户管理接口**：将 `src/views/users/mock.ts` 及 UserList/UserDetail/UserForm 中的 mock 数据替换为 `request.get('/api/users')`、`request.get(\`/api/users/${id}\`)` 等。

## 🚢 部署说明

- **环境变量**：生产构建前设置 `VITE_API_BASE_URL` 为后端 API 地址（如 `https://api.example.com`），否则请求会发往相对路径。可复制 `.env.example` 为 `.env.production` 并修改。
- **构建产物**：执行 `pnpm run build` 后，静态文件输出在 `dist/`，将 `dist` 目录部署到任意静态服务器或 CDN 即可。
- **Nginx 示例**：单页应用需将非静态资源请求 fallback 到 `index.html`，例如：
  ```nginx
  location / {
    root /path/to/dist;
    try_files $uri $uri/ /index.html;
  }
  ```
- **Docker 示例**：可基于 `nginx:alpine` 镜像，将 `dist` 复制到 `/usr/share/nginx/html`，并配置上述 `try_files`。

## 🎨 主题系统

界面支持**浅色/深色/跟随系统**，以及**主题色**（中性灰、蓝色、绿色）和**布局模式**（侧边栏、顶栏）。在 **设置 → 外观设置** 中切换。

### 主题模式

- **system** - 跟随系统设置（默认）
- **light** - 浅色模式
- **dark** - 深色模式

在 **设置 → 外观设置** 中可切换上述模式。深色模式下 PrimeVue 卡片/面板会随页面一起变暗。

### 使用方法

#### 在组件中使用主题

```vue
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 切换主题模式（light / dark）
themeStore.setThemeMode('dark')
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

本项目使用 **PrimeVue** 作为 UI 库，Toast 通知由 PrimeVue Toast 提供（已替代原 vue-sonner），确认对话框使用 PrimeVue ConfirmDialog。

### Button、Panel、InputText、Select 等

直接从 `primevue/*` 按需引入，例如：

```vue
<template>
  <Button label="提交" icon="pi pi-check" />
  <Panel header="标题">
    内容
  </Panel>
  <InputText v-model="value" placeholder="请输入" />
  <Select v-model="selected" :options="options" option-label="label" option-value="value" />
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
</script>
```

### Toast 通知

通过 `@/lib/toast` 统一调用（底层为 PrimeVue ToastService）：

```vue
<script setup lang="ts">
import { toast } from '@/lib/toast'

toast.success('操作成功')
toast.error('操作失败', '详细说明')
toast.info('提示信息')
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

### Form 表单

表单页使用 PrimeVue 的 Panel、InputText、Textarea、Select、Button 等，详见 `src/views/examples/Form.vue`。校验与错误展示在页面内自行实现。

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

- 关键指标统计卡片
- **收入概览**折线图（ECharts）与**分类销售统计**柱状图
- 最近活动列表

### 用户管理 (Users)

- 用户列表：搜索、按状态/角色筛选、分页
- 用户详情页、新增/编辑用户表单（完整 CRUD 示例）

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
- **PrimeVue** - Vue UI 组件库（Toast、ConfirmDialog、Panel、Button、Select、Breadcrumb、Menu 等）
- **PrimeIcons** - PrimeVue 配套图标
- **VueUse** - Vue Composition API 工具集
- **Lucide Vue Next** - 图标库（部分页面仍使用）
- **Vue I18n** - 国际化插件
- **clsx & tailwind-merge** - 类名工具（`cn()`）

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

## 🔐 认证与权限

- **登录**：`/login`，演示为前端模拟（任意账号/密码），生产需对接后端接口。
- **路由守卫**：未登录访问需登录页会跳转 `/login?redirect=原路径`；登录后按 `meta.roles` 校验，无权限则跳转首页。
- **菜单与按钮**：侧栏菜单按 `roles` 过滤（见 `AppLayout.vue`）；表格删除按钮仅 `admin` 角色可见。
- **Store**：`@/stores/auth` 提供 `login`、`logout`、`hasRole`、`hasAnyRole`。

## 📡 请求封装与格式化

- **请求**：`@/lib/request` 为 axios 实例，已配置请求头携带 `Authorization: Bearer <token>`，响应错误时统一 Toast，401 时清除本地登录态并跳转登录。
- **环境变量**：可选 `VITE_API_BASE_URL` 配置接口 baseURL。
- **格式化**：`@/lib/format` 提供 `formatDate`、`formatDateTime`、`formatNumber`、`formatCurrency`，按当前语言（localStorage `locale`）格式化。

## ⚙️ 用户偏好与 RTL

- **Store**：`@/stores/preferences`，持久化到 localStorage。
- **表格每页条数**：在设置 → 用户偏好中修改，表格页的 DataTable 会使用该值。
- **RTL**：在设置 → 用户偏好中开启「从右到左布局」，适用于阿拉伯语等；会设置 `document.documentElement.dir="rtl"`。

## 🔮 未来计划

- [x] 集成图表库（ECharts）
- [ ] 对接真实登录/用户接口，替换模拟登录（已预留 authStore、request 携带 token、401 清除登录态）
- [ ] Table 列显示/顺序持久化（store 已预留 columnOrder/columnVisibility）
- [ ] 性能优化和代码分割
- [ ] 添加单元测试和 E2E 测试

## 📌 迁移说明（PrimeVue 替代 reka-ui / vue-sonner）

- **UI 库**：已由 shadcn-vue（reka-ui）全部替换为 **PrimeVue**，并移除 **vue-sonner**。
- **Toast**：使用 PrimeVue 的 ToastService + `@/lib/toast` 封装，用法不变（`toast.success()` 等）。
- **确认框**：使用 PrimeVue 的 ConfirmDialog + ConfirmationService，在表格删除等场景通过 `useConfirm()` 调用。

## 💼 商业化与出售说明

本项目作为**后台管理模板/脚手架**具备出售价值，适合作为：

- 企业/团队内部系统的**基础框架**（二次开发）
- 外包/接单项目的**起步模板**（节省从零搭建时间）
- 学习 Vue3 + TypeScript + PrimeVue 的**参考项目**

### 出售前建议补齐的内容

| 类别 | 当前状态 | 建议 |
|------|----------|------|
| **许可证** | README 写 MIT，仓库无 LICENSE 文件 | 在项目根目录添加 `LICENSE` 文件（若选 MIT，可用标准 MIT 文本） |
| **后端对接** | 登录/用户为前端模拟 | 提供对接说明或示例 API 文档，或可选配套 Node/Java 示例后端 |
| **部署与交付** | 仅有 `pnpm run build` | 提供 Dockerfile 或 Nginx 部署文档、环境变量说明 |
| **文档** | README 已较全 | 增加「快速对接指南」：如何改 logo、菜单、权限字段、接口 baseURL |
| **演示与试用** | 需本地运行 | 可选：提供在线 Demo 链接，便于买家试用 |
| **图表** | Dashboard 图表为占位 | 集成 Chart.js 或 ECharts 后更易作为「开箱即用」卖点 |
| **业务页面** | 仅有通用 Table/Form | 若定位「行业模板」可增加 1～2 个完整业务模块（如订单、用户管理）示例 |
| **测试** | 无 | 若有基础单元测试/E2E，可提升可信度与售价 |

### 出售时的注意点

- **依赖许可**：PrimeVue、Tailwind、Vue 等均为可商用许可（MIT/Apache 等），可放心打包出售。
- **交付物**：建议包含源码、README、环境变量示例（`.env.example`）、可选部署文档。
### 和热销模板相比还缺什么

参考国内 Vue Admin Plus、Vue Shop Vite、EleAdmin 及国外 ThemeForest / Creative Tim 等卖得较好的后台模板，常见标配与当前本项目的对比如下。

| 维度 | 热销模板常见标配 | 本项目现状 | 差距说明 |
|------|------------------|------------|----------|
| **主题与布局** | 多套主题（6～9 种配色）+ 多种布局（侧栏/顶栏、固定/折叠、多栏等） | 仅浅/深/跟随系统，1 种侧栏布局 | 缺少「多套彩色主题」和「多种布局切换」，买家难以一眼看出可定制性 |
| **预置页面数量** | 几十到 200+ 预构建页面（列表、表单、详情、图表、空白页等） | 约 9 个页面（Dashboard/Table/Form/Settings/Profile 等） | 页面少，买家会感觉「要自己写很多页」，不如竞品「开箱即用」 |
| **数据可视化** | 集成 Chart.js / ECharts / ApexCharts，仪表盘带真实图表 demo | Dashboard 图表为占位文案 | 仪表盘是门面，无图表会明显拉低「成品感」和售价预期 |
| **动态路由与权限** | 菜单/路由由后端返回，按角色动态生成 | 路由与菜单在前端写死，按 `meta.roles` 过滤 | 企业级买家通常需要「后端控制菜单」，需支持动态路由 + 权限接口 |
| **业务示例模块** | 1～3 个完整业务 demo（如用户管理、订单、发票、CRM） | 仅有通用 Table/Form，README 提到的发票/用户/分析无对应路由与页面 | 缺少「可直接改的完整业务示例」，不利于按行业卖（电商/CRM/数据等） |
| **PWA / 多端** | 部分提供 PWA、多端打包（如桌面/移动一键生成） | 未支持 | 非必须，但能作为溢价卖点 |
| **文档与售后** | 详细文档 + 对接指南 + VIP 群/工单/持续更新承诺 | README 完善，无售后形式、无「快速对接」专项文档 | 出售时建议补：如何改 logo/菜单/权限/接口的步骤说明，以及更新与支持方式 |
| **在线 Demo** | 提供可访问的演示站 | 需本地运行 | 有在线 Demo 能显著提高转化率 |
| **部署与交付** | Docker / Nginx 示例、环境变量说明、可选后端示例 | 仅有 `pnpm run build` | 补全后买家更容易上线，减少售后问题 |
| **测试与质量** | 部分带单元测试或 E2E | 无 | 有测试可提升可信度和定价空间 |

**优先建议补齐（对销量/定价影响大）：**

1. **仪表盘图表**：集成 Chart.js 或 ECharts，做 1～2 个真实图表（折线/柱状即可）。
2. **多套主题或多种布局**：至少增加 1 套彩色主题或 1 种顶栏/折叠布局，便于宣传「多主题/多布局」。
3. **1 个完整业务示例**：例如「用户管理」或「订单列表」的列表+搜索+表单+详情，便于买家直接改。
4. **动态路由/菜单**：支持从接口拉取菜单并生成路由，并写清对接方式。
5. **在线 Demo + 快速对接文档**：演示站 + 「如何改 logo/菜单/接口」的步骤说明。

补齐上述几项后，与「卖得比较好的系统」的差距会明显缩小，更利于定价和推广。

---

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**：这是一个基础的后台管理系统模板，您可以根据实际需求进行扩展和定制。
