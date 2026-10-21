import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const pages = (await readdir(dist)).filter((name) => name.endsWith('.html'));
assert.equal(pages.length, 7, 'All seven pages must be published');
for (const page of pages) {
  const html = await readFile(resolve(dist, page), 'utf8');
  assert(!html.includes('cdn.tailwindcss.com'), `${page}: runtime Tailwind CDN remains`);
  for (const [, reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
    assert(!reference.startsWith('/'), `${page}: root URL breaks project Pages: ${reference}`);
    const local = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!local) continue;
    const target = resolve(dist, local);
    assert(target.startsWith(dist.endsWith(sep) ? dist : dist + sep), `${page}: path escapes dist`);
    await access(target).catch(() => { throw new Error(`${page}: missing ${local}`); });
  }
}
for (const file of ['deepsea.css', 'vendor/daisyui.css', 'vendor/tailwind.css']) {
  const css = await readFile(resolve(dist, file), 'utf8');
  for (const [, reference] of css.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
    const target = new URL(reference, new URL(file, `file://${dist}`));
    await access(fileURLToPath(target));
  }
}
const data = JSON.parse(await readFile(resolve(dist, 'works.json'), 'utf8'));
assert(data.works.length > 0, 'Preview must contain works');
assert.equal(data.total, data.works.length, 'Data count must match');
assert.equal(new Set(data.works.map((work) => work.slug)).size, data.total, 'Work slugs must be unique');
for (const privateFile of ['.git', '.github', 'node_modules', 'package.json', 'README.md']) {
  await assert.rejects(access(resolve(dist, privateFile)), `${privateFile} must not be deployed`);
}
console.log(`Checked ${pages.length} pages: local links, CSS assets, subpath URLs, data and publish boundary.`);
