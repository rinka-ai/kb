---
id: article-2026-07-28-model-context-protocol-specification
type: source
title: "The 2026-07-28 Model Context Protocol Specification"
path: raw/articles/official-docs/2026-07-28-the-2026-07-28-model-context-protocol-specification.md
author: David Soria Parra; Den Delimarsky
publisher: Model Context Protocol
url: https://blog.modelcontextprotocol.io/posts/2026-07-28/
date_published: 2026-07-28
date_added: 2026-08-02
tags: [mcp, protocols, authorization, durable-execution, tool-use]
status: active
quality: high
summary: The 2026-07-28 Model Context Protocol specification is out, bringing a stateless protocol core, Multi Round-Trip Requests, header-based routing, cacheable list results, authorization hardening, a formal extensions framework, and updated Tier 1 SDKs.
related: [agent-protocols, agent-tools, durable-execution, agent-security]
---

# The 2026-07-28 Model Context Protocol Specification

## Source Metadata

- Path: raw/articles/official-docs/2026-07-28-the-2026-07-28-model-context-protocol-specification.md
- Author: David Soria Parra; Den Delimarsky
- Published: 2026-07-28
- Publisher: Model Context Protocol
- URL: https://blog.modelcontextprotocol.io/posts/2026-07-28/

## TL;DR

The 2026-07-28 Model Context Protocol specification is out, bringing a stateless protocol core, Multi Round-Trip Requests, header-based routing, cacheable list results, authorization hardening, a formal extensions framework, and updated Tier 1 SDKs.

## Key Claims

- MCP's protocol core is now request/response and stateless: the `initialize` exchange and transport-level `Mcp-Session-Id` are retired, while applications that need state should expose explicit handles.
- Multi Round-Trip Requests preserve elicitation and sampling without a continuously open bidirectional stream by returning `input_required` and replaying the call with responses.
- `Mcp-Method` and `Mcp-Name` headers let gateways route, meter, and authorize calls without parsing JSON bodies.
- Deterministically ordered list responses carry cache hints, reducing catalog fetches and stabilizing upstream prompt caches.
- Authorization now requires issuer validation and issuer-bound credentials, while Dynamic Client Registration is deprecated in favor of Client ID Metadata Documents.
- Tasks moved from experimental core into a formal extension; roots, sampling, logging, and legacy HTTP+SSE are deprecated with a minimum twelve-month window.

## Important Details

- Every request carries the protocol version plus client identity and capabilities in `_meta`; `server/discover` is optional.
- Cache metadata applies to tool, prompt, and resource list/read responses.
- The Tier 1 TypeScript, Python, Go, and C# SDKs shipped support on release day; Rust support was beta.
- The operational simplification does not remove application state or durable work. It makes state explicit at the tool/extension layer instead of implicit in the transport session.
- Claims about download volume and partner performance are first-party ecosystem claims, not independently audited evidence.

## Entities

- People: David Soria Parra, Den Delimarsky
- Organizations: Model Context Protocol, Linux Foundation
- Artifacts: MCP 2026-07-28, Tier 1 MCP SDKs, Multi Round-Trip Requests, Tasks extension
- Standards: RFC 9207, Client ID Metadata Documents
- Concepts: stateless protocols, explicit state handles, header-based authorization, cacheable discovery, deprecation policy

## My Notes

- This is a major architecture correction: transport continuity and application continuity are separate concerns.
- Explicit handles are easier for models, operators, and traces to inspect than hidden affinity to a server session.
- Header visibility improves gateway enforcement, but authorization still depends on binding caller identity and delegated scope to the call rather than trusting a tool name alone.

## Open Questions

- How should clients preserve approval and retry idempotency when an MRTR call is replayed with `inputResponses`?
- Which extension combinations will remain interoperable rather than recreating incompatible profiles around a small stateless core?
- How should explicit state handles be scoped, expired, audited, and prevented from becoming bearer capabilities?

## Related

- [[agent-protocols]]
- [[agent-tools]]
- [[durable-execution]]
- [[agent-security]]

## Source Text

