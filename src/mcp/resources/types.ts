import type { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface StaticResourceDef {
  kind: "static";
  name: string;
  uri: string;
  title: string;
  description: string;
  getData: () => unknown;
}

export interface TemplatedResourceDef {
  kind: "template";
  name: string;
  template: ResourceTemplate;
  title: string;
  description: string;
  read: (uri: URL, variables: Record<string, string | string[]>) => unknown;
}

export type ResourceDef = StaticResourceDef | TemplatedResourceDef;
