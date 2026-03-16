# 代码质量审查者提示词模板

分派代码质量审查者子代理时使用此模板。

**目的：** 验证实现质量良好（整洁、经过测试、可维护）

**仅在规格符合性审查通过后分派。**

```
Task tool (superpowers:code-reviewer):
  使用 requesting-code-review/code-reviewer.md 中的模板

  WHAT_WAS_IMPLEMENTED: [来自实现者的报告]
  PLAN_OR_REQUIREMENTS: [计划文件] 中的任务 N
  BASE_SHA: [任务之前的提交]
  HEAD_SHA: [当前提交]
  DESCRIPTION: [任务摘要]
```

**代码审查者返回：** 优点、问题（关键/重要/次要）、评估