Since our last November release MCP continued to grow at an astonishing rate. Across our Tier 1 SDKs, we’re seeing close to half-a-billion downloads a month, with both TypeScript and Python SDKs crossing the 1 billion total downloads threshold. In just a few months, the protocol continued to grow as the data and interactivity substrate for agentic workflows.Today, we’re officially pushing the release button on the next version of the MCP specification, 2026-07-28, along with the SDKs that will allow you to start building clients and servers right away.The highlight of this release is a stateless protocol core - MCP is transforming from a bidirectional stateful protocol into a request/response stateless protocol. It was one of the most highly-requested features from developers who were eager to get better reliability and scalability for their MCP servers.
A short demo of the stateless protocol core in action.There is, of course, more to what we’re introducing with this version:Every request is self-describing, with an optional discovery call for clients that want capabilities up front, so any request can land on any instance behind a plain round-robin load balancer.Method and tool names travel in the Mcp-Method and Mcp-Name HTTP headers, so gateways can route and authorize on headers directly.Server-to-client requests for things like sampling and elicitation are being redesigned to use Multi Round-Trip Requests (MRTR), removing the need for constantly open bidirectional streams.List responses carry cache hints and a deterministic order, so clients can cache tool catalogs and keep upstream prompt caches stable across reconnects.Formally locking in on a proper extensions framework, with Tasks joining other extensions, such as MCP Apps and Enterprise Managed Authorization (EMA).A set of authorization hardening changes including RFC 9207 issuer validation and a formal shift away from Dynamic Client Registration (DCR) toward client metadata documents (CIMD).A formal deprecation policy with a twelve-month minimum window so you can plan upgrades instead of reacting to them.The TypeScript, Python, Go, and C# SDKs are updated to match, with detailed migration notes for the breaking bits - and you can get started with the new spec right away.What changedNo handshake or sessionsWith the new spec version, we’ve officially retired the initialize/initialized exchange along with the Mcp-Session-Id header (refer to SEP-2575, SEP-2567). Each request now travels on its own, carrying its protocol version, client identity, and client capabilities in _meta. If a client wants to learn a server’s capabilities before doing anything else, there’s a new server/discover Remote Procedure Call (RPC) for that; however, it is not required. Any request can now land on any server instance behind a plain round-robin load balancer without needing shared storage.POST /mcp HTTP/1.1
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: search

{"jsonrpc":"2.0","id":1,"method":"tools/call",
 "params":{"name":"search","arguments":{"q":"otters"},
 "_meta":{"io.modelcontextprotocol/clientInfo":{"name":"my-app","version":"1.0"}}}}
