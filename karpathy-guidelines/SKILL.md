---
name: karpathy-guidelines
description: Integrate Andrej Karpathy's AI coding behavioral guidelines into a project's CLAUDE.md or AGENTS.md. Use this skill whenever the user mentions setting up AI coding guidelines, adding Karpathy rules, initializing CLAUDE.md/AGENTS.md with best practices, merging coding conventions, or wants to enforce disciplined LLM coding behavior in their project. Also trigger when the user asks to "set up coding standards for AI", "add behavioral guidelines", or references Karpathy's coding principles.
---

# Karpathy Guidelines Integrator

从 GitHub 获取 Andrej Karpathy 最新的 LLM 编码行为指南，智能合并到以下全局规则文件中：

- `~/.claude/CLAUDE.md`（Claude Code）
- `~/.codex/AGENTS.md`（Codex）
- `~/.gemini/GEMINI.md`（Gemini / Antigravity）

## 执行流程

### 1. 获取最新指南

从以下 URL 获取原始 markdown：

```
https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

使用 `curl` 或 `read_url_content` 获取。获取失败时告知用户网络不可达，不要使用缓存或硬编码的旧版本。

预处理：
- 去掉开头的 `# CLAUDE.md` 标题行
- 去掉首段描述性文字（"Behavioral guidelines..." 和 "**Tradeoff:**..." 这两行）
- 只保留正文章节（从 `## 1. Think Before Coding` 开始）
- 在整合时添加来源标注行：`> Source: [Andrej Karpathy's LLM Coding Guidelines](https://github.com/forrestchang/andrej-karpathy-skills)`

### 2. 写入目标文件

三个文件全部写入：

| 文件 | 路径 |
|---|---|
| Claude Code | `~/.claude/CLAUDE.md` |
| Codex | `~/.codex/AGENTS.md` |
| Gemini | `~/.gemini/GEMINI.md` |

对每个文件执行相同的合并逻辑。如果某个文件不存在，创建它再写入。

### 3. 智能合并

读取目标文件现有内容，按以下策略合并：

#### 查重逻辑

从获取到的指南中提取所有章节标题（`##` 开头的行），用标题文本作为标识。逐一检查目标文件是否已包含这些标题关键词（不区分大小写）。

常见章节标识（以实际获取内容为准）：
- "Think Before Coding"
- "Simplicity First"
- "Surgical Changes"
- "Goal-Driven Execution"

已存在的章节跳过，缺失的章节追加。

#### 写入策略

- **文件为空或不存在**：直接写入完整指南内容
- **文件有内容但无重复章节**：在末尾追加 `---` 分隔线 + 来源标注 + 指南内容
- **文件有部分章节**：只追加缺失的章节
- **文件已包含全部章节**：告知用户该文件已是最新，无需更新

#### 格式适配

观察目标文件已有的标题层级，让指南章节标题层级与之保持一致。

### 4. 完成反馈

完成后告知用户：
- 获取到的指南版本（章节数量）
- 每个文件的处理结果：新增了哪些章节 / 跳过了哪些 / 已是最新
- 如果某个文件所在目录不存在，说明跳过原因

## 注意事项

- 不要删除或修改目标文件中已有的任何内容
- 不要改变现有内容的格式或结构
- 追加时保持清晰的视觉分隔
