# Superpowers

Superpowers 是一套完整的软件开发工作流，专为你的编程智能体设计。它建立在一组可组合的"技能"之上，并包含一些初始指令来确保你的智能体正确使用这些技能。

## 工作原理

一切从你启动编程智能体的那一刻开始。当它发现你正在构建某个东西时，它*不会*立即跳入编写代码的环节。相反，它会退后一步，询问你真正想要做什么。

一旦从对话中提炼出需求规格，它会将其分成足够短的片段展示给你，让你能够真正阅读和消化。

在你确认设计方案后，你的智能体会制定一份清晰的实施计划——清晰到连一个热情但品味欠佳、缺乏判断力、没有项目背景、还不爱写测试的初级工程师都能照着执行。计划强调真正的红/绿测试驱动开发（TDD）、YAGNI（你不会需要它）原则和 DRY（不要重复自己）原则。

接下来，一旦你说"开始"，它就会启动*子智能体驱动开发*流程，让多个智能体逐一处理每个工程任务，检查和审查它们的工作，然后继续推进。Claude 能够连续自主工作几个小时而不偏离你们共同制定的计划，这种情况并不罕见。

当然还有更多功能，但这就是系统的核心。由于这些技能会自动触发，你不需要做任何特别的事情。你的编程智能体就是拥有了 Superpowers。


## 赞助

如果 Superpowers 帮助你完成了能赚钱的工作，并且你愿意的话，我非常感激你能考虑[赞助我的开源工作](https://github.com/sponsors/obra)。

谢谢！

- Jesse


## 安装

**注意：** 不同平台的安装方式有所不同。Claude Code 有内置的插件系统。Codex 和 OpenCode 需要手动设置。

### Claude Code（通过插件市场）

在 Claude Code 中，首先注册市场：

```bash
/plugin marketplace add obra/superpowers-marketplace
```

然后从该市场安装插件：

```bash
/plugin install superpowers@superpowers-marketplace
```

### 验证安装

检查命令是否出现：

```bash
/help
```

```
# 应该能看到：
# /superpowers:brainstorm - 交互式设计优化
# /superpowers:write-plan - 创建实施计划
# /superpowers:execute-plan - 分批执行计划
```

### Codex

告诉 Codex：

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

**详细文档：** [docs/README.codex.md](docs/README.codex.md)

### OpenCode

告诉 OpenCode：

```
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

**详细文档：** [docs/README.opencode.md](docs/README.opencode.md)

## 基本工作流

1. **brainstorming（头脑风暴）** - 在编写代码之前激活。通过提问来优化粗略想法，探索替代方案，分段展示设计供验证。保存设计文档。

2. **using-git-worktrees（使用 Git 工作树）** - 在设计批准后激活。在新分支上创建隔离的工作空间，运行项目设置，验证测试基线是否干净。

3. **writing-plans（编写计划）** - 在设计获批后激活。将工作分解为小任务（每个 2-5 分钟）。每个任务都有精确的文件路径、完整的代码和验证步骤。

4. **subagent-driven-development（子智能体驱动开发）** 或 **executing-plans（执行计划）** - 有计划时激活。为每个任务分派新的子智能体，进行两阶段审查（先检查规格合规性，再检查代码质量），或者分批执行并设置人工检查点。

5. **test-driven-development（测试驱动开发）** - 在实施过程中激活。强制执行红-绿-重构循环：编写失败的测试，观察它失败，编写最少的代码，观察它通过，提交。删除在测试之前编写的代码。

6. **requesting-code-review（请求代码审查）** - 在任务之间激活。对照计划进行审查，按严重程度报告问题。关键问题会阻止进度。

7. **finishing-a-development-branch（完成开发分支）** - 在任务完成时激活。验证测试，提供选项（合并/创建 PR/保留/丢弃），清理工作树。

**智能体在执行任何任务之前都会检查相关技能。** 这是强制性的工作流，而非建议。

## 内容概览

### 技能库

**测试**
- **test-driven-development** - 红-绿-重构循环（包含测试反模式参考）

**调试**
- **systematic-debugging** - 四阶段根因分析流程（包含根因追踪、纵深防御、基于条件的等待技术）
- **verification-before-completion** - 确保问题确实已修复

**协作**
- **brainstorming** - 苏格拉底式设计优化
- **writing-plans** - 详细的实施计划
- **executing-plans** - 带检查点的分批执行
- **dispatching-parallel-agents** - 并发子智能体工作流
- **requesting-code-review** - 预审查清单
- **receiving-code-review** - 响应反馈
- **using-git-worktrees** - 并行开发分支
- **finishing-a-development-branch** - 合并/PR 决策工作流
- **subagent-driven-development** - 带两阶段审查的快速迭代（先检查规格合规性，再检查代码质量）

**元技能**
- **writing-skills** - 按照最佳实践创建新技能（包含测试方法论）
- **using-superpowers** - 技能系统介绍

## 理念

- **测试驱动开发** - 始终先写测试
- **系统化优于临时性** - 流程优于猜测
- **降低复杂性** - 简洁是首要目标
- **证据优于声明** - 在宣布成功之前进行验证

阅读更多：[Superpowers for Claude Code](https://blog.fsck.com/2025/10/09/superpowers/)

## 贡献

技能直接存放在本仓库中。贡献方式：

1. Fork 本仓库
2. 为你的技能创建一个分支
3. 按照 `writing-skills` 技能的指南创建和测试新技能
4. 提交 PR

完整指南请参见 `skills/writing-skills/SKILL.md`。

## 更新

更新插件时技能会自动更新：

```bash
/plugin update superpowers
```

## 许可证

MIT 许可证 - 详见 LICENSE 文件

## 支持

- **问题反馈**: https://github.com/obra/superpowers/issues
- **插件市场**: https://github.com/obra/superpowers-marketplace
