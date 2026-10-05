---
version: "alpha"
name: "蓝色大肥鱼 · 深海海报"
description: "AI 娘二创作品档案站的页面设计规范。深海画布、抬升面、青色信号与图片优先的档案版式；默认深色，提供浅色模式。Phase 0 原型已按此实现，生产迁移前生产 CSS 仍运行旧系统。"

colors:
  bg: "#04121c"
  bg-2: "#061a27"
  surface: "#0a2433"
  surface-2: "#0e2e40"
  ink: "#edf4f2"
  ink-2: "#a9bec6"
  ink-3: "#7d939d"
  primary: "#7fe3e6"
  cyan: "#7fe3e6"
  coral: "#ffb3a0"
  line-strong: "#5f7b88"
  focus: "#7fe3e6"
  on-primary: "#04121c"
  scene-bg: "#04121c"
  scene-surface: "#0e2e40"
  scene-ink: "#edf4f2"
  scene-accent: "#7fe3e6"
  scene-coral: "#ffb3a0"
  primary-hover: "#a2eef0"

typography:
  body:
    fontFamily: "HarmonyOS Sans SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 16px
    lineHeight: 1.65
  body-sm:
    fontFamily: "HarmonyOS Sans SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 15px
    lineHeight: 1.6
  meta:
    fontFamily: "HarmonyOS Sans SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 13px
    lineHeight: 1.5
  label:
    fontFamily: "HarmonyOS Sans SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  card-title:
    fontFamily: "HarmonyOS Sans SC, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.4
  section:
    fontFamily: "Noto Serif, Noto Serif SC, Noto Serif JP, Songti SC, SimSun, serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
  display:
    fontFamily: "Noto Serif, Noto Serif SC, Noto Serif JP, Songti SC, SimSun, serif"
    fontSize: 72px
    fontWeight: 700
    lineHeight: 1.03
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: 13px
    lineHeight: 1.5

rounded:
  control: 2px
  thumb: 8px
  media: 12px
  pill: 999px

spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  7: 32px
  gutter: 40px
  topbar: 64px

components:
  canvas:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
  raised:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.media}"
  focus-ring:
    backgroundColor: "{colors.focus}"
    size: 3px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-outline:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: 40px
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: 0px
    height: 42px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.control}"
    padding: 12px
  chip-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: 12px
  accent-text:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.cyan}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.line-strong}"
    size: 1px
  card:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.ink}"
    typography: "{typography.card-title}"
    rounded: "{rounded.media}"
    padding: 24px
  muted-text:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-3}"
    typography: "{typography.meta}"
  link:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-2}"
    typography: "{typography.body-sm}"
  error-state:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.coral}"
    rounded: "{rounded.media}"
    padding: 24px
  scene:
    backgroundColor: "{colors.scene-bg}"
    textColor: "{colors.scene-ink}"
  scene-action:
    backgroundColor: "{colors.scene-surface}"
    textColor: "{colors.scene-accent}"
  favorite-on:
    backgroundColor: "{colors.scene-bg}"
    textColor: "{colors.scene-coral}"
---

# 蓝色大肥鱼 · 深海海报

> 本仓库是独立原型包；生产静态站与后台不在本仓库。

> **口径**：这是改版的目标视觉系统。Phase 0 原型 `` 已按此实现；生产前端在迁移完成前仍运行旧的手绘/gallery 两套系统，不能拿生产现状反推本文件。
>
> 数值来源是 `deepsea.css` 顶部的 `--ds-*` token。生产迁移时，先把它落进 `frontend/public/tokens.css`，再把组件层改成只引用语义 token。
>
> 改 UI 前先读 `README.md` 的踩坑与页面地图。

## Overview

**一句话**：把站点的深蓝主视觉延展成一座深海档案库——暗色画布托住作品，抬升面分出层级，青色只做信号，图片永远是主角。

