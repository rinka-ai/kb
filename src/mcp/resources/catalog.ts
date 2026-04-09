import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { STATUS_SUPERSEDED } from "../../core/constants";
import { ensureIndex } from "../../core/search";
import type { KbChunk, KbIndex } from "../../core/types";
import type { ResourceDef } from "./types";

export interface CatalogEntry {
  path: string;
  title: string;
  type: string;
  status: string;
  superseded_by: string;
  tags: string[];
  summary: string;
  date_added: string;
  date_published: string;
  author: string;
  publisher: string;
  url: string;
}

export interface CatalogQuery {
  includeSuperseded?: boolean;
  type?: string;
  status?: string;
  tag?: string;
  pathPrefix?: string;
  rebuildIfStale?: boolean;
}

export interface CatalogPage extends CatalogQuery {
  generatedAt: string;
  totalDocuments: number;
  filteredDocuments: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousPage: number | null;
  nextPage: number | null;
  items: CatalogEntry[];
}

interface CatalogCache {
  generatedAt: string;
  entries: CatalogEntry[];
}

const DEFAULT_CATALOG_PAGE_SIZE = 100;
const MAX_CATALOG_PAGE_SIZE = 250;
const CATALOG_SAMPLE_SIZE = 12;

let catalogCache: CatalogCache | null = null;

function chunkToCatalogEntry(chunk: KbChunk): CatalogEntry {
  return {
    path: chunk.path,
    title: chunk.title,
    type: chunk.type,
    status: chunk.status,
    superseded_by: chunk.superseded_by,
    tags: chunk.tags,
    summary: chunk.summary,
    date_added: chunk.date_added,
    date_published: chunk.date_published,
    author: chunk.author,
    publisher: chunk.publisher,
    url: chunk.url,
  };
}

function activeCatalogEntries(entries: CatalogEntry[], includeSuperseded: boolean): CatalogEntry[] {
  if (includeSuperseded) {
    return entries;
  }

  return entries.filter((entry) => entry.status !== STATUS_SUPERSEDED);
}

