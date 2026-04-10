export interface DeepReadArgs {
  source: string[];
  file?: string;
  collection?: string;
  focus: string[];
  title?: string;
  dryRun: boolean;
  stdout: boolean;
  noRefresh: boolean;
}

export interface DeepReadResult {
  markdown: string;
  outputPath?: string;
  refreshed: boolean;
  chunkCount?: number;
  note: {
    title: string;
    sourcePaths: string[];
    focus: string[];
    tags: string[];
  };
}
