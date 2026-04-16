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
  type: string;
  section: string;
  matched_sections: string[];
  status: string;
  superseded_by: string;
  tags: string[];
  summary: string;
  snippet: string;
  url: string;
  kind: KbChunk["kind"];
  exact_match_count: number;
  expanded_match_count: number;
  exact_title_match_count: number;
  exact_canonical_match_count: number;
  exact_tag_match_count: number;
  fuzzy_only: boolean;
}

export interface SearchResponse {
  query: string;
  queryTerms: string[];
  exactTerms: string[];
  expandedTerms: string[];
  file?: string;
  contextLabel?: string;
  includeSuperseded: boolean;
  results: SearchResult[];
}
