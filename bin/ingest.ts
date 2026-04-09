#!/usr/bin/env bun

import { main } from "../src/core/ingest";

if (import.meta.main) {
  void main().then((code: number) => {
    process.exit(code);
  });
}
