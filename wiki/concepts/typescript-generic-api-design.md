---
id: concept-typescript-generic-api-design
type: concept
title: TypeScript Generic API Design
tags: [typescript, type-system, generics, inference, constraints, variance, api-design, declaration-files, performance]
summary: TypeScript generics are safest when each parameter preserves a real caller-visible relation, inference does most of the work, constraints expose minimal capabilities, and packed-consumer tests verify declarations, variance, runtime alignment, and checker cost.
source_count: 3
canonical_for: [TypeScript generics, TypeScript generic constraints, TypeScript type inference, TypeScript generic parameter defaults, TypeScript variance annotations, TypeScript generic API design]
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2026-11-07
confidence: "0.91"
---

# TypeScript Generic API Design

## Summary

A generic parameter is useful when it preserves a relationship that callers care about: the input element and output element are the same type, a key belongs to an object and selects its corresponding value, a constructor produces a related instance, or several members share one chosen domain type. This is materially different from `any`, which accepts broadly by discarding the relationship. Constraints narrow the supported family to values with a required capability while retaining each caller's more specific type.

Good generic APIs minimize exposed parameters, let inference select arguments from value-level evidence, and place each parameter at the scope where the choice is owned. A parameter on a call signature can vary per call; a parameter on an interface or class fixes a relation across its members or instance. Defaults can reduce call-site noise, but they become part of public inference and compatibility. Variance follows from how parameters occur in structural input and output positions; annotations are not a soundness switch and should be exceptionally rare.

## Core Model

1. **Name a relation, not a placeholder.** `identity<T>(value: T): T` preserves the input type; `value: any => any` does not.
2. **Infer from evidence.** Prefer parameters that the compiler can infer from arguments or context. Require explicit arguments only when inference lacks or ambiguously combines evidence.
3. **Constrain by capability.** `T extends Lengthwise` gives the implementation a `length` member while preserving the rest of `T` for the caller.
4. **Relate parameters.** `K extends keyof T` expresses that the key vocabulary depends on the object and allows `T[K]` to preserve the selected value type.
5. **Place ownership deliberately.** Signature-level parameters vary per call; type-level parameters bind a relation for the interface/class instance; class parameters do not parameterize the static side.
6. **Default only valid fallbacks.** A default makes a trailing parameter optional, must satisfy its constraint, and is selected when inference cannot find a candidate.
7. **Let structure determine variance.** Output positions tend toward covariance, function-input positions toward contravariance, and mixed positions toward invariance, subject to TypeScript's compatibility rules.
8. **Remember erasure.** Parameters, constraints, defaults, and variance annotations do not validate data or create runtime behavior.

## Type And API Boundary

A public generic should answer: “What information does this parameter carry from one API position to another?” If deleting a parameter or replacing all occurrences with one concrete/broad type does not remove a caller-visible relation, it may be implementation ceremony or a phantom parameter rather than useful API information.

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

Here `T` owns the object structure, `K` is bounded by its keys, and `T[K]` preserves the key-result correlation. By contrast, a type parameter used only once often contributes no relation; a direct parameter type, union, overload, or `unknown` may communicate the contract better.

Use constraints as minimum capabilities, not as invitations to expose a large base interface. Returning `T` instead of the constraint preserves refinements supplied by the caller. Be cautious when constraints, conditional types, and mapped types compose: a concise declaration can hide inference choices, union distribution, key amplification, and difficult diagnostics. [[typescript-conditional-types]] and [[typescript-mapped-types]] cover those transformations in detail.

Generic classes and factories need separate static/instance reasoning. A constructor constraint such as `new () => A` describes the static callable/constructable input and relates it to the produced instance. Resource lifetime, dependency ownership, and factory side effects remain runtime contracts rather than consequences of `A`.

## Runtime Versus Type Boundary

