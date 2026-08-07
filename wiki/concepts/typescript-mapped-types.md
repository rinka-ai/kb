---
id: concept-typescript-mapped-types
type: concept
title: TypeScript Mapped Types
tags: [typescript, type-system, mapped-types, generics, keyof, key-remapping, template-literal-types, api-design, declaration-files, performance]
summary: TypeScript mapped types derive property-wise API projections from owned key vocabularies, but modifiers, remapping, filtering, declaration cost, and runtime realization must remain explicit.
source_count: 2
canonical_for: [TypeScript mapped types, TypeScript mapping modifiers, TypeScript key remapping, TypeScript mapped type filtering, TypeScript keyof transformations, TypeScript EventConfig pattern]
review_status: reviewed
last_reviewed: 2026-08-06
review_due: 2026-11-06
confidence: "0.90"
---

# TypeScript Mapped Types

## Summary

Mapped types construct an object-like type by iterating over a key union—commonly `keyof T`—and defining an output property for each member. Indexed access preserves each key's relation to its source value, mapping modifiers add or remove `readonly` and optionality, and an `as` clause can rename or filter keys. The iterator can also be a union of structured variants, enabling a discriminated event union to become a keyed handler table without losing each handler's payload type.

This is a static projection, not a runtime object transformation. A safe public helper has one domain-owned source vocabulary, makes key and modifier changes obvious, keeps declarations and diagnostics consumable, and pairs its type fixtures with runtime code whenever the API claims to construct, validate, register, or dispatch the corresponding values.

## Core Model

1. **Choose an input vocabulary.** Iterate over `keyof T`, another `PropertyKey` union, or a structured union whose members can be remapped to keys.
2. **Define each output value.** Use `T[K]` to preserve a key-value relation or replace it with a new value type.
3. **Control modifiers.** `+readonly`, `-readonly`, `+?`, and `-?` alter the output declaration; `+` is implicit.
4. **Remap through `as`.** Produce a new key, often with a template literal, or produce `never` to omit that entry.
5. **Compose deliberately.** Conditional types can classify each property or filter keys, while [[typescript-template-literal-types]] can generate names. Every interpolated union position cross-multiplies, so bound the resulting key space.
6. **Remember erasure.** The transformation changes what the checker accepts; it emits no JavaScript that clones, freezes, fills, renames, deletes, validates, or registers properties.

## Type And API Boundary

Mapped types are strongest as named, bounded projections over one authoritative model:

```ts
type HandlerTable<E extends { kind: PropertyKey }> = {
  [Event in E as Event["kind"]]: (event: Event) => void;
};
```

The event union owns the allowed variants and payloads. The helper derives a correlated registry shape, so adding a closed variant makes the missing handler visible to the checker. That is useful only if the vocabulary really is closed and one owner coordinates its evolution. Plugin ecosystems and third-party extension points usually need a runtime registration protocol rather than a supposedly exhaustive mapped object.

Modifier-changing helpers require semantic honesty. `-readonly` says a consumer may assign through the resulting type; it does not make an immutable backing implementation safely mutable. `-?` says every property exists; it does not synthesize defaults. Likewise, remapping getters or filtering a discriminator can be a convenient view, but the result should not conceal authority, units, lifecycle state, or behavior callers still need.

## Runtime Versus Type Boundary

- Mapped types inspect declarations known to the checker, never runtime keys or property descriptors.
- `CreateMutable<T>` neither mutates nor unfreezes a value. Runtime immutability depends on implementation, ownership, proxies/descriptors, or `Object.freeze` behavior.
- `Concrete<T>` does not populate absent values. Parsing/defaulting must happen before a value is admitted to the required shape.
- A generated handler-table type does not register handlers, reject duplicates, dispatch events, or enforce authorization and teardown.
- Filtering a key to `never` removes it from the static output key set; it does not redact that key from an existing object or serialized payload.
- Boundary data should still arrive as `unknown`, pass runtime validation and normalization, and only then enter domain-owned projections; see [[typescript-control-flow-narrowing]].

When one schema is expected to drive both runtime and static artifacts, use a runtime schema or generator as the shared source of truth and derive types from it. An erased mapped helper alone cannot prove that JavaScript performed the same transformation.

## Package Graph And Declaration Ownership

Exported mapped types run in the consumer's compiler through emitted declarations:

- Publish named helpers through supported public subpaths and keep every referenced source type reachable in `.d.ts` output.
- Test the built or packed package through its `exports` map rather than a monorepo `paths` shortcut; see [[typescript-module-systems]].
- Treat changes to source keys, optionality, readonly status, remapping expressions, filtering conditions, and value projections as public API changes.
- Test the oldest and newest supported TypeScript versions when key remapping, template literals, inference, or conditional composition is part of the package promise.
- Avoid leaking private helper types or enormous generated key unions into public declarations.
- Keep the vocabulary's owning package responsible for type fixtures; application composition roots should consume the public projection rather than redefine it.

Mapped APIs can reduce duplicated declarations while increasing downstream change amplification: one newly added source property may alter configuration objects, handler registries, generated getter names, and diagnostics in every consumer. This is desirable for closed exhaustive contracts and hazardous for open or incidental object shapes.

