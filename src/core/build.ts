import { buildIndex, writeIndex } from "./indexer";
import { OUTPUT_FILE } from "./paths";

export function main(): number {
  const index = buildIndex();
  writeIndex(index);
  console.log(
    `Built KB index with ${index.chunk_count} chunks from ${index.file_count} markdown files -> ${OUTPUT_FILE}`,
  );
  return 0;
}
