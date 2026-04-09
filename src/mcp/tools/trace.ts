import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { formatClaimTrace, traceClaim } from "../../core/trace";
import { toolResponse } from "./shared";

const TRACE_DEFAULTS = {
  top: 6,
  includeSuperseded: false,
  rebuildIfStale: true,
} as const;

export function registerTraceTool(server: McpServer): void {
  server.registerTool(
    "kb_trace_claim",
    {
      title: "Trace KB Claim",
      description:
        "Trace a claim back through the wiki and source notes. Use this to inspect provenance, supporting sections, and historical material before trusting or reusing a claim.",
      inputSchema: {
        claim: z.string().min(6).describe("Claim, question, or statement to trace through the KB."),
        top: z
          .number()
          .int()
          .min(1)
          .max(12)
          .optional()
          .describe("Maximum number of evidence notes to include."),
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
      claim,
      top = TRACE_DEFAULTS.top,
      includeSuperseded = TRACE_DEFAULTS.includeSuperseded,
      rebuildIfStale = TRACE_DEFAULTS.rebuildIfStale,
    }) => {
      const report = traceClaim({
        claim,
        top,
        includeSuperseded,
        rebuildIfStale,
      });

      return toolResponse(formatClaimTrace(report), { ...report });
    },
  );
}
