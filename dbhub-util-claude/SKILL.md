---
name: dbhub-util-claude
description: Use when user provides JDBC URL, Spring Boot datasource config, DSN, or database key-value pairs and wants Claude Code to configure project-local DBHub files, generate dbhub.toml, create or update a project .mcp.json, or set up a project database MCP with dbhub.
---
# MT DBHub Util

## Overview

解析用户提供的数据库连接信息，并为当前项目生成可直接使用的 DBHub 配置。

核心原则：

- DBHub 使用 `@bytebase/dbhub@latest`
- TOML 顶层结构必须是 `[[sources]]`
- `dbhub.toml` 必须写到 `<project>/.claude/dbhub.toml`
- `.mcp.json` 必须写到 `<project>/.mcp.json`
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

写入路径：`<project>/.claude/dbhub.toml`

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

### 2. Project-local .mcp.json

写入路径：`<project>/.mcp.json`

```json
{
  "mcpServers": {
    "dbhub": {
      "command": "npx",
      "args": [
        "-y",
        "@bytebase/dbhub@latest",
        "--config",
        "<absolute-project-path>/.claude/dbhub.toml"
      ]
    }
  }
}
```

要求：

- 服务名必须是 `dbhub`
- `--config` 必须显式指向当前项目的绝对路径
- 如果 `.mcp.json` 已存在，保留其他 MCP，仅补充或更新 `dbhub`

## Execution Flow

1. 解析用户输入，提取 `type/host/port/database/user/password`
2. 缺失必要字段时，先指出缺失项，再请求补充
3. 如果输入格式无法可靠解析，先请求用户确认，不要猜测写文件
4. 如果 `type`、`driver-class-name`、JDBC 前缀之间存在冲突，先指出冲突并等待确认，不要落盘
5. 确认当前项目根目录
6. 若 `<project>/.claude/` 不存在，先创建目录
7. 生成或更新 `<project>/.claude/dbhub.toml`
8. 生成或更新 `<project>/.mcp.json`
9. 明确反馈最终写入路径和关键字段

## Common Mistakes

| 错误                                  | 正确                                   |
| ------------------------------------- | -------------------------------------- |
| `@anthropic/dbhub`                  | `@bytebase/dbhub@latest`             |
| `[databases.xxx]`                   | `[[sources]]`                        |
| `username`                          | `user`                               |
| `driver`                            | `type`                               |
| `/Users/MT/.agents/dbhub.toml`      | `<project>/.claude/dbhub.toml`       |
| `.mcp.json` 里服务名写成 `dbutil` | `.mcp.json` 里服务名固定为 `dbhub` |

## Never Do

- 不要把 `dbhub.toml` 写到 `/Users/MT/.agents/dbhub.toml`
- 不要把 MCP 写到全局 `~/.claude/settings.json` 作为这次任务的默认落点
- 不要使用旧包名 `@anthropic/dbhub`
- 不要使用错误 TOML 结构 `[databases.xxx]`
- 不要把服务名写成 `dbutil`

## Final Response Requirements

完成后必须告诉用户：

- 解析出的 `type`
- 解析出的 `host/port/database/user`
- `dbhub.toml` 实际写入路径
- `.mcp.json` 实际写入路径
- `.mcp.json` 中加载的服务名为 `dbhub`
