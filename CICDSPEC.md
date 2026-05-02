````markdown
# SPEC.md — GitHub Actions 自动部署与自动发布

## 概述

本项目使用 **GitHub Actions** 实现自动化 CI/CD，包含三条核心流水线：

| 流水线          | 触发条件          | 职责                                                  |
| --------------- | ----------------- | ----------------------------------------------------- |
| **CI**          | 每次 Push / PR    | Lint、TypeCheck、Build、Test                          |
| **Deploy Docs** | Push 到 main 分支 | 构建 Vitepress 文档并部署到 GitHub Pages              |
| **Release**     | Push 到 main 分支 | 检测 Changeset 文件，自动创建 Release PR 或发布到 npm |

---

## 一、前置准备

### 1.1 Changesets 安装与配置

```bash
pnpm add -Dw @changesets/cli
pnpm changeset init
```
````

`.changeset/config.json`：

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### 1.2 GitHub 仓库配置

| 配置项                   | 路径                         | 值                                                     |
| ------------------------ | ---------------------------- | ------------------------------------------------------ |
| **NPM_TOKEN**            | Settings → Secrets → Actions | npm Access Token（需 Publish 权限，类型选 Automation） |
| **Workflow Permissions** | Settings → Actions → General | Read and write permissions                             |
| **GitHub Pages Source**  | Settings → Pages             | GitHub Actions                                         |

### 1.3 npm 发布配置

每个需发布的公共包 `package.json` 中：

```json
{
  "name": "@muxiao-fek-base/utils",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

根目录 `.npmrc`：

```ini
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

---

## 二、GitHub Actions 工作流

### 2.1 CI 流水线（`.github/workflows/ci.yml`）

**触发：** Push 到 main/develop 分支、Pull Request 到 main 分支
**职责：** 代码质量检查 + 构建验证 + 测试

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint & TypeCheck
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.28.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: TypeCheck
        run: pnpm typecheck

  test:
    name: Test & Build
    runs-on: ubuntu-latest
    timeout-minutes: 15
    needs: lint

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.28.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test
```

### 2.2 文档自动部署（`.github/workflows/deploy-docs.yml`）

**触发：** Push 到 main 分支，且变更文件在 `docs/` 目录
**职责：** 构建 Vitepress 并部署到 GitHub Pages

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - '.github/workflows/deploy-docs.yml'

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build-and-deploy:
    name: Build & Deploy to GitHub Pages
    runs-on: ubuntu-latest
    timeout-minutes: 15

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.28.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build docs
        run: pnpm --filter docs build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2.3 自动发布（`.github/workflows/release.yml`）

**触发：** Push 到 main 分支
**职责：** 检测 Changeset 文件，自动创建 Release PR 或发布到 npm

```yaml
name: Release

on:
  push:
    branches: [main]

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.28.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          version: pnpm changeset version
          publish: pnpm changeset publish
          commit: 'chore(release): version packages'
          title: 'chore(release): version packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 三、发布流程详解

```
开发者提交代码 + .changeset/*.md 文件
        ↓
  Release Action 触发
        ↓
  检测到新增 Changeset 文件？
   ├── 是 → 创建/更新 Release PR
   │         - 自动计算版本号（major/minor/patch）
   │         - 自动生成 Changelog
   │         - PR 标题：chore(release): version packages
   │         ↓
   │    团队 Review 并合并 Release PR
   │         ↓
   │    Release Action 再次触发
   │         ↓
   │    执行 pnpm changeset publish
   │         ↓
   │    发布到 npm + 自动创建 Git Tag
   │
   └── 否 → 跳过（无变更无需发布）
```

---

## 四、开发者操作流程

### 4.1 提交代码变更

```bash
# 1. 正常开发...

# 2. 生成 Changeset
pnpm changeset

# 选择变更的包 → 选择版本类型 → 描述变更

# 3. 提交代码（包含 .changeset/*.md）
git add .
git cz
git push
```

### 4.2 查看 Release PR

- CI 自动创建 Release PR，标题为 `chore(release): version packages`
- PR 内容包含：
  - 即将发布的包名和版本号
  - 自动生成的 Changelog
  - 内部依赖的版本联动更新

### 4.3 发布到 npm

```bash
# Review 后合并 Release PR 到 main
# 合并后自动触发：
# 1. pnpm changeset version（应用版本号，删除已消费的 changeset 文件）
# 2. pnpm changeset publish（发布到 npm）
# 3. 自动 git tag v1.0.0
```

---

## 五、Turborepo 任务配置

`turbo.json`（与 CI 流程对齐）：

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "lint": {},
    "format": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

---

## 六、约束与注意事项

| 约束项                     | 说明                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| **NPM_TOKEN**              | 必须是 Automation Token 类型，无过期时间                         |
| **首次发布 scoped 包**     | npm 上需确认包为公开访问                                         |
| **Changeset 文件必须提交** | `.changeset/*.md` 不可加入 `.gitignore`                          |
| **私有 registry**          | 如需发布到 GitHub Packages，修改 `publishConfig.registry`        |
| **pnpm 版本**              | CI 中 `pnpm/action-setup` 指定版本需与 `packageManager` 字段一致 |
| **fetch-depth: 0**         | Release 工作流必须拉取完整 Git 历史，Changesets 才能正确计算版本 |
| **concurrency**            | 同一分支的重复触发会自动取消旧任务，避免资源浪费                 |
| **frozen-lockfile**        | CI 中强制使用锁文件版本，防止意外更新依赖                        |

---

## 七、文件清单

```
.github/
└── workflows/
    ├── ci.yml              # CI 流水线
    ├── deploy-docs.yml     # 文档自动部署
    └── release.yml         # 自动发布到 npm

.changeset/
└── config.json             # Changesets 配置

turbo.json                  # Turborepo 任务编排（含 test、typecheck）
```

```

---
```
