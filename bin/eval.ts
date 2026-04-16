#!/usr/bin/env bun

import { main } from "../src/core/eval";

if (import.meta.main) {
  process.exit(main());
}
