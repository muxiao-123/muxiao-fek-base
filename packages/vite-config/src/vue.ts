import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createBaseConfig, type ViteConfigOptions } from "./base";
import { resolve } from "path";

export function createVueConfig(options: ViteConfigOptions = {}) {
  const baseConfig = createBaseConfig(options);

  return defineConfig({
    ...baseConfig,
    plugins: [vue()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      ...baseConfig.build,
      lib: {
        entry: resolve(options.root || process.cwd(), "src/index.ts"),
        name: "VueApp",
        formats: ["es", "umd"],
        fileName: (format) => `vue-app.${format}.js`,
      },
    },
  });
}