- **画布**：深海蓝黑 `#04121c`，不是纯黑；抬升面从 `#061a27` 到 `#0e2e40`，靠明度差分层，不靠阴影。
- **主角**：作品图。版式先给图，再给标题、角色、类型；卡片不做统一的圆角盒子，图片自己就是容器。
- **信号**：青色 `#7fe3e6` 只用于主按钮、当前页、焦点环、选中态和少量强调文字。珊瑚 `#ffb3a0` 只用于收藏已选和错误提示。
- **字体**：正文、界面与站点名用 HarmonyOS Sans SC；首页导语与一二级标题用 Noto Serif（拉丁 Noto Serif，中文回退 Noto Serif SC）。不用手写体、不用装饰性英文眉标。
- **明暗**：默认深色；浅色模式是同一套语义 token 的另一组值，海报、图片上的收藏按钮和全屏大图始终保持深色衬底（`--ds-scene-*`）。
- **记忆点**：整幅海报首屏 + 四列作品墙 + 单图角色卡 + 左侧手动抽屉。不是 SaaS 卡片矩阵。

明确**不做**：渐变文字、紫粉光斑、毛玻璃卡片、柔和模糊投影、等大卡片矩阵、居中 hero + 三个卖点、全大写宽字距小标签、emoji 当功能图标。

## Colors

### 深色（默认）

| token | 值 | 用途 |
|:--|:--|:--|
| `--ds-bg` | `#04121c` | 页面画布 |
| `--ds-bg-2` | `#061a27` | 抬升面：板块、空态、合集卡 |
| `--ds-surface` | `#0a2433` | 控件底、选中行、代码块 |
| `--ds-surface-2` | `#0e2e40` | 再上一级抬升面 |
| `--ds-ink` | `#edf4f2` | 标题、正文、主按钮文字 |
| `--ds-ink-2` | `#a9bec6` | 次级正文、导航默认、链接 |
| `--ds-ink-3` | `#7d939d` | 元信息、计数、占位、页脚 |
| `--ds-cyan` | `#7fe3e6` | 主按钮底、当前项、焦点、强调文字 |
| `--ds-cyan-deep` | `#35b9c4` | 深色装饰光、渐变底 |
| `--ds-coral` | `#ffb3a0` | 收藏已选、错误 |
| `--ds-line` | `rgba(237,244,242,.12)` | 装饰分隔线，不承担控件轮廓 |
| `--ds-line-strong` | `#5f7b88` | 输入框 / 按钮 / 可交互轮廓 |
| `--ds-focus` | `#7fe3e6` | 焦点环 |

### 浅色

| token | 值 |
|:--|:--|
| `--ds-bg` | `#f4f7f9` |
| `--ds-bg-2` | `#ffffff` |
| `--ds-surface` | `#e7f0f4` |
| `--ds-surface-2` | `#dce8ee` |
| `--ds-ink` | `#163343` |
| `--ds-ink-2` | `#405d6d` |
| `--ds-ink-3` | `#4c6573` |
| `--ds-cyan` | `#0068bb` |
| `--ds-cyan-deep` | `#0096fa` |
| `--ds-coral` | `#a43a4b` |
| `--ds-line-strong` | `#69818e` |
| `--ds-focus` | `#0068bb` |

浅色下的主按钮是深 Pixiv 蓝底 `#0068bb` + 白字；`--ds-cyan-deep` 保留亮蓝 `#0096fa`，只驱动软底、悬停描边与装饰渐变，不承载正文。`--ds-on-primary` 由主题切换，不写死。

### 对比度（sRGB / WCAG 2.1 实测）

| 组合 | 深色 | 浅色 | 判定 |
|:--|--:|--:|:--|
| `ink` / `bg` | **16.98:1** | **12.29:1** | 通过 |
| `ink-2` / `bg` | **9.80:1** | **6.50:1** | 通过 |
| `ink-3` / `bg` | **5.89:1** | **5.71:1** | 通过 |
| `cyan` / `bg` | **12.66:1** | **5.28:1** | 强调文字可用 |
| `bg` / `cyan`（主按钮） | **12.66:1** | **5.68:1**（白字） | 通过 |
| `coral` / `bg` | **11.01:1** | **5.94:1** | 错误 / 收藏可用 |
| `line-strong` / `bg` | **4.22:1** | **3.80:1** | 控件轮廓 ≥3:1 |
| `scene-ink` / `scene-bg` | **16.98:1** | 同左 | lightbox 固定深色 |

规则：

- 正文与界面文字只用 `ink` / `ink-2` / `ink-3`；三者在两套主题都 ≥4.5:1。
- 青色可以承载短标签和强调文字，但不做长正文；主按钮底与文字必须用 `on-primary` 组合。
- `--ds-line` 只有 12% 墨色，**不能当控件轮廓**；输入框、按钮、可选卡片一律用 `--ds-line-strong`。
- 颜色只允许在 `:root` 与 `[data-theme]` 块里定义。组件文件不得重绑 `--ds-*`，也不得引入 `--gallery-*`。

