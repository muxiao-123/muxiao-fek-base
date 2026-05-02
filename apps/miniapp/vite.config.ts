import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    target: "es2022",
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/app.ts"),
      formats: ["es"],
      fileName: "app",
    },
    rollupOptions: {
      external: ["@muxiao-fek-base/i18n", "@muxiao-fek-base/utils"],
    },
  },
});
