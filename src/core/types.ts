export type FrontmatterValue = string | string[] | boolean;
export type Frontmatter = Record<string, FrontmatterValue>;

export interface KbChunk {
  id: string;
  path: string;
  note_slug: string;
  kind: "document" | "section";
  title: string;
  section: string;
  type: string;
  status: string;
  superseded_by: string;
  summary: string;
  tags: string[];
  related: string[];
  canonical_for: string[];
  wiki_links: string[];
  url: string;
  date_published: string;
  date_added: string;
  author: string;
  publisher: string;
  review_status: string;
  last_reviewed: string;
  review_due: string;
  confidence: string;
  text: string;
  term_freq: Record<string, number>;
  doc_len: number;
}

export interface KbIndex {
  schema_version: number;
  generated_at: string;
  root: string;
  chunk_count: number;
  file_count: number;
  avg_doc_len: number;
  idf: Record<string, number>;
  chunks: KbChunk[];
}
