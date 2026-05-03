---
description: 每次创建或修改 skill 时，同步更新项目根目录的 README.md 中的安装命令列表
globs: ["*/SKILL.md", "README.md"]
---

# Skill README 同步规则

每次在本项目中创建新 skill 或重命名已有 skill 后，必须在项目根目录的 `README.md` 中补充对应的安装命令。

## 安装命令格式

```
npx skills add SuGarMT/Skills@<skill-directory-name>
```

其中 `<skill-directory-name>` 是 skill 所在的目录名（即 `SKILL.md` 的父目录名）。

**示例：**

| Skill 目录 | 安装命令 |
|---|---|
| `karpathy-guidelines` | `npx skills add SuGarMT/Skills@karpathy-guidelines` |
| `dbhub-util-claude` | `npx skills add SuGarMT/Skills@dbhub-util-claude` |

## README.md 格式

在 `README.md` 中使用 `## Skills` 章节列出所有 skill，每个 skill 一行，包含名称、简要描述和安装命令。如果 `README.md` 不存在，则创建它。

```markdown
## Skills

| Skill | 描述 | 安装命令 |
|---|---|---|
| skill-name | 简要描述 | `npx skills add SuGarMT/Skills@skill-name` |
```

## 执行时机

- 创建新 skill 后
- 重命名 skill 目录后
- 删除 skill 后（从表格中移除对应行）
