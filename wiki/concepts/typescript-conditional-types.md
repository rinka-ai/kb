---
id: concept-typescript-conditional-types
type: concept
title: TypeScript Conditional Types
tags: [typescript, type-system, conditional-types, generics, inference, unions, api-design, declaration-files, performance]
summary: TypeScript conditional types encode generic input-output relations through structural tests, inference, and deliberate union distribution, but public helpers must stay explainable, declaration-safe, measured, and aligned with runtime behavior.
source_count: 3
canonical_for: [TypeScript conditional types, TypeScript infer keyword, distributive conditional types, non-distributive conditional types, generic input-output relations]
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2026-11-07
confidence: "0.90"
---

# TypeScript Conditional Types

## Summary

Conditional types choose one type expression or another according to structural assignability: `T extends U ? X : Y`. Combined with generics, they describe a stable relation between an input type and an output type, refine the checked type inside the true branch, and extract matched components with `infer`. When the checked side is a naked type parameter, the operation distributes over each union member; tuple-wrapping the comparison suppresses that behavior and tests the union as a whole.

This makes conditional types useful for named library utilities, adapters, schema-derived APIs, and coherent overload reduction. It does not make a runtime decision or validate a value. A safe API keeps the type-level relation aligned with the JavaScript branch, exposes understandable declarations, decides distribution intentionally, and tests both checker behavior and runtime behavior through the package surface.

## Core Model

1. **Test assignability.** The left side of `extends` is checked against the right side using TypeScript's structural compatibility model.
2. **Refine in the true branch.** A successful check gives the branch enough information to use members guaranteed by the matched constraint.
3. **Extract with `infer`.** A pattern can bind an internal component—such as an array element or function return type—to a fresh type variable.
4. **Distribute naked parameters.** `C<A | B>` becomes `C<A> | C<B>` when the checked operand is a naked generic parameter.
5. **Suppress distribution deliberately.** `[T] extends [U] ? X : Y` evaluates the union as one type rather than mapping its members.
6. **Remember erasure.** None of these branches, inferences, or constraints exists in emitted JavaScript.

Conditional types often operate inside [[typescript-mapped-types]]: the mapped layer chooses the property vocabulary while the conditional layer classifies or filters each property. Review distribution, key remapping, and output modifiers separately; a concise alias can otherwise hide several distinct public-API decisions.

They also depend on the parameter discipline in [[typescript-generic-api-design]]. Inference should derive the input relation from ordinary values where possible, constraints should expose only the capabilities each branch needs, and defaults should not silently conceal an unmatched or ambiguous relation.

## Type And API Boundary

Conditional types are strongest when they state one coherent relation:

```ts
type ResultFor<T extends Query> =
  T extends UserQuery ? UserResult :
  T extends TeamQuery ? TeamResult :
  never;
```

The owning API should keep the relation visible and named. If callers need to inspect several levels of recursive aliases to understand a return type, a discriminated union, explicit overload set, or separate operation may communicate the contract better. Reducing syntactic overload count is not a goal by itself.

A conditional generic should not collapse operations with materially different authorization, side effects, retries, errors, latency, or lifecycle ownership. Those are semantic contracts, while a conditional type can only transform static structure. Preserve explicit discriminants where callers must perform runtime branching, and do not return a casted `ResultFor<T>` unless the implementation actually enforces the same case split.

## Runtime Versus Type Boundary

- Conditional types classify declarations known to the checker; they do not inspect runtime values.
- `infer` extracts a static component from a matched type pattern; it does not parse, deserialize, or validate data.
- JSON, environment variables, database rows, plugin exports, request payloads, and JavaScript callers should enter as `unknown` and pass through runtime validation before the internal generic relation applies.
- A generic runtime implementation often cannot prove its own conditional return without an assertion. Keep any assertion inside a small implementation boundary and test every value-level branch rather than transferring that assertion burden to consumers.
- Distribution over a static union does not imply that one runtime value can safely be treated as every distributed branch. Preserve a runtime discriminant or validated correlation.

The safe flow remains **validate → normalize → classify → execute**. [[typescript-control-flow-narrowing]] handles value-level evidence and control flow; conditional types derive reusable static relations after admission.

## Package Graph And Declaration Ownership

Exported conditional types are executed by the consumer's compiler through emitted declarations. The package owner therefore owns more than source-level correctness:

- Export named aliases only through documented public subpaths, with declarations aligned to each runtime branch selected by the package's `exports` conditions.
- Test packed artifacts from a consumer fixture, not only local aliases or workspace source imports; see [[typescript-module-systems]].
- Include the oldest and newest supported TypeScript versions when a helper depends on subtle inference or recursive behavior.
- Avoid leaking private implementation types into true/false branches or `infer` patterns.
- Treat changes to constraints, branch ordering, fallback types, and distributivity as public API changes even when runtime JavaScript is unchanged.
- Keep schema/code generation bounded: generated unions and recursively composed helpers are evaluated in downstream projects and editor sessions.
- When a conditional appears inside a mapped type, test the combined key set, modifier behavior, filtering, and per-key branch—not only the conditional alias in isolation.

