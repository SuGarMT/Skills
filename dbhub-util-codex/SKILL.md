---
name: dbhub-util-codex
description: Use when user provides database connection info (JDBC URL, Spring Boot datasource config, DSN, or database key-value pairs) and wants to configure project-local DBHub MCP for Codex. This skill generates dbhub.toml and creates or updates the project .codex/config.toml to set up a database MCP with dbhub.
---
# MT DBHub Util (Codex)

## Overview

解析用户提供的数据库连接信息，并为当前项目生成可直接使用的 DBHub 配置，集成到 Codex 的 MCP 体系中。

核心原则：

- DBHub 使用 `@bytebase/dbhub@latest`
- TOML 顶层结构必须是 `[[sources]]`
- `dbhub.toml` 必须写到 `<project>/.codex/dbhub.toml`
- MCP 配置必须写到 `<project>/.codex/config.toml`
- MCP 服务名固定为 `dbhub`

## Supported Inputs

### JDBC URL

```text
jdbc:mysql://host:port/database?params
```

规则：

- 忽略 `?` 后的参数
- 从 `jdbc:mysql`、`jdbc:postgresql`、`jdbc:oracle:thin:@`、`jdbc:sqlserver` 推断 `type`

### Spring Boot Datasource Config

```yaml
driver-class-name: com.mysql.cj.jdbc.Driver
url: jdbc:mysql://host:port/database
username: root
password: secret
```

### Standard DSN

```text
mysql://user:password@host:port/database
```

### Key-value Pairs

```yaml
host: 127.0.0.1
port: 3306
database: mydb
user: root
password: secret
type: mysql
```

## Field Mapping

- `username` -> `user`
- `driver` -> `type`
- `driver-class-name` -> infer `type`

## Resolution Priority

字段优先级：

- 显式 key-value 字段
- Spring Boot 独立字段
- JDBC / DSN 推断字段

冲突处理：

- 如果显式 `type`、`driver-class-name`、JDBC 前缀之间互相冲突，不要猜测，不要落盘，先指出冲突并请求用户确认
- 如果输入格式无法可靠解析，不要猜测，不要写文件，先请求用户补充或确认

## Source ID Rules

- 如果用户显式提供 `id`，优先使用该值
- 否则优先使用 `database` 作为 `id`
- 如果 `database` 也缺失，则使用稳定兜底值：`<host>-<port>-<type>`
- `id` 必须稳定可复用，不要每次随机生成

## Type Inference

| 来源                         | 推断类型       |
| ---------------------------- | -------------- |
| `jdbc:mysql://`            | `mysql`      |
| `jdbc:postgresql://`       | `postgresql` |
| `jdbc:oracle:thin:@`       | `oracle`     |
| `jdbc:sqlserver://`        | `sqlserver`  |
| `com.mysql.cj.jdbc.Driver` | `mysql`      |
| `org.postgresql.Driver`    | `postgresql` |

## Default Ports

| type           | 默认端口 |
| -------------- | -------- |
| `mysql`      | `3306` |
| `postgresql` | `5432` |
| `sqlserver`  | `1433` |
| `oracle`     | `1521` |

## Required Outputs

### 1. Project-local dbhub.toml

写入路径：`<project>/.codex/dbhub.toml`

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

最小必填字段：

- `id`
- `type`
- `host`
- `port`
- `database`
- `user`
- `password`
- `read_only`

默认规则：

- 如果用户未指定 `read_only`，默认写入 `false`
- 只有当用户明确要求只读连接时，才写入 `true`

更新规则：

- 如果 `dbhub.toml` 不存在，则创建新文件
- 如果已存在且已有相同 `id` 的 `[[sources]]`，更新该 source
- 如果已存在但没有相同 `id` 的 `[[sources]]`，追加新的 source
- 非目标 `[[sources]]` 不要删除

### 2. Project-local .codex/config.toml

写入路径：`<project>/.codex/config.toml`