- A constraint proves only what the compiler's declaration graph says; it does not inspect JSON, environment variables, network values, database rows, JavaScript plugins, or stale implementations.
- Type argument inference is compile-time propagation, not runtime inspection or validation.
- Defaults select static type arguments; they do not create missing runtime values or initialize resources.
- Variance annotations can affect selected compiler comparisons but do not wrap, copy, freeze, authorize, or adapt values.
- `keyof` constrains a statically known key. Dynamic strings still need validation or lookup failure handling at runtime.
- Assertions inside generic implementations can fabricate relationships the checker cannot verify. Keep them localized and execute every corresponding value-level branch.

Use **accept `unknown` → validate/parse → normalize → apply the generic relation → execute** at untrusted boundaries. [[typescript-control-flow-narrowing]] owns value-level evidence; generics preserve admitted relationships after that evidence exists.

## Package Graph And Declaration Ownership

Exported generics run in downstream compilers through `.d.ts` files, so the package owner must treat inference and diagnostics as part of the public API:

- Export named, explainable parameters and constraints through documented subpaths whose declarations match runtime `exports`; see [[typescript-module-systems]].
- Test the built or packed artifact from consumer fixtures rather than importing monorepo source through `paths`.
- Treat parameter order, required/optional status, defaults, constraints, variance-relevant member positions, and return correlations as compatibility-sensitive.
- Run the oldest and newest supported TypeScript versions when inference behavior or advanced generic composition is part of the package promise.
- Keep private implementation helpers out of emitted public constraints and return types.
- Avoid forcing applications to name internal package types merely to satisfy an exported generic argument.
- Watch duplicated dependencies when public constraints include origin-sensitive classes with private/protected members.

Defaults are especially easy to underestimate: changing one can alter inferred declarations and overload selection without changing emitted JavaScript. Declaration merging that adds parameters/defaults also changes the shared public contract and needs consumer fixtures.

## Composition And Lifecycle Ownership

- **Boundary adapters** validate dynamic values and produce domain-owned runtime structures.
- **Domain packages** own meaningful identities, closed vocabularies, constraints, and correlations.
- **Library/API packages** own generic parameter placement, inference ergonomics, defaults, declarations, compiler support, and variance-sensitive callback surfaces.
- **Factories/composition roots** own concrete constructor selection, dependency binding, startup failure, and teardown.
- **Runtime registries** own membership, duplicate handling, authorization, disposal, and open-world extension.
- **Consumers** should usually provide ordinary values and receive inferred results rather than manually threading type arguments through layers.

A generic container can preserve `Resource<T>` relationships, but it cannot prove that resources are initialized, authorized, live, unique, disposed, or transactionally coordinated. Keep lifecycle state in explicit runtime protocols and tests.

## Variance And Structural Compatibility

TypeScript's variance is normally inferred from structure. A producer that returns `T` tends to preserve subtype direction; a consumer whose function property accepts `T` reverses it. A type that both consumes and produces `T` may require invariance. Actual assignability still follows TypeScript's structural model and setting-specific function compatibility, as detailed in [[typescript-structural-compatibility]].

Explicit `in`, `out`, or `in out` annotations have narrow purposes:

- they are consulted only for some comparisons between instantiations of the same generic type;
- they do not override an anonymous object's structural compatibility;
- they must match the variance that follows from the declaration's structure;
- whether the compiler takes an instantiation shortcut or full structural path is not a stable user-controlled contract;
- they may help debug a circular type or optimize an extraordinarily complex measured case, but should be removed after debugging unless retained performance evidence justifies them.

Do not use annotations to manufacture nominality or “force” safety. If equal structures must remain distinct because they carry different authority, validation state, or units, use an explicit discriminant or opaque/brand-like member and test that distinction through the package boundary.

## Tests And Executable Enforcement

Build a small public API matrix:

