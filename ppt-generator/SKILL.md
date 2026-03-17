---
name: ppt-generator
description: "使用 ultimate-dark 模板生成高质量 PPT（presentation.html）。支持从讲稿或主题出发，生成修正版讲稿 + PPT 幻灯片。适用于教程讲解、技术分享、行业资讯等场景。支持 24 种布局组件、章节标题乔布斯风、内容页步骤化、抽卡模式多副本生成。触发词：\"做PPT\"、\"生成PPT\"、\"创建演示文稿\"、\"讲稿优化\"、\"视频脚本\"、\"抽卡\"、\"presentation\"，或当用户提供讲稿/大纲文件时自动触发。"
---
# PPT Generator — 从讲稿到PPT的完整工作流

## Overview

从用户提供的原稿讲稿（或主题描述）出发，生成:

1. **修正版讲稿**（`{原文件名}_修改版.md`）— 口语化、逻辑清晰
2. **PPT**（`presentation.html`）— 基于 ultimate-dark 模板，24种布局组件
3. **自动预览** — 生成结束后，启动本地服务器为用户展示 PPT 效果

**核心原则**:

- **保留原意**: 不改变作者的核心观点和立场

### 封面规则

每次生成 PPT 时固定第一页为封面：

| 页面 | 布局 | 参数 |
|------|------|------|
| **第1页：封面** | `coverSlide` | `name`, `tagline`, `series` |

## 乔布斯式标题生成规则

> 以下规则适用于**章节标题页（titleSlide）、高亮金句（highlightSlide）、提问页（questionSlide）**。
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
| 高亮金句（highlightSlide） | ✅ 使用 | 核心观点需要穿透力 |
| 提问页（questionSlide） | ✅ 使用 | 引发思考的钩子 |
| 数据页（statsSlide、numberSlide） | ❌ 清晰即可 | 数据说话，标题准确描述即可 |
| 定义页（definitionSlide） | ❌ 清晰即可 | 解释性内容，清晰优先 |
| 列表页（listSlide、featureListSlide） | ❌ 清晰即可 | 信息传递，多用步骤化表达 |
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

## 讲稿修正规则

### 开场规则

**目标**: 抓住观众，前3秒必须有"钩子"，快速说明主题、学习目标、内容预告

开场修正策略：

| 原稿风格 | 修正策略    | 示例                          |
| -------- | ----------- | ----------------------------- |
| 说教型   | → 设问引入  | "很多人觉得X" → "你也遇到过X的问题吧?" |
| 平铺直叙 | → 说明目标  | 直接讲 → 先说"今天学完你能..."   |
| 冗长铺垫 | → 开门见山  | 10行背景 → 一句话说清主题      |

### 语言风格修正

1. **口语化**: 删除书面语，用"你"、"咱们"代替"用户"
2. **断句**: 长句拆分成2-3个短句，每句换行
3. **节奏**: 适当加入"[停顿]"、"(放慢)"标记
4. **互动**: 加入"你也..."、"对吧"、"对不对"等设问

### 场景化表达规则

**核心**: 用具体的画面感让观众"看到"内容，而不是抽象描述。

| 场景类型           | 公式                | 示例                                                   |
| ------------------ | ------------------- | ------------------------------------------------------ |
| **时间场景** | "时间点+动作细节"   | "指针滑过凌晨两点。你瞪着发亮的屏幕，咖啡凉在一边"     |
| **动作场景** | "动作+等待+结果"    | "去阳台上伸伸懒腰，煮杯咖啡。等我回来时，文稿就做好了" |
| **对比场景** | "你的动作+对方反应" | "你花了一整天精修动画，台下观众一直在刷手机"           |

**场景化表达要点**:

- 3-5个具体细节 > 1句抽象总结
- 用"你"开头，让观众代入
- 加入感官细节: 看到的、听到的
- 结尾留白，让观众自己得出结论

### 结构修正

原结构:

- 开场（5行）→ 背景（10行）→ 核心论点（5行）→ 例子（10行）→ 结论（3行）

修正后结构:

- 开场（3行，钩子）→ 话题引入（问题引导）→ 核心论点（对比式标题+金句）→ 例子（视觉化标注+精简）→ 结论（断言式标题+行动号召）

## 完整工作流程

### Step 1: 读取用户原稿

用户会提供:

- 讲稿原稿（可以是 markdown 文件）
- 或主题+内容描述

读取文件后，分析结构:

1. 有哪些知识点/章节
2. 每个章节的核心观点是什么
3. 适合分几个步骤讲解

### Step 2: 生成标题

对每个章节/关键段落，根据内容类型生成合适的标题：

**章节标题页**使用乔布斯式标题（紧贴主题的观点或思路），**内容页**使用清晰的步骤化标题。

处理逻辑:

```
if 章节是封面/章节标题/核心金句/提问:
    使用乔布斯式标题，紧贴章节内容
elif 章节是操作步骤/流程/列表:
    使用"第一步/第二步"式清晰标题
elif 章节是数据/定义:
    使用准确的描述性标题
else:
    使用正常标题
```

### Step 3: 生成修正版讲稿