In a monorepo, the package declaring the relation should own its type fixtures and packed-consumer tests. Application packages should consume the public declaration graph rather than proving compatibility through `paths` shortcuts.

## Composition And Lifecycle Ownership

- **Boundary adapters** validate unknown runtime values and produce domain-owned discriminated structures.
- **Domain packages** own closed vocabularies, meaningful branch correlations, and the decision that unmatched cases become `never`, a fallback, or an explicit error type.
- **Library/API packages** own exported conditional helpers, constraints, overload trade-offs, declarations, and compiler-version support.
- **Runtime implementations** own the JavaScript decision corresponding to the type-level relation.
- **Composition roots** bind validators, implementations, and package versions; they should not use assertions to fabricate a correlation that no runtime component enforces.
- **Consumers** should receive useful results without needing to understand recursive implementation machinery.

This division keeps lifecycle semantics explicit. A conditional type may map a request variant to a response variant, but cancellation, resource ownership, authorization, retry, and cleanup still belong to runtime protocols.

## Tests And Executable Enforcement

Use a matrix rather than one happy-path example:

- Positive fixtures for every true/false branch and every supported input variant.
- Negative fixtures, usually with `@ts-expect-error` or a dedicated type assertion library, for unsupported inputs and forbidden correlations.
- Explicit cases for union distribution and tuple-wrapped non-distribution.
- Edge cases for `never`, `any`, `unknown`, `boolean`-like unions, optional members, readonly containers, and overloaded function types.
- A test documenting that overloaded-function inference uses the final signature rather than call-site overload resolution.
- Packed-consumer fixtures that import the public helper and corresponding runtime function through supported exports.
- Runtime tests that execute every JavaScript branch, validate untrusted inputs, and compare each result's discriminant/shape with the declaration.
- Compatibility runs across supported compiler versions where inference stability is part of the package promise.

Prefer small, named assertions that explain the intended relation. Snapshotting giant expanded types can produce noisy diffs without proving that important accepted and rejected cases remain correct.

## Performance And Observability

Conditional types have no direct runtime cost because they are erased. Their costs appear in type checking, declaration consumption, diagnostics, and editor responsiveness. Distribution can multiply work across union members, while nested mapped/conditional recursion and generated declarations can amplify that graph further.

The handbook provides no benchmark or safe threshold. Measure representative consumer projects with the actual TypeScript versions and options you support. Track cold and incremental typecheck time, declaration build time, editor latency/traces, memory, and diagnostic quality before and after helper changes. If performance regresses, first reduce public recursion, union width, repeated expansion, or unnecessary distribution; do not replace measured evidence with folklore about “complex types.”

Keep runtime validator latency and checker latency separate. A validator may be generated from the same schema, but its execution cost is not caused by the erased conditional alias.

## Failure Modes

- Treating a conditional type as proof that external data matches a branch.
- Letting a generic implementation cast its output without testing the corresponding runtime branch.
- Accidentally distributing over a union and returning member-wise results when the API intended one aggregate result.
- Suppressing distribution reflexively and losing useful input-output correlation.
- Replacing clear overloads with a nested helper that worsens inference and diagnostics.
- Assuming `infer` performs overload resolution; overloaded inputs infer from the final signature.
- Using `any` in a branch or constraint and silently dissolving the intended relation.
- Returning `never` for an open/extensible vocabulary and making legitimate future cases disappear statically.
- Publishing recursive helpers without consumer compile-time or editor-performance evidence.
- Testing against monorepo source aliases while shipped declarations expose a different graph.
- Encoding side-effect, authorization, or lifecycle differences only in erased types.

## Practical Pattern

**Named, bounded relation with dual enforcement:** accept validated domain inputs; encode one stable input-output relation in a named conditional helper; choose member-wise versus whole-union behavior explicitly; keep public recursion shallow and declarations self-contained; implement the same branch in runtime JavaScript; and run type fixtures plus value-level tests through the packed public API across supported compilers.

## Transfer Limits

- The official handbook explains semantics but does not quantify recursion limits, union-width costs, editor latency, declaration emit stability, or version-to-version inference changes.
- Conditional types model static structure, not semantic substitutability, runtime validity, protocol compatibility, authorization, cancellation, side effects, or performance.
- A closed conditional over today's union may be wrong for plugin ecosystems or open registries. Prefer explicit extension protocols where third parties own future variants.
- `infer` can extract what a declaration says, not what deployed JavaScript returns.
- Compiler improvements and regressions can change practical ergonomics even when the intended source-level relation remains the same; library support matrices need executable evidence.

## Related

- [[typescript-generic-api-design]]
- [[typescript-template-literal-types]]
- [[typescript-structural-compatibility]]
- [[typescript-mapped-types]]
- [[typescript-control-flow-narrowing]]
- [[typescript-module-systems]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Notes

- [[2026-08-04-typescript-conditional-types]]
- [[2026-08-05-typescript-mapped-types]]
- [[2026-08-07-typescript-generics]]
