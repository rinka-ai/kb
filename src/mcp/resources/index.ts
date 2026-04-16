import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { catalogOverviewResource, catalogPageResource } from "./catalog";
import { healthResource } from "./health";
import { statsResource } from "./stats";
import type { ResourceDef } from "./types";

const KB_RESOURCES: ResourceDef[] = [
  statsResource,
  healthResource,
  catalogOverviewResource,
  catalogPageResource,
];

export function registerKbResources(server: McpServer): void {
  for (const resource of KB_RESOURCES) {
    if (resource.kind === "static") {
      server.registerResource(
        resource.name,
        resource.uri,
        { title: resource.title, description: resource.description, mimeType: "application/json" },
        async () => ({
          contents: [{ uri: resource.uri, text: JSON.stringify(resource.getData(), null, 2) }],
        }),
      );
      continue;
    }

    server.registerResource(
      resource.name,
      resource.template,
      { title: resource.title, description: resource.description, mimeType: "application/json" },
      async (uri, variables) => ({
        contents: [
          { uri: uri.toString(), text: JSON.stringify(resource.read(uri, variables), null, 2) },
        ],
      }),
    );
  }
}
