import { relative } from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { createDeepRead } from "../../core/deep-read";
import { ROOT } from "../../core/paths";
import { toolErrorResponse, toolResponse } from "./shared";

export function registerDeepReadTool(server: McpServer, enableWrites: boolean): void {
  server.registerTool(
    "kb_deep_read",
    {
      title: "Create KB Deep-Read Note",
      description:
        "Create a selective deep-read summary note from one or more existing KB source notes and an optional local notes file.",
      inputSchema: {
        sourcePaths: z
          .array(z.string())
          .min(1)
          .describe(
            "KB note paths or slugs to deepen. The first source should usually be the primary paper.",
          ),
        filePath: z
          .string()
          .optional()
          .describe(
            "Optional local markdown, text, or html file with selected excerpts or reading notes.",
          ),
        collection: z
          .string()
          .optional()
          .describe("Optional subdirectory under wiki/summaries/. Defaults to deep-reads."),
        focus: z
          .array(z.string())
          .optional()
          .describe("Optional focus areas such as method, evals, limitations, or failure modes."),
        title: z.string().optional().describe("Optional title override."),
        noRefresh: z.boolean().optional().describe("Skip index rebuild after writing the note."),
        dryRun: z.boolean().optional().describe("Return the markdown without writing the file."),
      },
    },
    async ({
      sourcePaths,
      filePath,
      collection,
      focus = [],
      title,
      noRefresh = false,
      dryRun = false,
    }) => {
      if (!enableWrites) {
        return toolErrorResponse(
          "kb_deep_read is disabled on this MCP server. Shared HTTP deployments should stay read-only; use the git/PR workflow or a local writable MCP server for note creation.",
          { enableWrites },
        );
      }

      try {
        const result = await createDeepRead({
          source: sourcePaths,
          file: filePath,
          collection,
          focus,
          title,
          dryRun,
          stdout: false,
          noRefresh,
        });

        const text = [
          `Title: ${result.note.title}`,
          `Source notes: ${result.note.sourcePaths.join(", ")}`,
          `Focus: ${result.note.focus.join(", ")}`,
          ...(result.outputPath ? [`Output path: ${result.outputPath}`] : []),
          ...(result.refreshed && result.chunkCount !== undefined
            ? [`KB chunks after refresh: ${result.chunkCount}`]
            : []),
          "",
          result.markdown,
        ].join("\n");

        return toolResponse(text, {
          outputPath: result.outputPath ? relative(ROOT, result.outputPath) : undefined,
          refreshed: result.refreshed,
          chunkCount: result.chunkCount,
          note: result.note,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return toolErrorResponse(`KB deep read failed: ${message}`, { message });
      }
    },
  );
}
