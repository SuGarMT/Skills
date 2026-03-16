# Superpowers 中文文档索引 🚀

这里是 **Superpowers** 核心技能和文档的中文翻译索引。建议按以下顺序学习。

---

## 🎯 入口与核心流程（必读）

| 技能 | 说明 | 文件路径 |
|------|------|----------|
| **1. 使用 Superpowers** | **入口技能**。所有对话的起点，教你如何触发技能系统。 | [`skills/using-superpowers/SKILL.md`](skills/using-superpowers/SKILL.md) |
| **2. 头脑风暴 (Brainstorming)** | **需求探索**。在写代码前明确需求，避免返工。 | [`skills/brainstorming/SKILL.md`](skills/brainstorming/SKILL.md) |
| **3. 编写计划 (Writing Plans)** | **实施规划**。将需求拆解为细粒度的可执行任务。 | [`skills/writing-plans/SKILL.md`](skills/writing-plans/SKILL.md) |
| **4. 使用 Git Worktrees** | **环境隔离**。为每个功能创建独立开发环境，保持主分支干净。 | [`skills/using-git-worktrees/SKILL.md`](skills/using-git-worktrees/SKILL.md) |

---

## ⚙️ 执行与开发（核心）

| 技能 | 说明 | 文件路径 |
|------|------|----------|
| **子代理驱动开发** | **推荐执行方式**。每个任务派一个子代理，快速迭代 + 双重审查。 | [`skills/subagent-driven-development/SKILL.md`](skills/subagent-driven-development/SKILL.md) |
| **执行计划** | 传统的批量执行方式，带有人工检查点。 | [`skills/executing-plans/SKILL.md`](skills/executing-plans/SKILL.md) |
| **测试驱动开发 (TDD)** | **红-绿-重构**。先写失败测试，再写代码，最后重构。 | [`skills/test-driven-development/SKILL.md`](skills/test-driven-development/SKILL.md) |
| **并行任务分发** | 同时处理多个独立的任务。 | [`skills/dispatching-parallel-agents/SKILL.md`](skills/dispatching-parallel-agents/SKILL.md) |

---

## 🛠️ 质量与调试（必备）

| 技能 | 说明 | 文件路径 |
|------|------|----------|
| **系统化调试** | **找根因，不猜测**。四阶段调试法：调查→模式→假设→修复。 | [`skills/systematic-debugging/SKILL.md`](skills/systematic-debugging/SKILL.md) |
| **完成前验证** | 在声称"完成了"之前，用证据证明它真的完成了。 | [`skills/verification-before-completion/SKILL.md`](skills/verification-before-completion/SKILL.md) |
| **请求代码审查** | 主动发起的代码审查流程。 | [`skills/requesting-code-review/SKILL.md`](skills/requesting-code-review/SKILL.md) |
| **接收代码审查** | 如何专业地处理反馈，不盲从。 | [`skills/receiving-code-review/SKILL.md`](skills/receiving-code-review/SKILL.md) |

---

## 🏁 收尾与扩展

| 技能 | 说明 | 文件路径 |
|------|------|----------|
| **结束开发分支** | 合并代码、清理环境、提交 PR 的决策流程。 | [`skills/finishing-a-development-branch/SKILL.md`](skills/finishing-a-development-branch/SKILL.md) |
| **编写 Skills** | **元技能**。如何创建你自己的 Skills。 | [`skills/writing-skills/SKILL.md`](skills/writing-skills/SKILL.md) |

---

## 📚 深度阅读资料

### 调试专题
- [根因追踪法](skills/systematic-debugging/root-cause-tracing.md) - 如何倒推 bug 来源
- [深度防御](skills/systematic-debugging/defense-in-depth.md) - 修复 bug 后如何防止复发
- [基于条件的等待](skills/systematic-debugging/condition-based-waiting.md) - 替代 sleep 的测试技巧

### 测试专题
- [测试反模式](skills/test-driven-development/testing-anti-patterns.md) - 避免常见的测试错误
- [测试文档](docs/testing.md) - 整体测试策略

### 编写 Skills 专题
- [Anthropic 最佳实践](skills/writing-skills/anthropic-best-practices.md) - 官方编写指南（强烈推荐）
- [说服原则](skills/writing-skills/persuasion-principles.md) - 如何让 AI 遵守规则的心理学

### 示例与计划
- [Svelte Todo 计划示例](tests/subagent-driven-dev/svelte-todo/plan.md)
- [Go Fractals 设计示例](tests/subagent-driven-dev/go-fractals/design.md)
