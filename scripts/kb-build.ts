#!/usr/bin/env bun

import { OUTPUT_FILE, buildIndex, writeIndex } from "./kb-lib";

const index = buildIndex();
writeIndex(index);
console.log(
  `Built KB index with ${index.chunk_count} chunks from ${index.file_count} markdown files -> ${OUTPUT_FILE}`,
);
