# 深海海报 · Phase 0 视觉原型

这是改版方案的**审核用中间产物**，不是生产站点。它用独立的 HTML / CSS / JS 跑通「深海海报」的版式、交互和文案；生产静态站在 `bluedafeiyu-site` 仓库。

token、对比度、版式与验收口径见本仓库 [`DESIGN.md`](DESIGN.md)。

## 视觉与依赖

这一版按「海报和主题色融进整站」的意见保留深海配色，并提供**浅色 / 深色切换**：

- **色彩**：深海画布 `#04121c`，抬升面 `#061a27 / #0a2433 / #0e2e40`，正文 `#edf4f2`，次级 `#a9bec6`，三级 `#7d939d`，主色青 `#7fe3e6`，暖色点缀 `#ffb3a0`。颜色都收在 `deepsea.css` 顶部的 `--ds-*` 变量里；正文只用 `--ds-ink` / `--ds-ink-2`，控件轮廓用 `--ds-line-strong`（≥3:1）。
- **明暗模式**：默认沿用深色，顶栏太阳 / 月亮按钮切换模式，手机端也直接显示。浅色用海雾白画布 `#f4f7f9`、深青文字 `#163343` 与 Pixiv 蓝主色 `#0068bb`（亮蓝 `#0096fa` 只做软底与装饰），同步覆盖 DaisyUI 的颜色变量和原生控件的 `color-scheme`。首页海报随模式淡出到页面底色，浅色模式使用深青文字和浅色遮罩；海报高度为动态视口高度减去顶栏，首屏不露出下一节。图片上的收藏按钮和全屏大图保留深色衬底。`theme.js` 在样式加载前恢复本机选择，翻页与刷新保留，多个标签页同步；存储不可用时仍可在当前页切换。切换按钮的提示跟随中 / 英 / 日语言。
- **组件**：用 **Tailwind + DaisyUI** 的现成类做基础（`btn` / `input` / `select` / `dialog` / `skeleton`），再收敛成平直的控制件：2px 圆角、无软阴影、下划线输入框。DaisyUI 主题 `[data-theme="deepsea"]` 在 `deepsea.css` 里用 OKLCH 变量定义。
- **图片与间距**：作品图、角色图、合集封面、详情与大图浮层统一 12px 圆角，小缩略图为 8px；几何值集中在 `--ds-radius-*` / `--ds-space-*`。图片与标题保持 8–12px，筛选栏与作品流间隔 24px，避免图文和控件贴边。全屏大图按视口剩余高度等比缩放，竖图也能完整显示，并给标题和切图按钮留出空间。
- **图标**：沿用 DaisyUI 的 SVG + 文字标签结构，使用本地 `icons.svg` 中的 [Heroicons 2.2.0 outline](https://github.com/tailwindlabs/heroicons/tree/v2.2.0/optimized/24/outline)。导航、类型筛选、随机、下载、返回、重试和加载更多使用同一套描边图标；翻译只更新文字节点。SVG 内保留 MIT 许可，运行时不依赖图标 CDN。
- **版式**：图片优先的档案版式。顶部导航只有「作品 / 角色 / 合集 / 社群」四项，左上角菜单按钮手动唤出左侧抽屉（首页默认不展开，和 Pixiv 一样）。首页是海报 + 四列作品墙 + 六列角色卡 + 合集特写；作品库用类型标签 + 角色 / 合集筛选 + 三栏 contact sheet；角色页是四列单图肖像卡，每个角色取一张最新的竖幅插画作封面；合集页是封面 + 文案 + 四张收录预览的特写卡；社群页放真实的 QQ 群信息、二维码、群规和站长账号。卡片不做统一圆角盒子，靠间距、细线和图片本身分层。
- **字体**：正文与界面用 **HarmonyOS Sans SC**（400 / 500 / 700）；站点名、首页导语与 h1/h2 用 **Noto Serif**（拉丁 Noto Serif、中文回退 Noto Serif SC）。均通过 jsDelivr 的 `@fontsource` / `harmonyos-sans-webfont-splitted` 引入。

原型阶段 Tailwind 用的是 Play CDN、DaisyUI 用的是 `dist/styled.css` 整包，都只是为了让审核能直接打开。生产接入时需要换成**真正的 Tailwind 构建**（只产出用到的工具类），并自托管 HarmonyOS Sans / Noto Serif 字体，不能把 Play CDN 带上线。

> DaisyUI 自带 `.hero { display: grid; place-items: center }` 和 `.hero-content { display: flex }`，会和首屏海报布局撞车。`deepsea.css` 里已显式写回 `display: block`，后续迁移时别删。

## 启动

在仓库根目录：

```bash
python3 -m http.server 5174 -d .
```

打开 <http://127.0.0.1:5174/index.html>。`works.json` 与图片走相对路径和 GitHub Raw，直接双击 `index.html` 会因为 `fetch` 的 file:// 限制显示空页面，请用上面的本地服务打开。

## 页面

| 页面 | 地址 | 说明 |
|---|---|---|
| 首页 | `/index.html` | 海报首屏、四列最近收录、六列角色卡、合集特写；默认不展开侧栏 |
| 作品库 | `/works.html` | 类型标签 + 角色 / 合集 / 排序筛选、加载更多、空态 / 加载态 / 错误态 |
| 作品详情 | `/work.html?slug=<slug>` | 大字标题、大图、同角色缩略图条、相关作品、lightbox |
| 角色 | `/characters.html` | 12 个角色，按作品数量排序，每个角色一张 4:5 竖幅封面 |
| 合集 | `/topics.html` | 站长手动挑选的合集，封面 + 文案 + 收录预览 + 作者 |
| 社群 | `/community.html` | 真实 QQ 群信息、二维码、投稿方式、活动、群规、站长账号 |
| 收藏 | `/favorites.html` | 本机 localStorage 收藏；从侧栏底部的「收藏」进入，含空态 |

### 可分享的 URL 状态

作品库的筛选会写回地址栏（`replaceState`，刷新和分享都能还原）：

- `?t=meme|illustration|setting|comic` 类型
- `?c=<characterId>` 角色
- `?topic=<topicId>` 合集
- `?q=<关键词>` 搜索
- `?sort=new|old|random` 排序
- `?limit=<n>` 首屏渲染数量

审核用的状态参数：

- `?sidebar=open` 直接展开左侧抽屉（截图用）
- `works.html?state=loading|empty|error` 强制加载 / 空 / 错误态
- `?lang=zh|en|ja` 指定语言（也会记住到 localStorage）
- `work.html?slug=<slug>&lightbox=1` 直接打开 lightbox

导航只有「作品 / 角色 / 合集 / 社群」，左上角菜单按钮打开左侧抽屉：抽屉里放同一套主导航、五种类型筛选、语言和投稿，底部另有本机「收藏」入口；抽屉不会自动出现，也不会随滚动回缩。≤1180px 时主导航收进抽屉，≤960px 顶栏显示「菜单 + 站名 + 明暗切换 + 搜索」，类型筛选仍在抽屉和作品页标签里，不会在页面顶部重复一条 chip 行。

## 数据

`works.json` 由脚本从构建快照生成：

```bash
node tools/build-prototype-data.mjs --snapshot <path/to/site-data.json>
```

- 输入：`dist/site-data.json`（先跑一次站点构建产物）
- 输出：`works.json`，525 件真实作品、12 个有作品的角色、4 个分类、1 个专题
- 图片：内容仓 `lmy414/ai-girl-stickers` 的 GitHub Raw 缩略图 / 大图
- 首屏主视觉：`assets/hero.png`，即你指定的那张 `初版.png`（1672 × 941）

作品 `slug`、详情 URL 和评论串规则与生产一致；原型只读 `works.json`，不碰 `data/`。

## 截图

明暗模式的行为回归（无需安装依赖）：

```bash
npm test
```

无依赖的 Chrome CDP 截图脚本（真实设备像素比，绕过 macOS 上 `--window-size` 的 500px 下限）：

```bash
node tools/screenshot.mjs <url> <out.png> [width] [height] [scale] [full]

# 例：375 × 812 @2x 整页
node tools/screenshot.mjs 'http://127.0.0.1:5174/index.html' out.png 375 812 2 1
```

`WAIT` 环境变量可调等待毫秒数（默认 4500），`CHROME` 可指定 Chrome 路径。

`screenshots/` 未随本仓库分发；需要时用上面的截图脚本重新生成。上一轮评审覆盖：

- 首页：`redesign-home-1440 / 768 / 375`
- 作品库：`redesign-works-1440 / 768 / 375`，空态 / 加载态 / 错误态 `redesign-works-empty / loading / error-1440`
- 详情：`redesign-work-1440 / 375`、`redesign-lightbox-1440`
- 索引：`redesign-characters-1440 / 768 / 375`、`redesign-topics-1440 / 768 / 375`
- 社群：`redesign-community-1440 / 768 / 375`
- 抽屉：`redesign-sidebar-1440`、`redesign-sidebar-375`
- 语言：`redesign-home-en-1440`、`redesign-works-ja-1440`
- 明暗：`redesign-light-home / works / characters / community-1440`

## 原型边界

- **只做演示的数据**：收藏存在 `localStorage` 的 `deepsea-prototype-favorites`，语言存在 `deepsea-prototype-lang`，明暗模式存在 `deepsea-prototype-theme`（`light` / `dark`），与生产 key 不同，清掉不影响站点。
- **可访问性**：三语文案同时覆盖可见文本、`aria-label` 与 `placeholder`；焦点环 3px 青色；移动端控件与筛选 chip ≥44px；reduced-motion 下关闭海报展开、骨架脉冲和过渡。
- **多图是版式替身**：详情页的缩略图条暂时用「同角色作品」模拟系列 / 多图；生产阶段由 `works.json` 的可选 `images` / `seriesId` 驱动。
- **文案已按定稿口径重写**：中文为源，en / ja 同步在 `prototype.js` 的 `I18N` 里。审核通过后才搬进 `lang.js`。
- **没有迁移生产资源**：hero 图仍在 `assets/`，没有写进内容仓；`gallery.css` / `--gallery-*` 没有进入本原型。
- **CDN 只属于原型**：Tailwind Play CDN、DaisyUI `styled.css`、HarmonyOS Sans 字体都从 jsDelivr 拉取，离线打开会退回系统字体、按钮样式也会缺一部分；上线前必须换成自托管构建产物。
- **已知限制**：大图与缩略图依赖 GitHub Raw，弱网下会先显示加载状态；`works.json` 约 574 KB，原型不做分片；作品库首屏 48 件、之后每批 48 件，未做虚拟列表。
