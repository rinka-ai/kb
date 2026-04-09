import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { formatRefreshResults, refreshKb } from "../../core/refresh";
import { toolResponse } from "./shared";

export function registerRefreshTool(server: McpServer): void {
  server.registerTool(
    "kb_refresh",
    {
      title: "Refresh KB",
      description:
        "Rebuild the derived KB index and run lint checks. Use this after changing markdown notes or wiki pages.",
    },
    async () => {
      const response = refreshKb();
      return toolResponse(formatRefreshResults(response), {
        chunkCount: response.index.chunk_count,
        fileCount: response.index.file_count,
        generatedAt: response.index.generated_at,
        warnings: response.warnings,
        message:
          response.warnings.length === 0
            ? "KB refresh complete."
            : "KB refresh complete with lint warnings.",
      });
    },
  );
}
