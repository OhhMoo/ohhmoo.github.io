import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const BASE = 'https://georgialyu.com';

const assets = [
  // Favicon
  { src: '/public/favicon-update.png', dst: 'seo/favicon.png' },
  // Cover
  { src: '/public/cover-image.jpg', dst: 'seo/cover-image.jpg' },
  // Characters (1-13, 15 — note no 14)
  ...['1','2','3','4','5','6','7','8','9','10','11','12','13','15'].map(n => ({
    src: `/public/homepage-interaction/characters/${n}.jpg`,
    dst: `images/characters/${n}.jpg`,
  })),
  // Bottom characters
  { src: '/public/homepage-interaction/buttom-characters/1.jpg', dst: 'images/buttom-characters/1.jpg' },
  { src: '/public/homepage-interaction/buttom-characters/2.jpg', dst: 'images/buttom-characters/2.jpg' },
  // Extras
  { src: '/public/homepage-interaction/extra-1.png', dst: 'images/extra-1.png' },
  { src: '/public/homepage-interaction/extra-buttom1.png', dst: 'images/extra-buttom1.png' },
  // Project hero images
  { src: '/public/projects-hero-img/brix.jpg', dst: 'images/projects-hero/brix.jpg' },
  { src: '/public/projects-hero-img/opus-1.jpg', dst: 'images/projects-hero/opus-1.jpg' },
  { src: '/public/projects-hero-img/uilabs-2.jpg', dst: 'images/projects-hero/uilabs-2.jpg' },
  { src: '/public/projects-hero-img/moka.jpg', dst: 'images/projects-hero/moka.jpg' },
];

const videos = [
  { url: 'https://github.com/georgialyu05/georgialyu-portfolio-website/releases/download/v1-assets/brix-hero-video1.mp4', dst: 'videos/brix-hero-video1.mp4' },
  { url: 'https://github.com/georgialyu05/georgialyu-portfolio-website/releases/download/v1-assets/opus-hero-video1.mp4', dst: 'videos/opus-hero-video1.mp4' },
  { url: 'https://github.com/georgialyu05/georgialyu-portfolio-website/releases/download/v1-assets/uilabs-video1.mp4', dst: 'videos/uilabs-video1.mp4' },
];

async function downloadOne(url, dstAbs) {
  await mkdir(dirname(dstAbs), { recursive: true });
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dstAbs, buf);
  return buf.length;
}

async function runBatch(items, getUrl, label) {
  const limit = 4;
  let i = 0;
  const results = { ok: 0, fail: 0 };
  async function worker() {
    while (i < items.length) {
      const item = items[i++];
      const url = getUrl(item);
      const dst = join(PUBLIC, item.dst);
      try {
        const size = await downloadOne(url, dst);
        results.ok++;
        process.stdout.write(`✓ ${item.dst} (${(size/1024).toFixed(0)}kb)\n`);
      } catch (e) {
        results.fail++;
        process.stdout.write(`✗ ${item.dst} — ${e.message}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  console.log(`[${label}] done. ok=${results.ok} fail=${results.fail}`);
}

console.log('=== Images ===');
await runBatch(assets, a => BASE + a.src, 'images');
console.log('=== Videos ===');
await runBatch(videos, v => v.url, 'videos');
console.log('All done.');
