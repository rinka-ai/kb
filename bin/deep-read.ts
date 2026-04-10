#!/usr/bin/env bun

import { main } from "../src/core/deep-read";

if (import.meta.main) {
  void main().then((code: number) => {
    process.exit(code);
  });
}
