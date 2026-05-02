import { defineConfig } from "vitepress";

export default defineConfig({
  title: "前端知识库",
  description: "基于 pnpm workspace 的前端 Monorepo 项目模板",
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/introduction" },
      { text: "packages", link: "/packages/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "介绍", link: "/guide/introduction" },
            { text: "快速开始", link: "/guide/getting-started" },
            { text: "项目结构", link: "/guide/structure" },
          ],
        },
      ],
    },
  },
});