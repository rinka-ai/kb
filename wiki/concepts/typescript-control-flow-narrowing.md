---
id: concept-typescript-control-flow-narrowing
type: concept
title: TypeScript Control-Flow Narrowing
tags: [typescript, type-system, narrowing, control-flow-analysis, discriminated-unions, type-guards, never, api-design, runtime-validation]
summary: TypeScript narrowing is safest when runtime evidence admits values into domain-owned discriminated unions and exhaustive control flow preserves state-payload correlations without assertions.
source_count: 2
canonical_for: [TypeScript narrowing, TypeScript control-flow analysis, TypeScript type guards, TypeScript discriminated unions, TypeScript exhaustive switch, TypeScript never exhaustiveness, TypeScript state modeling]
review_status: reviewed
last_reviewed: 2026-08-04
review_due: 2026-11-04
confidence: "0.90"
---

# TypeScript Control-Flow Narrowing

## Summary

TypeScript narrowing is flow-sensitive reasoning over ordinary JavaScript operations. A variable has a declared type that limits what may be assigned, while its observed type becomes more specific as execution passes guards, assignments, returns, and branches. The strongest use is domain modeling: validate unknown runtime data at a boundary, normalize it into a union of complete state variants, and let control flow preserve the relationship between each discriminant and its payload.

Narrowing is not runtime validation and is not a proof that a custom predicate is true. It is a static consumer of runtime evidence. The engineering contract therefore spans three owners: boundary code establishes that data is valid, domain types encode legal variants, and orchestration code handles those variants exhaustively.

## Core Model

1. **Declare the full possibility space.** A union describes the values or states a variable may legally hold.
2. **Observe runtime evidence.** JavaScript checks such as `typeof`, equality, `in`, and `instanceof` constrain that possibility space on each path.
3. **Track reachability and assignment.** Returns remove possibilities from later code; branches split and merge observed types; assignment changes the current observation but remains bounded by the declaration.
4. **Preserve correlated fields.** A discriminated union makes each state a complete object type, so checking its literal tag narrows its associated payload too.
5. **Make closure executable.** When a domain is intentionally closed, a `never` assignment at the exhaustive boundary turns a newly added variant into compile errors at unhandled consumers.

## Type And API Boundary

Prefer this:

```ts
type JobState =
  | { kind: "queued"; queuedAt: Date }
  | { kind: "running"; startedAt: Date; attempt: number }
  | { kind: "failed"; failedAt: Date; reason: FailureReason }
  | { kind: "succeeded"; finishedAt: Date; result: JobResult };
```

Over one interface with a tag and many optional fields. The discriminated union prevents combinations such as `kind: "succeeded"` without a result or a queued job with a failure reason. It also makes API evolution visible: adding `"cancelled"` forces exhaustive consumers to decide how cancellation behaves.

Public predicates are part of an API contract. A signature such as `value is JobState` tells the checker more than a boolean return does, but TypeScript does not verify that the implementation establishes the claim. Keep predicates small, test them with adversarial values, and prefer a runtime schema parser when input is unknown.

## Runtime Versus Type Boundary

- `typeof`, equality, `in`, and `instanceof` execute at runtime; TypeScript statically interprets their possible outcomes.
- Type annotations, interfaces, unions, and `never` are erased. They cannot reject malformed JSON, queue messages, environment variables, storage rows, or provider payloads.
- A custom predicate or assertion function is trusted by the checker. If its implementation lies, downstream code can fail despite a clean typecheck.
- Truthiness narrows according to JavaScript coercion and can accidentally drop valid `0`, `0n`, `""`, or `NaN` values.
- `typeof null === "object"`; an object guard may still need an explicit null check.
- `instanceof` depends on runtime constructor/prototype identity and may not transfer cleanly across realms, duplicated packages, serialized data, or structurally compatible objects.
- Optional properties may survive on both branches of an `in` check because a variant can legally have or omit the property.

The safe pipeline is **parse/validate → normalize → narrow → act**. Narrowing begins after runtime admission; it does not replace admission.

After admission, [[typescript-conditional-types]] can derive reusable static result relations from the domain union. Keep the roles separate: narrowing follows runtime evidence for one value, while a conditional alias transforms types known to the checker and may distribute over every member of a union.

