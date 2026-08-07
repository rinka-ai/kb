---
id: rust-unsafe-validity-and-undefined-behavior
type: concept
title: Rust Unsafe Validity and Undefined Behavior
tags:
  - rust
  - unsafe-rust
  - undefined-behavior
  - memory-safety
  - aliasing
  - validity
  - ffi
summary: Rust unsafe code is sound only when its hidden representation, aliasing, validity, lifetime, ABI, and destruction invariants make undefined behavior unreachable through every safe client and foreign boundary.
source_count: 3
canonical_for:
  - Rust undefined behavior
  - unsafe Rust soundness
  - Rust type validity
  - Rust aliasing rules
  - Rust unsafe code review
  - Rust FFI soundness
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2027-02-04
confidence: "0.90"
---

# Rust Unsafe Validity and Undefined Behavior

## Summary

`unsafe` is a proof boundary, not an alternate execution mode. Rust code must never cause undefined behavior; an unsafe implementation is sound only when every operation available to safe callers preserves the hidden requirements on allocation liveness, alignment, aliasing, immutable bytes, initialized and valid values, pointer metadata and provenance, ABI and unwinding, runtime state, and destruction. Because safe downstream code and foreign functions may rely on those promises, a local unsafe mistake has crate-graph and whole-program consequences. [[2026-08-04-rust-reference-undefined-behavior]]

## Soundness Boundary

Separate three layers:

1. **Representation invariant:** which bytes, allocation, provenance, discriminant, metadata, ownership, and foreign-runtime facts make the value valid?
2. **Unsafe implementation:** which operations establish, inspect, mutate, transfer, or destroy that representation?
3. **Safe capability surface:** which constructors, methods, trait implementations, borrows, callbacks, and destructors can safe clients invoke?

The implementation is sound only if every safe interaction preserves the representation invariant. “The caller would have to do something strange” is not a safety argument when the strange operation is expressible in safe Rust.

## Ownership, Lifetimes, and Aliasing

The Reference's current outline makes shared and exclusive references behavioral promises:

- `&T` generally forbids mutation of reachable bytes while live except through `UnsafeCell`-mediated designs;
- `&mut T` generally requires that competing access not occur through pointers outside the derived access path and that no other reference points to the same place while live;
- `Box<T>` carries ownership and aliasing implications similar to a long-lived exclusive reference;
- dereference, reborrow, call, and return events influence liveness, while the borrow checker's syntactic lifetime is only an upper bound in this outline.

The exact aliasing model remains unsettled. Review concrete invariants conservatively and avoid presenting an implementation model or tool's current behavior as the final language model.

Variance makes representation part of the lifetime proof before any pointer is dereferenced. Shared references and immutable raw pointers permit covariant lifetime substitution, while writable pointees through `&mut`, `*mut`, or `UnsafeCell` are invariant so shorter-lived data cannot be stored behind a capability later observed as longer-lived. Unsafe generic wrappers must ensure their real ownership, mutation, and callback behavior agrees with inferred field variance and any `PhantomData` marker; changing a private field can change the public coercion surface. [[2026-08-05-rust-reference-subtyping-and-variance]] [[rust-lifetime-subtyping-and-variance]]

## Validity Is an API Property

Producing an invalid typed value is immediate UB, even before a later branch reads its semantic contents. Unsafe construction must therefore account for:

- initialized bytes for integers, floats, raw pointers, strings, and every restricted type;
- valid `bool`, `char`, enum discriminants, active variants, nested fields, and custom scalar ranges;
- non-null, aligned, live, correctly sized referents for references and boxes;
- coherent slice lengths and trait-object vtable metadata;
- union and padding distinctions rather than assuming arbitrary uninitialized bytes are valid everywhere.

Prefer representations whose invalid intermediate states remain inside `MaybeUninit`, raw storage, or a private state machine until one operation can prove and publish the fully valid value. Safe constructors should validate foreign inputs before creating constrained Rust types.

## Pointer, Allocation, and Provenance Checks

For pointer-bearing designs, audit more than non-nullness:

- the complete pointee byte span lies in one live allocation;
- the dereferenced pointer meets the alignment of the type used for that dereference;
- dynamically sized metadata cannot extend beyond the allocation or `isize::MAX`;
- derived pointers and references preserve the required aliasing relationship;
- const-evaluated pointer bytes satisfy the additional provenance restrictions;
- storage is not deallocated, overwritten, or reused while references, pinned values, callbacks, or foreign aliases still depend on it.

Zero-sized types and raw-reference formation have special cases; do not generalize them to ordinary loads, stores, or references.

## Traits, Pinning, Concurrency, and Cancellation

Unsafe trait implementations amplify representation claims into ecosystem capabilities:

- `unsafe impl Send` asserts that ownership transfer cannot violate hidden aliases, thread affinity, or destruction rules;
- `unsafe impl Sync` asserts that shared references cannot expose unsynchronized invalid mutation;
- pin constructors and projections assert that address-sensitive state remains valid in place through destruction;
- pointer and dereference traits must not manufacture references that overstate lifetime, alignment, exclusivity, or validity.