**核心原则: 永不修改用户的原始文件**

创建 `{原文件名}_修改版.md`，包含:

1. **封面PPT标注** - `[PPT: 主标题/副标题]`
2. **开场** - 5秒钩子 + 话题引入
3. **每个章节**:
   - 章节标题（乔布斯风）
   - `[PPT: 布局类型 - 标题内容]`
   - 口语化正文（双行距）

### Step 4: 生成PPT脚手架

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
- 在修改 PPT 之前，必须先完成 Step 3（修正版讲稿），因为 PPT 的内容基于讲稿中的标题和标注。
- 脚手架已包含封面（`coverSlide`），直接在封面和结束页之间添加新幻灯片。
- 章节标题页用 `titleSlide`（乔布斯风），内容页根据类型选择合适布局。

**选择合适的布局**: 根据内容类型从24种布局中选择最匹配的（参见下方 Slide Types 表），充分利用模板的丰富表现力。

### Step 6: 预览PPT

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

### Step 7: 输出结果

告知用户:

1. 修正版讲稿路径
2. PPT路径
3. 预览地址
4. 下一步建议

## PPT Slide Types（24种布局组件）

基于 ultimate-dark 模板，在 `presentation.html` 的 slides 数组中使用。每个幻灯片格式：

```javascript
{ layout: '布局名', props: { /* 参数 */ } }
```

### 封面类（固定在第1页）

| 布局 | 用途 | 参数 |
|------|------|------|
| `coverSlide` | 封面（第1页） | `name`, `tagline`, `series` |

### 标题/金句类

| 布局 | 用途 | 参数 |
|------|------|------|
| `titleSlide` | 章节标题页（乔布斯风） | `title`, `subtitle` |
| `highlightSlide` | 核心金句/高亮 | `prefix`(前缀), `highlight`(高亮文字), `gradientClass` |
| `textSlide` | 简单观点/关键句 | `prefix`, `mainText` |
| `questionSlide` | 提问页 | `question` |
| `quoteSlide` | 引用/名言 | `quote`, `author`, `role` |
| `endSlide` | 结束页 | `message` |

### 数据/信息类

| 布局 | 用途 | 参数 |
|------|------|------|
| `statsSlide` | 数据统计(多指标) | `title`, `subtitle`, `items[]`(value/label/desc/gradientClass) |
| `numberSlide` | 大数字展示 | `number`, `unit`, `label`, `description` |
| `comparisonSlide` | 对比(左右) | `title`, `left`(label/items[]), `right`(label/items[]) |
| `definitionSlide` | 定义/概念解释 | `term`, `definition`, `note` |

### 列表/卡片类

| 布局 | 用途 | 参数 |
|------|------|------|
| `splitSlide` | 左右分栏(信息面板) | `badge`, `title`, `description`, `cards`(header/tag/items[]), `stats[]` |
| `featureListSlide` | 功能特性网格 | `title`, `features[]`(icon/title/desc/color/textColor) |
| `glassCardSlide` | 玻璃毛刺卡片 | `title`, `items[]`(icon/title/desc) |
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
| `imageTextSlide` | 图文混排(左图右文) | `title`, `description`, `imageUrl`, `badge` |
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
我有一段关于 Claude Code Skill 的教程讲稿在 notes/skill-tutorial.md，帮我做PPT
```

### 执行流程

1. Read `skill-tutorial.md`
2. 分析结构: 开场引入 → 什么是 Skill → 怎么写 Skill → 实操演示 → 总结
3. 生成标题（章节标题用乔布斯风，内容页步骤化）:
   - "用 Skill 打造你的专属 AI 工作流"（封面 — 乔布斯风✅）
   - "一句话讲清楚：Skill 到底是什么"（章节标题 — 乔布斯风✅）
   - "Skill 的三大核心组成"（列表页 — 清晰标题）
   - "别光看，动手才是硬道理"（章节标题 — 乔布斯风✅）
   - "跟着做：创建你的第一个 Skill"（流程页 — 步骤化标题）
   - "下期：优化 Skill 触发精准度"（结束 — 预告✅）
4. 创建修正版讲稿 `skill-tutorial_修改版.md`
5. 运行脚手架: `bash scripts/init-ppt.sh --slogan "打造你的专属AI工作流" --title "Skill教程" --series "AI效率工具"`
6. 脚本自动在当前目录下生成 `20260317_Skill教程` 文件夹，进入该目录修改 `presentation.html`:
   - 前两页保持封面（`verticalCoverSlide` + `productSlide`）
   - 在封面和结束页之间添加各类型幻灯片
7. 启动预览: `cd 20260317_Skill教程 && npx vite --port 5173 --host`
8. 用 `open` 打开浏览器预览最终效果

## 模板文件位置

- **Init脚本**: `scripts/init-ppt.sh`（当前 skill 目录下）
- **模板源文件**: `resources/ppt-template/`（当前 skill 目录下）
  - `layouts.js` — 24 种布局组件
  - `styles.css` — 完整样式（1744行）
  - `meta.json` — 模板元信息
  - `series-logos.json` — 系列 logo 配置
