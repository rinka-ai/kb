#!/usr/bin/env bun

import { main } from "../src/core/search-observations";

if (import.meta.main) {
  process.exit(main());
}
