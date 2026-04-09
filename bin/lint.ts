#!/usr/bin/env bun

import { main } from "../src/core/lint";

if (import.meta.main) {
  process.exit(main());
}
