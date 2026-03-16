---
name: find-skills
description: 帮助用户发现和安装 Agent 技能。当用户提问"怎么做 X"、"找一个 X 的技能"、"有没有能做……的技能"，或表达扩展能力的兴趣时使用此技能。
---
# 发现技能（Find Skills）

此技能帮助你从开放的 Agent 技能生态中发现和安装技能。

## 何时使用此技能

当用户：

- 问"怎么做 X"，而 X 可能已有现成技能
- 说"帮我找一个 X 的技能"或"有没有做 X 的技能"
- 问"你能做 X 吗"，而 X 是一种专业能力
- 想要扩展 Agent 的能力
- 想搜索工具、模板或工作流
- 提到希望在某个特定领域获得帮助（设计、测试、部署等）

## 什么是 Skills CLI？

Skills CLI（`npx skills`）是开放 Agent 技能生态的包管理器。技能是模块化的包，能为 Agent 扩展专业知识、工作流和工具。

**核心命令：**

- `npx skills find [关键词]` — 交互式搜索或按关键词搜索技能
- `npx skills add <包名>` — 从 GitHub 或其他来源安装技能
- `npx skills check` — 检查技能更新
- `npx skills update` — 更新所有已安装的技能

**浏览技能市场：** https://skills.sh/

## 如何帮助用户找到技能

### 第一步：理解需求

当用户寻求帮助时，识别：

1. 领域（如 React、测试、设计、部署）
2. 具体任务（如编写测试、创建动画、审查 PR）
3. 这是否是一个常见任务，很可能已有对应技能

### 第二步：搜索技能

运行 find 命令并附上相关关键词：

```bash
npx skills find [关键词]
```

示例：

- 用户问"怎么让我的 React 应用更快？" → `npx skills find react performance`
- 用户问"能帮我做 PR 审查吗？" → `npx skills find pr review`
- 用户问"我需要创建变更日志" → `npx skills find changelog`

命令会返回类似结果：

```
Install with npx skills add <owner/repo@skill>

vercel-labs/agent-skills@vercel-react-best-practices
└ https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
```

### 第三步：向用户展示选项

找到相关技能后，向用户展示：

1. 技能名称和功能说明
2. 安装命令
3. 在 skills.sh 上了解更多的链接

回复示例：

```
找到了一个可能有用的技能！"vercel-react-best-practices" 提供了
来自 Vercel 工程团队的 React 和 Next.js 性能优化指南。

安装命令：
npx skills add vercel-labs/agent-skills@vercel-react-best-practices

了解更多：https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
```

### 第四步：帮助安装

如果用户想继续，可以帮他们安装：

```bash
npx skills add <owner/repo@skill> -g -y
```

`-g` 表示全局安装（用户级别），`-y` 跳过确认提示。

## 常见技能分类

搜索时可参考以下常见分类：

| 分类     | 搜索关键词示例                           |
| -------- | ---------------------------------------- |
| Web 开发 | react, nextjs, typescript, css, tailwind |
| 测试     | testing, jest, playwright, e2e           |
| 运维部署 | deploy, docker, kubernetes, ci-cd        |
| 文档     | docs, readme, changelog, api-docs        |
| 代码质量 | review, lint, refactor, best-practices   |
| 设计     | ui, ux, design-system, accessibility     |
| 效率工具 | workflow, automation, git                |

## 搜索技巧

1. **使用具体关键词**："react testing" 比单独 "testing" 效果更好
2. **尝试近义词**：如果 "deploy" 没结果，试试 "deployment" 或 "ci-cd"
3. **关注热门来源**：很多技能来自 `vercel-labs/agent-skills` 或 `ComposioHQ/awesome-claude-skills`

## 没找到技能时

如果没有找到相关技能：

1. 告知用户没有找到现有技能
2. 主动提出用自身能力直接帮忙
3. 建议用户可以用 `npx skills init` 创建自己的技能

示例：

```
我搜索了与 "xyz" 相关的技能，但没有找到匹配结果。
不过我可以直接帮你处理这个任务！需要我继续吗？

如果这是你经常做的事情，你可以创建自己的技能：
npx skills init my-xyz-skill
```
