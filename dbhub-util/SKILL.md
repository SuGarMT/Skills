---
name: dbhub-util
description: Use when user provides database connection info (JDBC URL, Spring Boot datasource config, DSN, or database key-value pairs) and wants to configure project-local DBHub MCP for Claude, Codex, or Antigravity. This skill detects the user's current environment, generates dbhub.toml at the project root, and configures the corresponding project-local MCP server definition. Make sure to use this skill whenever the user mentions configuring databases, setting up project-local DBHub, or connecting databases using MCP in Claude, Codex, or Antigravity, even if they don't explicitly name 'dbhub-util'.
---
# MT DBHub Util (Multi-Environment)

## Overview

解析用户提供的数据库连接信息，并为当前项目生成可直接使用的 DBHub 配置。本技能为通用版本，能自动识别并提取不同 AI 编码助手环境（Claude Code、Codex、Antigravity）的差异，并合并适配到各自的项目级配置文件中。

核心原则：

- DBHub 使用 `@bytebase/dbhub@latest`
- TOML 顶层结构必须是 `[[sources]]`
- `dbhub.toml` 必须写到项目根目录下的 `<project>/dbhub.toml`
- MCP 服务名固定为 `dbhub`
- 智能检测并区分不同的开发环境，将 MCP 注册表写入正确的目标文件路径，且其中引用的 `dbhub.toml` 使用绝对路径。

---

## 环境识别与适配规则

在执行落盘前，必须通过以下优先级策略判断当前所处的开发环境（Claude、Codex 或 Antigravity）：

1. **用户显式指示优先**：如果用户明确指出“用于 Codex”、“配置 Claude 的项目级 MCP”等，直接使用该环境规则。
2. **特征目录检测**：
   - 若项目根目录下已存在 `.agents/` 目录，优先使用 **Antigravity** 规则。
   - 若项目根目录下已存在 `.claude/` 目录，优先使用 **Claude** 规则。
   - 若项目根目录下已存在 `.codex/` 目录，优先使用 **Codex** 规则。
3. **正在运行的 Agent 识别**：
   - 如果当前执行任务的智能体是 Antigravity，默认选用 **Antigravity** 规则。
   - 如果是 Claude Code，默认选用 **Claude** 规则。
   - 如果是 Codex，默认选用 **Codex** 规则。
4. **询问兜底**：若上述检测均不确定且有冲突，不要猜测写文件，先指出冲突并请求用户确认。

### 环境配置差异对照表

| 环境 | 数据库配置路径 `dbhub.toml` | 项目级 MCP 注册文件路径 | 注册文件格式 | 注册服务声明方式 | 额外必须字段 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Claude** | `<project>/dbhub.toml` | `<project>/.mcp.json` | **JSON** | `"mcpServers": { "dbhub": {...} }` | 无 |
| **Codex** | `<project>/dbhub.toml` | `<project>/.codex/config.toml` | **TOML** | `[mcp_servers.dbhub]` | `type = "stdio"` |
| **Antigravity** | `<project>/dbhub.toml` | `<project>/.agents/mcp_config.json` | **JSON** | `"mcpServers": { "dbhub": {...} }` | 无 |

---

## 支持的输入格式

### JDBC URL
```text
jdbc:mysql://host:port/database?params
```
*规则：忽略 `?` 后的参数。从 `jdbc:mysql`、`jdbc:postgresql`、`jdbc:oracle:thin:@`、`jdbc:sqlserver` 推断 `type`。*

### Spring Boot Datasource 配置
```yaml
driver-class-name: com.mysql.cj.jdbc.Driver
url: jdbc:mysql://host:port/database
username: root
password: secret
```

### 标准 DSN
```text
mysql://user:password@host:port/database
```

### 独立键值对 (Key-Value)
```yaml
host: 127.0.0.1
port: 3306
database: mydb
user: root
password: secret
type: mysql
```

---

## 参数映射与计算规则

* **字段映射**：
  - `username` -> `user`
  - `driver` -> `type`
  - `driver-class-name` -> 推断 `type`
* **字段优先级**：
  - 显式 key-value 字段 > Spring Boot 独立字段 > JDBC / DSN 推断字段。
  - 冲突时或格式无法解析时，不要猜测，不要写文件，先指出并请求用户确认。
* **数据源 ID (Source ID) 生成**：
  - 若用户显式提供 `id`，优先使用。
  - 否则优先使用 `database` 作为 `id`。
  - 均缺失时，使用稳定兜底值：`<host>-<port>-<type>`（不要随机生成，需稳定可复用）。
* **类型推断**：
  - `jdbc:mysql://` / `com.mysql.cj.jdbc.Driver` -> `mysql`
  - `jdbc:postgresql://` / `org.postgresql.Driver` -> `postgresql`
  - `jdbc:oracle:thin:@` -> `oracle`
  - `jdbc:sqlserver://` -> `sqlserver`
* **默认端口**：
  - `mysql`: `3306` | `postgresql`: `5432` | `sqlserver`: `1433` | `oracle`: `1521`

---

## 各环境输出模板要求