function normalizeFilter(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

function matchesFilters(entry: CatalogEntry, filters: CatalogQuery): boolean {
  if (!filters.includeSuperseded && entry.status === STATUS_SUPERSEDED) {
    return false;
  }

  const type = normalizeFilter(filters.type);
  if (type && normalizeFilter(entry.type) !== type) {
    return false;
  }

  const status = normalizeFilter(filters.status);
  if (status && normalizeFilter(entry.status) !== status) {
    return false;
  }

  const tag = normalizeFilter(filters.tag);
  if (tag && !entry.tags.some((entryTag) => normalizeFilter(entryTag) === tag)) {
    return false;
  }

  const pathPrefix = filters.pathPrefix?.trim();
  if (pathPrefix && !entry.path.startsWith(pathPrefix)) {
    return false;
  }

  return true;
}

function getCatalogEntriesFromIndex(index: KbIndex): CatalogEntry[] {
  if (catalogCache?.generatedAt === index.generated_at) {
    return catalogCache.entries;
  }

  const entries = index.chunks
    .filter((chunk) => chunk.kind === "document")
    .map(chunkToCatalogEntry)
    .sort((a, b) => a.path.localeCompare(b.path));

  catalogCache = {
    generatedAt: index.generated_at,
    entries,
  };

  return entries;
}

function getCatalogState(rebuildIfStale = true): { generatedAt: string; entries: CatalogEntry[] } {
  const index = ensureIndex(rebuildIfStale);
  return {
    generatedAt: index.generated_at,
    entries: getCatalogEntriesFromIndex(index),
  };
}

function clampPageSize(pageSize = DEFAULT_CATALOG_PAGE_SIZE): number {
  return Math.min(Math.max(Math.trunc(pageSize), 1), MAX_CATALOG_PAGE_SIZE);
}

function countValues(entries: CatalogEntry[], key: "type" | "status"): Record<string, number> {
  return entries.reduce<Record<string, number>>((acc, entry) => {
    const value = entry[key] || "unknown";
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export function listDocumentCatalog(options: CatalogQuery = {}): CatalogEntry[] {
  const { entries } = getCatalogState(options.rebuildIfStale);
  return entries.filter((entry) => matchesFilters(entry, options));
}

export function getCatalogOverview(options: CatalogQuery = {}) {
  const { generatedAt, entries } = getCatalogState(options.rebuildIfStale);
  const activeEntries = activeCatalogEntries(entries, false);

  return {
    generatedAt,
    totalDocuments: entries.length,
    activeDocuments: activeEntries.length,
    supersededDocuments: entries.length - activeEntries.length,
    defaultPageSize: DEFAULT_CATALOG_PAGE_SIZE,
    maxPageSize: MAX_CATALOG_PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(activeEntries.length / DEFAULT_CATALOG_PAGE_SIZE)),
    byType: countValues(activeEntries, "type"),
    byStatus: countValues(entries, "status"),
    sample: activeEntries.slice(0, CATALOG_SAMPLE_SIZE),
    resources: {
      overview: "kb://catalog",
      pageTemplate: "kb://catalog/page/{page}",
    },
    tools: {
      browse: "kb_list_catalog",
      read: "kb_read_note",
      search: "kb_search",
    },
    notes: [
      "kb://catalog is an overview resource, not the full corpus dump.",
      "Use kb_list_catalog for paginated browsing with filters.",
      "Use kb_search when you already know the topic or question.",
    ],
  };
}

export function getCatalogPage(
  options: CatalogQuery & {
    page?: number;
    pageSize?: number;
  } = {},
): CatalogPage {
  const { generatedAt, entries } = getCatalogState(options.rebuildIfStale);
  const filtered = entries.filter((entry) => matchesFilters(entry, options));

  const pageSize = clampPageSize(options.pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number.isFinite(options.page) ? Math.trunc(options.page ?? 1) : 1;
  const page = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (page - 1) * pageSize;

  return {
    generatedAt,
    totalDocuments: entries.length,
    filteredDocuments: filtered.length,
    includeSuperseded: options.includeSuperseded ?? false,
    type: options.type,
    status: options.status,
    tag: options.tag,
    pathPrefix: options.pathPrefix,
    page,
    pageSize,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    items: filtered.slice(start, start + pageSize),
  };
}

export function formatCatalogPage(page: CatalogPage): string {
  const header = [
    `Catalog page ${page.page}/${page.totalPages}`,
    `Documents: ${page.filteredDocuments} matching filters (${page.totalDocuments} total)`,
    `Page size: ${page.pageSize}`,
    ...(page.includeSuperseded ? ["Including superseded notes: yes"] : []),
    ...(page.type ? [`Type filter: ${page.type}`] : []),
    ...(page.status ? [`Status filter: ${page.status}`] : []),
    ...(page.tag ? [`Tag filter: ${page.tag}`] : []),
    ...(page.pathPrefix ? [`Path prefix: ${page.pathPrefix}`] : []),
  ];

  if (page.items.length === 0) {
    return [...header, "", "No catalog entries matched the current filters."].join("\n");
  }

  const body = page.items.map((entry, index) => {
    const lines = [
      `${index + 1}. ${entry.title}`,
      `   path: ${entry.path}`,
      ...(entry.type ? [`   type: ${entry.type}`] : []),
      ...(entry.status ? [`   status: ${entry.status}`] : []),
      ...(entry.superseded_by ? [`   superseded_by: ${entry.superseded_by}`] : []),
      ...(entry.tags.length > 0 ? [`   tags: ${entry.tags.join(", ")}`] : []),
      ...(entry.summary ? [`   summary: ${entry.summary}`] : []),
    ];

    return lines.join("\n");
  });

  const footer = [
    ...(page.hasPreviousPage ? [`Previous page: ${page.previousPage}`] : []),
    ...(page.hasNextPage ? [`Next page: ${page.nextPage}`] : []),
  ];

  return [...header, "", ...body, ...(footer.length > 0 ? ["", ...footer] : [])].join("\n\n");
}

export const catalogOverviewResource: ResourceDef = {
  kind: "static",
  name: "kb-catalog",
  uri: "kb://catalog",
  title: "KB Catalog Overview",
  description:
    "High-level catalog metadata plus a small sample. Use kb_list_catalog or kb://catalog/page/{page} to browse at scale.",
  getData: getCatalogOverview,
};

export const catalogPageResource: ResourceDef = {
  kind: "template",
  name: "kb-catalog-page",
  template: new ResourceTemplate("kb://catalog/page/{page}", { list: undefined }),
  title: "KB Catalog Page",
  description: "Paginated KB catalog browse resource with a stable default page size.",
  read: (_uri, variables) => {
    const rawPage = variables.page;
    const pageStr = Array.isArray(rawPage) ? rawPage[0] : rawPage;
    const page = Number.parseInt(pageStr ?? "1", 10);
    return getCatalogPage({
      page: Number.isFinite(page) ? page : 1,
      pageSize: DEFAULT_CATALOG_PAGE_SIZE,
    });
  },
};
