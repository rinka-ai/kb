#!/usr/bin/env bun

import { main } from "../src/core/build";

if (import.meta.main) {
  process.exit(main());
}
