---
scope: project
type: rule
---

# Monorepo 架构规则

## 项目结构

- `packages/` - 公共能力包（不独立部署，被 apps 引用）
- `apps/` - 业务项目（独立部署）
- `docs/` - Vitepress 文档站
- `scripts/` - 工具脚本

## 包引用规范

- 统一使用 pnpm `workspace:*` 协议引用内部包
- 示例：`"@muxiao-fek-base/utils": "workspace:*"`

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