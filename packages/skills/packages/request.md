---
scope: package
package: request
type: usage
---

# Request 包使用规则

## 导入方式

```typescript
import { createRequest } from '@muxiao-fek-base/request'

const http = createRequest({
  baseURL: '/api',
  timeout: 30000,
})
```

## 使用方式

```typescript
// GET 请求
const result = await http.get<User>('/users', { page: 1 })

// POST 请求
const result = await http.post<User>('/users', { name: 'John' })

// 错误处理
try {
  const result = await http.get('/data')
} catch (error) {
  if (http.isHttpError(error)) {
    // HTTP 错误处理
  }
}
```

## 规则

- 使用 `try/catch` 包裹异步请求
- 通过 `http.isHttpError(error)` 判断错误类型
- 不要在组件内直接调用 axios/fetch
- 使用 `http.request()` 统一发送请求