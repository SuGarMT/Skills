---
name: ppt-generator
description: "Generate presentation HTML files from manuscript to polished script with PPT. Use when: (1) User provides raw manuscript for video/podcast, (2) Needs slide titles in Steve Jobs style, (3) Wants both polished script and PPT, (4) Needs multiple versions (gacha mode with --copies). Triggers: \"做PPT\", \"生成演示文稿\", \"创建PPT\", \"讲稿优化\", \"视频脚本\", \"抽卡\", or when user provides a manuscript/outline file."
---
# PPT Generator - 从讲稿到PPT的完整工作流

##  Overview

从用户提供的原稿讲稿出发，生成:

1. **修正版讲稿**（_修改版.md）口语化、增强吸引力
2. **PPT**（presentation.html）每个章节乔布斯式标题 + 视觉化标注
3. **自动预览** 在生成结束后，自动用 open 命令打开 vite 服务器的链接，为用户展示 PPT 效果

核心原则:

- **保留原意**: 不改变作者的核心观点和立场
- **增强表达**: 用乔布斯风格让内容更有感染力
- **视觉化**: 每个关键点都有对应的PPT画面标注

## 乔布斯式标题生成规则

### 核心原则

1. **一句话原则**: 每个标题必须能在一口气内说完
2. **对比鲜明**: 用"不是...而是..." "X是...Y是..."结构
3. **比喻驱动**: 用具体事物解释抽象概念
4. **痛点直击**: 问题式标题引发共鸣

### 标题类型模板

| 类型             | 公式                 | 示例                         |
| ---------------- | -------------------- | ---------------------------- |
| **对比式** | "A是X，Y是B"         | "MCP是工具箱，SKILL是说明书" |
| **比喻式** | "X就像Y"             | "AI用工具，像在开盲盒"       |
| **问题式** | "为什么..." "...吗?" | "到底学哪个?"                |
| **断言式** | "一句话总结"         | "MCP是工具，Skill是说明书"   |
| **递进式** | "从X到Y"             | "以前:X → 现在:Y"           |
| **痛点式** | "X的痛"              | "开盒即用的痛"               |

### 标题生成步骤

1. **提取核心概念**: 从段落中找出A/B对比或关键论点
2. **寻找比喻对象**: 思考有什么具象事物可以代表这个概念
3. **压缩到12字以内**: 越短越有力
4. **检查是否引发好奇**: 问自己"看到这个标题想继续听吗?"

### 颜色语义（用于PPT配色）

| 概念类型               | 颜色                | 示例                   |
| ---------------------- | ------------------- | ---------------------- |
| **工具/Tool**    | Cyan/Blue/Purple    | "给AI一盒工具"         |
| **流程/Process** | Yellow/Orange/Green | "让AI听话的说明书"     |
| **痛点/Problem** | Red/Pink            | "像在开盲盒"、"不可控" |
| **关键结论**     | Gradient            | 核心金句               |
| **中性说明**     | Gray/White          | 背景铺垫               |

## 讲稿修正规则

### 开场5秒原则

**目标**: 抓住观众，前3秒必须有"钩子"

开场修正策略：

| 原稿风格 | 修正策略    | 示例                          |
| -------- | ----------- | ----------------------------- |
| 说教型   | → 故事型   | "很多人觉得X" → "你也觉得X?" |
| 平铺直叙 | → 设问型   | 直接讲 → 先抛问题            |
| 冗长铺垫 | → 开门见山 | 10行背景 → 1行痛点           |

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
- 加入感官细节: 看到的、听到的、闻到的
- 结尾留白，让观众自己得出结论

### 冲突式表达规则

**核心**: 制造"预期 vs 现实"的反差，让观众产生情绪波动。

| 冲突类型               | 公式                   | 示例                             |
| ---------------------- | ---------------------- | -------------------------------- |
| **努力 vs 无效** | "你做了X，结果Y不买账" | "花一整天精修动画，台下没人抬头" |
| **自我感动**     | "你以为X，其实是Y"     | "你以为是努力，但只是自我感动"   |
| **暴论式**       | "我的暴论:X"           | "没有工具的Skill，根本没必要做"  |
| **反常识**       | "大家都说X，但我想说Y" | "AI会忘记，所以要做工具链约束"   |

**冲突式表达要点**:

- 先认同观众的常规认知
- 再用"但是"、"不过"转折
- 给出反直觉的结论
- 用"暴论"降低观众防御感

### 结构修正

原结构:

- 开场（5行）
- 背景（10行）
- 核心论点（5行）
- 例子（10行）
- 结论（3行）

修正后结构:

- 开场（3行，钩子）
- 话题引入（问题引导）
- 核心论点（对比式标题+金句）
- 例子（视觉化标注+精简）
- 结论（断言式标题+行动号召）

## 完整工作流程

### Step 1: 读取用户原稿

用户会提供:

- 讲稿原稿（可以是 markdown 文件）
- 或主题+内容描述

读取文件后，分析结构:

1. 有哪些章节/段落
2. 每个段落的核心观点是什么
3. 有无明显的对比/因果/递进关系

### Step 2: 生成乔布斯式标题

对每个章节/关键段落，生成一句话标题

**处理逻辑:**

```
if 章节是对比概念:
    生成对比式标题: "A是X，Y是B"
elif 章节是问题:
    生成问题式标题
elif 章节是解决方案:
    生成断言式/比喻式标题
else:
    生成递进式或中性标题
```

**示例对比:**