## Package Graph And Composition Ownership

Narrowing creates no runtime package edge by itself. Exported unions, predicates, assertion functions, and validators still cross the module/declaration graph covered by [[typescript-module-systems]]. Their ownership should be explicit:

- **Boundary adapter:** owns parsing and validation of external representations, including unknown future provider statuses.
- **Domain package:** owns canonical discriminants, complete variants, legal transitions, and stable failure reasons.
- **Application/orchestrator:** owns exhaustive handling and side effects for domain states.
- **Presentation/API adapter:** owns mapping closed domain states into wire/UI representations and deciding whether forward-compatible unknown values need a safe fallback.

Do not copy a provider's open-ended status strings directly into a supposedly closed domain union. Preserve unknown provider values in metadata or an explicit `unknown` boundary representation, then normalize only recognized values into the canonical state machine.

## Tests And Executable Enforcement

Use both compile-time and runtime tests:

- Compile-time fixtures assert that impossible field combinations and unhandled variants fail.
- `@ts-expect-error` examples should fail if the compiler ever accepts an invalid construction.
- A small `assertNever(value: never): never` helper can centralize the unreachable runtime throw while preserving compile-time exhaustiveness.
- Runtime tests feed predicates and validators malformed objects, missing fields, nulls, falsy values, inherited properties, and values from realistic serialization boundaries.
- Transition tests cover every state/event pair, including explicitly rejected transitions.
- Package consumer tests import exported unions/predicates through public subpaths so declaration and implementation contracts are tested together.

A catch-all branch that silently returns a default weakens exhaustive evolution. Use one only when the boundary is intentionally open, and record the unknown value so operators can see protocol drift.

## Performance And Observability

- Narrowing guards have the runtime cost of the underlying JavaScript checks; the handbook supplies no benchmark warranting broader claims.
- Large unions, deeply nested conditionals, generated declarations, or expensive generic interactions may affect compiler/language-service performance, but measure with compiler diagnostics and editor traces before attributing latency to narrowing.
- At runtime, log rejected or unknown boundary variants with safe structured metadata. Do not log entire sensitive payloads merely because validation failed.
- Monitor the frequency of fallback/unknown cases. A rising rate indicates provider or protocol drift that domain types have not incorporated.

## Failure Modes

- Modeling correlated states as a tag plus optional fields, then scattering non-null assertions.
- Treating a clean typecheck as evidence that JSON or provider payloads were validated.
- Writing broad custom predicates with casts and no adversarial runtime tests.
- Using truthiness when empty strings or zero are valid domain values.
- Using `in` to distinguish variants whose property is optional in several members.
- Assuming `instanceof` works after serialization or across duplicated constructors.
- Adding a union member and suppressing the resulting exhaustive errors with casts or permissive defaults.
- Closing an external protocol that is actually open-ended, causing runtime crashes when a provider adds a status.

## Practical Pattern

**Boundary-admitted exhaustive state:** validate unknown input at the edge, normalize recognized data into a domain-owned discriminated union of complete variants, use ordinary guards and control flow to consume it, and require `never`-based exhaustiveness wherever every domain state must be handled. Keep external protocols open at their boundary and internal lifecycle states closed only where the application truly owns the vocabulary.

## Transfer Limits

- TypeScript is intentionally not fully sound; narrowing reduces uncertainty but cannot eliminate every cast, ambient declaration, mutation, aliasing, or interop hazard.
- A closed union is appropriate for application-owned states, commands, and results. It may be inappropriate for version-skewed network protocols, plugin ecosystems, or provider enums that can expand without the consumer updating.
- Exhaustiveness guarantees apply to code seen by the compiler. Dynamic dispatch tables, untyped JavaScript, stale declarations, and unchecked deserialization can bypass them.
- The handbook explains language behavior, not a universal choice of validator, state-machine library, error model, or compiler-performance threshold.

## Related

- [[typescript-module-systems]]
- [[typescript-conditional-types]]
- [[typescript-structural-compatibility]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Notes

- [[2026-08-02-typescript-narrowing]]
- [[2026-08-04-typescript-conditional-types]]
