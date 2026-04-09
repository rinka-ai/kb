export interface IngestArgs {
  url?: string;
  file?: string;
  collection?: string;
  tags: string[];
  title?: string;
  author?: string;
  publisher?: string;
  published?: string;
  dryRun: boolean;
  stdout: boolean;
  noRefresh: boolean;
}

export interface ExtractedSource {
  title: string;
  author: string;
  publisher: string;
  url: string;
  datePublished: string;
  summary: string;
  keyClaims: string[];
  details: string[];
  sourceText: string;
  tags: string[];
  related: string[];
}

export interface IngestResult {
  markdown: string;
  outputPath?: string;
  refreshed: boolean;
  chunkCount?: number;
  source: {
    title: string;
    author: string;
    publisher: string;
    url: string;
    datePublished: string;
    summary: string;
    tags: string[];
    related: string[];
  };
}
