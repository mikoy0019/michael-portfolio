// Next.js `output: "export"` writes RSC prefetch segments as nested files, e.g.
//   out/work/dinkup/__next.work/$d$slug/__PAGE__.txt
// but the client requests the flat form
//   out/work/dinkup/__next.work.$d$slug.__PAGE__.txt
// Vercel's runtime bridged that gap; a plain static host (Cloudflare Workers assets) does not, so every
// case-study page logged a 404. This copies each nested segment file to its flat name after the build.
import { promises as fs } from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] ?? "out");
let copied = 0;

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      await flatten(full, entry.name);
    } else {
      await walk(full);
    }
  }
}

// `prefix` is the flat name built so far, e.g. "__next.work". Files directly under a segment dir keep
// joining with dots: __next.work + $d$slug + __PAGE__.txt -> __next.work.$d$slug.__PAGE__.txt
async function flatten(dir, prefix) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await flatten(full, `${prefix}.${entry.name}`);
    } else {
      const target = path.join(path.dirname(rootOf(dir, prefix)), `${prefix}.${entry.name}`);
      await fs.copyFile(full, target);
      copied++;
    }
  }
}

// Directory that contains the top-level `__next.*` segment dir (where the flat file must land).
function rootOf(dir, prefix) {
  const depth = prefix.split(".").length - 2; // nested levels below the `__next.<seg>` dir
  let root = dir;
  for (let i = 0; i < depth; i++) root = path.dirname(root);
  return root;
}

await walk(OUT);
console.log(`flatten-rsc-segments: wrote ${copied} flat segment file(s) under ${OUT}`);