派生蓝色信号（由 `--ds-cyan-deep-rgb` 生成，深浅主题自动跟随，组件层只引用、不写 alpha）：

| token | 用途 | 典型组件 |
|:--|:--|:--|
| `--ds-cyan-soft` | 加载块、占位底 | 骨架屏 |
| `--ds-cyan-tint` | 控件悬停底 | 按钮、图标按钮、投稿入口 |
| `--ds-cyan-line` | 悬停与提示描边 | Toast、图片悬停环、按钮轮廓 |

## Typography

- **字体**：HarmonyOS Sans SC（400 / 500 / 700）承担正文、界面与站点名；Noto Serif（中英，400 / 500 / 700）承担首页导语与 h1/h2。原型通过 jsDelivr 引入，生产必须自托管并按实际用字做子集化。
- **字号地板 12px**。正文 16px、次级正文 15–17px、元信息 13px、按钮 14px、卡片标题 15px、角色名 18px。
- **展示标题用流式字号**：
  - 首屏：`clamp(44px, 6.8vw, 96px)`，行高 1.02，字距 `-0.035em`；
  - 页面标题：`clamp(38px, 5.4vw, 72px)`，行高 1.03；
  - 详情标题：`clamp(34px, 4.6vw, 64px)`，行高 1.08；
  - 分区标题：`clamp(28px, 3.4vw, 44px)`，行高 1.1。
- 字重只用 400 / 500 / 600 / 700。中文大标题 700；导航与卡片标题 500；按钮 500–600。
- 字距只用于标题：display `-0.035em`，分区 `-0.03em`，详情 `-0.02em`；正文与元信息不额外加字距。
- 行宽：说明文字 ≤`52ch`，正文 ≤`66ch`。长文用 `--ds-ink-2`，不用 `ink-3`。
- 数字、计数、尺寸用 tabular numerals；代码与投稿协议用 `--ds-mono`。
- 日语标题保留自然短语空格，并加 `word-break: keep-all`；不要按中文断行规则硬拆片假名。

## Layout

- 容器 `--ds-shell: 1440px`；左右 `--ds-gutter: 40px`，≤960px 变 `24px`，≤640px 变 `16px`；顶栏 `--ds-topbar: 64px`，≤640px 变 `56px`。
- 间距 token：`--ds-space-1…7` = `4 / 8 / 12 / 16 / 20 / 24 / 32px`。组件间距优先取这七档；原型里仍有 2–6px 的光学微调，迁移时统一收敛。
- 控件高度 44px（`--ds-control-size`）；按钮视觉高 40px，触控目标不得小于 44×44。
- **顶部导航**：高 64px，sticky，半透明画布 + 背景模糊；左侧菜单按钮 + 品牌，中部四项导航，右侧搜索 / 明暗 / 语言 / 投稿。
- **左侧抽屉**：`min(86vw, 360px)`，手动打开，不自动回缩；内部依次为主导航、类型筛选、收藏、语言、投稿。
- **首页**：整幅海报首屏 → 四列最近收录 → 六列角色条 → 合集特写。≤1180px 作品三列，≤760px 两列。
- **作品库**：类型标签 + 角色 / 合集筛选 + 排序；桌面三栏 contact sheet，≤1180px 两栏。
- **角色页**：四列单图 4:5 封面；≤1180px 三列，≤760px 两列。
- **详情**：`1.75fr / 0.75fr`，间距 `clamp(32px, 5vw, 72px)`；右侧信息栏 sticky；≤960px 单列。
- **合集**：封面 + 文案 + 四张收录预览的两列特写卡；≤760px 单列。
- 断点只有四档：`1180 / 960 / 760 / 640`。新增断点前先问是否真的需要。

## Elevation & Depth

**不用投影分层**。层级只靠三件事：

1. 画布 `bg` → 抬升面 `bg-2` → 控件面 `surface` → 再抬升 `surface-2`；
2. 1px 分隔线 `--ds-line`（装饰）；
3. 图片自身的明度与留白。

允许的模糊只有三处，且都用于浮动层：

