import fs from "node:fs/promises";
import path from "node:path";

if (process.platform !== "win32") {
  console.log("Next.js Windows export compatibility patches skipped on this platform.");
  process.exit(0);
}

const patches = [
  {
    file: path.join(
      process.cwd(),
      "node_modules",
      "next",
      "dist",
      "shared",
      "lib",
      "segment-cache",
      "segment-value-encoding.js",
    ),
    original: String.raw`segmentPath.replace(/\//g, '.')`,
    replacement: String.raw`segmentPath.replace(/[/\\]/g, '.')`,
    description: "static export path separator fix",
  },
  {
    file: path.join(process.cwd(), "node_modules", "next", "dist", "lib", "multi-file-writer.js"),
    original: String.raw`const promise = this.fs.mkdir(directory);`,
    replacement: String.raw`const promise = this.fs.mkdir(directory).catch((error) => {
            if (error && error.code === 'EPERM') {
                try {
                    if (require('fs').statSync(directory).isDirectory()) return;
                } catch {}
            }
            throw error;
        });`,
    description: "existing segment directory race guard",
  },
];

for (const patch of patches) {
  let source;
  try {
    source = await fs.readFile(patch.file, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.warn(`Skipping Next.js ${patch.description}: expected file was not found.`);
      continue;
    }
    throw error;
  }

  if (source.includes(patch.replacement)) {
    console.log(`Next.js ${patch.description} is already present.`);
    continue;
  }
  if (!source.includes(patch.original)) {
    console.warn(`Skipping Next.js ${patch.description}: expected code was not found.`);
    continue;
  }

  await fs.writeFile(patch.file, source.replace(patch.original, patch.replacement), "utf8");
  console.log(`Applied Next.js ${patch.description}.`);
}
