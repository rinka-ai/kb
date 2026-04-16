#!/usr/bin/env bun

import { main } from "../src/core/health";

if (import.meta.main) {
  process.exit(main());
}
