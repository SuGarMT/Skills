---
name: MT-git-skip
description: Use when needing to modify config files (bootstrap.yml, vue.config.js) for local development without Git tracking the changes
---

# Git Skip - 忽略配置文件的本地改动

## Overview

使用 `git update-index --skip-worktree` 标记文件，使本地修改不出现在 `git status` 中。

## 使用场景

- 本地修改 `bootstrap.yml` 连接开发数据库
- 本地修改 `vue.config.js` 代理地址
- 任何需要本地修改但不想提交的配置文件

## 配置文件

在项目根目录创建 `.git-skip` 文件：

```
# 后端配置
fujen-auth/src/main/resources/bootstrap.yml
fujen-gateway/src/main/resources/bootstrap.yml

# 前端配置
admin-ui/vue.config.js
school-ui/vue.config.js
```

## 命令

```bash
# 启用忽略
git ls-files | xargs -I {} sh -c 'grep -qx "{}" .git-skip && git update-index --skip-worktree "{}"'

# 取消忽略
git ls-files | xargs -I {} sh -c 'grep -qx "{}" .git-skip && git update-index --no-skip-worktree "{}"'

# 查看被忽略的文件
git ls-files -v | grep '^S'
```

## 注意事项

- 只对已被 Git 管理的文件有效
- `git pull` 有冲突时需先取消忽略
- 每个 Git 仓库需单独配置 `.git-skip`