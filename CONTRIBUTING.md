# 贡献指南

## 开发与验证

1. 从最新 `main` 建立独立分支，例如 `docs/readme`、`fix/theme-toggle`。代理会话使用 `codex/` 前缀。
2. 执行 `npm ci` 安装锁定的依赖；`npm run dev` 构建并启动本机预览。
3. 修改与当前任务相关的文件，沿用两空格、UTF-8 和 LF；视觉 token 与交互要求见 [DESIGN.md](DESIGN.md)。
4. 提交前执行 `npm run check`。有页面改动时，检查手机与桌面、深浅主题、键盘操作及受影响的中 / 英 / 日文案。
5. 提交 Pull Request 时说明问题、最终行为和验证结果，页面变更附截图或预览地址。

`dev` 不包含热更新。修改后需重新执行 `npm run build`；不要编辑生成的 `dist/`，它不会进入版本控制。更新依赖时同时提交 `package.json` 和 `package-lock.json`，并使用 `npm audit` 检查依赖风险。

## Commit 标题与正文

采用 Conventional Commits 风格，标题写成：

```text
type(scope): 简短说明
```

`scope` 可省略，建议使用 `docs`、`gallery`、`theme`、`build`、`ci` 等明确范围。类型约定：

| 类型 | 使用场景 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | 修复错误 |
| `docs` | 文档修改 |
| `style` | 格式整理，不改变行为 |
| `refactor` | 保持行为的代码重构 |
| `test` | 测试与回归覆盖 |
| `build` | 依赖、构建工具或产物规则 |
| `ci` | 自动检查与部署流程 |
| `chore` | 其他维护工作 |

标题应说明具体变化，避免 `update`、`fix bug` 或 `修改了一些东西`。一行保持简洁；需要更多上下文时，空一行后添加正文，解释原因、关键决策与验证，不重复罗列文件名。相关 issue 可在末尾使用 `Closes #123`。

```text
fix(theme): 恢复跨页面保存的浅色偏好

在页面样式加载前恢复主题，避免切页时闪回深色。
存储不可用时仍允许在当前页面切换。

验证：npm run check；检查刷新、翻页与跨标签同步。
```

破坏兼容性的改动使用 `!`，并在正文增加 `BREAKING CHANGE:` 解释影响和迁移方式。中文和英文均可，保持同一个提交内表述一致。

## 提交范围与历史

- 一次提交只表达一个目的。文档、构建工具、部署流程可以分成独立提交；测试跟随对应行为。
- 仅提交自己的修改。同一文件包含无关变更时按 hunk 拆分。
- 可以修订明确属于本次任务的未发布本地提交；已推送、已评审或共享的历史，改写前必须与维护者确认。
- 不为统一文风重写既有提交。新的规范约束后续贡献，保留原有历史及归属。
- 仓库使用原生 Git 普通分支管理，使用 `git switch`、`git add`、`git commit` 和 `git push`，不启用 GitButler 工作区。先查看 `git status` 和 `git diff`，再按文件或使用 `git add -p` 选择本次改动。

## 数据与资源

作品快照通过以下命令生成：

```sh
npm run data -- --snapshot /absolute/path/to/site-data.json
```

该命令会覆盖根目录的 `works.json`，不会自动获取生产数据。更新后应检查统计、作品详情、图片和角色 / 合集索引；不要手工批量修改生成数据来绕过源数据问题。

作品图片和角色形象须保留原有署名与授权信息；不要把第三方内容解释为 MIT 授权。不要提交密钥、`.env`、`node_modules/`、截图临时文件或 `dist/`。

## 部署

Pull Request 会运行 `.github/workflows/ci.yml`。`main` 和当前整理分支的 push 会触发 `.github/workflows/pages.yml`：检查、构建、上传 `dist/`、部署 GitHub Pages。当前只有一个共享预览地址，详见 [README](README.md#静态托管)。
