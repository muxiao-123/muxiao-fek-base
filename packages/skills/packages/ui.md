---
scope: package
package: ui
type: usage
---

# UI 组件库使用规则

## 导入方式

```typescript
import { Button, Input } from '@muxiao-fek-base/ui'
import '@muxiao-fek-base/ui/styles/variables.css'
```

## 组件使用

### Button

```vue
<Button type="primary" size="large" @click="handleClick">
  提交
</Button>
```

### Input

```vue
<Input
  v-model="value"
  placeholder="请输入"
  @change="handleChange"
/>
```

## 主题定制

通过 CSS 变量覆盖实现主题定制：

```css
:root {
  --color-primary: #ff6b6b;
  --color-success: #51cf66;
}
```

## 规则

- 禁止直接修改组件源码
- 通过 CSS 变量覆盖实现定制
- 当前仅支持 Vue 3