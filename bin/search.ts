#!/usr/bin/env bun

import { main } from "../src/core/search";

if (import.meta.main) {
  process.exit(main());
}
