# Muxiao-Fek-Base

一个基于 pnpm workspaces 的 Monorepo 项目模板，集成了 Vite、Vue、React、Electron 等主流前端技术栈。

## 技术栈

- **包管理**: pnpm 10+
- **构建工具**: Turborepo 2
- **代码检查**: Oxlint + Prettier
- **代码格式化**: Prettier
- **Commit 规范**: Commitlint + Cz-git
- **Git Hooks**: Husky 9

### Apps

| 应用         | 技术             | 说明              |
| ------------ | ---------------- | ----------------- |
| vue3-app     | Vue 3 + Vite     | Vue3 示例项目     |
| react-app    | React 18 + Vite  | React 示例项目    |
| electron-app | Electron + Vue 3 | Electron 桌面应用 |
| miniapp      | Vite             | 小程序模板        |

### Packages

| 包            | 说明                |
| ------------- | ------------------- |
| types         | TypeScript 类型定义 |
| constants     | 常量定义            |
| utils         | 工具函数            |
| request       | 网络请求封装        |
| i18n          | 国际化方案          |
| ui            | UI 组件库           |
| vite-config   | Vite 配置           |
| tsconfig      | TypeScript 配置     |
| oxlint-config | Oxlint 配置         |

## 安装依赖

### 全局安装依赖

```bash
# 在根目录安装，所有工作区共享
pnpm install
```

### 安装到指定工作区

```bash
# 安装到根目录（开发依赖）
pnpm add -wD <package>

# 安装到指定项目
pnpm add <package> --filter=<app-name>

# 示例
pnpm add vue --filter=vue3-app
pnpm add axios --filter=@muxiao-fek-base/request
```

### 常用命令

```bash
# 清理并重新安装
pnpm clean
pnpm install

# 仅构建依赖关系（不下载）
pnpm install --frozen-lockfile
```

## 快速开始

### 环境要求

- Node.js >= 24
- pnpm >= 10.0.0

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 开发所有项目
pnpm dev

# 开发指定项目
pnpm dev --filter=vue3-app
pnpm dev --filter=react-app
```

### 构建

```bash
# 构建所有项目
pnpm build

# 构建指定项目
pnpm build --filter=vue3-app
```

### 代码检查

```bash
# 检查所有项目
pnpm lint

# 格式化所有项目
pnpm format
```

## Commit 规范

使用 `pnpm commit` 启动交互式提交界面：

```bash
pnpm commit
```

### 类型

| 类型     | 说明     |
| -------- | -------- |
| feat     | 新功能   |
| fix      | 修复缺陷 |
| docs     | 文档更新 |
| style    | 代码格式 |
| refactor | 代码重构 |
| perf     | 性能优化 |
| test     | 测试相关 |
| build    | 构建相关 |
| ci       | 持续集成 |
| chore    | 其他修改 |
| revert   | 回退代码 |

### Scope

- types - 类型定义
- constants - 常量
- utils - 工具方法
- request - 网络请求
- i18n - 国际化
- ui - UI 组件
- skills - AI 规则集
- vue3-app - Vue3 项目
- react-app - React 项目
- electron-app - Electron 项目
- miniapp - 小程序项目

## 项目结构

```
muxiao-fek-base/
├── apps/                 # 应用目录
│   ├── vue3-app/        # Vue3 应用
│   ├── react-app/        # React 应用
│   ├── electron-app/     # Electron 应用
│   └── miniapp/          # 小程序
├── packages/             # 公共包
│   ├── types/            # 类型定义
│   ├── constants/        # 常量
│   ├── utils/            # 工具函数
│   ├── request/          # 网络请求
│   ├── i18n/             # 国际化
│   ├── ui/               # UI 组件
│   ├── vite-config/      # Vite 配置
│   ├── tsconfig/         # TypeScript 配置
│   └── oxlint-config/    # Oxlint 配置
├── scripts/              # 脚本
├── docs/                 # 文档
├── .husky/               # Git hooks
├── turbo.json            # Turborepo 配置
├── pnpm-workspace.yaml   # pnpm 工作空间配置
└── package.json          # 根 package.json
```

## AI 技能同步

本项目支持将 AI 编辑器技能同步到各个项目：

```bash
# 同步所有项目的技能
pnpm skills:sync

# 同步 Vue3 项目
pnpm skills:sync:vue3

# 同步 React 项目
pnpm skills:sync:react
```

## Git Hooks

提交前会自动运行：

1. **lint-staged** - 检查暂存的代码文件
2. **commitlint** - 验证 commit message 格式

## VS Code 推荐扩展

- Prettier - Code formatter
- Oxlint
- Vue - Official
- ES7+ React/Redux/React-Native snippets
