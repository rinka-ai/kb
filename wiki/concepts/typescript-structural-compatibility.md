---
id: concept-typescript-structural-compatibility
type: concept
title: TypeScript Structural Compatibility
tags: [typescript, type-system, structural-typing, assignability, variance, generics, soundness, api-design, declaration-files]
summary: TypeScript structural compatibility enables low-coupling JavaScript-style composition, but API safety depends on variance-aware callbacks, truthful declarations, strict settings, runtime admission, and executable assignability tests.
source_count: 3
canonical_for: [TypeScript structural typing, TypeScript type compatibility, TypeScript assignability, TypeScript variance, TypeScript function parameter bivariance, TypeScript generic compatibility, TypeScript soundness]
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2026-11-07
confidence: "0.90"
---

# TypeScript Structural Compatibility

## Summary

TypeScript asks whether a source value provides the members and callable behavior required by a target, not whether both values explicitly name the same declaration. That structural model fits JavaScript's anonymous objects, callbacks, and incremental adoption: an implementation can satisfy a small interface without inheriting from it. The trade-off is non-local compatibility. A member, callback, overload, declaration, or compiler-setting change can alter whether two independently authored APIs compose.

The system is intentionally not fully sound. Some callback and optional/rest-parameter assignments exist because they support common JavaScript idioms, while `any`, assertions, stale declarations, and unchecked runtime data can bypass static guarantees entirely. The engineering pattern is therefore not “the compiler proves safety”; it is “make the smallest truthful structural promise, check it under strict settings, test intended assignments through the published API, and validate runtime values before admission.”

## Core Model

1. **Compare target requirements.** A source object may have extra members, but it must recursively satisfy every member required by the target.
2. **Treat fresh object literals more cautiously.** A directly typed literal receives a known-property check that a previously bound structural value may not.
3. **Respect function direction.** A replacement callback may ignore arguments, but it must not require a narrower input than the producer promises to send; its return value must satisfy what the caller expects.
4. **Let structure give generics meaning.** A type parameter distinguishes instantiations only when it appears in a member that changes the resulting shape.
5. **Recognize nominal islands.** Private and protected class members require compatible declaration origin even when the rest of two instance shapes match.
6. **Separate static assignability from runtime truth.** Compatibility uses the declarations visible to the compiler and disappears from emitted JavaScript.

## Type And API Boundary

Structural interfaces work best as capability-shaped contracts:

```ts
interface Clock {
  now(): number;
}

interface AuditSink {
  write(event: AuditEvent): Promise<void>;
}
```

Implementations need not inherit from these declarations; tests and adapters can provide any value with the required behavior. Keep these contracts minimal because every required member increases coupling and every public member participates in recursive comparison.

[[typescript-generic-api-design]] makes the same rule parametric: constrain a type parameter to the smallest structural capability the implementation needs while returning or propagating the caller's more specific type. A parameter only creates a distinct generic instantiation when it appears in structure; use a real discriminant or opaque member when identity rather than reusable relation is the goal.

Callback APIs need explicit ownership reasoning. The producer owns the set of values that may be passed to a handler, so a handler accepted by the API must tolerate that full set. The handler owns its return guarantee, so its returned value must satisfy the caller's expected shape. Do not hide a narrower handler behind a cast simply because today’s producer happens to emit one subtype.

Structural equality is undesirable when two values have the same representation but different authority or meaning—for example, tenant IDs and user IDs, validated and unvalidated payloads, or cents and basis points. A discriminant, private/protected origin, or a deliberately opaque/brand-like member can establish the missing distinction, but the chosen mechanism must survive the public declaration and package boundary.

[[typescript-conditional-types]] uses this same assignability relation as a type-level branch. That means changes to a public structure can alter not only direct assignments but also which conditional branch consumers receive. Type-test representative and union inputs whenever a structural API feeds an exported conditional helper.

[[typescript-mapped-types]] projects those public structures property by property. Adding a member or changing its optional/readonly status can therefore reshape many derived configurations and registries at once; use that amplification deliberately for closed owned vocabularies, not incidental implementation objects.

## Runtime Versus Type Boundary

- Interfaces, type aliases, generic arguments, and most compatibility evidence are erased before execution.
- `unknown` is a safe admission type because values can flow into it but cannot flow out to arbitrary targets without proof; `any` disables that discipline in both directions.
- A declaration file can claim a runtime export has a shape that the implementation does not have. The compiler checks against the claim, not the deployed object.
- JSON, environment variables, database rows, network payloads, plugin objects, and JavaScript callbacks require runtime validation or defensive checks where their provenance is not trusted.
- Excess-property checks are not general runtime validation and are not a guarantee that an object contains only declared keys.

Use the same pipeline as [[typescript-control-flow-narrowing]]: **parse/validate → normalize → assign/narrow → act**. Structural compatibility determines whether admitted values compose with internal contracts; it does not perform admission.

## Package Graph And Declaration Ownership

The package author owns the runtime artifact, export map, and declarations as one contract. Consumers only see the shape exported through that graph:

