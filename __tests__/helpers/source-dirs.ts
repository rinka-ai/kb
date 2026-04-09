import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { SOURCE_DIRS } from "../../src/core/paths";

export function withTempSourceDirs<T>(
  files: Array<{ relativePath: string; content: string; mtimeMs?: number }>,
  run: (paths: { tempRoot: string; rawDir: string; wikiDir: string }) => T,
): T {
  const tempRoot = mkdtempSync(join(tmpdir(), "ai-research-kb-"));
  const rawDir = join(tempRoot, "raw", "articles");
  const wikiDir = join(tempRoot, "wiki");
  mkdirSync(rawDir, { recursive: true });
  mkdirSync(wikiDir, { recursive: true });

  for (const file of files) {
    const absolutePath = join(tempRoot, file.relativePath);
    mkdirSync(join(absolutePath, ".."), { recursive: true });
    writeFileSync(absolutePath, file.content);
    if (file.mtimeMs !== undefined) {
      const time = new Date(file.mtimeMs);
      utimesSync(absolutePath, time, time);
    }
  }

  const originalSourceDirs = [...SOURCE_DIRS];
  SOURCE_DIRS.splice(0, SOURCE_DIRS.length, rawDir, wikiDir);

  try {
    return run({ tempRoot, rawDir, wikiDir });
  } finally {
    SOURCE_DIRS.splice(0, SOURCE_DIRS.length, ...originalSourceDirs);
    rmSync(tempRoot, { recursive: true, force: true });
  }
}