| 位置 | 值 | 说明 |
|:--|:--|:--|
| 顶栏 | `backdrop-filter: blur(18px) saturate(130%)` + 88% 画布 | 滚动时内容从下面经过 |
| 图片收藏按钮 | `backdrop-filter: blur(6px)` + 85% 场景底 | 压在任何作品图上都能读 |
| 抽屉遮罩 | `backdrop-filter: blur(2px)` + 72% 黑 | 只做分离，不做毛玻璃卡片 |

禁止：`box-shadow` 做柔和投影、给普通卡片加 `backdrop-filter`、用渐变遮罩伪造层级。

全屏大图使用 `--ds-scene-*`，两套主题下都保持深色；这是唯一的“固定暗场”。

## Shapes

- 圆角只有四档（输入框另用 `0`，见下）：
  - `2px` 控件、按钮、输入框、标签底；
  - `8px` 小缩略图、收藏按钮；
  - `12px` 作品图、角色图、合集封面、空态面板；
  - `999px` 圆形图标按钮、胶囊。
- 输入框是**下划线**，不是盒子：`border: 0` + `border-bottom: 1px solid --ds-line-strong`，圆角 0。
- 边框只有两种：`1px --ds-line` 装饰，`1px --ds-line-strong` 控件轮廓。
- 旋转、手绘不对称圆角、胶带、纸张纹理都属于旧系统，不再使用。
- 图片容器统一 `overflow: hidden`，图片 `object-fit: cover`；角色封面用 `object-position: 50% 30%` 保住脸部。

## Motion

- 时长：`--ds-fast: 120ms`、`--ds-base: 180ms`、`--ds-reveal: 700ms`；缓动 `cubic-bezier(.2,.8,.2,1)`。
- **每页只允许一处非用户触发的入场动画**：首屏海报展开 + 标题上浮。其余板块不做滚动淡入。
- 悬停：图片内层 `scale(1.02–1.03)` + 标题下划线 / 边框变色；**不对卡片容器做 `scale`**，不位移整块。
- 抽屉：180ms 左侧滑入 + 遮罩淡入；关闭时焦点回到菜单按钮。
- 所有动效必须在 `@media (prefers-reduced-motion: reduce)` 里降到 0.01ms；骨架脉冲、海报展开、图片缩放一并关掉。

## Components

### 顶部导航

- 64px 高，sticky；品牌 18px/700 + 32px 圆形鱼标；主导航 15px/500，当前页用 `--ds-ink` + 2px 青色下划线。
- 右侧搜索是下划线输入框（160–250px），明暗按钮 44px，语言 13px，投稿 13px 描边按钮。
- ≤1180px 主导航隐藏；≤960px 搜索与语言收进抽屉，只留菜单、品牌、明暗、搜索图标。

### 左侧抽屉

- `<dialog>`，宽 `min(86vw, 360px)`，深色 `--ds-bg-2`，右侧 1px 线。
- 导航 18px/500，行高 13px padding + 分隔线；当前页文字变青色。
- 类型筛选 15px，行高 44px；计数 13px tabular；当前项底色 `--ds-surface` + 左侧不加装饰条。
- 收藏入口 15px；语言按钮 13px；投稿按钮 14px，全宽 44px。
- 关闭按钮 44px；Esc、点遮罩、点关闭都生效；关闭后焦点回到触发按钮。

### 作品卡

- 没有外框、没有卡片底；图片 + 最多两行文字。
- 图片比例：首页 4:5；作品库按原图比例进入 CSS columns（桌面三栏）。
- 标题 15px/500，最多两行；元信息 13px，角色 + 类型。
- 收藏按钮 38px 圆形，压在图片右上；未选中 72% 不透明，悬停/聚焦/已选时 100%，已选图标用珊瑚填充。
- 悬停时图片轻提亮，叠 1px 青色内环；标题下划线转青色。
- 加载失败时图片区域显示文字提示，不显示浏览器破图图标。

### 角色卡

- 单张 4:5 封面，不拼接多张图。
- 封面选择：优先接近 4:5 的插画，其次设定图，避开多格漫画和大字梗图；比例分与分类罚分相加排序。
- 名称 18px/500，计数 13px；悬停图片轻放大，叠 1px 青色内环，名称下划线转青色。

### 合集

- 两列：左侧 1:1 封面，右侧标题、描述、作者、四张收录预览、CTA。
- 面板底 `--ds-bg-2`，1px `--ds-line`，12px 圆角，内边距 `clamp(20px, 3vw, 36px)`。
- 收录预览是 2×2 网格，链接到单件作品；封面链接到筛选后的作品库。

