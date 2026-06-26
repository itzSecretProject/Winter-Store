import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "products");
const dataFile = join(root, "src", "data", "images.js");

const spec = [
  { key: "hero", id: "1614270263016-ce6e3f460154", w: 440, h: 560 },
  { key: "angleA", id: "1606821226898-60ed355f9654", w: 260, h: 320 },
  { key: "angleB", id: "1612964627570-769abf00d41f", w: 260, h: 320 },
  { key: "feature", id: "1606821226898-60ed355f9654", w: 440, h: 580 },
  { key: "mountain", id: "1559208722-abb22e0e918e", w: 1600, h: 760, single: true },
  { key: "auroraSilver", id: "1612964627570-769abf00d41f", w: 380, h: 480 },
  { key: "sweetSilver", id: "1544620862-d47d57948ecc", w: 380, h: 480 },
  { key: "stealthBlack", id: "1556098539-3019e1bdf05e", w: 380, h: 480 },
  { key: "glacierWhite", id: "1599751449029-e4ea8f21d966", w: 380, h: 480 },
  { key: "polarGloss", id: "1681394345451-e640f3177404", w: 380, h: 480 },
  { key: "stealthHeavy", id: "1551318181-655e9748c0a6", w: 380, h: 480 },
  { key: "icefieldBlue", id: "1608113562252-b320e7628e17", w: 380, h: 480 },
  { key: "polarWhite", id: "1548624313-0396c75e4b1a", w: 380, h: 480 },
];

const url = (id, params) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=webp&${params}`;

async function grab(link) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(link);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  throw new Error(`Failed: ${link}`);
}

async function run() {
  await mkdir(outDir, { recursive: true });
  const entries = {};

  for (const item of spec) {
    const { key, id, w, h, single } = item;

    const main = await grab(url(id, `w=${w}&h=${h}&q=72`));
    await writeFile(join(outDir, `${key}.webp`), main);

    let srcSet = `/products/${key}.webp 1x`;
    if (!single) {
      const retina = await grab(url(id, `w=${w * 2}&h=${h * 2}&q=58`));
      await writeFile(join(outDir, `${key}@2x.webp`), retina);
      srcSet += `, /products/${key}@2x.webp 2x`;
    }

    const tiny = await grab(url(id, `w=24&h=${Math.round((24 * h) / w)}&q=30&blur=160`));
    const lqip = `data:image/webp;base64,${tiny.toString("base64")}`;

    entries[key] = { src: `/products/${key}.webp`, srcSet, lqip };
    console.log(`✓ ${key} (${(main.length / 1024).toFixed(1)} KB)`);
  }

  const body = `export const images = ${JSON.stringify(entries, null, 2)};\n`;
  await writeFile(dataFile, body);
  console.log(`\nWrote ${Object.keys(entries).length} images to src/data/images.js`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
