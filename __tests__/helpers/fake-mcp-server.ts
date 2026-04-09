type ToolHandler = (args: Record<string, unknown>) => Promise<unknown>;
type ResourceHandler = (...args: unknown[]) => Promise<unknown>;

export interface RegisteredTool {
  name: string;
  schema: unknown;
  handler: ToolHandler;
}

export interface RegisteredResource {
  name: string;
  uri: string;
  schema: unknown;
  handler: ResourceHandler;
}

export interface RegisteredResourceTemplate {
  name: string;
  template: string;
  schema: unknown;
  handler: ResourceHandler;
}

export class FakeMcpServer {
  tools = new Map<string, RegisteredTool>();
  resources = new Map<string, RegisteredResource>();
  resourceTemplates = new Map<string, RegisteredResourceTemplate>();

  registerTool(name: string, schema: unknown, handler: ToolHandler): void {
    this.tools.set(name, { name, schema, handler });
  }

  registerResource(
    name: string,
    uriOrTemplate: string | { uriTemplate?: { toString: () => string } },
    schema: unknown,
    handler: ResourceHandler,
  ): void {
    if (typeof uriOrTemplate === "string") {
      this.resources.set(uriOrTemplate, { name, uri: uriOrTemplate, schema, handler });
      return;
    }

    const template = uriOrTemplate.uriTemplate?.toString() ?? String(uriOrTemplate);
    this.resourceTemplates.set(template, { name, template, schema, handler });
  }
}