### 1. 数据库数据源配置 (`dbhub.toml`)
统一写入项目根目录路径：`<project>/dbhub.toml`。

```toml
[[sources]]
id = "mydb"
type = "mysql"
host = "127.0.0.1"
port = 3306
database = "mydb"
user = "root"
password = "secret"
read_only = false
```
* **`read_only` 规则**：默认为 `false`。只有当用户明确要求只读连接时，才写入 `true`。
* **更新规则**：文件不存在则创建。若已存在，则根据相同 `id` 更新已有的 `[[sources]]`，或在末尾追加新的 `[[sources]]`，非目标 `[[sources]]` 严禁删除。

### 2. 项目级 MCP 服务器配置

#### A. Claude 模式 (写入 `<project>/.mcp.json`)
```json
{
  "mcpServers": {
    "dbhub": {
      "command": "npx",
      "args": [
        "-y",
        "@bytebase/dbhub@latest",
        "--config",
        "<absolute-project-path>/dbhub.toml"
      ]
    }
  }
}
```

#### B. Codex 模式 (写入 `<project>/.codex/config.toml`)
```toml
[mcp_servers.dbhub]
type = "stdio"
command = "npx"
args = ["-y", "@bytebase/dbhub@latest", "--config", "<absolute-project-path>/dbhub.toml"]
```

#### C. Antigravity 模式 (写入 `<project>/.agents/mcp_config.json`)
```json
{
  "mcpServers": {
    "dbhub": {
      "command": "npx",
      "args": [
        "-y",
        "@bytebase/dbhub@latest",
        "--config",
        "<absolute-project-path>/dbhub.toml"
      ]
    }
  }
}
```

* **重要细节**：
  - 在修改现有的配置文件时，**只更新或追加 `dbhub` 服务节点**，保留原配置中的其他 MCP 服务设置。
  - `--config` 参数值**必须使用当前项目的绝对路径**，不支持使用类似 `${workspaceFolder}` 等相对变量。
  - 严禁擅自修改或删除全局的 MCP 配置文件（如 `~/.gemini/config/mcp_config.json` 或 `~/.claude/settings.json`）。

---

## 运行执行流

1. 解析用户输入的数据库配置，提取关键字段。若缺失必要字段或格式无法解析，指出问题并要求用户确认。
2. 通过上述环境判断方法，确定目标环境（Claude、Codex 或 Antigravity）。
3. 确认当前项目的根目录，检查并创建存放 MCP 注册文件的目标文件夹（如 `.claude/`、`.codex/` 或 `.agents/`）。
4. 在项目根目录下，生成或以增量形式更新 `dbhub.toml` 数据库配置文件。
5. 在对应路径下，生成或以增量形式更新项目级的 MCP 配置文件，将服务名注册为 `dbhub`。
6. 反馈给用户配置完成的信息，包含：
   - 识别出的目标环境模式。
   - 解析出的各项数据库配置字段。
   - 两个生成的配置文件的实际绝对写入路径。
   - 相应的服务信任和生效提醒。

---

## 常见错误防护

### 错误与正确做法对照表
| 错误做法 | 正确做法 |
| :--- | :--- |
| 使用旧包名 `@anthropic/dbhub` | 使用包名 `@bytebase/dbhub@latest` |
| 使用错误的 TOML 结构 `[databases.xxx]` | 使用 TOML 顶层结构 `[[sources]]` |
| 字段名错写为 `username` 或 `driver` | 使用映射名 `user` 和 `type` |
| `--config` 使用相对路径 | `--config` 必须配置绝对路径 |
| 混淆环境：例如在 Antigravity 中生成了 `.codex/config.toml` | 必须根据识别的环境写入对应的配置文件 |
| 误修改或覆盖了全局的 MCP 配置文件 | 只修改项目本地对应的配置文件 |
| 服务名写成 `dbutil` | 服务名固定为 `dbhub` |
| 写入 `.mcp.json` 替换了 Antigravity 配置 | Antigravity 必须写入 `.agents/mcp_config.json` |
| 将 `dbhub.toml` 写入到其他子配置目录 | 统一将 `dbhub.toml` 写入项目根目录 `<project>/dbhub.toml` |

### 严禁行为 (Never Do)
- 绝不要把 `dbhub.toml` 写入到全局路径。
- 绝不要混淆不同环境的配置文件名和格式（如把 TOML 配置写入 `.mcp.json`）。
- 绝不要在用户未授权或存在参数冲突时强行猜测写入。
- `--config` 参数值必须是绝对路径，不可使用相对路径。
- 不要将项目级配置写到 `.mcp.json` 中（除非是 Claude 环境）。
- 不要为 `dbhub.toml` 创建额外的子目录。

## Final Response Requirements

完成后必须告诉用户：

- 解析出的 `type`
- 解析出的 `host/port/database/user`
- `dbhub.toml` 实际写入路径（为当前项目根目录下 `<project>/dbhub.toml`）
- 项目级 MCP 注册文件实际写入路径
- 项目级 MCP 注册文件中加载的服务名为 `dbhub`
- 提醒：如果 Antigravity 未信任该项目，需在 IDE 中确认信任后项目级配置才会生效。
