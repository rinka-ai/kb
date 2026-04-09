import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { formatCatalogPage, getCatalogPage } from "../resources/catalog";
import { toolResponse } from "./shared";

const CATALOG_DEFAULTS = {
  page: 1,
  pageSize: 100,
  includeSuperseded: false,
  rebuildIfStale: true,
} as const;

export function registerCatalogTool(server: McpServer): void {
  server.registerTool(
    "kb_list_catalog",
    {
      title: "List KB Catalog",
      description:
        "Browse the KB catalog page by page. Prefer this over kb://catalog when you need to inspect many notes or filter by path, type, status, or tag.",
      inputSchema: {
        page: z.number().int().min(1).optional().describe("1-based catalog page number."),
        pageSize: z
          .number()
          .int()
          .min(1)
          .max(250)
          .optional()
          .describe("Number of entries per page."),
        includeSuperseded: z
          .boolean()
          .optional()
          .describe("Include notes marked as superseded. Defaults to false."),
        type: z
          .string()
          .optional()
          .describe("Optional exact type filter, for example source or concept."),
        status: z.string().optional().describe("Optional exact status filter."),
        tag: z.string().optional().describe("Optional exact tag filter."),
        pathPrefix: z
          .string()
          .optional()
          .describe(
            "Optional repo-relative path prefix filter, for example raw/articles/anthropic-engineering.",
          ),
        rebuildIfStale: z
          .boolean()
          .optional()
          .describe("Rebuild the derived KB index automatically if markdown files changed."),
      },
    },
    async ({
      page = CATALOG_DEFAULTS.page,
      pageSize = CATALOG_DEFAULTS.pageSize,
      includeSuperseded = CATALOG_DEFAULTS.includeSuperseded,
      type,
      status,
      tag,
      pathPrefix,
      rebuildIfStale = CATALOG_DEFAULTS.rebuildIfStale,
    }) => {
      const result = getCatalogPage({
        page,
        pageSize,
        includeSuperseded,
        type,
        status,
        tag,
        pathPrefix,
        rebuildIfStale,
      });

      return toolResponse(formatCatalogPage(result), { ...result });
    },
  );
}
