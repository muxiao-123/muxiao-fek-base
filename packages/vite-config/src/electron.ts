import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createBaseConfig, type ViteConfigOptions } from "./base";
import { resolve } from "path";

export function createElectronConfig(options: ViteConfigOptions = {}) {
  const baseConfig = createBaseConfig(options);

  return defineConfig({
    ...baseConfig,
    plugins: [vue()],
    server: {
      port: 3000,
    },
    build: {
      ...baseConfig.build,
      outDir: "dist-electron",
      rollupOptions: {
        external: ["electron"],
      },
    },
  });
}
