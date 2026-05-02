---
scope: project
type: rule
---

# Vue 3 最佳实践

## 组件结构

```vue
<script setup lang="ts">
// 1. 导入
import { ref, computed } from 'vue'

// 2. Props 定义
const props = defineProps<{
  title: string
}>()

// 3. Emits 定义
const emit = defineEmits<{
  (e: 'update', value: string): void
}>()

// 4. 响应式数据
const count = ref(0)

// 5. 计算属性
const doubled = computed(() => count.value * 2)

// 6. 方法
function increment() {
  count.value++
  emit('update', count.value)
}
</script>

<template>
  <div class="component">
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<style scoped>
.component {
  padding: 16px;
}
</style>
```

## 组合式函数命名

- 前缀 `use`：`useUserData`
- 返回类型明确的函数：`useFetchUser`

## 响应式原则

- 优先使用 `ref`
- 只读数据使用 `computed`
- 避免响应式丢失