#!/usr/bin/env bun

import { main } from "../src/core/audit";

if (import.meta.main) {
  process.exit(main());
}