- 原稿: "关于Claude Code是什么，我就不浪费时间了" → 修正为场景钩子: "普通人也可以用Claude Code超神?"
- 原稿: "MCP早于Claude Code..." → 修正为递进式标题: "以前: MCP是唯一的路"
- 原稿: "SKILL其实是流程加工具链的组合" → 修正为比喻式标题: "SKILLS: 让AI听话的说明书"

### Step 3: 生成修正版讲稿

**核心原则: 永不修改用户的原始文件**

创建 `{原文件名}_修改版.md`，包含:

1. **封面PPT标注** - `[PPT: 主标题/副标题]`
2. **开场** - 5秒钩子 + 话题引入
3. **每个章节**:
   - 乔布斯式标题（独立一行）
   - `[PPT: 标题内容]`
   - 口语化正文（双行距）

### Step 4: 生成PPT脚手架

使用 init-ppt.sh 创建PPT脚手架:

```bash
cd /Users/matrix/Documents/videos/.claude/skills/ppt-generator
./scripts/init-ppt.sh --slogan "标语" --title "标题" --series "系列名" --output "输出绝对路径"
```

**注意:** `--output` 必须使用绝对路径，避免路径拼接错误。

脚本会自动生成:

- PPT主文件（包含封面和示例页）`presentation.html`
- `author_logo.png` 作者头像

### Step 5: 修改PPT内容

创建脚手架后，读取 `presentation.html`，在 slides 数组中添加你的章节幻灯片。使用 Vue 3 语法，每个幻灯片是一个包含 type 和 html 的对象。

**重要:** 在修改 PPT 之前，必须先完成 Step 3（修正版讲稿），因为 PPT 的内容基于讲稿中的乔布斯式标题。

### Step 6: 预览PPT

启动 Vite 本地服务器预览:

```bash
cd /Users/matrix/Documents/videos/2026/PPT_generator
npx vite --port 5173 --host
```

然后在浏览器打开 http://localhost:5173/presentation.html

**特性:**

- 热重载: 修改 HTML 后刷新即可看到变化
- 支持 Vue 3 响应式渲染
- 竖屏 9:16 适配

### Step 7: 输出结果

告知用户:

1. 修正版讲稿路径
2. PPT路径
3. 下一步建议

## PPT Slide Types

When adding slides to `presentation.html`, use these layouts:

| Layout                                               | Use For       | Example                             |
| ---------------------------------------------------- | ------------- | ----------------------------------- |
| `titleSlide(title, subtitle)`                      | 章节标题页    | "MCP是工具, SKILL是说明书"          |
| `highlightSlide(prefix, highlight, gradientClass)` | 核心金句      | "MCP是工具,**Skill是说明书**" |
| `textSlide(prefix, mainText)`                      | 简单观点      | 单屏展示关键句                      |
| `questionSlide(question)`                          | 问题引导      | "到底学哪个?"                       |
| `endSlide(message)`                                | 结尾页        | "下期预告"                          |
| `productSlide(name, tagline)`                      | 产品/工具介绍 | "Chrome MCP"                        |

**Gradient classes:** `gradient-text-blue`, `gradient-text-gold`, `gradient-text-green`, `gradient-text-purple`, `gradient-text-pink`

## 完整示例

### 用户输入

```
我有一段讲稿在 2026/SKILLS与MCP/outline.md，帮我做PPT
```

### 执行流程

1. Read `outline.md`
2. 分析结构: 开场 → SKILLS与MCP区别 → 只有MCP的时代 → Claude Code时代 → 结尾
3. 生成乔布斯式标题:
   - "普通人也可以用Claude Code超神?"（开场）
   - "MCP是工具箱，SKILL是说明书"（核心对比）
   - "以前: MCP是唯一的路"（递进）
   - "Claude Code + Skill时代"（新阶段）
   - "下期: 普通人用AI做Skill"（结尾钩子）
4. 创建 `2026/SKILLS与MCP/script_修改版.md`（修正版讲稿）
5. 运行 `./scripts/init-ppt.sh --slogan "普通人用Claude Code超神" --title "MCP与SKILLS的区别" --series "AI技巧" --output "2026/SKILLS与MCP"`
6. 修改 `presentation.html`，添加章节标题页（基于修正版讲稿）
7. 启动预览: `npx vite --port 5173 --host`
8. 打开 http://localhost:5173/presentation.html 预览最终效果

## 抽卡模式（多副本生成）

### 适用场景

用户要求生成多个版本/副本时（如"抽10次卡"、"生成10个版本"），使用抽卡模式。

### 使用方式

```bash
./scripts/init-ppt.sh --slogan "标语" --title "标题" --series "系列名" --output "输出路径" --copies 10
```

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

### 示例

```bash
# 抽5次卡
./scripts/init-ppt.sh --slogan "乔布斯风" --title "我的PPT" --copies 5 --output "2026/demo"

# 生成的文件:
# 2026/demo/index.html
# 2026/demo/presentation_1.html ~ presentation_5.html
# 2026/demo/script_1.md ~ script_5.md
```

### AI处理流程

1. 运行 `init-ppt.sh` 生成 N 个模板文件
2. 使用 subagent 创建 N 个并行子任务
3. 每个子任务接收参数 `{"index": x}`
4. 子任务读取 `script_x.md`，生成 `script_修改版_x.md`
5. 子任务修改 `presentation_x.html`
6. 汇总结果，反馈给用户

## 模板文件位置

- **Init脚本**: `scripts/init-ppt.sh`
- **布局模板**: `resources/ppt-template/layouts.js`
- **系列Logo**: `resources/ppt-template/series-logos.json`
- **样式**: `resources/ppt-template/styles.css`
