---
name: karpathy-guidelines
description: Integrate Andrej Karpathy's AI coding behavioral guidelines into a project's CLAUDE.md or AGENTS.md. Use this skill whenever the user mentions setting up AI coding guidelines, adding Karpathy rules, initializing CLAUDE.md/AGENTS.md with best practices, merging coding conventions, or wants to enforce disciplined LLM coding behavior in their project. Also trigger when the user asks to "set up coding standards for AI", "add behavioral guidelines", or references Karpathy's coding principles.
---

# Karpathy Guidelines Integrator

从 GitHub 获取 Andrej Karpathy 最新的 LLM 编码行为指南，智能合并到当前项目的 `CLAUDE.md` 和/或 `AGENTS.md` 中。

## 执行流程

### 1. 从 GitHub 获取最新指南

从以下 URL 获取最新内容：

```
https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

使用 `curl` 或 `read_url_content` 等方式获取原始 markdown 内容。获取失败时告知用户网络不可达，不要使用缓存或硬编码的旧版本。

获取到的内容需要做以下预处理：
- 去掉开头的 `# CLAUDE.md` 标题行（如果有），因为这是源文件标题，不是指南内容
- 保留正文中的说明段落和所有章节内容
- 在整合时添加来源标注：`> Source: Andrej Karpathy's LLM Coding Guidelines`

### 2. 扫描目标文件

检测当前项目根目录下是否存在：
- `CLAUDE.md`
- `AGENTS.md`

**规则**：哪个存在就写入哪个。两个都存在，两个都写。都不存在则创建 `CLAUDE.md` 并写入。

### 3. 智能合并

读取目标文件的现有内容，按以下策略合并：

#### 查重逻辑

从获取到的指南内容中提取所有二级标题（`##` 开头的行），用标题文本作为章节标识。逐一检查目标文件中是否已包含这些标题关键词（不区分大小写）。

常见的章节标识包括（但以实际获取的内容为准）：
- "Think Before Coding"
- "Simplicity First"
- "Surgical Changes"
- "Goal-Driven Execution"

已存在的章节跳过，缺失的章节追加。

#### 写入策略

- **文件为空或不存在**：直接写入完整指南内容
- **文件已有内容但无重复章节**：在文件末尾追加，用 `---` 分隔线隔开
- **文件已有部分章节**：只追加缺失的章节
- **文件已包含全部章节**：告知用户指南已完整存在，无需更新

#### 格式适配

观察目标文件中已有的标题层级风格，让指南章节的标题层级与现有内容保持一致。

### 4. 完成反馈

完成后告知用户：
- 获取到的指南版本（章节数量）
- 写入了哪些文件
- 新增了哪些章节
- 跳过了哪些已存在的章节（如果有）

## 注意事项

- 不要删除或修改目标文件中已有的任何内容
- 不要改变现有内容的格式或结构
- 指南追加时保持与原文件之间有清晰的视觉分隔
- 如果现有文件中有语义相似但措辞不同的内容，依然追加 Karpathy 的版本，因为具体表述和侧重点不同
