```markdown
# SPEC.md

## 项目概述

**项目名称：** 前端知识库 Monorepo
**架构模式：** pnpm Monorepo
**主语言：** TypeScript
**构建工具：** Vite
**包管理器：** pnpm（版本 >= 10.28.0）
**Node 版本：** >= 24

---

## 一、目录结构
```

muxiao-fek-base/
├── packages/ # 公共能力包（不独立部署，被 apps 引用）
│ ├── types/ # 全局共享 TypeScript 类型定义
│ ├── constants/ # 全局共享常量（状态码、枚举、正则等）
│ ├── tsconfig/ # 基础 TS 配置（提供 tsconfig.base.json，其他包 extends 继承）
│ ├── oxlint-config/ # 基础 oxlint 配置（其他包 extends 继承，可按需覆盖规则）
│ ├── vite-config/ # 共享 Vite 配置工厂（base.ts / vue.ts / react.ts / electron.ts）
│ ├── utils/ # 通用工具方法库（与框架无关的纯函数）
│ ├── request/ # 通用网络请求封装（核心 + 适配器 + 拦截器链）
│ ├── i18n/ # 通用国际化方案（核心引擎 + 公共文案 + 业务覆盖）
│ ├── ui/ # 通用 UI 组件库（Vue 3，基于 CSS Variables 主题体系，支持覆盖）
│ └── skills/ # AI 编辑器 Skills 规则集（提示词文件，不参与构建）
├── apps/ # 业务项目（独立部署）
│ ├── vue3-app/ # Vue 3 项目
│ ├── react-app/ # React 项目
│ ├── electron-app/ # Electron + Vue 3 项目
│ └── miniapp/ # 小程序项目
├── docs/ # Vitepress 主文档站
├── scripts/ # 工具脚本（如 Skills 同步脚本）
├── pnpm-workspace.yaml # pnpm workspace 配置
├── pnpm-lock.yaml # pnpm 依赖锁文件
├── package.json # 根 package.json（workspace scripts + 公共 devDependencies）
├── turbo.json # Turborepo 任务编排配置（可选）
├── .npmrc # pnpm 额外配置
├── .husky/ # Git Hooks 配置
├── .commitlintrc.ts # Commitlint 配置
└── .cz-config.ts # cz-git 交互式提交配置

````

---

## 二、配置文件内容

### 2.1 `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'docs'
````

### 2.2 `.npmrc`

```ini
hoist=false
link-workspace-packages=true
prefer-workspace-packages=true
```

> 提醒：Electron 原生模块等特殊情况不要全局开启 shamefully-hoist，仅在必要包中局部处理。

### 2.3 根目录 `package.json`（关键字段）

```json
{
  "name": "muxiao-fek-base",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "format": "turbo format",
    "clean": "turbo clean && rm -rf node_modules",
    "prepare": "husky install",
    "skills:sync": "node scripts/sync-skills.mjs",
    "skills:sync:vue3": "node scripts/sync-skills.mjs --project=vue3-app",
    "skills:sync:react": "node scripts/sync-skills.mjs --project=react-app"
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^16.4.0",
    "cz-git": "^1.13.0",
    "turbo": "^2.9.7",
    "typescript": "^6.0.0"
  },
  "engines": {
    "node": ">=24",
    "pnpm": ">=10.0.0"
  },
  "packageManager": "pnpm@10.28.0"
}
```

---

## 三、TypeScript 配置规范

- `packages/tsconfig` 提供 `tsconfig.base.json`
- 所有子包通过 `extends` 继承，可按需覆盖 `compilerOptions`
- 示例：

```json
{
  "extends": "@muxiao-fek-base/tsconfig/tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 四、包间引用规范

- 统一使用 pnpm `workspace:*` 协议引用内部包
- 开发阶段始终引用本地最新代码
- 示例：

```json
{
  "dependencies": {
    "@muxiao-fek-base/utils": "workspace:*",
    "@muxiao-fek-base/ui": "workspace:*",
    "@muxiao-fek-base/request": "workspace:*",
    "@muxiao-fek-base/i18n": "workspace:*",
    "@muxiao-fek-base/types": "workspace:*"
  }
}
```

---

## 五、代码规范与提交规范

### 5.1 Oxc 工具链

- 使用 oxlint 做代码规范检查
- 使用 oxfmt 做代码格式化
- `packages/oxlint-config` 提供基础配置，其他包通过 `extends` 继承

```json
{
  "extends": "@muxiao-fek-base/oxlint-config/base",
  "rules": {}
}
```

### 5.2 提交规范

- Husky 管理 Git Hooks
- lint-staged 提交前自动 lint 暂存文件
- cz-git 提供交互式规范化提交（根目录 `.cz-config.ts` 统一提交类型枚举）

---

## 六、Vite 构建规范

- 统一使用 Vite 做开发与打包
- 支持全量打包、多包打包、单包打包
- `packages/vite-config` 提供按框架类型区分的配置工厂：

| 文件          | 适用项目      |
| ------------- | ------------- |
| `base.ts`     | 所有项目通用  |
| `vue.ts`      | Vue 3 项目    |
| `react.ts`    | React 项目    |
| `electron.ts` | Electron 项目 |

```ts
import { defineConfig } from "vite";
import { createVueConfig } from "@muxiao-fek-base/vite-config";

