import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { readKbNote } from "../notes";
import { toolResponse } from "./shared";

export function registerReadTool(server: McpServer): void {
  server.registerTool(
    "kb_read_note",
    {
      title: "Read KB Note",
      description:
        "Read a KB markdown note by relative path, basename slug, or absolute path. Use paths returned by kb_search when possible.",
      inputSchema: {
        path: z
          .string()
          .min(1)
          .describe("KB-relative path, basename slug, or absolute path to a markdown note."),
        maxChars: z
          .number()
          .int()
          .min(500)
          .max(100000)
          .optional()
          .describe("Maximum number of characters to return from the note."),
      },
    },
    async ({ path, maxChars = 24000 }) => {
      const note = readKbNote(path, maxChars);
      const header = [
        `Path: ${note.path}`,
        `Title: ${note.title}`,
        `Truncated: ${note.truncated}`,
      ].join("\n");
      return toolResponse(`${header}\n\n${note.text}`, { ...note });
    },
  );
}
