---
id: concept-typescript-module-systems
type: concept
title: TypeScript Module Systems
tags: [typescript, modules, module-resolution, packaging, nodejs, bun, esm, commonjs, monorepos]
summary: TypeScript module correctness comes from making compiler resolution, runtime loading, package export maps, declaration files, and workspace topology describe the same public module graph.
source_count: 3
canonical_for: [TypeScript modules, TypeScript module resolution, TypeScript packaging, NodeNext TypeScript, TypeScript ESM CommonJS, TypeScript package exports, TypeScript monorepo imports]
review_status: reviewed
last_reviewed: 2026-08-06
review_due: 2026-11-06
confidence: "0.88"
---

# TypeScript Module Systems

## Summary

TypeScript does not own module loading. It predicts how a host—Node.js, Bun, or a bundler—will resolve and execute an import, then looks for source or declaration files that supply types for that same runtime path. A project is sound only when its compiler settings, import syntax, file extensions, `package.json` fields, declarations, and workspace links describe one compatible module graph.

This makes module configuration part of API design. `package.json` `exports` defines public subpaths and selects runtime/type branches; declarations promise what those runtime branches provide; `module` and `moduleResolution` tell TypeScript which host semantics to model. A green typecheck is not sufficient if aliases or declarations cause TypeScript to inspect a different graph from the runtime.

## Core Model

1. **The host owns runtime lookup.** Identify whether Node, Bun, or a bundler executes or transforms the source.
2. **TypeScript models that host.** Choose `module` and `moduleResolution` together; hypothetical emit can affect condition selection even with `noEmit`.
3. **Type lookup shadows runtime lookup.** TypeScript substitutes `.ts`, `.tsx`, and declaration extensions while preserving the runtime specifier's intended target.
4. **Package metadata defines the public graph.** `type`, `exports`, `imports`, `types`, and file extensions determine module format, accessible subpaths, and declaration branches.
5. **Execution verifies the promise.** Consumer fixtures and workspace package lookups catch mismatches that type checking alone cannot.

## Runtime And Type Boundaries

- `import type` and `export type` guarantee that a dependency is erased from JavaScript. A value needed at runtime cannot cross a type-only edge.
- Ambient modules and declaration files describe implementations; they do not create them. Their module format and exports must match what the host loads.
- Under Node modes, `.mts`/`.mjs`/`.d.mts` are ESM and `.cts`/`.cjs`/`.d.cts` are CommonJS. Ordinary `.ts`/`.js` files derive format from the nearest package `type` field.
- Node's ESM/CommonJS interop has runtime cases TypeScript cannot prove, including optimistic CommonJS named imports and `require(esm)` graphs containing top-level await.
- `bundler` resolution intentionally permits extensionless and directory behaviors that direct Node ESM may reject; it is not a portable synonym for modern modules.

## Package And Monorepo Rules

- Treat `exports` as an allowlisted API surface. If a subpath is not exported, consumers should not deep-import it.
- Keep declaration conditions next to corresponding `import` and `require` branches so each runtime branch receives matching types.
- Do not use `paths` to point at sibling workspace packages or dependencies. It bypasses package lookup and can hide broken `exports`, `types`, or runtime behavior.
- Use package-manager workspaces to symlink local packages through `node_modules`, exercising the package graph consumers will see.
- Libraries must not require consumers to reproduce private compiler aliases. Prefer standards-based package `imports` for internal aliases when the target hosts support them.
- If a package publishes both ESM and CommonJS, test both branches and their declarations. Dual publication is a compatibility commitment, not only a build option.
- Exported conditional helpers are instantiated in consumer projects. Test their branch behavior, inference, and compile cost through packed declarations and supported public subpaths rather than only against local source aliases; see [[typescript-conditional-types]].
- Exported mapped helpers are likewise executed by downstream compilers. Their source key vocabularies, modifiers, remapping rules, and referenced types must remain reachable and stable through emitted declarations; see [[typescript-mapped-types]].
- Exported template-literal helpers make naming grammars and inferred key/payload relations part of the declaration contract. Test their bounded expansion, supported compiler matrix, and runtime realization through packed consumers; see [[typescript-template-literal-types]].

## Composition And Ownership

The application or package composition root owns host selection. It should make runtime, build, and type-check configuration coherent:

- **Direct Node:** use the Node mode corresponding to the supported runtime contract; choose explicit file/package format deliberately.
- **Bundled app:** use bundler-compatible module settings and ensure the bundler independently implements any aliases TypeScript accepts.
- **Bun/raw TypeScript:** use settings that reflect raw-source execution and preserve import form; verify any Node compatibility claims separately.
- **Published library:** build and test the package artifact through its public export map rather than importing private source paths.

Package authors own public exports and declarations. Application authors own runtime/bundler configuration. Workspace tooling owns installation links. Mixing those responsibilities—for example, making `tsconfig.paths` impersonate package installation—creates type/runtime drift.

## Testing And Observability

- Run strict type checking, but also execute representative imports under each supported runtime/module branch.
- Build or pack a library, install/link it into a small consumer fixture, and import only documented public subpaths.
- Verify ESM and CommonJS consumers independently when both are promised.
- Use workspace resolution in monorepo tests rather than source aliases.
- Capture `--traceResolution` only for focused failures or regressions; compare the resolved declaration and runtime artifact, not just whether resolution succeeded.
- Make no performance claim without compiler traces or timed builds. Resolution correctness and resolution speed are separate questions.

## Failure Modes

- TypeScript accepts a `paths` alias that the runtime does not know.
- A declaration file exposes names absent from the selected runtime branch.
- A bundler-mode project is executed directly in Node and relies on extensionless ESM imports.
- A package adds `exports` and accidentally blocks previously deep-imported paths.
- Local monorepo source aliases bypass the package artifact, so publishing defects appear only for external consumers.
- A type-only import is later used as a runtime value, or a value import creates an unintended runtime dependency.
- `nodenext` behavior changes with newer Node semantics while the package assumed a frozen compatibility target.

## Practical Pattern

**Host-first, package-real testing:** name the execution host, align `module`/`moduleResolution`, encode the public graph in `package.json`, keep declarations paired with runtime branches, connect monorepo packages through workspaces, and run a consumer fixture against built artifacts. Treat every import as both a type edge and a possible runtime/package edge, then make erasure explicit where only the type edge is intended.

## Transfer Limits

- Runtime-specific advice must be rechecked when Node or Bun changes module behavior.
- Bundled applications can safely use host-specific aliases only if the bundler and TypeScript share the mapping; published libraries cannot transfer that assumption to consumers.
- This concept covers module and package boundaries, not general TypeScript type-system soundness, runtime input validation, project references, or compiler performance.

## Related

- [[typescript-template-literal-types]]
- [[typescript-control-flow-narrowing]]
- [[typescript-conditional-types]]
- [[typescript-mapped-types]]
- [[typescript-structural-compatibility]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Notes

- [[2026-08-01-typescript-modules-reference]]
- [[2026-08-04-typescript-conditional-types]]
- [[2026-08-06-typescript-template-literal-types]]
