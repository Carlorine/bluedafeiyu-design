import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('./theme.js', import.meta.url), 'utf8');
const key = 'deepsea-prototype-theme';

function openPage({ saved, unavailable = false } = {}) {
  const document = new EventTarget();
  const window = new EventTarget();
  const root = { dataset: {} };
  const meta = {};
  const storage = new Map(saved ? [[key, saved]] : []);
  document.documentElement = root;
  document.querySelector = () => meta;
  class Element { closest() { return this; } }
  vm.runInNewContext(source, {
    document, window, Element, CustomEvent,
    localStorage: {
      getItem(name) { if (unavailable) throw new Error('Storage blocked'); return storage.get(name); },
      setItem(name, value) { if (unavailable) throw new Error('Storage blocked'); storage.set(name, value); },
    },
  });
  return {
    root, meta, storage,
    click() {
      const event = new Event('click');
      Object.defineProperty(event, 'target', { value: new Element() });
      document.dispatchEvent(event);
    },
    receiveStorage(name, newValue) {
      const event = new Event('storage');
      Object.assign(event, { key: name, newValue });
      window.dispatchEvent(event);
    },
  };
}

test('a new visitor keeps the original dark appearance', () => {
  const page = openPage();
  assert.equal(page.root.dataset.colorMode, 'dark');
  assert.equal(page.root.dataset.theme, 'deepsea');
  assert.equal(page.meta.content, '#04121c');
});

test('saved light mode is applied before the page content initializes', () => {
  const page = openPage({ saved: 'light' });
  assert.equal(page.root.dataset.theme, 'deepsea-light');
  assert.equal(page.meta.content, '#f4f7f9');
});

test('toggle survives opening another page and can be switched back', () => {
  const first = openPage();
  first.click();
  assert.equal(first.root.dataset.colorMode, 'light');
  const next = openPage({ saved: first.storage.get(key) });
  assert.equal(next.root.dataset.colorMode, 'light');
  next.click();
  assert.equal(next.root.dataset.colorMode, 'dark');
  assert.equal(next.storage.get(key), 'dark');
});

test('blocked storage and invalid preferences still leave a working toggle', () => {
  const page = openPage({ unavailable: true });
  page.click();
  assert.equal(page.root.dataset.colorMode, 'light');
  page.click();
  assert.equal(page.root.dataset.colorMode, 'dark');
  assert.equal(openPage({ saved: 'unrecognized' }).root.dataset.colorMode, 'dark');
});

test('another tab can change or reset appearance without unrelated storage affecting it', () => {
  const page = openPage();
  page.receiveStorage(key, 'light');
  assert.equal(page.root.dataset.colorMode, 'light');
  page.receiveStorage('deepsea-prototype-lang', 'en');
  assert.equal(page.root.dataset.colorMode, 'light');
  page.receiveStorage(key, null);
  assert.equal(page.root.dataset.colorMode, 'dark');
  page.receiveStorage(key, 'light');
  page.receiveStorage(null, null);
  assert.equal(page.root.dataset.colorMode, 'dark');
});
