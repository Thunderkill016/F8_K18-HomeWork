import { readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const labRoot = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(labRoot, '..');
const outDir = path.join(labRoot, 'public');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'js-rebuild-lab') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const roots = (await readdir(repoRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && /^(BaiTap|BaiKiemTra|Assignment)/i.test(entry.name));

const items = [];
for (const root of roots) {
  const dir = path.join(repoRoot, root.name);
  const files = await walk(dir);
  const byExt = files.reduce((acc, file) => {
    const ext = path.extname(file).toLowerCase() || '(none)';
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});
  const info = await stat(dir);
  items.push({
    id: root.name,
    title: root.name.replace(/([a-z])([A-Z])/g, '$1 $2'),
    path: root.name,
    fileCount: files.length,
    js: byExt['.js'] || 0,
    html: byExt['.html'] || 0,
    css: byExt['.css'] || 0,
    lastModified: info.mtime.toISOString()
  });
}

items.sort((a, b) => a.title.localeCompare(b.title, 'vi', { numeric: true }));
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'old-work-index.json'), JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2));
console.log(`Indexed ${items.length} legacy assignment folders.`);
