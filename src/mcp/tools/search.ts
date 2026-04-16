import { existsSync } from "node:fs";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { getRequestContext } from "../../core/request-context";
import { formatSearchResults, searchKb } from "../../core/search";
import { recordSearchObservation } from "../../core/search-observations";
import { SEARCH_DEFAULTS, searchOptionsSchema, toolErrorResponse, toolResponse } from "./shared";

export interface RegisterSearchToolsOptions {
  enableSearchTelemetry: boolean;
  searchObservationLogPath?: string;
}

function maybeRecordObservation(
  options: RegisterSearchToolsOptions,
  args: {
    tool: "kb_search" | "kb_search_file";
    response: ReturnType<typeof searchKb>;
    rawQuery?: string;
    contextLabel?: string;
    filePathProvided?: boolean;
    textBytes?: number;
    top: number;
    rebuildIfStale: boolean;
    includeSuperseded: boolean;
  },
): void {
  if (!options.enableSearchTelemetry) {
    return;
  }

  const request = getRequestContext();
  if (!request) {
    return;
  }

  recordSearchObservation({
    request,
    tool: args.tool,
    response: args.response,
    rawQuery: args.rawQuery,
    contextLabel: args.contextLabel,
    filePathProvided: args.filePathProvided,
    textBytes: args.textBytes,
    top: args.top,
    rebuildIfStale: args.rebuildIfStale,
    includeSuperseded: args.includeSuperseded,
    logPath: options.searchObservationLogPath,
  });
}

export function registerSearchTools(server: McpServer, options: RegisterSearchToolsOptions): void {
  server.registerTool(
    "kb_search",
    {
      title: "Search KB",
      description:
        "Search the AI research knowledge base by free-text query. Use this first when you need relevant notes, concepts, or source articles.",
      inputSchema: {
        query: z.string().min(2).describe("Search query to run against the KB."),
        ...searchOptionsSchema,
      },
    },
    async ({
      query,
      top = SEARCH_DEFAULTS.top,
      includeSuperseded = SEARCH_DEFAULTS.includeSuperseded,
      rebuildIfStale = SEARCH_DEFAULTS.rebuildIfStale,
    }) => {
      const response = searchKb({ query, top, json: false, includeSuperseded, rebuildIfStale });
      maybeRecordObservation(options, {
        tool: "kb_search",
        response,
        rawQuery: query,
        top,
        rebuildIfStale,
        includeSuperseded,
      });
      return toolResponse(formatSearchResults(response), { ...response });
    },
  );

  server.registerTool(
    "kb_search_file",
    {
      title: "Search KB From File Context",
      description:
        "Search the KB using the contents of a local file as context. Useful when you are already working in a code or markdown file.",
      inputSchema: {
        filePath: z
          .string()
          .min(1)
          .optional()
          .describe(
            "Absolute path on the MCP server host to the local file whose contents should seed retrieval.",
          ),
        text: z
          .string()
          .min(1)
          .optional()
          .describe(
            "Raw file or note content to use as retrieval context when the local path is not available on the MCP server host.",
          ),
        contextLabel: z
          .string()
          .optional()
          .describe(
            "Optional short label for the supplied text context, such as app.ts or auth flow.",
          ),
        ...searchOptionsSchema,
      },
    },
    async ({
      filePath,
      text,
      contextLabel,
      top = SEARCH_DEFAULTS.top,
      includeSuperseded = SEARCH_DEFAULTS.includeSuperseded,
      rebuildIfStale = SEARCH_DEFAULTS.rebuildIfStale,
    }) => {
      if (!filePath && !text) {
        return toolErrorResponse(
          "Provide either filePath or text. For remote/shared MCP use, prefer text because your local filesystem path may not exist on the server.",
        );
      }

      if (filePath && !existsSync(filePath)) {
        return toolErrorResponse(
          [
            `File not found on MCP host: ${filePath}`,
            "For shared HTTP MCP, local laptop paths are not available on the server.",
            "Pass text instead if you want to search from your current working context.",
          ].join("\n"),
          { filePath, hint: "Use text for remote/shared MCP requests." },
        );
      }

      const response = searchKb({
        file: filePath,
        text,
        contextLabel,
        top,
        json: false,
        includeSuperseded,
        rebuildIfStale,
      });
      maybeRecordObservation(options, {
        tool: "kb_search_file",
        response,
        contextLabel,
        filePathProvided: !!filePath,
        textBytes: typeof text === "string" ? Buffer.byteLength(text, "utf-8") : undefined,
        top,
        rebuildIfStale,
        includeSuperseded,
      });
      return toolResponse(formatSearchResults(response), { ...response });
    },
  );
}
