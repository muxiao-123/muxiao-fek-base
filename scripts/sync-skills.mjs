#!/usr/bin/env node

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync, symlinkSync, unlinkSync, readdirSync, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const SKILLS_SOURCE = resolve(rootDir, "packages/skills");
const PROJECTS = {
  "vue3-app": resolve(rootDir, "apps/vue3-app"),
  "react-app": resolve(rootDir, "apps/react-app"),
  "electron-app": resolve(rootDir, "apps/electron-app"),
  "miniapp": resolve(rootDir, "apps/miniapp"),
};

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    project: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--project" && args[i + 1]) {
      options.project = args[i + 1];
      i++;
    }
  }

  return options;
}

function getAllSkillFiles(dir, baseDir = dir) {
  const files = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllSkillFiles(fullPath, baseDir));
    } else if (entry.endsWith(".md")) {
      const relativePath = resolve(baseDir, entry.replace(/\.md$/, ""));
      files.push({
        source: fullPath,
        relative: resolve(baseDir, entry),
      });
    }
  }

  return files;
}

function syncSkillsToProject(projectName, projectDir) {
  const skillsTargetDir = resolve(projectDir, ".cursor/skills");

  if (!existsSync(skillsTargetDir)) {
    mkdirSync(skillsTargetDir, { recursive: true });
  }

  const skillFiles = getAllSkillFiles(SKILLS_SOURCE);

  for (const file of skillFiles) {
    const targetPath = resolve(skillsTargetDir, file.relative.replace(SKILLS_SOURCE, ""));

    const targetDir = dirname(targetPath);
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
    }

    if (existsSync(targetPath)) {
      try {
        unlinkSync(targetPath);
      } catch (err) {
        console.warn(`Failed to remove existing symlink: ${targetPath}`);
      }
    }

    try {
      symlinkSync(file.source, targetPath);
      console.log(`[sync] ${projectName}: ${file.relative.replace(SKILLS_SOURCE + "\\", "")}`);
    } catch (err) {
      console.error(`Failed to create symlink for ${file.source}:`, err.message);
    }
  }
}

function main() {
  const options = parseArgs();
  const projectsToSync = options.project
    ? { [options.project]: PROJECTS[options.project] }
    : PROJECTS;

  console.log("Starting skills sync...\n");

  for (const [projectName, projectDir] of Object.entries(projectsToSync)) {
    if (!projectDir) {
      console.error(`Project not found: ${projectName}`);
      continue;
    }

    if (!existsSync(projectDir)) {
      console.warn(`Project directory not found: ${projectDir}`);
      continue;
    }

    console.log(`Syncing skills to ${projectName}...`);
    syncSkillsToProject(projectName, projectDir);
    console.log();
  }

  console.log("Skills sync completed!");
}

main();