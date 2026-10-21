<div align="center">
  <img src="assets/avatar.png" alt="蓝色大肥鱼" width="80" height="80">
  <h1>蓝色大肥鱼 · 深海海报</h1>
  <p><strong>以作品为中心的 AI 娘二创档案</strong></p>
  <p>深海视觉 · 三语界面 · 明暗主题 · 静态部署</p>
  <p>
    <strong>简体中文</strong> · <a href="README.en.md">English</a>
  </p>
  <p>
    <a href="https://carlorine.github.io/bluedafeiyu-design/">在线预览</a> ·
    <a href="DESIGN.md">设计规范</a> ·
    <a href="CONTRIBUTING.md">贡献指南</a> ·
    <a href="https://github.com/Carlorine/bluedafeiyu-design/actions">构建状态</a>
  </p>
  <img src="assets/hero.png" alt="深海主题主视觉：蓝白色角色与海洋背景" width="100%">
</div>

## 关于项目

「深海海报」是蓝色大肥鱼作品档案的静态视觉原型，用于展示与评审页面设计和交互。以图片为主线，将作品浏览、角色索引、精选合集与社群入口串联起来。

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>作品发现</h3>
      <p>按类型、角色或合集浏览，支持关键词搜索、排序与可分享的筛选状态。</p>
    </td>
    <td width="33%" valign="top">
      <h3>沉浸阅读</h3>
      <p>海报首屏、大图灯箱与相关作品，兼顾手机和桌面浏览。</p>
    </td>
    <td width="33%" valign="top">
      <h3>自由切换</h3>
      <p>提供中文、英文、日文界面，以及深色和浅色主题。</p>
    </td>
  </tr>
</table>

> 本项目使用已有内容快照，包含收藏交互演示，不提供账号系统、投稿后台或生产内容管理。

## 探索页面

| 页面 | 内容 |
| --- | --- |
| [首页](https://carlorine.github.io/bluedafeiyu-design/) | 海报、最近作品、角色与精选合集 |
| [作品库](https://carlorine.github.io/bluedafeiyu-design/works.html) | 搜索、类型 / 角色 / 合集筛选、排序与加载更多 |
| [作品详情示例](https://carlorine.github.io/bluedafeiyu-design/work.html?slug=deepseek202610020028) | 大图、作品信息、相关作品与灯箱 |
| [角色](https://carlorine.github.io/bluedafeiyu-design/characters.html) | 按作品数量排序的角色索引 |
| [合集](https://carlorine.github.io/bluedafeiyu-design/topics.html) | 合集封面、说明与收录预览 |
| [社群](https://carlorine.github.io/bluedafeiyu-design/community.html) | QQ 群、投稿说明与群规 |
| [收藏](https://carlorine.github.io/bluedafeiyu-design/favorites.html) | 收藏作品与空态展示 |

作品库的筛选状态可直接分享：[插画 · 最新收录](https://carlorine.github.io/bluedafeiyu-design/works.html?t=illustration&sort=new)。更多状态与交互说明见[评审参考](docs/prototype-reference.md#可分享的-url-状态)。

## 技术与构建

使用原生 **HTML / CSS / JavaScript**，结合 **Tailwind CSS 3** 与 **DaisyUI 4**。Tailwind 在构建时生成工具类，DaisyUI 样式随静态产物发布，无需浏览器运行 Tailwind Play CDN。

构建需要 **Node.js 22.12+** 与 **npm**：

```sh
npm ci
npm run check
```

`npm run check` 执行主题回归、JavaScript 语法检查、静态构建和资源链接校验。单独构建可使用 `npm run build`；安装、开发与数据更新流程见[贡献指南](CONTRIBUTING.md)。

<details>
<summary><strong>依赖与内容来源</strong></summary>

- 依赖树由 `package-lock.json` 固定，持续集成使用 `npm ci` 安装。
- HarmonyOS Sans 与 Noto Serif 字体通过 jsDelivr 加载，失败时回退到系统字体。
- 作品缩略图与大图来自 `lmy414/ai-girl-stickers` 的 GitHub Raw，加载效果取决于外部网络。
- 当前保留与原型兼容的 Tailwind 3 / DaisyUI 4；Tailwind 的间接开发依赖存在已知审计告警。这些依赖仅在构建时运行，不进入发布的 JavaScript，升级主版本前需重新验证视觉效果。

</details>

## 静态托管

[GitHub Actions](https://github.com/Carlorine/bluedafeiyu-design/actions) 自动检查并构建项目，再将静态产物发布至 **GitHub Pages**。在线预览展示最近一次成功部署的版本，Pull Request 仅运行检查。

构建产物也可部署到其他静态托管服务，无需 Node.js 服务端、数据库或环境变量。发布内容仅包含页面、运行时样式与脚本、图标、图片、作品数据和许可文件。

## 文档与贡献

- [设计规范](DESIGN.md)：视觉 token、版式与交互要求。
- [贡献指南](CONTRIBUTING.md)：开发、验证和 commit 标题与正文规范。
- [评审参考](docs/prototype-reference.md)：交互细节、状态参数与原型边界。

提交说明采用 `type(scope): 简短说明`，一个提交聚焦一个目的。页面变更请附截图，并检查手机 / 桌面、深色 / 浅色和受影响语言。

## 许可

代码以 [MIT License](LICENSE) 分发，保留原作者版权声明。作品图片、角色形象、字体和第三方图标遵循各自授权；仓库的 MIT 许可不代替这些内容的授权。

<hr>
<p align="center">
  <a href="https://carlorine.github.io/bluedafeiyu-design/">探索深海档案 →</a>
</p>