Codex 使用 TOML 格式配置 MCP 服务器，每个服务器用 `[mcp_servers.<name>]` 表头声明：

```toml
[mcp_servers.dbhub]
type = "stdio"
command = "npx"
args = ["-y", "@bytebase/dbhub@latest", "--config", "<absolute-project-path>/.codex/dbhub.toml"]
```

要求：

- 服务名必须是 `dbhub`（即 `[mcp_servers.dbhub]`）
- 必须包含 `type = "stdio"`
- `--config` 必须显式指向当前项目的绝对路径
- 如果 `.codex/config.toml` 已存在，保留其他配置项（包括其他 `[mcp_servers.*]`、`[projects.*]` 等），仅补充或更新 `[mcp_servers.dbhub]` 部分
- 不要修改或删除全局 `~/.codex/config.toml`

### Codex 配置格式对照（与 Claude 的区别）

| 项目            | Claude                               | Codex                                   |
| --------------- | ------------------------------------ | --------------------------------------- |
| MCP 配置文件    | `<project>/.mcp.json` (JSON)       | `<project>/.codex/config.toml` (TOML) |
| dbhub.toml 位置 | `<project>/.claude/dbhub.toml`     | `<project>/.codex/dbhub.toml`         |
| 服务声明方式    | `"mcpServers": { "dbhub": {...} }` | `[mcp_servers.dbhub]`                 |
| 额外必填字段    | 无                                   | `type = "stdio"`                      |

## Execution Flow

1. 解析用户输入，提取 `type/host/port/database/user/password`
2. 缺失必要字段时，先指出缺失项，再请求补充
3. 如果输入格式无法可靠解析，先请求用户确认，不要猜测写文件
4. 如果 `type`、`driver-class-name`、JDBC 前缀之间存在冲突，先指出冲突并等待确认，不要落盘
5. 确认当前项目根目录
6. 若 `<project>/.codex/` 不存在，先创建目录
7. 生成或更新 `<project>/.codex/dbhub.toml`
8. 生成或更新 `<project>/.codex/config.toml`（仅修改 `[mcp_servers.dbhub]` 部分）
9. 明确反馈最终写入路径和关键字段
10. 提示用户：Codex 需要信任该项目才能加载项目级配置，可用 `/mcp` 命令检查是否加载成功

## Common Mistakes

| 错误                                   | 正确                                    |
| -------------------------------------- | --------------------------------------- |
| `@anthropic/dbhub`                   | `@bytebase/dbhub@latest`              |
| `[databases.xxx]`                    | `[[sources]]`                         |
| `username`                           | `user`                                |
| `driver`                             | `type`                                |
| 写到 `~/.codex/config.toml` 全局配置 | `<project>/.codex/config.toml` 项目级 |
| `mcpServers` (JSON 格式)             | `[mcp_servers.dbhub]` (TOML 格式)     |
| 漏掉 `type = "stdio"`                | 必须包含 `type = "stdio"`             |
| 服务名写成 `dbutil`                  | 服务名固定为 `dbhub`                  |

## Never Do

- 不要把 `dbhub.toml` 写到全局路径（如 `/Users/MT/.agents/dbhub.toml` 或 `~/.codex/`）
- 不要修改全局 `~/.codex/config.toml`
- 不要使用旧包名 `@anthropic/dbhub`
- 不要使用错误 TOML 结构 `[databases.xxx]`
- 不要把服务名写成 `dbutil`
- 不要使用 JSON 格式的 `.mcp.json`（那是 Claude 的格式）
- 不要遗漏 `type = "stdio"` 字段

## Final Response Requirements

完成后必须告诉用户：

- 解析出的 `type`
- 解析出的 `host/port/database/user`
- `dbhub.toml` 实际写入路径
- `.codex/config.toml` 实际写入路径
- MCP 服务名为 `dbhub`
- 提醒：如果 Codex 未信任该项目，需在 Codex 中确认信任后项目级配置才会生效；可用 `/mcp` 命令验证加载状态