Dropping the protocol-level session doesn’t force your application to be stateless. If your server needs to carry state across calls, mint an explicit handle from a tool and have the model pass it back as an argument. We found this works better than session state hidden in the transport - the model can see the handle and thread it between tools.Multi Round-Trip Requests (MRTR)MRTR replaces the server-initiated elicitation/create, sampling/createMessage, and roots/list requests that previously required a held-open stream.Sometimes a tool needs something from the user mid-call, such as a confirmation or a missing parameter. MRTR (SEP-2322) enables this scenario over a stateless protocol: the server returns resultType: "input_required" along with the requests it needs answered, and the client retries the original call with the answers attached in inputResponses.Streamable HTTP requests now must include Mcp-Method and Mcp-Name (SEP-2243). Your gateway, rate limiter, or WAF can route and meter on those headers instead of parsing JSON bodies.List results are cacheableResponses from tools/list, prompts/list, resources/list, and resources/read now carry ttlMs and cacheScope (SEP-2549). This allows clients to determine the best caching strategy for responses and reduce unnecessary re-fetching.AuthorizationFrom our discussions with implementers for the past year, authorization is where implementers spend most of their integration time. With this spec revision, we continued evolving the MCP auth and security posture.Authorization servers should return the iss parameter per RFC 9207, and clients must validate it before redeeming a code (SEP-2468). This closes an authorization-server mix-up hole.Clients set application_type during Dynamic Client Registration (DCR) so authorization servers stop rejecting localhost redirects for desktop and CLI apps (SEP-837). If you’ve ever wondered why your CLI client’s OAuth flow got a redirect_uri error, this is likely why. And while we’re moving to Client ID Metadata Documents (CIMD) as the standard, this is a hardening measure making the protocol comply with OAuth spec requirements.Client credentials are bound to the issuer that minted them. No reuse across authorization servers (SEP-2352).Dynamic Client Registration itself is now formally deprecated in favor of CIMD. DCR continues to work for backward compatibility, but will be removed in a future version of the MCP spec.TasksTasks move out of the experimental core and into the io.modelcontextprotocol/tasks extension, with a poll-based tasks/get and a new tasks/update (SEP-2663). Change notifications move from the old HTTP GET endpoint to a single subscriptions/listen stream that clients opt into per notification type.DeprecationsRoots, Sampling, and Logging are deprecated (SEP-2577). They still work, and they’ll keep working for at least twelve months. New implementations shouldn’t adopt them. The legacy HTTP+SSE transport is also considered to be officially deprecated, with a year-long offramp.SDKsAll four Tier 1 SDKs speak 2026-07-28 as of today:TypeScriptPythonGoC#Beyond the Tier 1 set, the Rust SDK supports the new spec in beta.The SDKs implement APIs that allow you to build both servers and clients with the new spec version. As we mentioned in the SDK beta blog post, there will be some migration cost, especially for developers that did depend on session identifiers; however, we incorporated early testing feedback that makes this process much easier.Ecosystem supportAs with any large release, the work that we’re doing with MCP would not be possible without contributions from folks across the ecosystem. We’re also especially grateful to a number of contributors and partners who helped us test and validate the spec before it became generally available.The new release is MCP’s most important since remote MCP first launched over a year ago. It is a leap in serving scalable MCP servers and takes all the lessons learned over the last 18 months to provide a robust foundation for MCP’s future. The newly added extensions showcase the continuous innovation of the wider open source project. I am excited to see what people will do with the new capabilities of MCP.David Soria Parra
Member of Technical Staff, Co-Inventor of MCPThis release is the clearest signal yet that MCP is becoming real production-grade infrastructure. The biggest changes are breaking ones, and the community has chosen to do the hard work rather than paper over the gaps. That tracks with what we see across the enterprises we work with: MCP has already become the default these teams are building on, and this release is exactly the maturation they’ve been waiting for. This is a protocol growing up in real time around what production teams actually need, and it’s a step forward for anyone building enterprise agents.Alex Salazar
CEO & Co-FounderAWS and Anthropic are committed to supporting the MCP community and helping developers ship enterprise-grade agents at scale. With the new MCP specification and its stateless protocol core available in Amazon Bedrock AgentCore, developers can deploy MCP servers on standard, scalable infrastructure without managing sessions or persistent connections. Tasks, one of the first official MCP extensions and contributed by AWS, brings support for reliable, long-running agents, so developers can spend less time on infrastructure and more time innovating.Swami Sivasubramanian
VP of Agentic AIMCP 2026-07-28 is a major step toward making agent infrastructure work like the rest of the web: stateless, cacheable, routable, and globally scalable. Cloudflare’s Agents SDK supports the spec from day zero, so developers can run MCP servers directly in Workers, call tools without transport-session overhead, and enable richer flows like elicitation for approvals. Because MCP is an open standard, Cloudflare customers like Sentry and Linear can adopt it on day zero and immediately deliver these improvements to their users.Brendan Irvine-Broque
Senior Director Product ManagementMore builders are using our MCP server to bring generated outputs into Figma’s canvas, where they can explore, riff and refine them with their team into products that stand out. As that usage grows, our stateless architecture can scale with it, and with MCP Apps, Tasks, and Enterprise-Managed Authorization, we can do even more to keep design and code together in one, connected flow.Josh Clemm
VP of EngineeringThe 2026-07-28 Model Context Protocol release represents a massive leap forward in enterprise AI scalability. By evolving into a stateless architecture, this specification removes the friction of deploying agentic workflows at scale. At Google Cloud, we are excited to leverage these powerful new capabilities across our ecosystem of developer tools. This release provides the robust, secure, and extensible foundation that our customers (and our own teams) need to build the next generation of AI applications, and we are proud to continue shaping the future of this open standard together.Anna Berenberg
Engineering FellowAt honeycomb.io, we’ve seen fantastic adoption of MCP - nearly 20% of all monthly interactive queries are now made by agents! The new specification release allows us to support more advanced features such as elicitations while running at enterprise scale.Austin Parker
Director of AI StrategyThe new version of the MCP spec proves that the maintainers listen to feedback from the community. It solves real issues we faced at Manufact, both in mcp-use, our open-source framework, and on Manufact Cloud, where we host thousands of MCP servers. The new SDK v2, which powers mcp-use, helped us cut the package size by around 83% while making it 25% faster, thanks to the new client-server split. And with MCP going stateless, we are able to handle production traffic more reliably, securely, and at scale, without impractical infrastructure workarounds.Enrico Toniato
CTOOpen protocols create bigger ecosystems than any one company can build alone. MCP is foundational to Microsoft Foundry, enabling us to scale from dozens of integrations to thousands. We leverage it with Foundry toolbox unified MCP endpoint that brings together tools while centralizing governance, identity, and observability. With stateless operations, Tasks for long-running work, and enterprise-managed identity, the next generation of MCP makes it easier than ever to build secure, scalable, production-ready agent systems.Tina Schuchman
Corporate Vice President for Engineering, Microsoft FoundryThe stateless core in the 2026-07-28 spec makes MCP a first-class HTTP workload with no session management to work around. Our customers wanted MCPs on Netlify to be as simple as the rest of the platform and this new spec unlocks this at its core. Building MCP Apps into the new extensions framework is a huge step forward for scalability, accessibility, and capability across the whole ecosystem.Sean Roberts
VP of Applied AIMCP is now about a year and a half old. Thanks to feedback from developers and others who have worked with us, it’s evolving into a more mature protocol that incorporates lessons from decades of web protocol design. As with prior revisions, the most interesting part will be seeing the unexpected things people build with it.Nick Cooper
MTS & MCP Core MaintainerMoving MCP to a stateless protocol makes it easier to scale our own service and makes it easier for us to add analytics for our customers’ MCP servers. Making it easier to show people how their MCP tools are being used and what tools are missing that their users would want to use. It’s great to see this protocol growing in this direction.Paul D'Ambra
Product EngineerThis is a milestone release for anyone building MCP at scale. FastMCP has always existed to turn the spec’s most powerful capabilities into an obvious developer experience, and we’re excited to ship first-class support for background tasks, stateless interactivity, enterprise auth, and more in FastMCP 4.0. Horizon, our MCP governance platform, was built stateless from the start to handle enormous scale, so having that approach become native to the protocol is incredible to see.Jeremiah Lowin
CEOThis release makes MCP more enterprise-ready than ever. Runlayer is bringing these advances to every enterprise on our platform, providing a simpler, safer foundation for deploying MCP and agents across their organizations.Tal Peretz
Co-founder & CPOThe latest MCP revision is an important milestone. It reflects a level of rigor and user input that shows the protocol is maturing in a way that allows businesses to build on it with confidence. We have implemented the revision and the move to a stateless model removes operational complexity and unlocks MCP at enterprise scale. It’s a strong signal that the community is being shaped by real deployment experience.Craig McLuckie
CEOSupporting elicitations has been on our roadmap for a while, but since Supabase MCP runs statelessly, it wasn’t something we could do easily. MRTR changes that - it allows our tools to confirm with the user before it acts, like the cost of a new project before it’s created, or a query that would delete data. We’re excited to support elicitations.Inian Parameshwaran
Head of ProductAnthropic pairs frontier models with a developer experience that keeps raising the bar. The stateless core in the open MCP 2026-07-28 spec reduces the complexity we manage, so we can ship more features to our customers, faster and at scale.Andrew Goodman
VP of AIGetting startedWe’re excited to have developers build on the new spec. To get started, refer to the following resources:SpecificationFull changelogDocumentation and guidesThank youThis release would not be possible without a massive community of contributors and industry partners. We’d like to acknowledge the dozens of key contributors across specification, documentation, SDKs, working and interest groups, as well as hundreds of independent worldwide communities who rallied support and excitement for MCP. We’re looking forward to continuing evolving the protocol as it grows!
