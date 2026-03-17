#!/bin/bash
# ═══════════════════════════════════════════════════════════
# init-ppt.sh — PPT 脚手架生成器（ultimate-dark 模板）
# 用法: bash init-ppt.sh --slogan "标语" --title "标题" --series "系列名" [--copies N]
# ═══════════════════════════════════════════════════════════

set -e

# ── 默认值 ──
SLOGAN=""
TITLE=""
SERIES=""
OUTPUT=""
COPIES=1

# ── 模板源文件路径 ──
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$SCRIPT_DIR/../resources/ppt-template"

# ── 参数解析 ──
while [[ $# -gt 0 ]]; do
    case "$1" in
        --slogan)  SLOGAN="$2";  shift 2 ;;
        --title)   TITLE="$2";   shift 2 ;;
        --series)  SERIES="$2";  shift 2 ;;
        --copies)  COPIES="$2";  shift 2 ;;
        *) echo "未知参数: $1"; exit 1 ;;
    esac
done

# ── 参数校验 ──
if [ -z "$TITLE" ]; then
    echo "错误: 必须指定 --title"
    echo "用法: bash init-ppt.sh --slogan \"标语\" --title \"标题\" --series \"系列名\" [--copies N]"
    exit 1
fi

# ── 自动生成输出目录 ──
# 格式: 当前目录/YYYYMMDD_标题 (将空格替换为下划线防止路径问题)
SAFE_TITLE=$(echo "$TITLE" | tr -s ' ' '_')
DATE_STR=$(date +%Y%m%d)
OUTPUT="$(pwd)/${DATE_STR}_${SAFE_TITLE}"

# ── 创建输出目录 ──
mkdir -p "$OUTPUT"

# ── 复制模板文件 ──
cp "$TEMPLATE_DIR/styles.css" "$OUTPUT/styles.css"
cp "$TEMPLATE_DIR/layouts.js" "$OUTPUT/layouts.js"
cp -f "$TEMPLATE_DIR/pic.jpg" "$OUTPUT/pic.jpg" 2>/dev/null || true

echo "✓ 模板文件已复制到 $OUTPUT"

# ── 生成 presentation.html ──
generate_presentation() {
    local filename="$1"
    local suffix="$2"

    cat > "$OUTPUT/$filename" << 'HEREDOC_HEAD'
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
HEREDOC_HEAD

    echo "    <title>${TITLE} — Ultimate Dark</title>" >> "$OUTPUT/$filename"

    cat >> "$OUTPUT/$filename" << 'HEREDOC_MID'
    <link rel="stylesheet" href="styles.css">
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>

<body>
    <div id="app">
        <div class="presentation-container" @click="next">
            <!-- Global Header -->
            <div class="global-header">
                <div class="gh-left">
                    <span class="gh-title">${TITLE}</span>
                </div>
                <div class="gh-right">
                    <div class="gh-avatar-wrapper">
                        <img src="./pic.jpg" alt="Avatar" class="gh-avatar">
                    </div>
                    <span class="gh-author">MT</span>
                </div>
            </div>

            <transition name="fade" mode="out-in">
                <component :is="currentSlide.layout" v-bind="currentSlide.props" :key="currentIndex">
                </component>
            </transition>

            <!-- Global Footer -->
            <div class="global-footer">
                <div class="page-number-pill">
                    {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import { layouts } from './layouts.js';

        const slides = [
            // ── 第1页: 竖屏封面（必须） ──
            {
                layout: 'verticalCoverSlide',
                props: {
HEREDOC_MID

    echo "                    series: '${SERIES}'," >> "$OUTPUT/$filename"
    echo "                    tagline: '${SLOGAN}'," >> "$OUTPUT/$filename"
    echo "                    name: '${TITLE}'" >> "$OUTPUT/$filename"

    cat >> "$OUTPUT/$filename" << 'HEREDOC_MID2'
                }
            },
            // ── 第2页: 正常封面（必须） ──
            {
                layout: 'productSlide',
                props: {
HEREDOC_MID2

    echo "                    series: '${SERIES}'," >> "$OUTPUT/$filename"
    echo "                    tagline: '${SLOGAN}'," >> "$OUTPUT/$filename"
    echo "                    name: '${TITLE}'" >> "$OUTPUT/$filename"

    cat >> "$OUTPUT/$filename" << 'HEREDOC_TAIL'
                }
            },
            // ── 章节标题示例 ──
            {
                layout: 'titleSlide',
                props: {
                    subtitle: '第一章',
                    title: '在这里添加你的章节标题'
                }
            },
            // ── 高亮金句示例 ──
            {
                layout: 'highlightSlide',
                props: {
                    prefix: '核心观点',
                    highlight: '在这里添加你的核心金句',
                    gradientClass: 'gradient-text-accent'
                }
            },
            // ── 结束页 ──
            {
                layout: 'endSlide',
                props: {
                    message: '感谢观看 · 下期再见'
                }
            }

            // ═══ 在上方封面和结束页之间添加你的幻灯片 ═══
        ];

        const app = Vue.createApp({
            data() {
                return { slides, currentIndex: 0 };
            },
            computed: {
                currentSlide() { return this.slides[this.currentIndex]; }
            },
            methods: {
                next() {
                    if (this.currentIndex < this.slides.length - 1) this.currentIndex++;
                },
                prev() {
                    if (this.currentIndex > 0) this.currentIndex--;
                }
            },
            mounted() {
                window.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); this.next(); }
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); this.prev(); }
                });
            }
        });

        // 注册所有 slide 组件
        for (const [name, config] of Object.entries(layouts)) {
            app.component(name, config);
        }

        app.mount('#app');
    </script>
