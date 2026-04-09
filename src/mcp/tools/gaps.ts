import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { findKbGaps, formatGapReport } from "../../core/gaps";
import { toolResponse } from "./shared";

const GAP_DEFAULTS = {
  limit: 10,
  minConceptSources: 2,
  minTagOccurrences: 2,
} as const;

export function registerGapTool(server: McpServer): void {
  server.registerTool(
    "kb_find_gaps",
    {
      title: "Find KB Gaps",
      description:
        "Run a wiki health check that looks for orphan source notes, thin concept pages, source-count mismatches, unreviewed ingests, and missing concept coverage.",
      inputSchema: {
        limit: z
          .number()
          .int()
          .min(1)
          .max(25)
          .optional()
          .describe("Maximum items per gap category."),
        minConceptSources: z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe("Minimum source-note links expected for a healthy concept page."),
        minTagOccurrences: z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe("Minimum source-note frequency before an uncovered tag becomes interesting."),
      },
    },
    async ({
      limit = GAP_DEFAULTS.limit,
      minConceptSources = GAP_DEFAULTS.minConceptSources,
      minTagOccurrences = GAP_DEFAULTS.minTagOccurrences,
    }) => {
      const report = findKbGaps({
        limit,
        minConceptSources,
        minTagOccurrences,
      });

      return toolResponse(formatGapReport(report), { ...report });
    },
  );
}
