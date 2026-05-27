import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import invariant from "tiny-invariant";
import * as z from "zod/v4";
import {
  buildContextPack,
  compactContextPack,
  formatCompactContextPack,
  formatContextPack,
} from "../../core/context";
import { toolResponse } from "./shared";

const CONTEXT_DEFAULTS = {
  top: 6,
  includeSuperseded: false,
  rebuildIfStale: true,
} as const;

export function registerContextTool(server: McpServer): void {
  server.registerTool(
    "kb_build_context",
    {
      title: "Build KB Context Pack",
      description:
        "Compile a bounded, task-specific context pack from the wiki. Prefer this over chained kb_read_note calls when you need multiple related notes — it caps fan-out and keeps token usage predictable. Pass compact=true for an even lighter pack. This is the right entrypoint for planning, synthesis, or long-running agent work.",
      inputSchema: {
        query: z.string().optional().describe("Research question or topic to gather context for."),
        filePath: z
          .string()
          .optional()
          .describe("Absolute path to a local file whose contents should seed retrieval."),
        top: z
          .number()
          .int()
          .min(1)
          .max(12)
          .optional()
          .describe("Maximum number of notes to include."),
        includeSuperseded: z
          .boolean()
          .optional()
          .describe("Include notes marked as superseded. Defaults to false."),
        rebuildIfStale: z
          .boolean()
          .optional()
          .describe("Rebuild the derived KB index automatically if markdown files changed."),
        compact: z
          .boolean()
          .optional()
          .describe("Return a compact context pack with less duplication to save context tokens."),
      },
    },
    async ({
      query,
      filePath,
      top = CONTEXT_DEFAULTS.top,
      includeSuperseded = CONTEXT_DEFAULTS.includeSuperseded,
      rebuildIfStale = CONTEXT_DEFAULTS.rebuildIfStale,
      compact = false,
    }) => {
      invariant(query || filePath, "Provide either query or filePath.");

      const pack = buildContextPack({
        query,
        file: filePath,
        top,
        includeSuperseded,
        rebuildIfStale,
      });

      if (compact) {
        const compactPack = compactContextPack(pack);
        return toolResponse(formatCompactContextPack(compactPack), { ...compactPack });
      }

      return toolResponse(formatContextPack(pack), { ...pack });
    },
  );
}
