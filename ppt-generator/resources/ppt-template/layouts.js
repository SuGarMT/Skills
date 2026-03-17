const layouts = {

    // ══════════════════════════════════════════════
    // 1. coverSlide - 横版封面 [Renamed from productSlide]
    // ══════════════════════════════════════════════
    coverSlide: {
        props: ['name', 'tagline', 'series'],
        template: `
            <div class="slide type-cover aurora-theme">
                <div class="aurora-bg">
                    <div class="aurora-orb orb-1"></div>
                    <div class="aurora-orb orb-2"></div>
                    <div class="aurora-orb orb-3"></div>
                </div>
                <!-- 移除毛玻璃，使用纯净的透明容器包裹 -->
                <div class="aurora-content-wrapper">
                    <div class="aurora-decor-line"></div>
                    
                    <div class="flat-header">
                        <span class="aurora-badge" v-if="series">{{ series }}</span>
                    </div>
                    
                    <div class="flat-main">
                        <div class="aurora-title-wrapper">
                            <h1 class="aurora-title" v-if="name">{{ name }}</h1>
                        </div>
                        <div class="aurora-tagline-wrapper">
                            <div class="aurora-tagline" v-if="tagline">{{ tagline }}</div>
                            <span class="aurora-extra-tag">PRO Edition</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 2. titleSlide - 章节标题
    // ══════════════════════════════════════════════
    titleSlide: {
        props: ['title', 'subtitle'],
        template: `
            <div class="slide type-title">
                <div class="title-accent"></div>
                <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
                <div class="title" v-if="title">{{ title }}</div>
                <div class="title-underline"></div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 3. highlightSlide - 重点高亮
    // ══════════════════════════════════════════════
    highlightSlide: {
        props: ['prefix', 'highlight', 'gradientClass'],
        template: `
            <div class="slide type-highlight">
                <div class="prefix" v-if="prefix">{{ prefix }}</div>
                <div :class="['highlight', gradientClass]" v-if="highlight">{{ highlight }}</div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 4. textSlide - 主文本
    // ══════════════════════════════════════════════
    textSlide: {
        props: ['prefix', 'mainText'],
        template: `
            <div class="slide type-text">
                <div class="prefix" v-if="prefix">{{ prefix }}</div>
                <div class="main-text" v-if="mainText">{{ mainText }}</div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 5. questionSlide - 提问页
    // ══════════════════════════════════════════════
    questionSlide: {
        props: ['question'],
        template: `
            <div class="slide type-question">
                <div class="question-icon">?</div>
                <div class="question" v-if="question">{{ question }}</div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 6. splitSlide - 左右分栏
    // ══════════════════════════════════════════════
    splitSlide: {
        props: ['badge', 'title', 'description', 'cards', 'stats'],
        template: `
            <div class="slide type-split">
                <div class="split-left">
                    <div class="badge" v-if="badge">
                        <span class="badge-dot"></span>
                        {{ badge }}
                    </div>
                    <div class="split-title" v-if="title" v-html="title"></div>
                    <div class="split-desc" v-if="description">{{ description }}</div>
                    <div class="stats-row" v-if="stats">
                        <div class="stat-card" v-for="(s, i) in stats" :key="i">
                            <div class="stat-value">{{ s.value }}</div>
                            <div class="stat-label">{{ s.label }}</div>
                        </div>
                    </div>
                </div>
                <div class="split-right" v-if="cards">
                    <div class="info-panel">
                        <div class="panel-header" v-if="cards.header">{{ cards.header }}
                            <span class="panel-tag" v-if="cards.tag">{{ cards.tag }}</span>
                        </div>
                        <div class="panel-items">
                            <div class="panel-item" v-for="(item, i) in cards.items" :key="i">
                                <span class="item-icon" :style="{background: item.color || 'rgba(99,102,241,0.15)', color: item.textColor || '#818cf8'}">{{ item.icon || '→' }}</span>
                                <div class="item-content">
                                    <div class="item-title">{{ item.title }}</div>
                                    <div class="item-desc" v-if="item.desc">{{ item.desc }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 7. statsSlide - 数据统计
    // ══════════════════════════════════════════════
    statsSlide: {
        props: ['title', 'subtitle', 'items'],
        template: `
            <div class="slide type-stats">
                <div class="stats-header">
                    <div class="subtitle" v-if="subtitle">{{ subtitle }}</div>
                    <div class="title" v-if="title">{{ title }}</div>
                </div>
                <div class="stats-grid">
                    <div class="stats-card" v-for="(item, i) in items" :key="i">
                        <div class="stats-card-value" :class="item.gradientClass || ''">{{ item.value }}</div>
                        <div class="stats-card-label">{{ item.label }}</div>
                        <div class="stats-card-desc" v-if="item.desc">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 8. featureListSlide - 功能特性列表
    // ══════════════════════════════════════════════
    featureListSlide: {
        props: ['title', 'features'],
        template: `
            <div class="slide type-features">
                <div class="features-title" v-if="title">{{ title }}</div>
                <div class="features-grid">
                    <div class="feature-card" v-for="(f, i) in features" :key="i">
                        <div class="feature-icon" :style="{background: f.color || 'rgba(99,102,241,0.15)', color: f.textColor || '#818cf8'}">{{ f.icon || '✦' }}</div>
                        <div class="feature-title">{{ f.title }}</div>
                        <div class="feature-desc" v-if="f.desc">{{ f.desc }}</div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 9. glassCardSlide - 玻璃卡片
    // ══════════════════════════════════════════════
    glassCardSlide: {
        props: ['title', 'items'],
        template: `
            <div class="slide type-glass-cards">
                <div class="glass-title" v-if="title">{{ title }}</div>
                <div class="glass-grid">
                    <div class="glass-item" v-for="(item, i) in items" :key="i">
                        <div class="glass-item-icon">{{ item.icon || '◆' }}</div>
                        <div class="glass-item-title">{{ item.title }}</div>
                        <div class="glass-item-desc" v-if="item.desc">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 10. terminalSlide - 终端代码
    // ══════════════════════════════════════════════
    terminalSlide: {
        props: ['title', 'lines'],
        template: `
            <div class="slide type-terminal">
                <div class="terminal-window">
                    <div class="terminal-header">
                        <span class="terminal-dot red"></span>
                        <span class="terminal-dot yellow"></span>
                        <span class="terminal-dot green"></span>
                        <span class="terminal-title">{{ title || 'terminal' }}</span>
                    </div>
                    <div class="terminal-body">
                        <div class="terminal-line" v-for="(line, i) in lines" :key="i">
                            <span class="line-prompt" v-if="line.prompt">{{ line.prompt }}</span>
                            <span class="line-text" :class="line.color || ''">{{ line.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 11. definitionSlide - 定义解释
    // ══════════════════════════════════════════════
    definitionSlide: {
        props: ['term', 'definition', 'note'],
        template: `
            <div class="slide type-definition">
                <div class="def-label">定义</div>
                <div class="def-term" v-if="term">{{ term }}</div>
                <div class="def-divider"></div>
                <div class="def-text" v-if="definition">{{ definition }}</div>
                <div class="def-note" v-if="note">
                    <span class="def-note-badge">TIP</span>
                    {{ note }}
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 12. comparisonSlide - 对比
    // ══════════════════════════════════════════════
    comparisonSlide: {
        props: ['title', 'left', 'right'],
        template: `
            <div class="slide type-comparison">
                <div class="comp-title" v-if="title">{{ title }}</div>
                <div class="comp-grid">
                    <div class="comp-col comp-left" v-if="left">
                        <div class="comp-col-header">{{ left.label }}</div>
                        <ul class="comp-list">
                            <li v-for="(item, i) in left.items" :key="i">
                                <span class="comp-icon">{{ item.icon || '×' }}</span>
                                <div class="comp-item-content">
                                    <div class="comp-item-title">{{ item.title }}</div>
                                    <div class="comp-item-desc" v-if="item.desc">{{ item.desc }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="comp-vs">VS</div>
                    <div class="comp-col comp-right" v-if="right">
                        <div class="comp-col-header">{{ right.label }}</div>
                        <ul class="comp-list">
                            <li v-for="(item, i) in right.items" :key="i">
                                <span class="comp-icon comp-icon-right">{{ item.icon || '✓' }}</span>
                                <div class="comp-item-content">
                                    <div class="comp-item-title">{{ item.title }}</div>
                                    <div class="comp-item-desc" v-if="item.desc">{{ item.desc }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 13. flowSlide - 流程图
    // ══════════════════════════════════════════════
    flowSlide: {
        props: ['title', 'steps'],
        template: `
            <div class="slide type-flow">
                <div class="flow-title" v-if="title">{{ title }}</div>
                <div class="flow-track">
                    <template v-for="(step, i) in steps" :key="i">
                        <div class="flow-step">
                            <div class="flow-num">{{ String(i + 1).padStart(2, '0') }}</div>
                            <div class="flow-step-title">{{ step.title }}</div>
                            <div class="flow-step-desc" v-if="step.desc">{{ step.desc }}</div>
                        </div>
                        <div class="flow-arrow" v-if="i < steps.length - 1">→</div>
                    </template>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 14. timelineSlide - 时间线 [NEW]
    // ══════════════════════════════════════════════
    timelineSlide: {
        props: ['title', 'events'],
        template: `
            <div class="slide type-timeline">
                <div class="timeline-title" v-if="title">{{ title }}</div>
                <div class="timeline-track">
                    <div class="timeline-line"></div>
                    <div class="timeline-event" v-for="(evt, i) in events" :key="i" :class="i % 2 === 0 ? 'even' : 'odd'">
                        <div class="timeline-dot"></div>
                        <div class="timeline-card">
                            <div class="timeline-date" v-if="evt.date">{{ evt.date }}</div>
                            <div class="timeline-event-title">{{ evt.title }}</div>
                            <div class="timeline-event-desc" v-if="evt.desc">{{ evt.desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 15. quoteSlide - 引用/金句 [NEW]
    // ══════════════════════════════════════════════
    quoteSlide: {
        props: ['quote', 'author', 'role'],
        template: `
            <div class="slide type-quote">
                <div class="quote-mark">"</div>
                <div class="quote-text" v-if="quote">{{ quote }}</div>
                <div class="quote-attribution" v-if="author">
                    <span class="quote-dash">—</span>
                    <span class="quote-author">{{ author }}</span>
                    <span class="quote-role" v-if="role">{{ role }}</span>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 16. imageTextSlide - 图文混排 [NEW]
    // ══════════════════════════════════════════════
    imageTextSlide: {
        props: ['title', 'description', 'imageUrl', 'badge'],
        template: `
            <div class="slide type-image-text">
                <div class="img-text-visual">
                    <div class="img-placeholder" :style="imageUrl ? {backgroundImage: 'url(' + imageUrl + ')'} : {}">
                        <div class="img-overlay"></div>
                    </div>
                </div>
                <div class="img-text-content">
                    <div class="badge" v-if="badge">
                        <span class="badge-dot"></span>
                        {{ badge }}
                    </div>
                    <div class="img-text-title" v-if="title">{{ title }}</div>
                    <div class="img-text-desc" v-if="description">{{ description }}</div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 17. listSlide - 要点列表 [NEW]
    // ══════════════════════════════════════════════
    listSlide: {
        props: ['title', 'items'],
        template: `
            <div class="slide type-list">
                <div class="list-title" v-if="title">{{ title }}</div>
                <div class="list-items">
                    <div class="list-item" v-for="(item, i) in items" :key="i">
                        <div class="list-num">{{ String(i + 1).padStart(2, '0') }}</div>
                        <div class="list-item-content">
                            <div class="list-item-title">{{ item.title }}</div>
                            <div class="list-item-desc" v-if="item.desc">{{ item.desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 18. numberSlide - 大数字展示 [NEW]
    // ══════════════════════════════════════════════
    numberSlide: {
        props: ['number', 'unit', 'label', 'description'],
        template: `
            <div class="slide type-number">
                <div class="number-display">
                    <span class="big-number gradient-text-accent">{{ number }}</span>
                    <span class="number-unit" v-if="unit">{{ unit }}</span>
                </div>
                <div class="number-label" v-if="label">{{ label }}</div>
                <div class="number-desc" v-if="description">{{ description }}</div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 19. teamSlide - 团队/人物卡片 [NEW]
    // ══════════════════════════════════════════════
    teamSlide: {
        props: ['title', 'members'],
        template: `
            <div class="slide type-team">
                <div class="team-title" v-if="title">{{ title }}</div>
                <div class="team-grid">
                    <div class="team-card" v-for="(m, i) in members" :key="i">
                        <div class="team-avatar" :style="{background: m.color || 'linear-gradient(135deg, #6366f1, #8b5cf6)'}">
                            {{ m.initial || m.name.charAt(0) }}
                        </div>
                        <div class="team-name">{{ m.name }}</div>
                        <div class="team-role" v-if="m.role">{{ m.role }}</div>
                        <div class="team-desc" v-if="m.desc">{{ m.desc }}</div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 20. gallerySlide - 图片画廊 [NEW]
    // ══════════════════════════════════════════════
    gallerySlide: {
        props: ['title', 'items'],
        template: `
            <div class="slide type-gallery">
                <div class="gallery-title" v-if="title">{{ title }}</div>
                <div class="gallery-grid">
                    <div class="gallery-item" v-for="(item, i) in items" :key="i" :style="item.imageUrl ? {backgroundImage: 'url(' + item.imageUrl + ')'} : {background: item.color || 'rgba(99,102,241,0.1)'}">
                        <div class="gallery-overlay">
                            <div class="gallery-item-title">{{ item.title }}</div>
                            <div class="gallery-item-desc" v-if="item.desc">{{ item.desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    // ══════════════════════════════════════════════
    // 21. endSlide - 结束页
    // ══════════════════════════════════════════════
    endSlide: {
        props: ['message'],
        template: `
            <div class="slide type-end">
                <div class="end-glow"></div>
                <div class="end-icon">◆</div>
                <div class="message" v-if="message">{{ message }}</div>
            </div>
        `
    },

};

export { layouts };
