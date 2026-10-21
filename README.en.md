<div align="center">
  <img src="assets/avatar.png" alt="Blue Big Fat Fish" width="80" height="80">
  <h1>Blue Big Fat Fish · Deep Sea Archive</h1>
  <p><strong>An image-first archive of AI character fan art</strong></p>
  <p>Deep sea visuals · Three languages · Light &amp; dark themes · Static hosting</p>
  <p>
    <a href="README.md">简体中文</a> · <strong>English</strong>
  </p>
  <p>
    <a href="https://carlorine.github.io/bluedafeiyu-design/?lang=en">Live preview</a> ·
    <a href="DESIGN.md">Design guidelines</a> ·
    <a href="CONTRIBUTING.md">Contributing</a> ·
    <a href="https://github.com/Carlorine/bluedafeiyu-design/actions">Build status</a>
  </p>
  <img src="assets/hero.png" alt="Deep sea hero artwork featuring a blue-and-white character against an ocean backdrop" width="100%">
</div>

## About

Deep Sea Archive is a static visual prototype for the Blue Big Fat Fish artwork archive, created to present and review its design and interactions. An image-first layout connects artwork discovery, character indexes, curated collections, and community links.

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>Discover artwork</h3>
      <p>Browse by type, character, or collection, with keyword search, sorting, and shareable filters.</p>
    </td>
    <td width="33%" valign="top">
      <h3>Explore the details</h3>
      <p>A poster-style opening, image lightbox, and related artwork, designed for phones and desktops.</p>
    </td>
    <td width="33%" valign="top">
      <h3>Make it yours</h3>
      <p>Switch between Chinese, English, and Japanese, with light and dark themes.</p>
    </td>
  </tr>
</table>

> This prototype uses an existing content snapshot and includes a favorites interaction demo. It does not provide user accounts, a submission backend, or production content management.

## Explore the pages

| Page | Highlights |
| --- | --- |
| [Home](https://carlorine.github.io/bluedafeiyu-design/?lang=en) | Hero artwork, recent additions, characters, and featured collections |
| [Library](https://carlorine.github.io/bluedafeiyu-design/works.html?lang=en) | Search, type / character / collection filters, sorting, and load more |
| [Artwork example](https://carlorine.github.io/bluedafeiyu-design/work.html?slug=deepseek202610020028&lang=en) | Full-size image, artwork details, related works, and a lightbox |
| [Characters](https://carlorine.github.io/bluedafeiyu-design/characters.html?lang=en) | Character index ordered by artwork count |
| [Collections](https://carlorine.github.io/bluedafeiyu-design/topics.html?lang=en) | Cover images, descriptions, and artwork previews |
| [Community](https://carlorine.github.io/bluedafeiyu-design/community.html?lang=en) | QQ groups, submission information, and community guidelines |
| [Favorites](https://carlorine.github.io/bluedafeiyu-design/favorites.html?lang=en) | Saved artwork and an empty-state view |

Library filters can be shared directly: [Illustrations · Newest first](https://carlorine.github.io/bluedafeiyu-design/works.html?t=illustration&sort=new&lang=en). See the [prototype reference](docs/prototype-reference.md#可分享的-url-状态) for additional states and interactions.

## Technology & build

Built with native **HTML / CSS / JavaScript**, **Tailwind CSS 3**, and **DaisyUI 4**. Tailwind generates utility classes during the build, and DaisyUI styles ship with the static assets. The browser does not need the Tailwind Play CDN.

Building requires **Node.js 22.12+** and **npm**:

```sh
npm ci
npm run check
```

`npm run check` runs theme regression tests, JavaScript syntax checks, the static build, and asset link validation. Use `npm run build` for a standalone build. See the [contribution guide](CONTRIBUTING.md) for setup, development, and data updates.

<details>
<summary><strong>Dependencies & content sources</strong></summary>

- `package-lock.json` pins the dependency tree; continuous integration installs it with `npm ci`.
- HarmonyOS Sans and Noto Serif fonts load through jsDelivr, with system fonts as a fallback.
- Artwork thumbnails and full-size images are served from `lmy414/ai-girl-stickers` via GitHub Raw. Availability depends on the external network.
- Tailwind 3 / DaisyUI 4 are retained for visual compatibility. Tailwind's transitive development dependencies have known audit findings. These dependencies run only during the build and are not included in the published JavaScript. Major upgrades require renewed visual verification.

</details>

## Static hosting

[GitHub Actions](https://github.com/Carlorine/bluedafeiyu-design/actions) checks and builds the project, then publishes the static output to **GitHub Pages**. The live preview shows the latest successful deployment. Pull requests run checks only.

The build output can also be deployed to other static hosting services, without a Node.js server, database, or environment variables. Published files include only pages, runtime styles and scripts, icons, images, artwork data, and license information.

## Documentation & contributing

- [Design guidelines](DESIGN.md): visual tokens, layouts, and interaction requirements.
- [Contribution guide](CONTRIBUTING.md): development, validation, and commit title and body conventions.
- [Prototype reference](docs/prototype-reference.md): interaction details, state parameters, and prototype limitations.

Supporting documents are currently in Chinese. Use `type(scope): short description` for commit titles, with one purpose per commit. For page changes, include screenshots and check phone / desktop layouts, light / dark themes, and affected languages.

## License

Code is distributed under the [MIT License](LICENSE), with the original copyright notice retained. Artwork, character designs, fonts, and third-party icons remain subject to their own licenses; this repository's MIT license does not replace those permissions.

<hr>
<p align="center">
  <a href="https://carlorine.github.io/bluedafeiyu-design/?lang=en">Explore the archive →</a>
</p>
