# Skills

个人 AI 编码助手技能集合。

## Skills

| Skill | 描述 | 安装命令 |
|---|---|---|
| dbhub-util-claude | Claude Code 项目级 DBHub 数据库 MCP 配置 | `npx skills add SuGarMT/Skills@dbhub-util-claude` |
| dbhub-util-codex | Codex 项目级 DBHub 数据库 MCP 配置 | `npx skills add SuGarMT/Skills@dbhub-util-codex` |
| git-skip | 本地开发配置文件 Git 跳过追踪 | `npx skills add SuGarMT/Skills@git-skip` |
| karpathy-guidelines | 整合 Karpathy AI 编码行为指南到 CLAUDE.md/AGENTS.md/GEMINI.md | `npx skills add SuGarMT/Skills@karpathy-guidelines` |
| frontend-slides | 零依赖富动画 HTML 演示文稿生成（支持 PPT/PPTX 转换） | `npx skills add SuGarMT/Skills@frontend-slides` |
| ppt-studio | 一站式 HTML 演示文稿工作台（大纲→讨论→主题→生成→审核） | `npx skills add SuGarMT/Skills@ppt-studio` |
| ppt-generator | 基于大纲生成高质量 PPT 演示文稿 | `npx skills add SuGarMT/Skills@ppt-generator` |
| ppt-script | 教程讲解与技术分享的讲稿转化工具 | `npx skills add SuGarMT/Skills@ppt-script` |
| ppt-checker | PPT 大纲与口播稿对齐审核检查器 | `npx skills add SuGarMT/Skills@ppt-checker` |

## CLI 速查

| 命令 | 用途 | 示例 |
|---|---|---|
| `add <pkg>` | 安装 skill | `skills add SuGarMT/Skills@karpathy-guidelines` |
| `remove [name]` | 删除 skill（无参数交互选择） | `skills remove web-design` |
| `list` / `ls` | 列出已装 skill | `skills ls -g`（全局）/ `skills ls --json` |
| `find [query]` | 搜索 skill | `skills find typescript` |
| `update [name]` | 更新 skill | `skills update -g`（仅全局） |
| `init [name]` | 初始化新 skill | `skills init my-skill` |

**常用选项**：`-g` 全局 · `-p` 项目 · `-a <agents>` 指定 agent · `-s <skills>` 指定 skill · `-y` 跳过确认 · `--all` 全选 · `--copy` 复制而非链接