### 按钮

- 主按钮：`--ds-cyan` 底 + `--ds-on-primary` 文字；每屏至多一个。
- 描边按钮：透明底 + `--ds-ink` 文字 + `--ds-line-strong` 边框。
- 文字链接：`--ds-ink-2`，悬停变 `--ds-ink` 并出现青色下划线。
- 圆角 2px，高度 40px，字号 14px/500；不使用投影。
- 焦点：`outline: 3px solid var(--ds-focus); outline-offset: 3–4px`。

### 表单与筛选

- 输入框 / 下拉：42px 高、透明底、下划线，字号 15px。
- 聚焦时下划线变青色；键盘聚焦时额外显示 3px 焦点环。
- 类型标签：52px 高，15px/500；当前项 `--ds-ink` + 2px 青色下划线。
- 结果计数用 32px/500（手机 26px），数字 tabular。

### 状态

- 空 / 加载 / 错误都用 `--ds-bg-2` 面板 + 1px 线 + 12px 圆角；顶部 2px 青色信号条，错误态转珊瑚。
- 错误必须有文字说明与重试按钮，不能只变红边框。
- 骨架用 `--ds-cyan-soft` 色块 + 脉冲；reduced-motion 下停止脉冲。
- Toast 固定底部居中，`role="status"`，2 秒后消失；左侧 3px 青色条 + 圆点，错误提示整条转珊瑚。

### 全屏大图

- 固定深色场景；图片按视口剩余高度等比缩放，竖图完整显示。
- 64px 顶部 / 72px 底部安全区；左右切图按钮 44px；Esc 关闭；方向键切图。
- 标题与计数在底部；焦点环用 `--ds-scene-accent`。

## Do's and Don'ts

Do：

- 用真实作品、真实角色、真实群信息；没有数据就不编。
- 图片优先：先放图，再放标题与一行元信息。
- 只用 `--ds-*` token；缺值先加 token，再写组件。
- 正文用 `ink` / `ink-2` / `ink-3`；控件轮廓用 `line-strong`。
- 每屏一个主角、一个主按钮、一处入场动画。
- 三语文案同步：`data-i18n` / `data-i18n-aria` / `data-i18n-alt` 一起补。
- 所有动效带 reduced-motion 兜底；焦点环保留 ≥3px。
- 状态五件套齐全：空 / 加载 / 错误 / 成功 / 焦点。

Don't：

- 不做渐变文字、紫粉光斑、玻璃拟态卡片、柔和模糊阴影。
- 不用超过两套圆角语言；不把 `--ds-line` 当控件边框。
- 不用 12px 以下字号；不用 400/500/600/700 之外的字重。
- 不用容器 `scale()` 做 hover；不做无限漂浮、视差、自动轮播。
- 不写装饰性英文眉标、`01 / 02 / 03` 编号、成排灰色小字。
- 不用 emoji 当功能图标；不编造评分、头像、活动日期。
- 不在组件层重绑 token；不引入 `--gallery-*`；不复制旧 `gallery.css`。
- 不为“丰富”给普通卡片加 backdrop-filter 或阴影。

## 无障碍底线

| 项 | 要求 |
|:--|:--|
| 正文 / 元信息 | ≥4.5:1；只用 `ink` / `ink-2` / `ink-3` |
| 大字 / 图形 / 控件轮廓 | ≥3:1；轮廓用 `line-strong`（4.22 / 3.80） |
| 链接 | 正文区链接保留下划线或明确悬停反馈；不能只靠颜色 |
| 焦点 | `outline: 3px solid --ds-focus`，offset 3–4px；不允许裸 `outline: none` |
| 触控 | ≥44×44 命中区 |
| 动效 | 全部有 `prefers-reduced-motion` 兜底 |
| 图片 | 作品图 `alt` 用作品名；装饰图 `alt=""` |
| 语义 | 每页一个 `h1`；对话框/抽屉有可访问名称与焦点恢复 |
| 键盘 | Tab / Enter / Esc 可完成导航、筛选、收藏、大图关闭 |

## 分层契约与主题

