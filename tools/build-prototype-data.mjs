#!/usr/bin/env node
/**
 * Build the Deep Sea prototype's data file from the real site snapshot.
 *
 *   node tools/build-prototype-data.mjs
 *
 * Reads  <snapshot> (site-data.json from a production build)
 * Writes ./works.json
 *
 * The prototype is a review artifact, not a production build step.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = root;
const RAW = 'https://raw.githubusercontent.com/lmy414/ai-girl-stickers/main/dist/';

const snapshotArg = process.argv.indexOf('--snapshot');
const snapshotPath = snapshotArg > 0
  ? path.resolve(process.argv[snapshotArg + 1])
  : path.resolve(root, 'site-data.json');
if (!fs.existsSync(snapshotPath)) {
  console.error('缺少生产快照：请用 --snapshot <path/to/site-data.json> 指定');
  process.exit(1);
}
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

const chars = new Map(snapshot.characters.map((c) => [c.id, c]));
const cats = new Map(snapshot.categories.map((c) => [c.id, c]));

const topicIdsByWork = new Map();
for (const topic of snapshot.topics || []) {
  for (const id of topic.workIds || []) {
    if (!topicIdsByWork.has(id)) topicIdsByWork.set(id, []);
    topicIdsByWork.get(id).push(topic.id);
  }
}

function abs(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return RAW + url.replace(/^\/+/, '');
}

const LICENSE_LABELS = {
  'submitter-permission': '投稿者授权',
  'author-permission': '作者授权',
  'cc-by-nc': 'CC BY-NC',
  cc0: 'CC0',
  unknown: '未标注',
};

function licenseLabel(license) {
  if (!license || !license.type || license.type === 'unknown') return '未标注';
  return LICENSE_LABELS[license.type] || license.type;
}

function sourceLabel(work) {
  if (work.source === 'submission') return '投稿';
  const via = work.origin && work.origin.via;
  if (via === 'qq-group') return 'QQ 群';
  if (via === 'github') return 'GitHub';
  if (via === 'web') return '本站收录';
  return '本站收录';
}

const works = [...snapshot.works]
  .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')) || String(b.slug).localeCompare(String(a.slug)))
  .map((w) => {
    const character = chars.get(w.characterId);
    return {
      slug: w.slug,
      name: w.name,
      charId: w.characterId,
      charName: character ? character.name : w.characterId,
      catIds: w.categoryIds || [],
      cats: (w.categoryIds || []).map((id) => (cats.get(id) ? cats.get(id).name : id)),
      tags: w.tags || [],
      thumb: abs(w.thumbUrl || w.thumbnailPath),
      large: abs(w.displayUrl || w.fullPath || w.path),
      original: abs(w.originalUrl || w.path),
      width: w.width || 0,
      height: w.height || 0,
      format: (w.format || (w.path || '').split('.').pop() || '').toUpperCase(),
      date: (w.createdAt || '').slice(0, 10),
      author: (w.submitter && (w.submitter.name || w.submitter.github)) || '',
      license: licenseLabel(w.license),
      source: sourceLabel(w),
      commentary: w.commentary || '',
      description: w.description || '',
      topicIds: topicIdsByWork.get(w.id) || [],
    };
  });

// Character index uses the full collection, not just the visible grid.
const characterCounts = new Map();
for (const w of works) characterCounts.set(w.charId, (characterCounts.get(w.charId) || 0) + 1);
const characterThumbs = new Map();
for (const w of works) if (!characterThumbs.has(w.charId)) characterThumbs.set(w.charId, w.thumb);

const characters = snapshot.characters
  .filter((c) => characterCounts.get(c.id))
  .map((c) => ({
    id: c.id,
    name: c.name,
    count: characterCounts.get(c.id),
    thumb: characterThumbs.get(c.id) || '',
  }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

const categories = snapshot.categories.map((c) => ({
  id: c.id,
  name: c.name,
  description: c.description || '',
  count: works.filter((w) => w.catIds.includes(c.id)).length,
}));

const topics = (snapshot.topics || []).map((t) => {
  const coverSource = snapshot.works.find((x) => x.id === t.coverWorkId);
  const coverWork = coverSource ? works.find((w) => w.slug === coverSource.slug) : null;
  return {
    id: t.id,
    name: t.name,
    summary: t.summary || '',
    author: t.author ? { name: t.author.name, url: t.author.url || '' } : null,
    count: (t.workIds || []).length,
    cover: coverWork ? coverWork.thumb : '',
    coverSlug: coverWork ? coverWork.slug : '',
  };
});

const data = {
  generatedAt: new Date().toISOString(),
  total: works.length,
  works,
  characters,
  categories,
  topics,
};

fs.mkdirSync(path.join(outDir, 'assets'), { recursive: true });
fs.writeFileSync(path.join(outDir, 'works.json'), JSON.stringify(data));

const bytes = fs.statSync(path.join(outDir, 'works.json')).size;
console.log(`wrote ${works.length} works, ${characters.length} characters, ${topics.length} topic(s)`);
console.log(`works.json: ${(bytes / 1024).toFixed(1)} KB`);
