---
scope: project
type: rule
---

# TypeScript 编码规范

## 类型安全

- 启用严格模式
- 避免使用 `any`，优先使用 `unknown`
- 使用 `noUncheckedIndexedAccess` 防止数组访问越界
- 使用 `verbatimModuleSyntax` 确保导入导出类型安全

## 接口与类型

- 优先使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型、交叉类型
- 避免类型断言 `as`，除非必要时使用

## 泛型

- 合理使用泛型约束
- 避免过度泛型化

## 命名

- 变量/函数：camelCase
- 类型/接口：PascalCase
- 常量：UPPER_SNAKE_CASE
- 文件名：kebab-case.ts