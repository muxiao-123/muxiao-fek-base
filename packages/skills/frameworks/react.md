---
scope: project
type: rule
---

# React 最佳实践

## 组件定义

```tsx
import { useState, useCallback } from 'react'

interface UserCardProps {
  name: string
  email: string
}

export function UserCard({ name, email }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  return (
    <div className="user-card">
      <h3>{name}</h3>
      {isExpanded && <p>{email}</p>}
      <button onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  )
}
```

## Hooks 规范

- 自定义 Hook 以 `use` 开头
- 依赖数组完整声明
- 优先使用 `useMemo` 和 `useCallback`

## 状态管理

- 组件级状态：`useState`
- 共享状态：Context 或状态管理库
- 服务端状态：React Query / SWR