---
scope: project
type: rule
---

# Git 提交规范

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type 类型

| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | 修复bug |
| docs | 文档变更 |
| style | 代码格式 |
| refactor | 重构 |
| perf | 性能优化 |
| test | 测试相关 |
| build | 构建或依赖变更 |
| ci | CI配置变更 |
| chore | 其他变更 |
| revert | 回滚 |

## 示例

```
feat(request): 添加请求重试机制

- 添加 retry 配置选项
- 实现指数退避策略

Closes #123
```

## 规则

- subject 首字母小写
- 不使用句号结尾
- 每行不超过 72 字符