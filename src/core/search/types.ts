import type { KbChunk } from "../types";

export interface SearchArgs {
  query?: string;
  file?: string;
  text?: string;
  contextLabel?: string;
  top: number;
  json: boolean;
  rebuildIfStale: boolean;
  includeSuperseded: boolean;
}

export interface SearchResult {
  score: number;
  path: string;
  title: string;
  section: string;
  status: string;
  superseded_by: string;
  tags: string[];
  summary: string;
  snippet: string;
  url: string;
  kind: KbChunk["kind"];
}

export interface SearchResponse {
  query: string;
  queryTerms: string[];
  file?: string;
  contextLabel?: string;
  includeSuperseded: boolean;
  results: SearchResult[];
}
