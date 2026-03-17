---
name: ppt-generator
description: "根据用户提供的排版要求（大纲文件）或描述，使用 ultimate-dark 模板直接生成高质量 PPT（presentation.html）。适用于教程讲解、技术分享、行业资讯等场景。内部提供 17 种布局组件。触发词：\"基于大纲生成PPT\"、\"做PPT\"、\"生成PPT\"、\"创建演示文稿\"、\"presentation\"，或当用户要求把某份大纲转换成展示页面时自动触发。"
---
# PPT Generator — 专注生成 PPT 演示文稿

## Overview

从用户提供的《讲稿大纲》（通常由 `ppt-script` 提前生成好）或主题描述出发，生成:

1. **PPT**（`presentation.html`）— 基于 ultimate-dark 模板，17种布局组件
2. **自动预览** — 生成结束后，启动本地服务器为用户展示 PPT 效果

**核心思想**: 专注排版与页面结构的开发，不直接进行文案和口播稿的大幅润色（这部分由特定的构思指令或 `ppt-script` 负责完成）。

### 封面规则

每次生成 PPT 时固定第一页为封面：

| 页面 | 布局 | 参数 |
|------|------|------|
| **第1页：横版封面** | `coverSlide` | `name` (核心主题), `series` (系列/大主题), `tagline` (关键字标签), `icon` (必备图标) |

## 乔布斯式标题生成规则

> 以下规则适用于**章节标题页（titleSlide）、核心观点（messageSlide）、提问页（questionSlide）**。
> 内容页（列表、流程、数据等）使用清晰准确的标题即可。

### 核心原则

1. **一句话原则**: 每个标题必须能在一口气内说完
2. **紧贴主题**: 标题直接表达当前章节的核心观点或处理思路
4. **比喻驱动**: 用具体事物解释抽象概念

### 标题类型模板

| 类型             | 公式                 | 示例                         |
| ---------------- | -------------------- | ---------------------------- |
| **对比式** | "A是X，Y是B"         | "MCP是工具箱，SKILL是说明书" |
| **比喻式** | "X就像Y"             | "AI用工具，像在开盲盒"       |
| **问题式** | "为什么..." "...吗?" | "到底学哪个?"                |
| **断言式** | "一句话总结"         | "三步搞定环境配置"           |
| **递进式** | "从X到Y"             | "从手动到自动，只差一个 Skill" |

### 标题生成步骤

1. **提取核心概念**: 从章节中找出核心论点或操作思路
2. **寻找比喻对象**: 思考有什么具象事物可以代表这个概念
3. **压缩到12字以内**: 越短越有力
4. **检查是否引发好奇**: 问自己"看到这个标题想继续听吗?"

### 何时使用乔布斯模式

| 页面类型 | 是否使用乔布斯模式 | 说明 |
|---------|-------------|------|
| 封面（coverSlide） | ✅ 使用 | 第一印象需要吸引力 |
| 章节标题（titleSlide） | ✅ 使用 | 表达章节核心观点或处理思路 |
| 核心观点（messageSlide） | ✅ 使用 | 核心观点需要穿透力 |
| 提问页（questionSlide） | ✅ 使用 | 引发思考的钩子 |
| 数据页（statsSlide） | ❌ 清晰即可 | 数据说话，标题准确描述即可 |
| 列表页（listSlide、cardGridSlide） | ❌ 清晰即可 | 信息传递，多用步骤化表达 |
| 流程页（flowSlide、timelineSlide） | ❌ 清晰即可 | 逻辑性内容，易读为上 |
| 对比页（comparisonSlide） | 🔶 视情况 | 如果有鲜明对比可以用 |

### 颜色语义（用于PPT配色）

| 概念类型               | 颜色                | 示例                   |
| ---------------------- | ------------------- | ---------------------- |
| **工具/Tool**    | Cyan/Blue/Purple    | "给AI一盒工具"         |
| **流程/Process** | Yellow/Orange/Green | "让AI听话的说明书"     |
| **痛点/Problem** | Red/Pink            | "像在开盲盒"、"不可控" |
| **关键结论**     | Gradient            | 核心金句               |
| **中性说明**     | Gray/White          | 背景铺垫               |

## 完整工作流程

### Step 1: 读取用户大纲

用户会提供:

- 讲稿大纲（通常是 markdown 文件，由 `ppt-script` 或用户创作提供）
- 各页需要使用的方法或模板推荐设定

读取文件后，直接分析大纲结构:

1. 页面分为多少页
2. 每页的主标题、副标题分别是什么
3. 每页分配了何种模板类型

### Step 2: 生成标题 (仅调整微词)

大部分内容可直接复用大纲设定。如有缺失，对大纲内残缺段落补充合适的标题：

**章节标题页**使用乔布斯式标题（紧贴主题的观点或思路），**内容页**使用清晰的步骤化标题。

### Step 3: 生成PPT脚手架

使用 init-ppt.sh 创建PPT脚手架:

```bash
cd /Users/MT/Documents/AIPro/Skills/.agents/skills/ppt-generator
bash scripts/init-ppt.sh --slogan "标语" --title "标题" --series "系列名"
```

**注意:** 脚本会自动在当前目录下生成一个名为 `YYYYMMDD_标题` 的文件夹，也就是你的工作目录。

脚本会自动生成:

- `presentation.html`（主文件，含封面和示例页）
- `layouts.js`（从模板复制）
- `styles.css`（从模板复制）

### Step 5: 修改PPT内容

创建脚手架后，读取 `presentation.html`，在 slides 数组中添加你的章节幻灯片。使用 Vue 3 语法，每个幻灯片是一个包含 `layout` 和 `props` 的对象。

