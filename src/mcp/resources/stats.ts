import { buildHealthReport } from "../../core/health";
import { collectKbWarnings } from "../../core/lint";
import { ensureIndex } from "../../core/search";
import type { ResourceDef } from "./types";

export const statsResource: ResourceDef = {
  kind: "static",
  name: "kb-stats",
  uri: "kb://stats",
  title: "KB Stats",
  description: "High-level metadata about the knowledge base.",
  getData: () => {
    const index = ensureIndex(true);
    const health = buildHealthReport({
      limit: 10,
      minConceptSources: 2,
      minTagOccurrences: 2,
      rebuildIfStale: false,
    });
    return {
      generatedAt: index.generated_at,
      chunkCount: index.chunk_count,
      fileCount: index.file_count,
      warnings: collectKbWarnings(),
      reviewBacklogCount: health.review.reviewBacklogCount,
      staleWikiCount: health.review.staleWikiCount,
      uncoveredTagCount: health.maintenance.uncoveredTagCount,
    };
  },
};
