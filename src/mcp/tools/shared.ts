import * as z from "zod/v4";

export function toolResponse<T extends Record<string, unknown>>(text: string, structured: T) {
  return {
    content: [{ type: "text" as const, text }],
    structuredContent: structured,
  };
}

export function toolErrorResponse<T extends Record<string, unknown>>(text: string, structured?: T) {
  return {
    content: [{ type: "text" as const, text }],
    structuredContent: (structured ?? {}) as T | Record<string, unknown>,
    isError: true,
  };
}

export const searchOptionsSchema = {
  top: z.number().int().min(1).max(20).optional().describe("Maximum number of results."),
  includeSuperseded: z
    .boolean()
    .optional()
    .describe("Include notes marked as superseded. Defaults to false."),
  rebuildIfStale: z
    .boolean()
    .optional()
    .describe("Rebuild the derived KB index automatically if markdown files changed."),
};

export const SEARCH_DEFAULTS = { top: 8, includeSuperseded: false, rebuildIfStale: true } as const;
