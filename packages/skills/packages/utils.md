---
scope: package
package: utils
type: usage
---

# Utils 包使用规则

## 导入方式

```typescript
import { debounce, formatDate, deepClone } from '@muxiao-fek-base/utils'
```

## 工具函数列表

### 日期处理
- `formatDate(date, format)` - 格式化日期

### 数据处理
- `deepClone(obj)` - 深拷贝
- `isEqual(a, b)` - 对象比较
- `isEmpty(value)` - 空值检查

### 函数工具
- `debounce(fn, delay)` - 防抖
- `throttle(fn, delay)` - 节流

### 字符串工具
- `randomString(length)` - 生成随机字符串
- `buildQueryString(params)` - 构建查询字符串
- `parseQueryString(query)` - 解析查询字符串

### 数学工具
- `clamp(value, min, max)` - 限制数值范围

## 规则

- 所有函数必须无副作用
- 不依赖任何框架
- 返回值必须类型安全