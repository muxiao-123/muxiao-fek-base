# 快速开始

## 环境要求

- Node.js >= 24
- pnpm >= 10.28.0

## 初始化项目

```bash
# 启用 corepack
corepack enable
corepack prepare pnpm@10.28.0 --activate

# 安装依赖
pnpm install

# 准备 husky
pnpm prepare

# 同步 skills
pnpm skills:sync
```

## 开发命令

```bash
# 全量开发
pnpm dev

# 单项目开发
pnpm --filter vue3-app dev

# 全量构建
pnpm build

# 代码检查
pnpm lint

# 格式化
pnpm format
```