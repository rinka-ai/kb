import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

export const ROOT = resolve(__dirname, "../..");
export const SOURCE_DIRS = [join(ROOT, "raw", "articles"), join(ROOT, "wiki")];
export const OUTPUT_DIR = resolve(process.env.KB_CACHE_DIR ?? join(ROOT, ".kb"));
export const OUTPUT_FILE = join(OUTPUT_DIR, "index.json");
