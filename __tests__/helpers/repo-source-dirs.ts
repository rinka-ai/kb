import { mkdirSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, SOURCE_DIRS } from "../../src/core/paths";

interface RepoFixtureFile {
  dir: "raw" | "wiki";
  relativePath: string;
  content: string;
  mtimeMs?: number;
}

export function withRepoFixtureSourceDirs<T>(
  files: RepoFixtureFile[],
  run: (paths: { rawDir: string; wikiDir: string }) => T,
): T {
  const fixtureId = `__test-fixture-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const rawDir = join(ROOT, "raw", "articles", fixtureId);
  const wikiDir = join(ROOT, "wiki", fixtureId);

  mkdirSync(rawDir, { recursive: true });
  mkdirSync(wikiDir, { recursive: true });

  for (const file of files) {
    const baseDir = file.dir === "raw" ? rawDir : wikiDir;
    const absolutePath = join(baseDir, file.relativePath);
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
    return run({ rawDir, wikiDir });
  } finally {
    SOURCE_DIRS.splice(0, SOURCE_DIRS.length, ...originalSourceDirs);
    rmSync(rawDir, { recursive: true, force: true });
    rmSync(wikiDir, { recursive: true, force: true });
  }
}