</body>

</html>
HEREDOC_TAIL

    echo "✓ 已生成 $filename"
}

# ── 单副本 or 多副本 ──
if [ "$COPIES" -eq 1 ]; then
    generate_presentation "presentation.html" ""
else
    # 生成多个副本
    for i in $(seq 1 "$COPIES"); do
        generate_presentation "presentation_${i}.html" "_${i}"
    done

    # 生成索引页
    cat > "$OUTPUT/index.html" << INDEXHEAD
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${TITLE} — 抽卡模式</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a12; color: #fff; font-family: 'Inter', 'Noto Sans SC', sans-serif; padding: 60px; }
        h1 { font-size: 36px; margin-bottom: 8px; }
        .subtitle { color: rgba(255,255,255,0.5); margin-bottom: 40px; font-size: 16px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .card {
            background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px; padding: 28px; transition: all 0.3s; text-decoration: none; color: #fff;
        }
        .card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-3px); }
        .card-num { font-size: 14px; color: #00E5FF; font-weight: 800; margin-bottom: 10px; font-family: monospace; }
        .card-title { font-size: 18px; font-weight: 600; }
    </style>
</head>
<body>
    <h1>${TITLE}</h1>
    <div class="subtitle">抽卡模式 · 共 ${COPIES} 个版本</div>
    <div class="grid">
INDEXHEAD

    for i in $(seq 1 "$COPIES"); do
        cat >> "$OUTPUT/index.html" << CARD
        <a class="card" href="presentation_${i}.html">
            <div class="card-num">#$(printf '%02d' "$i")</div>
            <div class="card-title">版本 ${i}</div>
        </a>
CARD
    done

    cat >> "$OUTPUT/index.html" << INDEXFOOT
    </div>
</body>
</html>
INDEXFOOT

    echo "✓ 已生成 index.html（${COPIES} 个版本）"
fi

echo ""
echo "═══════════════════════════════════════"
echo "  PPT 脚手架生成完成！"
echo "  输出目录: $OUTPUT"
echo "═══════════════════════════════════════"
echo ""
echo "下一步:"
echo "  1. 修改 presentation.html 中的 slides 数组"
echo "  2. 预览: cd $OUTPUT && npx vite --port 5173 --host"
echo "  3. 打开: open http://localhost:5173/presentation.html"
