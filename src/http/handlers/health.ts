import { existsSync, statSync } from "node:fs";
import type { Context } from "hono";
import { INDEX_SCHEMA_VERSION, loadIndex, newestMarkdownMtime } from "../../core/indexer";
import { OUTPUT_FILE } from "../../core/paths";
import { KB_MCP_SERVER_NAME, KB_MCP_SERVER_VERSION } from "../../mcp/constants";
import type { KbHttpConfig } from "../config";
import { cloneHttpMetrics, type HttpMetrics } from "../metrics";

interface IndexHealth {
  available: boolean;
  generatedAt?: string;
  generated_at?: string;
  schemaVersion?: number;
  schema_version?: number;
  schemaCurrent?: boolean;
  fileCount?: number;
  file_count?: number;
  chunkCount?: number;
  chunk_count?: number;
  stale?: boolean;
  indexMtimeMs?: number;
  newestMarkdownMtimeMs?: number;
  error?: string;
}

function deployGitSha(): string {
  return (
    process.env.KB_DEPLOY_GIT_SHA ||
    process.env.RAILWAY_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.SOURCE_VERSION ||
    process.env.GIT_SHA ||
    ""
  ).trim();
}

// Privacy-safe index freshness snapshot. Never rebuilds the index (health must
// stay cheap and side-effect free) and swallows any read/parse failure so the
// endpoint always responds.
function readIndexHealth(): IndexHealth {
  try {
    if (!existsSync(OUTPUT_FILE)) {
      return { available: false };
    }

    const index = loadIndex();
    const indexMtimeMs = statSync(OUTPUT_FILE).mtimeMs;
    const newestMarkdownMtimeMs = newestMarkdownMtime();
    const schemaCurrent = index.schema_version === INDEX_SCHEMA_VERSION;
    const stale = !schemaCurrent || newestMarkdownMtimeMs > indexMtimeMs;

    return {
      available: true,
      generatedAt: index.generated_at,
      generated_at: index.generated_at,
      schemaVersion: index.schema_version,
      schema_version: index.schema_version,
      schemaCurrent,
      fileCount: index.file_count,
      file_count: index.file_count,
      chunkCount: index.chunk_count,
      chunk_count: index.chunk_count,
      stale,
      indexMtimeMs,
      newestMarkdownMtimeMs,
    };
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export function createHealthHandler(
  config: Pick<
    KbHttpConfig,
    | "statefulSessions"
    | "enableWrites"
    | "searchTelemetryEnabled"
    | "searchTelemetrySalt"
    | "adminToken"
  >,
  getSessionCount: () => number,
  getMetrics: () => HttpMetrics,
) {
  return (c: Context) =>
    c.json({
      ok: true,
      name: KB_MCP_SERVER_NAME,
      version: KB_MCP_SERVER_VERSION,
      gitSha: deployGitSha() || undefined,
      sessions: getSessionCount(),
      statefulSessions: config.statefulSessions,
      enableWrites: config.enableWrites,
      index: readIndexHealth(),
      // Readiness booleans only: never expose the salt or admin token values.
      searchTelemetryEnabled: config.searchTelemetryEnabled,
      telemetryHashingConfigured: Boolean(config.searchTelemetrySalt),
      adminTelemetryConfigured: Boolean(config.adminToken),
      http: cloneHttpMetrics(getMetrics()),
    });
}
