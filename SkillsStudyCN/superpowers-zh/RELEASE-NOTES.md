# Superpowers 发布说明

## v4.1.1 (2026-01-23)

### 修复

**OpenCode：根据官方文档标准化使用 `plugins/` 目录 (#343)**

OpenCode 的官方文档使用 `~/.config/opencode/plugins/`（复数形式）。我们的文档之前使用 `plugin/`（单数形式）。虽然 OpenCode 两种形式都接受，但我们已标准化使用官方约定以避免混淆。

更改：

- 在仓库结构中将 `.opencode/plugin/` 重命名为 `.opencode/plugins/`
- 更新了所有平台的所有安装文档（INSTALL.md、README.opencode.md）
- 更新了测试脚本以匹配

**OpenCode：修复符号链接说明 (#339, #342)**

- 在 `ln -s` 之前添加了显式的 `rm`（修复重新安装时的"文件已存在"错误）
- 添加了 INSTALL.md 中缺失的技能符号链接步骤
- 从已弃用的 `use_skill`/`find_skills` 更新为原生 `skill` 工具引用

---

## v4.1.0 (2026-01-23)

### 破坏性更改

**OpenCode：切换到原生技能系统**

OpenCode 的 Superpowers 现在使用 OpenCode 的原生 `skill` 工具，而不是自定义的 `use_skill`/`find_skills` 工具。这是一个更简洁的集成，与 OpenCode 的内置技能发现配合工作。

**需要迁移：** 技能必须符号链接到 `~/.config/opencode/skills/superpowers/`（参见更新的安装文档）。

### 修复

**OpenCode：修复会话启动时代理重置问题 (#226)**

之前使用 `session.prompt({ noReply: true })` 的引导注入方法会导致 OpenCode 在第一条消息时将选定的代理重置为"build"。现在使用 `experimental.chat.system.transform` 钩子直接修改系统提示，没有副作用。

**OpenCode：修复 Windows 安装 (#232)**

- 移除了对 `skills-core.js` 的依赖（消除了文件被复制而非符号链接时损坏的相对导入）
- 为 cmd.exe、PowerShell 和 Git Bash 添加了全面的 Windows 安装文档
- 记录了每个平台的正确符号链接与连接用法

**Claude Code：修复 Claude Code 2.1.x 的 Windows 钩子执行**

Claude Code 2.1.x 改变了在 Windows 上执行钩子的方式：它现在自动检测命令中的 `.sh` 文件并在前面添加 `bash `。这破坏了多语言包装器模式，因为 `bash "run-hook.cmd" session-start.sh` 试图将 .cmd 文件作为 bash 脚本执行。

修复：hooks.json 现在直接调用 session-start.sh。Claude Code 2.1.x 自动处理 bash 调用。还添加了 .gitattributes 以强制 shell 脚本使用 LF 行尾（修复 Windows 检出时的 CRLF 问题）。

---

## v4.0.3 (2025-12-26)

### 改进

**加强 using-superpowers 技能以处理显式技能请求**

解决了一个失败模式：即使用户通过名称显式请求技能（例如"subagent-driven-development, please"），Claude 也会跳过调用技能。Claude 会认为"我知道那是什么意思"然后直接开始工作，而不是加载技能。

更改：

- 将"规则"更新为说"调用相关或请求的技能"而不是"检查技能" - 强调主动调用而非被动检查
- 添加了"在任何响应或行动之前" - 原始措辞只提到"响应"，但 Claude 有时会在响应之前采取行动
- 添加了调用错误技能也没关系的保证 - 减少犹豫
- 添加了新的危险信号："我知道那是什么意思" → 知道概念 ≠ 使用技能

**添加了显式技能请求测试**

`tests/explicit-skill-requests/` 中的新测试套件验证 Claude 在用户按名称请求技能时正确调用技能。包括单轮和多轮测试场景。

## v4.0.2 (2025-12-23)

### 修复

**斜杠命令现在仅限用户使用**

为所有三个斜杠命令（`/brainstorm`、`/execute-plan`、`/write-plan`）添加了 `disable-model-invocation: true`。Claude 无法再通过 Skill 工具调用这些命令 - 它们仅限于用户手动调用。

底层技能（`superpowers:brainstorming`、`superpowers:executing-plans`、`superpowers:writing-plans`）仍然可供 Claude 自主调用。此更改防止了 Claude 调用一个只是重定向到技能的命令时的混淆。

## v4.0.1 (2025-12-23)

### 修复

**澄清如何在 Claude Code 中访问技能**

修复了一个令人困惑的模式：Claude 会通过 Skill 工具调用技能，然后尝试单独读取技能文件。`using-superpowers` 技能现在明确说明 Skill 工具直接加载技能内容 - 无需读取文件。

- 在 `using-superpowers` 中添加了"如何访问技能"部分
- 在说明中将"读取技能"改为"调用技能"
- 更新了斜杠命令以使用完全限定的技能名称（例如 `superpowers:brainstorming`）

**为 receiving-code-review 添加了 GitHub 线程回复指南**（感谢 @ralphbean）

添加了关于在原始线程中回复内联审查评论而不是作为顶级 PR 评论的说明。

**为 writing-skills 添加了自动化优于文档的指南**（感谢 @EthanJStark）

添加了机械约束应该自动化而非文档化的指南 - 将技能保留给需要判断的情况。

## v4.0.0 (2025-12-17)

### 新功能

**subagent-driven-development 中的两阶段代码审查**

子代理工作流程现在在每个任务后使用两个独立的审查阶段：

1. **规格合规审查** - 持怀疑态度的审查员验证实现是否完全匹配规格。捕获缺失的需求和过度构建。不会信任实现者的报告 - 阅读实际代码。
2. **代码质量审查** - 仅在规格合规通过后运行。审查代码整洁度、测试覆盖率、可维护性。

这捕获了代码编写良好但不符合请求内容的常见失败模式。审查是循环的，不是一次性的：如果审查员发现问题，实现者修复，然后审查员再次检查。

其他子代理工作流程改进：

- 控制器向工作者提供完整任务文本（而非文件引用）
- 工作者可以在工作之前和期间提出澄清问题
- 报告完成前的自我审查检查清单
- 计划在开始时读取一次，提取到 TodoWrite

`skills/subagent-driven-development/` 中的新提示模板：

- `implementer-prompt.md` - 包含自我审查检查清单，鼓励提问
- `spec-reviewer-prompt.md` - 针对需求的怀疑性验证
- `code-quality-reviewer-prompt.md` - 标准代码审查

**调试技术与工具合并**

`systematic-debugging` 现在捆绑支持技术和工具：

- `root-cause-tracing.md` - 通过调用栈向后追踪 bug
- `defense-in-depth.md` - 在多个层添加验证
- `condition-based-waiting.md` - 用条件轮询替换任意超时
- `find-polluter.sh` - 二分脚本查找哪个测试创建了污染
- `condition-based-waiting-example.ts` - 来自真实调试会话的完整实现

**测试反模式参考**

`test-driven-development` 现在包含 `testing-anti-patterns.md`，涵盖：

- 测试 mock 行为而非真实行为
- 向生产类添加仅测试方法
- 不理解依赖就进行 mock
- 隐藏结构假设的不完整 mock

**技能测试基础设施**

三个新测试框架用于验证技能行为：

`tests/skill-triggering/` - 验证技能从朴素提示触发而无需显式命名。测试 6 个技能以确保仅描述就足够了。

`tests/claude-code/` - 使用 `claude -p` 进行无头测试的集成测试。通过会话转录（JSONL）分析验证技能使用。包含用于成本跟踪的 `analyze-token-usage.py`。

`tests/subagent-driven-dev/` - 端到端工作流程验证，包含两个完整测试项目：

- `go-fractals/` - 带有 Sierpinski/Mandelbrot 的 CLI 工具（10 个任务）
- `svelte-todo/` - 带有 localStorage 和 Playwright 的 CRUD 应用（12 个任务）

### 主要更改

**DOT 流程图作为可执行规格**

使用 DOT/GraphViz 流程图作为权威流程定义重写了关键技能。散文变成了支持内容。

**描述陷阱**（在 `writing-skills` 中记录）：发现当描述包含工作流程摘要时，技能描述会覆盖流程图内容。Claude 遵循简短描述而不是阅读详细流程图。修复：描述必须仅用于触发（"当 X 时使用"），不含流程细节。

**using-superpowers 中的技能优先级**

当多个技能适用时，流程技能（头脑风暴、调试）现在明确优先于实现技能。"构建 X"首先触发头脑风暴，然后是领域技能。

**加强头脑风暴触发**

描述改为命令式："在任何创意工作之前你必须使用此技能 - 创建功能、构建组件、添加功能或修改行为。"

### 破坏性更改

**技能合并** - 六个独立技能被合并：

- `root-cause-tracing`、`defense-in-depth`、`condition-based-waiting` → 捆绑在 `systematic-debugging/` 中
- `testing-skills-with-subagents` → 捆绑在 `writing-skills/` 中
- `testing-anti-patterns` → 捆绑在 `test-driven-development/` 中
- `sharing-skills` 已移除（过时）

### 其他改进

- **render-graphs.js** - 从技能中提取 DOT 图并渲染为 SVG 的工具
- using-superpowers 中的 **合理化表格** - 可扫描格式，包括新条目："我需要先了解更多上下文"、"让我先探索一下"、"这感觉很有成效"
- **docs/testing.md** - 使用 Claude Code 集成测试测试技能的指南

---

## v3.6.2 (2025-12-03)

### 修复

- **Linux 兼容性**：修复多语言钩子包装器（`run-hook.cmd`）以使用 POSIX 兼容语法
  - 将第 16 行的 bash 特定 `${BASH_SOURCE[0]:-$0}` 替换为标准 `$0`
  - 解决了 Ubuntu/Debian 系统上 `/bin/sh` 是 dash 时的"Bad substitution"错误
  - 修复 #141

---

## v3.5.1 (2025-11-24)

### 更改

- **OpenCode 引导重构**：从 `chat.message` 钩子切换到 `session.created` 事件进行引导注入
  - 引导现在在会话创建时通过 `session.prompt()` 注入，使用 `noReply: true`
  - 明确告诉模型 using-superpowers 已加载，以防止冗余技能加载
  - 将引导内容生成合并到共享的 `getBootstrapContent()` 辅助函数中
  - 更简洁的单一实现方法（移除了回退模式）

---

## v3.5.0 (2025-11-23)

### 新增

- **OpenCode 支持**：OpenCode.ai 的原生 JavaScript 插件
  - 自定义工具：`use_skill` 和 `find_skills`
  - 消息插入模式，用于跨上下文压缩的技能持久性
  - 通过 chat.message 钩子自动注入上下文
  - 在 session.compacted 事件时自动重新注入
  - 三级技能优先级：项目 > 个人 > superpowers
  - 项目本地技能支持（`.opencode/skills/`）
  - 共享核心模块（`lib/skills-core.js`）用于与 Codex 复用代码
  - 具有适当隔离的自动化测试套件（`tests/opencode/`）
  - 平台特定文档（`docs/README.opencode.md`、`docs/README.codex.md`）

### 更改

- **重构 Codex 实现**：现在使用共享的 `lib/skills-core.js` ES 模块

  - 消除了 Codex 和 OpenCode 之间的代码重复
  - 技能发现和解析的单一事实来源
  - Codex 通过 Node.js 互操作成功加载 ES 模块
- **改进文档**：重写 README 以清楚解释问题/解决方案

  - 删除了重复部分和冲突信息
  - 添加了完整的工作流程描述（头脑风暴 → 计划 → 执行 → 完成）
  - 简化了平台安装说明
  - 强调技能检查协议而非自动激活声明

---

## v3.4.1 (2025-10-31)

### 改进

- 优化 superpowers 引导以消除冗余技能执行。`using-superpowers` 技能内容现在直接在会话上下文中提供，并有明确指导仅对其他技能使用 Skill 工具。这减少了开销并防止了代理在会话开始时已有内容的情况下手动执行 `using-superpowers` 的混乱循环。

## v3.4.0 (2025-10-30)

### 改进

- 简化 `brainstorming` 技能以回归原始对话愿景。移除了带有正式检查清单的重量级 6 阶段流程，转而采用自然对话：一次问一个问题，然后以 200-300 字的部分呈现设计并进行验证。保留了文档和实现交接功能。

## v3.3.1 (2025-10-28)

### 改进

- 更新 `brainstorming` 技能，要求在提问前进行自主侦察，鼓励推荐驱动的决策，并防止代理将优先级决策推回给人类。
- 按照 Strunk 的《风格的要素》原则对 `brainstorming` 技能应用写作清晰度改进（省略不必要的词语，将否定形式转换为肯定形式，改进并列结构）。

### 错误修复

- 澄清 `writing-skills` 指南，使其指向正确的代理特定个人技能目录（Claude Code 为 `~/.claude/skills`，Codex 为 `~/.codex/skills`）。

## v3.3.0 (2025-10-28)

### 新功能

**实验性 Codex 支持**

- 添加了带有 bootstrap/use-skill/find-skills 命令的统一 `superpowers-codex` 脚本
- 跨平台 Node.js 实现（适用于 Windows、macOS、Linux）
- 命名空间技能：superpowers 技能用 `superpowers:skill-name`，个人技能用 `skill-name`
- 名称匹配时个人技能覆盖 superpowers 技能
- 干净的技能显示：显示名称/描述而不显示原始 frontmatter
- 有用的上下文：显示每个技能的支持文件目录
- Codex 的工具映射：TodoWrite→update_plan，subagents→手动回退等
- 带有最小 AGENTS.md 的引导集成用于自动启动
- 专门针对 Codex 的完整安装指南和引导说明

**与 Claude Code 集成的主要区别：**

- 单一统一脚本而非单独工具
- Codex 特定等效项的工具替换系统
- 简化的子代理处理（手动工作而非委托）
- 更新的术语："Superpowers 技能"而非"核心技能"

### 添加的文件

- `.codex/INSTALL.md` - Codex 用户的安装指南
- `.codex/superpowers-bootstrap.md` - 带有 Codex 适配的引导说明
- `.codex/superpowers-codex` - 具有所有功能的统一 Node.js 可执行文件

**注意：** Codex 支持是实验性的。该集成提供核心 superpowers 功能，但可能需要根据用户反馈进行改进。

## v3.2.3 (2025-10-23)

### 改进

**更新 using-superpowers 技能以使用 Skill 工具而非 Read 工具**

- 将技能调用说明从 Read 工具改为 Skill 工具
- 更新描述："using Read tool" → "using Skill tool"
- 更新步骤 3："Use the Read tool" → "Use the Skill tool to read and run"
- 更新合理化列表："Read the current version" → "Run the current version"

Skill 工具是在 Claude Code 中调用技能的正确机制。此更新纠正了引导说明，引导代理使用正确的工具。

### 更改的文件

- 更新：`skills/using-superpowers/SKILL.md` - 将工具引用从 Read 改为 Skill

## v3.2.2 (2025-10-21)

### 改进

**加强 using-superpowers 技能以对抗代理合理化**

- 添加了带有关于强制技能检查的绝对语言的 EXTREMELY-IMPORTANT 块
  - "如果技能适用的可能性哪怕只有 1%，你必须阅读它"
  - "你没有选择。你无法合理化逃避。"
- 添加了强制首次响应协议检查清单
  - 代理在任何响应之前必须完成的 5 步流程
  - 明确的"不这样做响应 = 失败"后果
- 添加了常见合理化部分，包含 8 种具体逃避模式
  - "这只是一个简单问题" → 错误
  - "我可以快速检查文件" → 错误
  - "让我先收集信息" → 错误
  - 以及在代理行为中观察到的另外 5 种常见模式

这些更改解决了观察到的代理行为，即尽管有明确的说明，他们还是会围绕技能使用进行合理化。强硬的语言和预防性的反驳论点旨在使不合规变得更加困难。

### 更改的文件

- 更新：`skills/using-superpowers/SKILL.md` - 添加了三层执行以防止跳过技能的合理化

## v3.2.1 (2025-10-20)

### 新功能

**代码审查员代理现在包含在插件中**

- 在插件的 `agents/` 目录中添加了 `superpowers:code-reviewer` 代理
- 代理根据计划和编码标准提供系统的代码审查
- 之前需要用户有个人代理配置
- 所有技能引用已更新为使用命名空间的 `superpowers:code-reviewer`
- 修复 #55

### 更改的文件

- 新增：`agents/code-reviewer.md` - 带有审查检查清单和输出格式的代理定义
- 更新：`skills/requesting-code-review/SKILL.md` - 引用 `superpowers:code-reviewer`
- 更新：`skills/subagent-driven-development/SKILL.md` - 引用 `superpowers:code-reviewer`

## v3.2.0 (2025-10-18)

### 新功能

**头脑风暴工作流程中的设计文档**

- 在 brainstorming 技能中添加了第 4 阶段：设计文档
- 设计文档现在在实现之前写入 `docs/plans/YYYY-MM-DD-<topic>-design.md`
- 恢复了在技能转换期间丢失的原始 brainstorming 命令的功能
- 文档在 worktree 设置和实现计划之前编写
- 使用子代理测试以验证在时间压力下的合规性

### 破坏性更改

**技能引用命名空间标准化**

- 所有内部技能引用现在使用 `superpowers:` 命名空间前缀
- 更新格式：`superpowers:test-driven-development`（之前只是 `test-driven-development`）
- 影响所有 REQUIRED SUB-SKILL、RECOMMENDED SUB-SKILL 和 REQUIRED BACKGROUND 引用
- 与使用 Skill 工具调用技能的方式保持一致
- 更新的文件：brainstorming、executing-plans、subagent-driven-development、systematic-debugging、testing-skills-with-subagents、writing-plans、writing-skills

### 改进

**设计与实现计划命名**

- 设计文档使用 `-design.md` 后缀以防止文件名冲突
- 实现计划继续使用现有的 `YYYY-MM-DD-<feature-name>.md` 格式
- 两者都存储在 `docs/plans/` 目录中，命名区分明确

## v3.1.1 (2025-10-17)

### 错误修复

- **修复 README 中的命令语法** (#44) - 更新所有命令引用以使用正确的命名空间语法（`/superpowers:brainstorm` 而非 `/brainstorm`）。插件提供的命令由 Claude Code 自动命名空间化以避免插件之间的冲突。

## v3.1.0 (2025-10-17)

### 破坏性更改

**技能名称标准化为小写**

- 所有技能 frontmatter `name:` 字段现在使用与目录名称匹配的小写 kebab-case
- 示例：`brainstorming`、`test-driven-development`、`using-git-worktrees`
- 所有技能公告和交叉引用已更新为小写格式
- 这确保了目录名称、frontmatter 和文档之间的命名一致性

### 新功能

**增强的头脑风暴技能**

- 添加了显示阶段、活动和工具使用的快速参考表
- 添加了用于跟踪进度的可复制工作流程检查清单
- 添加了何时重新访问早期阶段的决策流程图
- 添加了带有具体示例的全面 AskUserQuestion 工具指南
- 添加了"问题模式"部分，解释何时使用结构化问题与开放式问题
- 将关键原则重构为可扫描表格

**Anthropic 最佳实践集成**

- 添加了 `skills/writing-skills/anthropic-best-practices.md` - 官方 Anthropic 技能编写指南
- 在 writing-skills SKILL.md 中引用以获得全面指导
- 提供了渐进式披露、工作流程和评估的模式

### 改进

**技能交叉引用清晰度**

- 所有技能引用现在使用明确的需求标记：
  - `**REQUIRED BACKGROUND:**` - 你必须理解的前置条件
  - `**REQUIRED SUB-SKILL:**` - 必须在工作流程中使用的技能
  - `**Complementary skills:**` - 可选但有帮助的相关技能
- 移除了旧的路径格式（`skills/collaboration/X` → 只是 `X`）
- 更新了集成部分，带有分类关系（必需 vs 补充）
- 更新了交叉引用文档的最佳实践

**与 Anthropic 最佳实践对齐**

- 修复了描述语法和语态（完全第三人称）
- 添加了用于扫描的快速参考表
- 添加了 Claude 可以复制和跟踪的工作流程检查清单
- 适当使用流程图处理非显而易见的决策点
- 改进了可扫描的表格格式
- 所有技能都在 500 行建议之下

### 错误修复

- **重新添加缺失的命令重定向** - 恢复了在 v3.0 迁移中意外删除的 `commands/brainstorm.md` 和 `commands/write-plan.md`
- 修复了 `defense-in-depth` 名称不匹配（原为 `Defense-in-Depth-Validation`）
- 修复了 `receiving-code-review` 名称不匹配（原为 `Code-Review-Reception`）
- 修复了 `commands/brainstorm.md` 对正确技能名称的引用
- 移除了对不存在的相关技能的引用

### 文档

**writing-skills 改进**

- 更新了带有明确需求标记的交叉引用指南
- 添加了对 Anthropic 官方最佳实践的引用
- 改进了显示正确技能引用格式的示例

## v3.0.1 (2025-10-16)

### 更改

我们现在使用 Anthropic 的第一方技能系统！

## v2.0.2 (2025-10-12)

### 错误修复

- **修复了本地技能仓库领先于上游时的错误警告** - 当本地仓库有领先于上游的提交时，初始化脚本错误地警告"来自上游的新技能可用"。逻辑现在正确区分三种 git 状态：本地落后（应该更新）、本地领先（不警告）和分歧（应该警告）。

## v2.0.1 (2025-10-12)

### 错误修复

- **修复了插件上下文中的 session-start 钩子执行** (#8, PR #9) - 钩子静默失败并显示"Plugin hook error"，阻止技能上下文加载。修复方法：
  - 当 BASH_SOURCE 在 Claude Code 的执行上下文中未绑定时使用 `${BASH_SOURCE[0]:-$0}` 回退
  - 添加 `|| true` 以在过滤状态标志时优雅处理空 grep 结果

---

# Superpowers v2.0.0 发布说明

## 概述

Superpowers v2.0 通过重大架构转变使技能更易访问、更易维护且更具社区驱动性。

标题性变化是 **技能仓库分离**：所有技能、脚本和文档已从插件移至专用仓库（[obra/superpowers-skills](https://github.com/obra/superpowers-skills)）。这将 superpowers 从单体插件转变为管理技能仓库本地克隆的轻量级垫片。技能在会话开始时自动更新。用户通过标准 git 工作流程 fork 和贡献改进。技能库独立于插件进行版本控制。

除了基础设施之外，此版本添加了九个专注于问题解决、研究和架构的新技能。我们用命令式语气和更清晰的结构重写了核心 **using-skills** 文档，使 Claude 更容易理解何时以及如何使用技能。**find-skills** 现在输出可以直接粘贴到 Read 工具中的路径，消除了技能发现工作流程中的摩擦。

用户体验无缝操作：插件自动处理克隆、fork 和更新。贡献者发现新架构使改进和共享技能变得微不足道。此版本为技能作为社区资源快速发展奠定了基础。

## 破坏性更改

### 技能仓库分离

**最大的变化：** 技能不再存在于插件中。它们已移至 [obra/superpowers-skills](https://github.com/obra/superpowers-skills) 的单独仓库。

**这对你意味着什么：**

- **首次安装：** 插件自动将技能克隆到 `~/.config/superpowers/skills/`
- **Fork：** 在设置期间，如果安装了 `gh`，你将被提供 fork 技能仓库的选项
- **更新：** 技能在会话开始时自动更新（可能时快进）
- **贡献：** 在分支上工作，本地提交，向上游提交 PR
- **不再有 shadowing：** 旧的两层系统（个人/核心）被单一仓库分支工作流程替代

**迁移：**

如果你有现有安装：

1. 你旧的 `~/.config/superpowers/.git` 将被备份到 `~/.config/superpowers/.git.bak`
2. 旧技能将被备份到 `~/.config/superpowers/skills.bak`
3. obra/superpowers-skills 的新克隆将在 `~/.config/superpowers/skills/` 创建

### 移除的功能

- **个人 superpowers 覆盖系统** - 被 git 分支工作流程替代
- **setup-personal-superpowers 钩子** - 被 initialize-skills.sh 替代

## 新功能

### 技能仓库基础设施

**自动克隆和设置**（`lib/initialize-skills.sh`）

- 首次运行时克隆 obra/superpowers-skills
- 如果安装了 GitHub CLI，提供 fork 创建选项
- 正确设置 upstream/origin 远程
- 处理从旧安装的迁移

**自动更新**

- 每次会话开始时从跟踪远程获取
- 可能时使用快进自动合并
- 需要手动同步时通知（分支分歧）
- 使用 pulling-updates-from-skills-repository 技能进行手动同步

### 新技能

**问题解决技能**（`skills/problem-solving/`）

- **collision-zone-thinking** - 强制不相关概念碰撞以获得涌现洞察
- **inversion-exercise** - 翻转假设以揭示隐藏约束
- **meta-pattern-recognition** - 发现跨领域的通用原则
- **scale-game** - 在极端情况下测试以暴露根本真理
- **simplification-cascades** - 找到消除多个组件的洞察
- **when-stuck** - 分派到正确的问题解决技术

**研究技能**（`skills/research/`）

- **tracing-knowledge-lineages** - 理解想法如何随时间演变

**架构技能**（`skills/architecture/`）

- **preserving-productive-tensions** - 保持多个有效方法而不是强制过早解决

### 技能改进

**using-skills（原 getting-started）**

- 从 getting-started 重命名为 using-skills
- 使用命令式语气完全重写（v4.0.0）
- 前置关键规则
- 为所有工作流程添加了"为什么"解释
- 在引用中始终包含 /SKILL.md 后缀
- 更清晰地区分刚性规则和灵活模式

**writing-skills**

- 交叉引用指南从 using-skills 移出
- 添加了 token 效率部分（字数目标）
- 改进了 CSO（Claude 搜索优化）指南

**sharing-skills**

- 为新的分支和 PR 工作流程更新（v2.0.0）
- 移除了个人/核心拆分引用

**pulling-updates-from-skills-repository**（新）

- 与上游同步的完整工作流程
- 替代旧的"updating-skills"技能

### 工具改进

**find-skills**

- 现在输出带有 /SKILL.md 后缀的完整路径
- 使路径可直接与 Read 工具一起使用
- 更新了帮助文本

**skill-run**

- 从 scripts/ 移至 skills/using-skills/
- 改进了文档

### 插件基础设施

**会话开始钩子**

- 现在从技能仓库位置加载
- 在会话开始时显示完整技能列表
- 打印技能位置信息
- 显示更新状态（更新成功/落后于上游）
- 将"技能落后"警告移至输出末尾

**环境变量**

- `SUPERPOWERS_SKILLS_ROOT` 设置为 `~/.config/superpowers/skills`
- 在所有路径中一致使用

## 错误修复

- 修复了 fork 时重复添加 upstream 远程的问题
- 修复了 find-skills 输出中双重"skills/"前缀的问题
- 从 session-start 中移除了过时的 setup-personal-superpowers 调用
- 修复了钩子和命令中的路径引用

## 文档

### README

- 为新的技能仓库架构更新
- 突出显示到 superpowers-skills 仓库的链接
- 更新了自动更新描述
- 修复了技能名称和引用
- 更新了 Meta 技能列表

### 测试文档

- 添加了全面的测试检查清单（`docs/TESTING-CHECKLIST.md`）
- 创建了用于测试的本地 marketplace 配置
- 记录了手动测试场景

## 技术细节

### 文件更改

**添加：**

- `lib/initialize-skills.sh` - 技能仓库初始化和自动更新
- `docs/TESTING-CHECKLIST.md` - 手动测试场景
- `.claude-plugin/marketplace.json` - 本地测试配置

**移除：**

- `skills/` 目录（82 个文件）- 现在在 obra/superpowers-skills 中
- `scripts/` 目录 - 现在在 obra/superpowers-skills/skills/using-skills/ 中
- `hooks/setup-personal-superpowers.sh` - 过时

**修改：**

- `hooks/session-start.sh` - 从 ~/.config/superpowers/skills 使用技能
- `commands/brainstorm.md` - 更新路径为 SUPERPOWERS_SKILLS_ROOT
- `commands/write-plan.md` - 更新路径为 SUPERPOWERS_SKILLS_ROOT
- `commands/execute-plan.md` - 更新路径为 SUPERPOWERS_SKILLS_ROOT
- `README.md` - 为新架构完全重写

### 提交历史

此版本包括：

- 20+ 个技能仓库分离的提交
- PR #1：受 Amplifier 启发的问题解决和研究技能
- PR #2：个人 superpowers 覆盖系统（后来被替换）
- 多个技能改进和文档改进

## 升级说明

### 全新安装

```bash
# 在 Claude Code 中
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

插件会自动处理一切。

### 从 v1.x 升级

1. **备份你的个人技能**（如果有的话）：

   ```bash
   cp -r ~/.config/superpowers/skills ~/superpowers-skills-backup
   ```
2. **更新插件：**

   ```bash
   /plugin update superpowers
   ```
3. **在下次会话开始时：**

   - 旧安装将自动备份
   - 新的技能仓库将被克隆
   - 如果你有 GitHub CLI，你将被提供 fork 的选项
4. **迁移个人技能**（如果有的话）：

   - 在你的本地技能仓库中创建一个分支
   - 从备份复制你的个人技能
   - 提交并推送到你的 fork
   - 考虑通过 PR 贡献回社区

## 下一步

### 对于用户

- 探索新的问题解决技能
- 尝试基于分支的技能改进工作流程
- 将技能贡献回社区

### 对于贡献者

- 技能仓库现在在 https://github.com/obra/superpowers-skills
- Fork → 分支 → PR 工作流程
- 参见 skills/meta/writing-skills/SKILL.md 了解文档的 TDD 方法

## 已知问题

目前没有。

## 致谢

- 问题解决技能受 Amplifier 模式启发
- 社区贡献和反馈
- 对技能有效性的广泛测试和迭代

---

**完整更新日志：** https://github.com/obra/superpowers/compare/dd013f6...main
**技能仓库：** https://github.com/obra/superpowers-skills
**问题：** https://github.com/obra/superpowers/issues