export default defineConfig(createVueConfig({}));
```

---

## 七、公共包详细规范

### 7.1 包依赖层级

```
types / constants          (底层 - 无内部依赖)
    ↓
utils / request / i18n     (中层 - 依赖 types、constants)
    ↓
ui                         (上层 - 依赖 utils)
    ↓
apps/*                     (应用层 - 按需组合)

skills                     (独立 - 不参与构建，仅规则文件)
```

### 7.2 `packages/types` — 共享类型

**用途：** 全局共享 TypeScript 类型定义
**包含内容：** 用户模型、API 响应格式、分页参数等
**规则：** 各项目直接引用，禁止在业务项目中重复定义已存在的全局类型

### 7.3 `packages/constants` — 共享常量

**用途：** 全局共享常量
**包含内容：** 业务状态码、正则表达式、枚举值等
**规则：** 常量统一维护在此包，业务项目不允许硬编码魔法数字

### 7.4 `packages/utils` — 通用工具方法

**用途：** 与框架无关的纯函数工具库
**包含内容：** 日期处理、数据转换、防抖节流、深拷贝等
**规则：** 函数必须无副作用、不依赖任何框架

### 7.5 `packages/request` — 网络请求

**设计模式：** 核心 + 适配器 + 拦截器链

```
packages/request/
├── src/
│   ├── core.ts           # 核心：拦截器链、错误处理、请求取消
│   ├── adapters/
│   │   ├── axios.ts      # Axios 适配器
│   │   └── fetch.ts      # Fetch 适配器（按需）
│   ├── interceptors/     # 内置拦截器（日志、token 注入等）
│   ├── types.ts          # 请求/响应泛型类型
│   └── index.ts          # createRequest 工厂函数
```

**使用规则：**

- 通过 `createRequest` 工厂函数创建实例
- 不要在组件内直接调用 axios/fetch，统一使用 http 实例
- 必须使用 try/catch 包裹异步请求
- 使用 `http.isHttpError(error)` 判断 HTTP 错误类型

### 7.6 `packages/i18n` — 国际化

**设计模式：** 核心引擎 + 公共文案 + 项目自维护文案

```
packages/i18n/
├── src/
│   ├── core.ts             # 核心引擎（语言切换、插值、复数）
│   ├── locale/
│   │   ├── zh-CN/
│   │   │   └── common.json # 公共通用文案
│   │   └── en-US/
│   │       └── common.json
│   ├── types.ts
│   └── index.ts
```

**使用规则：**

- 业务项目调用 `createI18n({ baseLocale, localeOverrides })` 创建实例
- 公共文案由 i18n 包维护，业务文案由各自项目维护
- 文案 key 使用下划线命名：`common.submit`

### 7.7 `packages/ui` — UI 组件库

**设计模式：** CSS Variables 主题体系，支持覆盖

```
packages/ui/
├── src/
│   ├── components/          # 组件源码
│   ├── styles/
│   │   ├── variables.css    # CSS 变量定义
│   │   ├── theme-base.css   # 基础主题
│   │   └── theme-dark.css   # 暗色主题（可选）
│   ├── composables/         # 可复用组合逻辑
│   └── index.ts             # 统一导出
```

**使用规则：**

- 主题覆盖通过重新定义 CSS 变量实现，禁止直接修改组件源码
- 当前基于 Vue 3，React 项目需独立维护 UI 层，但可复用 utils、request、i18n

### 7.8 `packages/skills` — AI 编辑器 Skills

**定位：** 不参与构建，纯规则/提示词文件集合
**用途：** 为 AI 编辑器（Cursor、CodeBuddy 等）提供代码生成上下文

```
packages/skills/
├── package.json             # 仅声明包名，无实际依赖
├── README.md                # Skills 使用说明
├── base/                    # 基础通用规则（所有项目共享）
│   ├── monorepo.md          # Monorepo 架构规则
│   ├── typescript.md        # TypeScript 编码规范
│   ├── naming.md            # 命名规范
│   ├── git-commit.md        # Git 提交规范
│   └── code-review.md       # 代码审查要点
├── frameworks/              # 框架相关规则
│   ├── vue3.md              # Vue 3 最佳实践
│   ├── react.md             # React 最佳实践
│   └── miniapp.md           # 小程序开发规范
├── packages/                # 公共包使用规则
│   ├── utils.md             # utils 包使用规则
│   ├── request.md           # request 包使用规则
│   ├── i18n.md              # i18n 包使用规则
│   └── ui.md                # UI 组件库使用规则
└── projects/                # 项目专属补充规则
    ├── vue3-app.md
    ├── react-app.md
    ├── electron-app.md
    └── miniapp.md
```

**Skills 文件格式规范：**

```markdown
---
scope: project | package | framework
framework: none | vue3 | react
type: rule | usage | guide
---

# 标题

## 规则内容
```

**使用原则：**

| 原则         | 说明                                                    |
| ------------ | ------------------------------------------------------- |
| 分层覆盖     | base → frameworks → packages → projects，后者可覆盖前者 |
| 最小化上下文 | 每个文件保持精简，减少 AI 上下文窗口占用                |
| 版本控制     | 纳入 Git，随项目代码迭代                                |
| 不参与构建   | 仅为提示词文件，不影响构建产物                          |

**同步方式：**

- 执行 `pnpm skills:sync` 将 skills 文件软链接到各项目的 `.cursor/skills/` 目录
- 项目 `.cursorrules` 中声明引用的 skills 文件

---

## 八、业务项目规范

| 项目          | 技术栈                    | 目录                | 说明              |
| ------------- | ------------------------- | ------------------- | ----------------- |
| Vue 3 项目    | Vue 3 + TypeScript + Vite | `apps/vue3-app`     | 标准 Vue 3 应用   |
| React 项目    | React + TypeScript + Vite | `apps/react-app`    | 标准 React 应用   |
| Electron 项目 | Electron + Vue 3 + Vite   | `apps/electron-app` | 桌面应用          |
| 小程序项目    | 小程序框架 + TypeScript   | `apps/miniapp`      | 微信/支付宝小程序 |

**项目新增规则：** 后续新增项目统一放在 `apps/` 目录下，遵循相同命名和结构规范。

---

## 九、常用命令

```bash
# 初始化
corepack enable
corepack prepare pnpm@10.28.0 --activate
pnpm install
pnpm prepare
pnpm skills:sync

# 开发
pnpm dev                         # 全量开发
pnpm --filter vue3-app dev       # 单项目开发

# 构建
pnpm build                       # 全量构建
pnpm --filter @muxiao-fek-base/utils build    # 单包构建
pnpm --filter "...{apps/*}" build      # 仅构建 apps 及其依赖

# 代码质量
pnpm lint                        # 全量 lint
pnpm lint --filter=vue3-app      # 单项目 lint
pnpm format                      # 全量格式化

# 清理
pnpm clean                       # 清理所有构建产物

# Skills
pnpm skills:sync                 # 同步所有项目 Skills
pnpm skills:sync:vue3            # 仅同步 Vue 3 项目

# 添加依赖
pnpm add -Dw typescript turbo                            # 根目录添加
pnpm --filter vue3-app add vue                           # 子包添加外部依赖
pnpm --filter vue3-app add @muxiao-fek-base/utils@workspace:*   # 子包添加内部依赖

# 提交
git add .
git cz
```

---

## 十、注意事项与约束

| 约束项            | 说明                                                     |
| ----------------- | -------------------------------------------------------- |
| pnpm 版本锁定     | `packageManager` 字段 + `corepack` 确保团队版本一致      |
| 禁止幽灵依赖      | `.npmrc` 中 `hoist=false`，不允许引用未显式声明的依赖    |
| UI 组件库框架限制 | 当前基于 Vue 3，React 项目不可直接使用，需独立处理 UI 层 |
| 小程序适配        | 公共包需考虑体积和 API 兼容性，必要时提供小程序专用版本  |
| Electron 原生模块 | 不在根目录开启 `shamefully-hoist`，仅在必要处局部处理    |
| Skills 同步       | 修改 skills 文件后需执行同步命令才能在各项目中生效       |

---

## 十一、未来规划

- 扩展公共包生态（埋点、存储、权限等）
- 探索跨框架 UI 方案（Web Components）
- 搭建 CI/CD 自动化流水线
- 建立组件/方法的可视化文档站
- Skills 包适配更多 AI 编辑器（GitHub Copilot、Windsurf 等）

```

---
```
