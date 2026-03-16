---
name: using-superpowers
description: 在开始任何对话时使用 - 建立如何查找和使用技能，要求在任何响应（包括澄清问题）之前调用 Skill 工具
---

<EXTREMELY-IMPORTANT>
如果你认为某个技能哪怕只有 1% 的可能性适用于你正在做的事情，你绝对必须调用该技能。

如果某个技能适用于你的任务，你没有选择。你必须使用它。

这没有商量余地。这不是可选的。你不能为自己找借口逃避这一点。
</EXTREMELY-IMPORTANT>

## 如何访问技能

**在 Claude Code 中：** 使用 `Skill` 工具。当你调用一个技能时，其内容会被加载并呈现给你——直接遵循它。永远不要对技能文件使用 Read 工具。

**在其他环境中：** 查阅你平台的文档了解技能如何加载。

# 使用技能

## 规则

**在任何响应或操作之前调用相关或被请求的技能。** 即使只有 1% 的可能性某个技能可能适用，你也应该调用该技能进行检查。如果调用的技能最终不适合当前情况，你不需要使用它。

```dot
digraph skill_flow {
    "User message received" [shape=doublecircle];
    "Might any skill apply?" [shape=diamond];
    "Invoke Skill tool" [shape=box];
    "Announce: 'Using [skill] to [purpose]'" [shape=box];
    "Has checklist?" [shape=diamond];
    "Create TodoWrite todo per item" [shape=box];
    "Follow skill exactly" [shape=box];
    "Respond (including clarifications)" [shape=doublecircle];

    "User message received" -> "Might any skill apply?";
    "Might any skill apply?" -> "Invoke Skill tool" [label="yes, even 1%"];
    "Might any skill apply?" -> "Respond (including clarifications)" [label="definitely not"];
    "Invoke Skill tool" -> "Announce: 'Using [skill] to [purpose]'";
    "Announce: 'Using [skill] to [purpose]'" -> "Has checklist?";
    "Has checklist?" -> "Create TodoWrite todo per item" [label="yes"];
    "Has checklist?" -> "Follow skill exactly" [label="no"];
    "Create TodoWrite todo per item" -> "Follow skill exactly";
}
```

## 危险信号

这些想法意味着停止——你在找借口：

| 想法 | 现实 |
|------|------|
| "这只是一个简单的问题" | 问题就是任务。检查技能。 |
| "我需要先了解更多背景" | 技能检查在澄清问题之前。 |
| "让我先探索一下代码库" | 技能告诉你如何探索。先检查。 |
| "我可以快速检查 git/文件" | 文件缺乏对话上下文。检查技能。 |
| "让我先收集信息" | 技能告诉你如何收集信息。 |
| "这不需要正式的技能" | 如果存在技能，就使用它。 |
| "我记得这个技能" | 技能会演进。阅读当前版本。 |
| "这不算是任务" | 行动 = 任务。检查技能。 |
| "这个技能太过头了" | 简单的事情会变复杂。使用它。 |
| "我先做这一件事" | 在做任何事之前先检查。 |
| "这感觉很有效率" | 无纪律的行动浪费时间。技能可以防止这种情况。 |
| "我知道那是什么意思" | 知道概念 ≠ 使用技能。调用它。 |

## 技能优先级

当多个技能可能适用时，使用以下顺序：

1. **首先是流程技能**（brainstorming、debugging）- 这些决定如何处理任务
2. **其次是实现技能**（frontend-design、mcp-builder）- 这些指导执行

"让我们构建 X" → 先 brainstorming，然后是实现技能。
"修复这个 bug" → 先 debugging，然后是特定领域的技能。

## 技能类型

**严格型**（TDD、debugging）：严格遵循。不要因为适应而放弃纪律。

**灵活型**（patterns）：根据上下文调整原则。

技能本身会告诉你它是哪种类型。

## 用户指令

指令说明做什么，而不是怎么做。"添加 X"或"修复 Y"并不意味着跳过工作流程。