```
① primitive —— 颜色 / 字体 / 字号 / 间距 / 圆角 / 时长，只在本文件对应的 token 块
② semantic  —— --ds-bg* / --ds-ink* / --ds-cyan* / --ds-line* / --ds-surface* / --ds-scene-*
③ component —— deepsea.css 的布局与组件、page-styles、JS 内联样式 —— 只引用 ②
```

- token 只允许出现在 `:root`、`[data-theme="deepsea"]`、`[data-theme="deepsea-light"]`。
- 主题切换靠 `data-theme` + `data-color-mode`，`theme.js` 在样式前恢复本机选择；默认深色。
- `color-scheme` 跟着主题走；原生控件、滚动条随主题变化。
- 浅色模式不反色海报、作品图、收藏按钮、lightbox：这些区域继续用 `--ds-scene-*`。
- 生产接入时替换 Tailwind Play CDN 与 DaisyUI 整包，只保留用到的工具类；HarmonyOS Sans 自托管。

## 迁移台账

当前仓库仍处于「原型已定、生产未迁」：

| # | 事项 | 现状 / 位置 | 处理 |
|:--|:--|:--|:--|
| 1 | 生产仍是旧系统 | `frontend/public/tokens.css` 手绘 token；`gallery.css` 最后加载并在 `body.v2` 重绑 token | 迁移时整段删除 `gallery.css` 的 token 重绑；按本文件建 `deepsea.css` |
| 2 | 旧视觉 WIP | `gallery.js`、`favorites.astro`、`Icon.astro`、`MediaCard.astro` 等有可复用逻辑，皮肤是画廊扁平风 | 留逻辑、换皮肤，不合并旧 CSS |
| 3 | 原型依赖 CDN | Tailwind Play CDN、DaisyUI `styled.css`、远程 HarmonyOS Sans | 生产改构建产物 + 自托管字体 |
| 4 | 原型残留光学值 | 少量 2–6px 间距、17/21/26px 字号 | 迁移时并入 4px 间距档与固定字号档，不新增 |
| 5 | 角色封面是启发式 | 按比例 + 分类打分选图，无人工指定 | 后续在 `data/characters.json` 增加可选 `coverWorkId` |
| 6 | 多图 / 系列是替身 | 详情缩略图条用同角色作品模拟 | 生产由 `works.json` 的 `images` / `seriesId` 驱动 |
| 7 | 数据未分片 | `works.json` 约 574 KB | 生产作品库用 `works-index.json` + 分批渲染 |
| 8 | 收藏仅本机 | `localStorage`，无账号 | 保持现状；跨设备收藏另立 API 与权限 |

## 验收 gate

在 `` 跑：

```bash
# 1) 旧系统泄漏 —— 必须 0
grep -rn 'var(--gallery-' *.css *.js *.html

# 2) 组件层重绑 --ds-* —— 必须 0；列出全部定义行，确认都在 :root / [data-theme] 块（含媒体查询内的 :root 覆写）
grep -nE -- '--ds-[a-z0-9-]+:' deepsea.css

# 3) !important —— 基线 3，只允许 reduced-motion
grep -n '!important' deepsea.css

# 4) outline: none —— 基线 2，必须与 :focus-visible 成对
grep -n 'outline: none' deepsea.css

# 5) 容器 scale —— 只允许图片内层
grep -n 'scale(' deepsea.css

# 6) 字号地板 —— 不得出现 12px 以下
grep -rhoE 'font-size:[[:space:]]*[0-9.]+px' deepsea.css | grep -oE '[0-9.]+px' | sort -nu | head

# 7) 三语字典同构 + 主题回归
node --test theme.test.mjs

# 8) 规范文件可解析
cd ../.. && npx @google/design.md lint DESIGN.md
```

人检：

- `npm run serve`；
- 375 / 768 / 1180 / 1440 截图；空 / 加载 / 错误各一张；
- 明暗两套；抽屉、lightbox、键盘焦点、reduced-motion 各走一遍；
- 三遍评审顺序不换：结构 → 系统（逐处对 token 与对比度）→ 品味（三屏并排问“像同一站的兄弟页吗”）。

## 参考事实

- 对比度按 sRGB / WCAG 2.1 公式本地计算，2026-10-18 取值。
- token 值来自 `deepsea.css`；截图来自同目录 `评审截图（未随仓库分发）`。
- 旧手绘规范已归档到 `archive/2026-10-18/DESIGN-doodle.md`，仅作历史参考，不再生效。