- Build or pack the library and type-test imports through documented public subpaths rather than private source aliases.
- Keep declarations aligned with the runtime branches selected by `exports`, module format, and host conditions; [[typescript-module-systems]] covers that graph.
- Treat public member removal, parameter narrowing, return weakening, overload removal, and generic-structure changes as compatibility-sensitive even when no class hierarchy changes.
- Watch duplicated package copies when public classes expose private/protected members: origin-sensitive compatibility can make apparently identical instances non-assignable.
- Avoid phantom generics as identity labels. If `T` never affects a member, `Container<A>` and `Container<B>` may have the same structure.

In a monorepo, the owning package should define and test the contract. Applications should consume it through workspace package resolution, and composition roots should bind concrete implementations. Do not let local `paths` mappings prove compatibility against a source graph that published consumers never receive.

## Composition And Lifecycle Ownership

- **Boundary adapters** validate unknown external values and normalize them into domain-owned structures.
- **Domain packages** own meaningful distinctions, discriminants, opaque identities, and closed state vocabularies.
- **Library/API packages** own minimal public interfaces, callback variance, overload sets, declarations, and compatibility policy.
- **Composition roots** choose implementations and should depend on capabilities rather than concrete classes where identity is unnecessary.
- **Runtime producers** own every argument shape a callback may receive; callback consumers must accept that full contract.
- **Callers** own the result shape they require; implementations must return at least that contract.

This allocation lowers change amplification: infrastructure can be replaced structurally, while domain identities and lifecycle states remain deliberately non-interchangeable.

## Tests And Executable Enforcement

Use compiler fixtures as API tests:

- Positive fixtures prove that intended adapters, callbacks, and consumer imports remain assignable.
- `@ts-expect-error` or dedicated type-test assertions prove that domain identities, narrower callbacks, invalid overloads, and incompatible generic instantiations remain rejected.
- Compile under the strict settings promised to consumers, including `strictFunctionTypes`; do not assume every consumer shares an implicit local default.
- Test emitted or packed artifacts through public exports so declarations and runtime modules are exercised together.
- Add JavaScript/runtime tests for callbacks, validators, and implementations crossing untyped boundaries.
- Test both accepted and rejected values for opaque distinctions and boundary validators; a type-only rejection is insufficient when input arrives dynamically.

A library upgrade should run these consumer fixtures before release. A passing internal source typecheck can miss declaration-generation, export-map, duplicated-dependency, or downstream variance failures.

## Performance And Observability

Structural comparison recursively explores members, but the handbook provides no threshold or benchmark for compiler or language-service cost. Large generated types, overload sets, recursive generics, declaration graphs, and unions should be measured with TypeScript diagnostics and editor traces before optimization.

There is normally no runtime cost for assignability itself because types are erased. Runtime cost belongs to validators, defensive guards, adapters, or emitted JavaScript—not to the structural comparison performed during checking. Observe rejected boundary values and package-consumer compilation failures separately; they diagnose runtime protocol drift and static API drift, respectively.

## Failure Modes

- Using `any` at a boundary and treating successful assignment as validation.
- Accepting a callback whose parameter is narrower than values the producer may emit.
- Assuming an excess-property error means values cannot carry additional runtime keys.
- Adding a generic type parameter that never appears in structure and expecting nominal separation.
- Writing `in`/`out` annotations to force variance even though annotations cannot override ordinary structural comparison.
- Publishing declarations that describe source code rather than the selected runtime artifact.
- Depending on concrete classes when a small capability interface would reduce coupling.
- Relying on pure structure where equal representations carry different authority or units.
- Suppressing compatibility regressions with casts instead of deciding whether the API changed.
- Benchmarking runtime validators and attributing their cost to TypeScript's erased type system.

## Practical Pattern

**Minimal structural ports with explicit nominal seams:** define small capability interfaces for replaceable infrastructure; preserve meaningful identity and lifecycle distinctions with explicit discriminants or opaque members; accept `unknown` at untrusted boundaries and validate it; design callbacks from producer-owned input breadth and caller-owned output guarantees; publish truthful declarations; and lock both intended compatibility and intended incompatibility into strict package-consumer type tests.

## Transfer Limits

- TypeScript optimizes for compatibility with JavaScript, not complete soundness. Strict options improve rejection but do not turn declarations, assertions, or external data into runtime proofs.
- The handbook gives the core model but does not enumerate every current version-, syntax-, or setting-specific exception. Verify sensitive callback and method APIs against the actual compiler version and configuration.
- Structural ports are valuable for substitution but do not replace semantic documentation: two methods with identical signatures may have different side effects, timing, error, retry, transaction, or lifecycle contracts.
- Opaque or brand-like types reduce accidental interchangeability only inside TypeScript-aware paths; serialization strips type-only identity unless runtime representation and validation preserve it.
- Compiler compatibility does not prove behavioral substitutability, performance, thread/process safety, authorization, or protocol compatibility.

## Related

- [[typescript-generic-api-design]]
- [[typescript-control-flow-narrowing]]
- [[typescript-conditional-types]]
- [[typescript-mapped-types]]
- [[typescript-module-systems]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Notes

- [[2026-08-03-typescript-type-compatibility]]
- [[2026-08-04-typescript-conditional-types]]
- [[2026-08-07-typescript-generics]]
