import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import invariant from "tiny-invariant";
import * as z from "zod/v4";
import { buildContextPack, formatContextPack } from "../../core/context";
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
        "Compile a task-specific context pack from the wiki. This is the context-engineering layer above raw search and is useful before planning, synthesis, or long-running agent work.",
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
      },
    },
    async ({
      query,
      filePath,
      top = CONTEXT_DEFAULTS.top,
      includeSuperseded = CONTEXT_DEFAULTS.includeSuperseded,
      rebuildIfStale = CONTEXT_DEFAULTS.rebuildIfStale,
    }) => {
      invariant(query || filePath, "Provide either query or filePath.");

      const pack = buildContextPack({
        query,
        file: filePath,
        top,
        includeSuperseded,
        rebuildIfStale,
      });

      return toolResponse(formatContextPack(pack), { ...pack });
    },
  );
}