- positive inference fixtures that confirm intended argument and return precision without explicit type arguments;
- explicit-argument fixtures for supported cases where inference genuinely needs help;
- negative fixtures for missing capabilities, invalid keys, wrong constructor instances, incompatible defaults, and forbidden identities;
- tests that distinguish signature-level per-call polymorphism from interface-level fixed instantiation;
- callback fixtures under the strict settings promised to consumers, including variance-sensitive substitutions;
- packed-consumer declaration tests across supported TypeScript versions;
- runtime tests for parsing, factories, registries, and every implementation branch hidden behind a cast;
- declaration snapshots only when they remain small and semantic assertions accompany them.

Use `@ts-expect-error` or a type assertion library to lock intended rejection behavior. A source-only `tsc` pass is insufficient when declaration emit, export maps, dependency duplication, or consumer compiler versions can change the result.

## Performance And Observability

Generics are erased and ordinarily add no runtime cost. Costs can appear in checker work, declaration emit/consumption, editor completion and diagnostics, language-service memory, and incremental rebuilds. Amplifiers include recursive constraints, wide unions, nested conditional/mapped/template types, overloads, generated declarations, and repeated inference across package boundaries.

The handbook provides no generic complexity threshold or benchmark. Measure representative consumers with the actual supported compiler/options. Track cold and incremental typecheck time, declaration build time, editor traces/latency, memory, and diagnostic usability. If profiling identifies variance inference itself as a bottleneck in an extraordinarily complex circular type, a structurally correct annotation may provide a small optimization; validate it against full structural cases and retain before/after evidence. Do not attribute runtime validator or factory cost to erased generic types.

## Failure Modes

- Replacing a meaningful input-output relation with `any`.
- Publishing parameters callers cannot infer and should not need to understand.
- Using a parameter only once where a direct type would be clearer.
- Treating a broad constraint as runtime admission or semantic validation.
- Returning the constraint instead of `T` and unnecessarily discarding caller precision.
- Moving a parameter from a call signature to an interface and accidentally fixing what should vary per call.
- Adding defaults that silently change fallback inference or public declarations.
- Using phantom parameters to simulate nominal identities even though structure remains unchanged.
- Writing variance annotations to force behavior they cannot control.
- Testing only source aliases instead of packed declarations and runtime exports.
- Encoding authorization, initialization, cancellation, retries, or disposal only in erased type parameters.
- Optimizing generic complexity without compiler/editor measurements from representative consumers.

## Practical Pattern

**Minimal inferred relation with dual enforcement:** identify the caller-visible relationship; introduce only parameters needed to preserve it; place each parameter at its real ownership scope; constrain the smallest capability; let value arguments infer types; use defaults only as documented valid fallbacks; validate runtime inputs before applying the relation; publish self-contained declarations; and lock inference, rejection, runtime behavior, package consumption, compiler compatibility, and checker performance into separate executable evidence.

## Transfer Limits

- The official handbook establishes language semantics and cautions but does not prove that a particular library's abstraction is understandable, stable, performant, or behaviorally correct.
- Inference behavior and diagnostic quality can vary with compiler versions, context, overloads, and adjacent declarations; support promises need versioned fixtures.
- Static constraints cannot enforce runtime validation, authority, resource lifetime, serialization semantics, side effects, or protocol compatibility.
- Variance annotations are an implementation optimization/debugging surface, not a replacement for structural API design or nominal distinctions.
- A generic API may be type-safe yet semantically misleading if all `T` values do not support the same timing, error, retry, mutation, or ownership behavior.
- Open plugin ecosystems often need runtime registration and negotiation rather than one closed generic vocabulary.

## Related

- [[typescript-structural-compatibility]]
- [[typescript-conditional-types]]
- [[typescript-mapped-types]]
- [[typescript-template-literal-types]]
- [[typescript-control-flow-narrowing]]
- [[typescript-module-systems]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]

## Source Notes

- [[2026-08-07-typescript-generics]]
- [[2026-08-03-typescript-type-compatibility]]
- [[2026-08-04-typescript-conditional-types]]
