# AI Editor Skills 使用说明

本目录包含了 AI 编辑器（Cursor、CodeBuddy 等）的 Skills 规则文件，为 AI 提供项目上下文和编码规范。

## 目录结构

```
skills/
├── base/                    # 基础通用规则（所有项目共享）
├── frameworks/              # 框架相关规则
├── packages/                # 公共包使用规则
└── projects/                # 项目专属补充规则
```

## 使用方式

1. 执行 `pnpm skills:sync` 将 skills 文件同步到各项目的 `.cursor/skills/` 目录
2. 在项目的 `.cursorrules` 文件中声明引用的 skills 文件

## 同步命令

- `pnpm skills:sync` - 同步所有项目
- `pnpm skills:sync:vue3` - 仅同步 Vue 3 项目
- `pnpm skills:sync:react` - 仅同步 React 项目

## 分层覆盖原则

- base → frameworks → packages → projects
- 后者可覆盖前者，实现项目定制化