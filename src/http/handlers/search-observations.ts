import { timingSafeEqual } from "node:crypto";
import type { Context } from "hono";
import {
  buildSearchObservationReport,
  DEFAULT_SEARCH_OBSERVATION_REPORT_LIMIT,
  DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP,
  DEFAULT_SEARCH_OBSERVATION_REPORT_MIN_COUNT,
  formatSearchObservationReport,
  loadSearchObservations,
  type SearchObservation,
} from "../../core/search-observations";

interface SearchObservationAdminOptions {
  adminToken: string;
  logPath?: string;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parsePositiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function providedAdminToken(c: Context): string | undefined {
  const authHeader = c.req.header("authorization")?.trim();
  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    const bearerToken = authHeader.slice(7).trim();
    if (bearerToken) {
      return bearerToken;
    }
  }

  return c.req.header("x-kb-admin-token")?.trim() || undefined;
}

function tokensMatch(provided: string | undefined, expected: string): boolean {
  if (!provided) {
    return false;
  }

  const left = Buffer.from(provided, "utf-8");
  const right = Buffer.from(expected, "utf-8");
  return left.length === right.length && timingSafeEqual(left, right);
}

function unauthorizedResponse(c: Context) {
  c.header("WWW-Authenticate", 'Bearer realm="kb-admin"');
  return c.json({ error: { message: "Unauthorized." } }, 401);
}

function authorizeAdmin(c: Context, adminToken: string): boolean {
  return tokensMatch(providedAdminToken(c), adminToken);
}

function filterObservations(
  observations: SearchObservation[],
  tool: string | undefined,
  querySubstring: string | undefined,
): SearchObservation[] {
  const normalizedQuery = querySubstring?.trim().toLowerCase();

  return observations.filter((observation) => {
    if (tool && observation.tool !== tool) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return [observation.rawQuery, observation.queryText, observation.contextLabel]
      .filter((value): value is string => typeof value === "string" && value.length > 0)
      .some((value) => value.toLowerCase().includes(normalizedQuery));
  });
}

export function createSearchObservationReportHandler({
  adminToken,
  logPath,
}: SearchObservationAdminOptions) {
  return (c: Context) => {
    if (!authorizeAdmin(c, adminToken)) {
      return unauthorizedResponse(c);
    }

    const format = c.req.query("format")?.trim().toLowerCase() ?? "json";
    const limit = parsePositiveInt(c.req.query("limit"), DEFAULT_SEARCH_OBSERVATION_REPORT_LIMIT);
    const minCount = parsePositiveInt(
      c.req.query("minCount"),
      DEFAULT_SEARCH_OBSERVATION_REPORT_MIN_COUNT,
    );
    const maxTopScoreGap = parsePositiveNumber(
      c.req.query("maxTopScoreGap"),
      DEFAULT_SEARCH_OBSERVATION_REPORT_MAX_TOP_SCORE_GAP,
    );
    const report = buildSearchObservationReport(loadSearchObservations(logPath), {
      limit,
      minCount,
      maxTopScoreGap,
    });

    if (format === "text") {
      c.header("Content-Type", "text/plain; charset=utf-8");
      return c.body(formatSearchObservationReport(report));
    }

    return c.json(report);
  };
}

export function createSearchObservationExportHandler({
  adminToken,
  logPath,
}: SearchObservationAdminOptions) {
  return (c: Context) => {
    if (!authorizeAdmin(c, adminToken)) {
      return unauthorizedResponse(c);
    }

    const format = c.req.query("format")?.trim().toLowerCase() ?? "ndjson";
    const limit = parsePositiveInt(c.req.query("limit"), 200);
    const observations = filterObservations(
      loadSearchObservations(logPath),
      c.req.query("tool"),
      c.req.query("query"),
    );
    const exported = observations.slice(-limit);

    if (format === "json") {
      return c.json({
        totalMatching: observations.length,
        returned: exported.length,
        observations: exported,
      });
    }

    c.header("Content-Type", "application/x-ndjson; charset=utf-8");
    return c.body(
      exported.length > 0 ? `${exported.map((entry) => JSON.stringify(entry)).join("\n")}\n` : "",
    );
  };
}
