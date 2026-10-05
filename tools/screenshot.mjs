#!/usr/bin/env node
/**
 * Tiny CDP screenshot helper for the Phase 0 prototype. No npm dependencies.
 *
 *   node tools/screenshot.mjs <url> <out.png> [width] [height] [scale] [full]
 *
 * Example:
 *   node tools/screenshot.mjs 'http://127.0.0.1:5174/index.html' out.png 375 812 2 1
 *
 * Chrome's `--window-size` is clamped on macOS, so this drives a real device
 * metrics override over the DevTools Protocol instead.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [url, out, widthArg = '1440', heightArg = '1200', scaleArg = '1', fullArg = '0'] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node tools/screenshot.mjs <url> <out.png> [width] [height] [scale] [full]');
  process.exit(1);
}

const width = Number(widthArg);
const height = Number(heightArg);
const scale = Number(scaleArg);
const full = fullArg === '1';
const waitMs = Number(process.env.WAIT || 4500);
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + (process.pid % 500);
const userDataDir = `/tmp/deepsea-shot-${process.pid}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

if (!fs.existsSync(chrome)) {
  console.error(`Chrome not found: ${chrome}\nSet CHROME=/path/to/chrome`);
  process.exit(1);
}

const child = spawn(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  'about:blank',
], { stdio: 'ignore' });

function cleanup() {
  try { child.kill('SIGTERM'); } catch { /* noop */ }
}
process.on('exit', cleanup);

async function waitForJson(pathname, timeout = 12000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}${pathname}`);
      if (response.ok) return await response.json();
    } catch {
      /* not ready */
    }
    await sleep(150);
  }
  throw new Error(`DevTools endpoint did not come up: ${pathname}`);
}

async function main() {
  await waitForJson('/json/version');
  let targets = await waitForJson('/json/list');
  let page = targets.find((target) => target.type === 'page');
  if (!page) {
    page = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 0;
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: scale,
    mobile: width <= 900,
  });
  await send('Page.navigate', { url });
  await sleep(waitMs);

  if (full) {
    const metrics = await send('Page.getLayoutMetrics');
    const content = metrics.cssContentSize || metrics.contentSize;
    const tall = Math.min(Math.ceil(content.height), 9000);
    if (tall > height) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height: tall,
        deviceScaleFactor: scale,
        mobile: width <= 900,
      });
      await sleep(1800);
    }
  }

  const image = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, Buffer.from(image.data, 'base64'));
  const stats = fs.statSync(out);
  console.log(`${out}  ${(stats.size / 1024).toFixed(0)} KB  ${width}x${height}@${scale}${full ? ' full' : ''}`);

  try { await send('Browser.close'); } catch { /* noop */ }
  ws.close();
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}).finally(cleanup);
