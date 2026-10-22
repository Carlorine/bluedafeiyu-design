# 项目代理说明

本项目使用原生 Git 普通分支管理。本文件覆盖上级目录中要求使用 GitButler（`but`）的版本控制说明。

- 使用 `git status`、`git diff`、`git switch`、`git add`、`git commit` 和 `git push`；不要运行 `but setup` 或启用 GitButler 工作区。
- 每次代理任务从最新 `main` 建立独立的 `codex/` 分支，除非用户指定其他分支安排。
- 仅提交当前任务的修改；同一文件中的无关改动使用 `git add -p` 拆分，不改动其他协作者的工作。
- 仅在用户要求时推送或创建 Pull Request；不强制推送或改写共享历史。
- 提交规范及验证要求见 [CONTRIBUTING.md](CONTRIBUTING.md)。
