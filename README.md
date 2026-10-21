# 蓝色大肥鱼 · 深海海报

AI 娘二创作品档案的静态视觉原型，用于评审页面设计与交互。包含作品浏览、角色索引、合集、社群和本机收藏，支持中 / 英 / 日三语及深浅主题。

[在线预览](https://carlorine.github.io/bluedafeiyu-design/) · [设计规范](DESIGN.md) · [贡献指南](CONTRIBUTING.md) · [交互与评审参考](docs/prototype-reference.md)

> 本仓库负责设计原型。内容数据来自现有快照；收藏保存在访问者的浏览器中，不提供账号、投稿后台或生产内容管理。

## 快速开始

需要 Node.js 22.12+、npm，以及本地预览使用的 Python 3。

```sh
gh repo clone Carlorine/bluedafeiyu-design
cd bluedafeiyu-design
npm ci
npm run dev
```

打开 <http://127.0.0.1:5174/>。`dev` 先构建再启动服务；修改文件后重新构建并刷新页面。不要直接双击 HTML，浏览器的 `file://` 限制会阻止读取 `works.json`。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 构建并在本机 5174 端口预览 |
| `npm run build` | 生成可部署的 `dist/` |
| `npm run serve` | 预览已有的 `dist/` |
| `npm test` | 执行明暗主题行为回归 |
| `npm run check` | 测试、JS 语法检查、构建、静态资源及链接校验 |
| `npm run data -- --snapshot /path/to/site-data.json` | 从生产快照重新生成 `works.json` |
| `npm run screenshot -- <url> <out.png> [width] [height] [scale] [full]` | 使用本机 Chrome 截图 |

## 页面与功能

| 页面 | 入口 | 内容 |
| --- | --- | --- |
| 首页 | `index.html` | 海报、最近作品、角色与精选合集 |
| 作品库 | `works.html` | 搜索、类型 / 角色 / 合集筛选、排序、加载更多 |
| 作品详情 | `work.html?slug=<slug>` | 大图、作品信息、相关作品与灯箱 |
| 角色 | `characters.html` | 按作品数量排序的角色索引 |
| 合集 | `topics.html` | 合集封面、说明与收录预览 |
| 社群 | `community.html` | QQ 群、投稿说明与群规 |
| 收藏 | `favorites.html` | 当前浏览器保存的收藏 |

筛选状态可通过 URL 分享，例如 `works.html?t=illustration&sort=new`；语言可用 `?lang=zh|en|ja` 指定。加载 / 空 / 错误态与灯箱等评审入口见[交互参考](docs/prototype-reference.md#可分享的-url-状态)。

## 构建与依赖

页面使用原生 HTML / CSS / JavaScript。Tailwind CSS 3 在构建时扫描页面与脚本生成工具类，DaisyUI 4 样式从锁定的 npm 包复制到 `dist/vendor/`，浏览器无需运行 Tailwind Play CDN。

`tools/build.mjs` 每次清理 `dist/`，仅复制七个页面、运行时 CSS / JS、图标、图片、作品数据和许可文件。仓库文档、开发工具、依赖目录与 Git 元数据不会发布。所有站内地址使用相对路径，可部署到 GitHub Pages 的仓库子路径。

- `package-lock.json` 固定依赖树，CI 使用 `npm ci` 安装。
- 字体仍通过 jsDelivr 加载，失败时回退到系统字体。
- 作品缩略图与大图来自 `lmy414/ai-girl-stickers` 的 GitHub Raw，访问效果取决于外部网络。
- 收藏、语言与主题使用 `deepsea-prototype-*` localStorage key。预览域名变化时，本机状态不会跨域迁移。
- 当前保留与原型兼容的 Tailwind 3 / DaisyUI 4；`npm audit` 对 Tailwind 的间接开发依赖有已知告警。它们仅在构建时运行，不进入发布的 JavaScript；升级主版本前需要重新验证视觉效果。

## 静态托管

本仓库通过 [GitHub Actions](https://github.com/Carlorine/bluedafeiyu-design/actions) 构建，并把 `dist/` 部署到 GitHub Pages：

1. 在仓库 **Settings → Pages → Build and deployment** 选择 **GitHub Actions**。
2. push 到 `main` 或本次整理分支 `codex/repository-standards` 时，`pages.yml` 自动执行完整检查。
3. 检查通过后上传静态产物并发布；失败时停止部署，可在 Actions 中查看日志。

[预览地址](https://carlorine.github.io/bluedafeiyu-design/)展示最近一次成功部署的版本。当前整理分支与 `main` 共用一个预览地址；合并后可从 `pages.yml` 的触发分支中移除整理分支。Pull Request 只执行检查，不会覆盖预览。

也可以把 `npm run build` 生成的 `dist/` 上传到任意静态服务器，无需 Node.js 服务端、数据库或环境变量。

## 目录

```text
├── *.html                  七个页面
├── deepsea.css             设计 token、布局与明暗主题
├── prototype.js            数据渲染、筛选、收藏与三语文案
├── theme.js                首屏主题恢复与跨标签同步
├── works.json              已生成的作品快照
├── assets/                 海报、头像、群二维码
├── tools/                  构建、产物检查、数据生成与截图
├── .github/                CI、Pages 工作流与 PR 模板
├── docs/                   评审参考与调研材料
├── DESIGN.md               视觉与交互规范
└── CONTRIBUTING.md         开发流程与提交说明规范
```

## 参与贡献

请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。提交说明采用 `type(scope): 简短说明`；一个提交聚焦一个目的，正文按需解释原因、关键取舍与验证方式。页面变更应附截图，并检查手机 / 桌面、深色 / 浅色和受影响语言。

## 许可

代码按 [MIT License](LICENSE) 分发，保留原作者版权声明。作品图片、角色形象、字体与第三方图标遵循各自授权；仓库的 MIT 许可不代替这些内容的授权。
