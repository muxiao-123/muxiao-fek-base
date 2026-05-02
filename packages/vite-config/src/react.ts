import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createBaseConfig, type ViteConfigOptions } from "./base";
import { resolve } from "path";

export function createReactConfig(options: ViteConfigOptions = {}) {
  const baseConfig = createBaseConfig(options);

  return defineConfig({
    ...baseConfig,
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      ...baseConfig.build,
      lib: {
        entry: resolve(options.root || process.cwd(), "src/index.tsx"),
        name: "ReactApp",
        formats: ["es", "umd"],
        fileName: (format) => `react-app.${format}.js`,
      },
    },
  });
}
