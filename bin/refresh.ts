#!/usr/bin/env bun

import { main } from "../src/core/refresh";

if (import.meta.main) {
  process.exit(main());
}
