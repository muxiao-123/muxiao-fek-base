# 项目结构

## 目录说明

### packages/

公共能力包目录，被 apps 目录下的项目引用：

| 包名 | 说明 |
|------|------|
| types | 全局 TypeScript 类型定义 |
| constants | 全局常量（状态码、正则等） |
| utils | 通用工具方法 |
| request | 网络请求封装 |
| i18n | 国际化方案 |
| ui | Vue 3 UI 组件库 |
| tsconfig | 基础 TS 配置 |
| oxlint-config | oxlint 基础配置 |
| vite-config | Vite 配置工厂 |
| skills | AI 编辑器 Skills 规则集 |

### apps/

业务项目目录：

| 项目名 | 说明 |
|--------|------|
| vue3-app | Vue 3 项目 |
| react-app | React 项目 |
| electron-app | Electron 桌面应用 |
| miniapp | 小程序项目 |

## 依赖层级

```
types / constants          (底层 - 无内部依赖)
    ↓
utils / request / i18n     (中层 - 依赖 types、constants)
    ↓
ui                         (上层 - 依赖 utils)
    ↓
apps/*                     (应用层 - 按需组合)
```