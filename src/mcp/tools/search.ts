import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { formatSearchResults, searchKb } from "../../core/search";
import { SEARCH_DEFAULTS, searchOptionsSchema, toolResponse } from "./shared";

export function registerSearchTools(server: McpServer): void {
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
          .describe("Absolute path to the local file whose contents should seed retrieval."),
        ...searchOptionsSchema,
      },
    },
    async ({
      filePath,
      top = SEARCH_DEFAULTS.top,
      includeSuperseded = SEARCH_DEFAULTS.includeSuperseded,
      rebuildIfStale = SEARCH_DEFAULTS.rebuildIfStale,
    }) => {
      const response = searchKb({
        file: filePath,
        top,
        json: false,
        includeSuperseded,
        rebuildIfStale,
      });
      return toolResponse(formatSearchResults(response), { ...response });
    },
  );
}
