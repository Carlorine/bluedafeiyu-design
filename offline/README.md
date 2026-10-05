# 完整离线 HTML 包（深海原型）

这是深海原型 7 个页面的完整 HTML/CSS/JS 副本。

## 运行

```bash
cd offline
python3 -m http.server 8081
```

打开 <http://127.0.0.1:8081/index.html>。

## 说明

- 7 个页面、`deepsea.css`、`prototype.js`、`theme.js`、`icons.svg`、`works.json` 与本地素材都在本目录。
- 作品图走 GitHub Raw，字体 / DaisyUI / Tailwind 走 CDN，需要联网。
- 页面使用相对路径，但仍需静态服务器（`fetch('works.json')` 不支持 `file://`）。
