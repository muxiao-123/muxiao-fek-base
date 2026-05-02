---
scope: project
type: rule
---

# 命名规范

## 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 通用文件 | kebab-case | `user-profile.ts` |
| 组件文件 | PascalCase | `UserProfile.vue` |
| 类型文件 | kebab-case | `user-types.ts` |
| 测试文件 | `.spec.ts` | `user-utils.spec.ts` |

## 变量命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 普通变量 | camelCase | `userName` |
| 常量 | UPPER_SNAKE_CASE | `MAX_COUNT` |
| 布尔变量 | is/has/can 前缀 | `isActive` |
| 数组变量 | 复数名词 | `users` |

## 函数命名

- 动词或动词短语：`getUser`、`fetchData`
- 事件处理：`handleClick`
- 业务逻辑：`validateForm`

## 组件命名

- PascalCase：`UserCard`
- 组合式函数：`useUser`、`useAuth`