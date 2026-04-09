import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import invariant from "tiny-invariant";
import * as z from "zod/v4";
import { buildHandoffPacket, formatHandoffPacket } from "../../core/handoff";
import { toolResponse } from "./shared";

const HANDOFF_DEFAULTS = {
  top: 6,
  includeSuperseded: false,
  rebuildIfStale: true,
} as const;

export function registerHandoffTool(server: McpServer): void {
  server.registerTool(
    "kb_make_handoff",
    {
      title: "Make KB Handoff",
      description:
        "Generate a structured handoff packet for long-running work. This compiles the current wiki view into an artifact another agent or future session can pick up quickly.",
      inputSchema: {
        goal: z.string().optional().describe("Optional explicit goal for the handoff."),
        query: z
          .string()
          .optional()
          .describe("Research topic or task description to build the handoff around."),
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
          .describe("Maximum number of notes to include in the handoff."),
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
      goal,
      query,
      filePath,
      top = HANDOFF_DEFAULTS.top,
      includeSuperseded = HANDOFF_DEFAULTS.includeSuperseded,
      rebuildIfStale = HANDOFF_DEFAULTS.rebuildIfStale,
    }) => {
      invariant(goal || query || filePath, "Provide at least one of goal, query, or filePath.");

      const packet = buildHandoffPacket({
        goal,
        query,
        file: filePath,
        top,
        includeSuperseded,
        rebuildIfStale,
      });

      return toolResponse(formatHandoffPacket(packet), { ...packet });
    },
  );
}
