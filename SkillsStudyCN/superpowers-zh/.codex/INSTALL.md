# 为 Codex 安装 Superpowers

快速设置以在 Codex 中启用 superpowers 技能。

## 安装

1. **克隆 superpowers 仓库**：
   ```bash
   mkdir -p ~/.codex/superpowers
   cd ~/.codex/superpowers
   git clone https://github.com/obra/superpowers.git .
   ```

2. **创建个人技能目录**：
   ```bash
   mkdir -p ~/.codex/skills
   ```

3. **更新 ~/.codex/AGENTS.md** 以包含此 superpowers 部分：
   ```markdown
   ## Superpowers 系统

   <EXTREMELY_IMPORTANT>
   你拥有超能力。Superpowers 教会你新的技能和能力。立即运行：`~/.codex/superpowers/.codex/superpowers-codex bootstrap` 并按照返回的说明操作。
   </EXTREMELY_IMPORTANT>
   ```

## 验证

测试安装：
```bash
~/.codex/superpowers/.codex/superpowers-codex bootstrap
```

你应该会看到技能列表和引导说明。系统现在可以使用了。