Concurrency and cancellation add paths; they do not relax the base rules. Races can violate aliasing or immutable-byte assumptions. Task migration can change destructor context. Cancellation can expose partial initialization, skip protocol completion, or reuse storage too soon. Panics and foreign unwinding can cross frames whose cleanup contract does not permit it. See [[rust-send-sync-and-thread-safety]], [[rust-pinning-and-address-sensitive-types]], and [[rust-async-cancellation-and-select]].

Destructor liveness is deliberately weaker than memory safety: `mem::forget` is safe, `ManuallyDrop` can suppress automatic teardown, and aborting termination can skip destructors. An unsafe abstraction may rely on specified order when teardown occurs, but it may not make validity or aliasing safety depend on `Drop` eventually executing. Manual storage code still owns exactly-once destruction before reuse or deallocation. [[2026-08-07-rust-reference-destructors]] [[rust-destructors-drop-scopes-and-resource-lifecycle]]

## FFI and Whole-Program Ownership

FFI wrappers own both sides of the contract:

- match calling convention, parameter and return layout, target features, and unwinding policy;
- document allocation/deallocation pairing, callback lifetime, foreign aliases, ownership transfer, and thread affinity;
- keep constrained Rust values behind validation until foreign bytes and metadata are proven valid;
- ensure stack and heap destruction follows both Rust and foreign-runtime rules on success, failure, panic, and cancellation;
- treat UB in linked foreign code as capable of invalidating the entire process, not as a contained foreign-library bug.

A safe facade cannot repair a false external assumption. When the foreign contract is weaker or version-dependent, expose a narrower Rust capability or retain runtime checks.

## Tooling and Executable Enforcement

Use layered evidence rather than one “unsafe test”:

- keep each unsafe block small and pair it with a `SAFETY:` argument naming the invariant and why the operation preserves it;
- centralize unsafe ownership in a small module or crate and expose safe capabilities rather than raw representation;
- add compile-fail or trait assertions for intended type and auto-trait boundaries;
- run Miri for supported interpreter-detectable UB and use sanitizers for native memory/concurrency failures where available;
- fuzz constructors, parsers, state transitions, and FFI adapters, including panic and partial-initialization paths;
- test on relevant architectures, allocator pairs, target features, and foreign-runtime versions;
- trigger unsafe review when fields, layouts, accessors, trait implementations, callbacks, or destructors change.

These tools sample or model classes of failures; they do not replace the invariant proof or settle unspecified language semantics.

## Performance and Change Amplification

Unsafe code can enable layouts, allocation strategies, vectorization, or FFI paths that safe abstractions cannot express directly, but the Reference provides no performance evidence. Require workload-specific measurement against a safe baseline.

Count maintenance cost too. A small unsafe block can constrain every future field, constructor, accessor, trait implementation, drop path, target, and dependency. Prefer standard-library or mature audited abstractions when their measured overhead is acceptable. If unsafe is justified, make the invariant reviewable enough that a future change can falsify it locally.

## Review Checklist

- What exact valid states and allocation relationships exist?
- Which safe operation could create, expose, alias, move, mutate, race, or destroy them?
- Are alignment, initialization, discriminants, metadata, provenance, and full pointee spans covered?
- Do generic bounds and `Send`/`Sync`/pinning promises match the actual safe surface?
- Can panic, cancellation, unwinding, callback reentry, or partial construction escape the protocol?
- Who destroys or frees each resource, on which thread and through which allocator/runtime?
- Which claims are language guarantees, current Reference outlines, tool behavior, or project assumptions?
- What executable evidence detects regressions, and what remains proof-only?
- Is the measured benefit large enough to own the expanded audit surface?

## Transfer Limits

- The Reference explicitly says the UB list is non-exhaustive and may change.
- Its aliasing outline is not a finalized formal memory model.
- Union validity, some raw-pointer and reference-validity details, and runtime assumptions remain debated or incompletely documented.
- Miri acceptance is not proof that all native executions are sound; sanitizer silence is not proof of validity.
- Safe Rust at the call site does not imply a safe dependency graph or sound foreign process.

## Open Questions

- Which strict-provenance and memory-model sources should become the next primary additions?
- What mature crate provides the best bounded case study of safety comments, Miri, fuzzing, and FFI ownership agreeing on one invariant?
- How should repository gates detect unsafe-surface growth and require review without incentivizing meaningless comments?

## Source Notes

- [[2026-08-04-rust-reference-undefined-behavior]] — First-party Rust Reference boundary for UB, sound unsafe abstractions, pointer and place rules, aliasing, immutable bytes, validity, ABI/unwinding, runtime assumptions, const provenance, and FFI-wide effects.
- [[2026-08-05-rust-reference-subtyping-and-variance]] — Rust Reference boundary for lifetime subtyping, higher-ranked lifetime substitution, and representation-derived variance in unsafe generic wrappers.
- [[2026-08-07-rust-reference-destructors]] — Rust Reference rules for drop order, partial initialization, manual suppression, temporary scopes, and termination without unwinding.

## Related

- [[rust-pinning-and-address-sensitive-types]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-async-cancellation-and-select]]
- [[rust-lifetime-subtyping-and-variance]]
- [[rust-destructors-drop-scopes-and-resource-lifecycle]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