**重要:**
- 脚手架已包含封面（`coverSlide`），直接在封面和结束页之间添加新幻灯片。
- 章节标题页用 `titleSlide`（乔布斯风），内容页根据类型选择合适布局。

**选择合适的布局**: 根据大纲设定或内容类型从17种布局中选择最匹配的（参见下方 Slide Types 表），充分利用模板的丰富表现力。

### Step 5: 预览PPT

启动本地服务器预览:

```bash
cd 输出目录
npx vite --port 5173 --host
```

然后用 `open` 打开浏览器: `open http://localhost:5173/presentation.html`

**特性:**

- 热重载: 修改 HTML 后刷新即可看到变化
- 支持 Vue 3 响应式渲染
- 键盘翻页（←→ / 空格）+ 鼠标点击翻页

### Step 6: 输出结果

告知用户:

1. PPT路径
2. 预览地址
3. 下一步建议

## PPT Slide Types（17种布局组件）

基于 ultimate-dark 模板，在 `presentation.html` 的 slides 数组中使用。每个幻灯片格式：

```javascript
{ layout: '布局名', props: { /* 参数 */ } }
```

### 封面类（固定在第1页）

| 布局 | 用途 | 参数 |
|------|------|------|
| `coverSlide` | 封面（第1页） | `name` (主标题), `tagline` (标签词), `series` (小标题/主题), `icon` (必定要求配图) |

### 标题/金句类

| 布局 | 用途 | 参数 |
|------|------|------|
| `titleSlide` | 章节标题页（乔布斯风） | `subtitle`(巨大白字: 章节主标题), `title`(较小渐变字: 内容总结) |
| `messageSlide` | 核心观点大字报 | `prefix`(前缀), `message`(正文), `highlight`(布尔值，是否渐变高亮) |
| `questionSlide` | 提问页 | `question` |
| `quoteSlide` | 引用/名言 | `quote`, `author`, `role` |
| `endSlide` | 结束页 | `message` |

### 数据/信息类

| 布局 | 用途 | 参数 |
|------|------|------|
| `statsSlide` | 数据统计(多指标) | `title`, `subtitle`, `items[]`(value/label/desc/gradientClass) |
| `comparisonSlide` | 对比(左右) | `title`, `left`(label/items[]), `right`(label/items[]) |

### 列表/卡片类

| 布局 | 用途 | 参数 |
|------|------|------|
| `splitSlide` | 左右分栏(信息面板) | `badge`, `title`, `description`, `cards`(header/tag/items[]), `stats[]` |
| `cardGridSlide` | 多特性卡片阵列 | `title`, `cards[]`(icon/title/desc/color/textColor) |
| `listSlide` | 编号要点列表 | `title`, `items[]`(title/desc) |

### 流程/时间类

| 布局 | 用途 | 参数 |
|------|------|------|
| `flowSlide` | 流程图(横向步骤) | `title`, `steps[]`(title/desc) |
| `timelineSlide` | 时间线(锯齿交替) | `title`, `events[]`(date/title/desc) |

### 展示/媒体类

| 布局 | 用途 | 参数 |
|------|------|------|
| `terminalSlide` | 终端/代码展示 | `title`, `lines[]`(prompt/text/color) |
| `imageTextSlide` | 图文混排（截图与解决方案） | `[title, description, imageUrl, badge, solution]` |
| `teamSlide` | 团队/人物卡片 | `title`, `members[]`(name/role/desc/initial/color) |
| `gallerySlide` | 图片画廊(3列) | `title`, `items[]`(title/desc/imageUrl/color) |

### 渐变文字可用 class

`gradient-text-accent` (青紫渐变)、`gradient-text-cyan` (品红青渐变)、`gradient-text-warm` (黄红暖色渐变)

## 抽卡模式（多副本生成）

### 适用场景

用户要求生成多个版本/副本时（如"抽10次卡"、"生成10个版本"），使用抽卡模式。

### 使用方式

```bash
bash scripts/init-ppt.sh --slogan "标语" --title "标题" --series "系列名" --copies 10
```

**注意:** 脚本会自动在当前目录下生成一个名为 `YYYYMMDD_标题` 的文件夹存储所有生成的副本。

### 生成规则

| 副本数量  | 输出文件                                                          |
| --------- | ----------------------------------------------------------------- |
| 1（默认） | `presentation.html`                                             |
| N > 1     | `presentation_1.html` ~ `presentation_N.html`, `index.html` |

### 子任务分配

当 `--copies N` 且 N > 1 时:

1. **创建索引页**: 生成 `index.html` 列出所有副本
2. **编号规则**: 每个副本编号 x（1 ≤ x ≤ N）
3. **子任务处理**: 使用 subagent 并行处理每个副本
   - 子任务 x 读取 `script_x.md`
   - 子任务 x 修改 `presentation_x.html`

## 完整示例

### 用户输入

```
我有一段关于 Claude Code Skill 的教程大纲文件在 20260317_Skill教程/大纲.md，帮我做PPT
```

### 执行流程

1. Read `20260317_Skill教程/大纲.md`
2. 运行脚手架: `bash scripts/init-ppt.sh --slogan "打造你的专属AI工作流" --title "Skill教程" --series "AI效率工具"`
3. 脚本自动在当前目录下生成工作文件夹，进入该目录修改 `presentation.html`:
   - 保持首屏横版封面（`coverSlide`）
   - 在封面和结束页之间，严格参照大纲要求添加全部幻灯片，填入所需的 `props` 数据。
4. 启动预览: `cd 20260317_Skill教程 && npx vite --port 5173 --host`
5. 用 `open` 打开浏览器预览最终效果。

## 模板文件位置

- **Init脚本**: `scripts/init-ppt.sh`（当前 skill 目录下）
- **模板源文件**（已迁移供前置程序查阅，`ppt-generator` 只需调用脚本）
