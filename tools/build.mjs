import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const require = createRequire(import.meta.url);
const pages = ['index', 'works', 'work', 'characters', 'topics', 'community', 'favorites'];

// Publish an explicit allowlist: development files and repository metadata stay local.
await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, 'vendor'), { recursive: true });
for (const file of [...pages.map((page) => `${page}.html`), 'deepsea.css', 'prototype.js', 'theme.js', 'icons.svg', 'works.json', 'assets', 'LICENSE']) {
  await cp(resolve(root, file), resolve(dist, file), { recursive: true });
}
await cp(require.resolve('daisyui/dist/styled.css'), resolve(dist, 'vendor/daisyui.css'));
const result = spawnSync(process.execPath, [
  require.resolve('tailwindcss/lib/cli.js'), '-c', 'tailwind.config.cjs',
  '-i', 'tools/tailwind.css', '-o', 'dist/vendor/tailwind.css', '--minify',
], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
await writeFile(resolve(dist, '.nojekyll'), '');
const data = JSON.parse(await readFile(resolve(dist, 'works.json'), 'utf8'));
console.log(`Built ${pages.length} pages and ${data.works.length} works → dist/`);
