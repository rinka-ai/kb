import { describe, expect, test } from "bun:test";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerKbResources } from "../../src/mcp/resources";
import { FakeMcpServer } from "../helpers/fake-mcp-server";

interface ResourceResult {
  contents: Array<{ text: string }>;
}

describe("mcp resources", () => {
  test("registers stats, health, catalog overview, and catalog page resources", async () => {
    const server = new FakeMcpServer();
    registerKbResources(server as unknown as McpServer);

    const stats = (await server.resources.get("kb://stats")?.handler()) as
      | ResourceResult
      | undefined;
    const health = (await server.resources.get("kb://health")?.handler()) as
      | ResourceResult
      | undefined;
    const catalog = (await server.resources.get("kb://catalog")?.handler()) as
      | ResourceResult
      | undefined;
    const catalogPage = (await server.resourceTemplates
      .get("kb://catalog/page/{page}")
      ?.handler(new URL("kb://catalog/page/1"), { page: "1" })) as ResourceResult | undefined;

    expect(stats).toBeDefined();
    expect(health).toBeDefined();
    expect(catalog).toBeDefined();
    expect(catalogPage).toBeDefined();
    if (!stats || !health || !catalog || !catalogPage) {
      throw new Error("Expected MCP resources to be registered.");
    }

    const statsPayload = JSON.parse(stats.contents[0].text);
    const healthPayload = JSON.parse(health.contents[0].text);
    const catalogPayload = JSON.parse(catalog.contents[0].text);
    const catalogPagePayload = JSON.parse(catalogPage.contents[0].text);

    expect(statsPayload.chunkCount).toBeGreaterThan(0);
    expect(statsPayload.fileCount).toBeGreaterThan(0);
    expect(healthPayload.index.fileCount).toBeGreaterThan(0);
    expect(catalogPayload.totalDocuments).toBeGreaterThan(0);
    expect(Array.isArray(catalogPayload.sample)).toBe(true);
    expect(catalogPayload.resources.pageTemplate).toBe("kb://catalog/page/{page}");
    expect(Array.isArray(catalogPagePayload.items)).toBe(true);
    expect(catalogPagePayload.page).toBe(1);
  });
});