## Composition And Lifecycle Ownership

- **Domain packages** own authoritative key/discriminator vocabularies and decide whether they are closed or extensible.
- **Library/API packages** own mapped projections, modifier semantics, naming rules, declaration compatibility, and supported compiler versions.
- **Boundary adapters** validate and normalize unknown runtime data; they do not rely on mapped types as admission checks.
- **Runtime registries/builders** own duplicate handling, missing entries, object construction, dispatch, authorization, cleanup, and error behavior.
- **Composition roots** bind concrete handlers or projections and should not use assertions to fabricate completeness.
- **Consumers** should see readable public types and actionable errors without expanding several nested mapped/conditional/template aliases.

A mapped registry may describe complete composition, but runtime lifecycle still needs an owner. Handler disposal, resource acquisition, retries, event ordering, and partial startup cannot be encoded solely by key presence.

## Tests And Executable Enforcement

Use public-surface type fixtures covering:

- all expected keys and value correlations;
- added and removed `readonly` and optional modifiers;
- renamed keys, filtered keys, and unsupported keys;
- string, number, and symbol-key behavior where relevant;
- remapping collisions and duplicate discriminator values;
- closed-union growth, `never`, optional members, index signatures, and broad `string` keys;
- template-literal capitalization, Unicode and unusual names, including the intrinsic casing operations' documented non-locale-aware behavior;
- composition with conditional types and unions;
- emitted declarations imported through a packed consumer fixture;
- the supported TypeScript compiler-version matrix.

Use positive assignments plus targeted negative assertions such as `@ts-expect-error`; prefer small semantic checks over giant expanded-type snapshots. Pair the fixtures with runtime tests for constructors, serializers, validators, registries, and dispatchers. If the type says every event has one correctly typed handler, execute each route and test duplicate, missing, unknown, failure, and teardown paths.

## Performance And Observability

Mapped types have no direct runtime cost because they are erased. Their cost can appear in checking, declaration emit and consumption, diagnostics, editor completion, and language-service memory. Amplifiers include wide key unions, template-literal cross products, repeated remapping, nested conditional types, generated declaration graphs, and helpers that force downstream expansion.

The mapped-types handbook provides no benchmark, threshold, or current compiler-performance guarantee; the template-literal chapter explicitly recommends ahead-of-time generation for large string unions but gives no numeric cutoff. Measure representative consumers under supported compiler versions and options. Track cold and incremental typecheck time, declaration build time, editor traces/latency, memory, and diagnostic readability. Separately measure any runtime validator, registry, or object transformation; do not attribute that execution cost to the erased mapped type.

## Failure Modes

- Treating `-readonly` as runtime mutability or `-?` as runtime defaulting.
- Filtering a key statically and assuming sensitive data was removed from the object.
- Mapping over an open plugin vocabulary as though the registry were exhaustive.
- Deriving a required consumer configuration from every incidental internal property.
- Renaming keys with opaque template machinery that worsens discoverability and diagnostics.
- Losing string/number/symbol keys through an unjustified `string & K` constraint.
- Allowing remapped keys or discriminator values to collide without a documented policy and fixtures.
- Exporting deeply nested mapped/conditional helpers without consumer compile-time evidence.
- Testing monorepo source aliases instead of shipped declarations and runtime exports.
- Using an assertion to claim a runtime object realizes the full mapped relation.
- Encoding materially different authorization, side effects, timing, or lifecycle behavior only as generated property names.

## Practical Pattern

**Domain-owned vocabulary, derived view, dual enforcement:** define one small authoritative object or discriminated union; derive a named mapped projection that makes modifier, key, and filtering behavior obvious; keep it shallow and declaration-safe; validate runtime inputs separately; implement construction or dispatch explicitly; and lock both accepted and rejected cases into packed-consumer type tests plus runtime lifecycle tests.

## Transfer Limits

- The official handbook establishes syntax and core examples, not a design rule that every repetitive object type should be mapped.
- It does not quantify checker/editor cost, key-union limits, collision behavior across all compiler versions, declaration-emit stability, or diagnostic quality.
- Mapped completeness works for closed owned vocabularies; it does not by itself support runtime-discovered plugins or independently versioned extensions.
- Static `readonly`, optionality, filtering, and naming do not enforce runtime mutability, presence, redaction, serialization, validation, registration, or authorization.
- Generated APIs can amplify source changes across many consumers. Explicit interfaces are often better when the projected members have different semantics or need independent evolution.
- TypeScript compiler acceptance does not prove behavioral substitutability, correct object descriptors, runtime performance, security, or resource lifecycle.

## Related

- [[typescript-generic-api-design]]
- [[typescript-template-literal-types]]
- [[typescript-conditional-types]]
- [[typescript-structural-compatibility]]
- [[typescript-control-flow-narrowing]]
- [[typescript-module-systems]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Notes

- [[2026-08-05-typescript-mapped-types]]
- [[2026-08-06-typescript-template-literal-types]]
