<script setup lang="ts">
import { ref } from "vue";
import { Button, Input } from "@muxiao-fek-base/ui";
import { createI18n } from "@muxiao-fek-base/i18n";

const i18n = createI18n({
  baseLocale: "zh-CN",
});

const message = ref("");

function handleSubmit() {
  alert(i18n.t("common_submit") + ": " + message.value);
}
</script>

<template>
  <div class="app">
    <h1>Electron App - {{ i18n.t("common_submit") }}</h1>
    <Input v-model="message" :placeholder="i18n.t('common_search')" />
    <Button type="primary" @click="handleSubmit">
      {{ i18n.t("common_submit") }}
    </Button>
  </div>
</template>

<style scoped>
.app {
  padding: 24px;
}
</style>