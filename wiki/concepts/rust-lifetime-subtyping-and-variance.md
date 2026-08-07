---
id: rust-lifetime-subtyping-and-variance
type: concept
title: Rust Lifetime Subtyping and Variance
tags:
  - rust
  - lifetimes
  - subtyping
  - variance
  - generics
  - higher-ranked-trait-bounds
  - unsafe-rust
  - api-design
summary: "Rust lifetime subtyping is narrow but API-shaping: outlives relations and higher-ranked bounds flow through generic types according to representation-derived covariance, contravariance, or invariance."
source_count: 1
canonical_for:
  - Rust variance
  - Rust lifetime subtyping
  - covariance and contravariance in Rust
  - invariant Rust types
  - higher-ranked lifetimes
  - Rust HRTB
  - PhantomData variance
review_status: reviewed
last_reviewed: 2026-08-05
review_due: 2027-02-05
confidence: "0.92"
---

# Rust Lifetime Subtyping and Variance

## Summary

Rust's subtyping is deliberately narrow. After lifetimes are erased, distinct Rust types do not form a general subtype hierarchy: the meaningful relations come from one lifetime outliving another and from specializing a value that works for every higher-ranked lifetime. Variance determines whether those relations pass through a generic type, reverse direction, or stop. Because Rust infers variance from fields, representation is part of the public lifetime contract and the unsafe proof. [[2026-08-05-rust-reference-subtyping-and-variance]]

## Core Model

If `'long: 'short`, then `&'long T` can be shortened to `&'short T`. For a generic constructor `F`:

- **covariant:** `T <: U` implies `F<T> <: F<U>`;
- **contravariant:** `T <: U` implies `F<U> <: F<T>`;
- **invariant:** neither derived substitution is available.

These are compile-time relations, not conversions that copy or transform a runtime value. Rust may apply them implicitly during checking and inference.

## Ownership and Lifetime Boundaries

Shared references are covariant in both their lifetime and pointee. A longer shared borrow can safely serve as a shorter one because shortening access does not grant mutation.

Mutable references are covariant in their own lifetime but invariant in the pointee. This distinction prevents writable storage typed with a long-lived nested reference from being treated as storage for a shorter-lived one, which could leave a dangling value after the short borrow ends.

That yields a practical rule: **read-only capabilities often permit lifetime shortening; write capabilities commonly require invariance over what can be stored.** Raw `*mut T` and `UnsafeCell<T>` reflect the same conservative boundary. Raw pointers bypass borrow checking at dereference sites, but their type constructors still participate in variance and must not encode a false lifetime capability.

## Higher-Ranked Trait and Function Boundaries

`for<'a> fn(&'a T) -> &'a T` promises that the function works for every caller-chosen `'a`. It is therefore usable where a function specialized to `'static` is requested. The same higher-ranked substitution applies to trait objects such as `dyn for<'a> Fn(&'a T) -> &'a T`.

Use a higher-ranked bound when an API must repeatedly accept fresh, unrelated borrows rather than capture one lifetime chosen by the surrounding type. This is especially useful at visitor, parser, callback, lending, and adapter boundaries. Do not strengthen a signature to `for<'a>` unless the implementation genuinely works for every lifetime.

Function arguments are contravariant and returns covariant: a callable that accepts a broader set of valid inputs can stand in for one used with a narrower input, while a more specific valid output can stand in for a broader requested output. A lifetime used in both directions may make an enclosing type invariant.

## Representation-Derived API Contract

Rust infers variance for structs, enums, and unions by composing every field use:

- shared references, immutable raw pointers, slices, arrays, function returns, and `PhantomData<T>` are covariant in the indicated parameter;
- function inputs are contravariant;
- mutable pointees, mutable raw pointers, and `UnsafeCell<T>` are invariant;
- conflicting co- and contravariant uses collapse to invariance.

A private-field change can therefore change downstream coercions even if no public item name changes. Adding interior mutability, replacing `*const` with `*mut`, changing a callback direction, or changing marker fields should trigger API compatibility and unsafe review.

## Unsafe Wrappers and `PhantomData`

An unsafe generic wrapper may hold a raw pointer while semantically owning, borrowing, mutating, or merely naming `T`. The field types must make the compiler see a variance contract no stronger than the real capability.

`PhantomData<T>` is covariant, but “add `PhantomData<T>`” is not a complete marker recipe. Ownership, drop checking, auto traits, and variance are related but distinct analyses, and alternative marker shapes can alter them. The Reference chapter establishes the variance table; wrapper-specific marker selection needs additional first-party evidence and compile-time checks.

Review questions:

- Can the wrapper write a `T` or a reference nested inside `T`?
- Could lifetime shortening let short-lived data enter storage later observed as long-lived?
- Does a callback consume or produce the generic parameter?
- Does the marker reflect actual ownership and access, or only silence an unused-parameter error?
- Could a field refactor silently make the type more permissive?

## Relationship to Send, Sync, Pin, and Cancellation

Variance does not establish thread safety, address stability, or task ownership:

- `Send` and `Sync` describe ownership transfer and shared-reference capability across threads;
- `Pin` constrains relocation through a pointer capability;
- variance describes which subtype relations pass through type constructors;
- cancellation and structured concurrency define who owns completion and teardown.

All can interact in a single future or unsafe wrapper, but each needs an independent argument. An invariant type can be `Send`; a covariant type can be `!Send`; a pinned future can still have a higher-ranked callback bug or an unstructured cancellation path. See [[rust-send-sync-and-thread-safety]], [[rust-pinning-and-address-sensitive-types]], and [[rust-async-cancellation-and-select]].

## Tooling and Enforcement

Lock intended static behavior with executable compiler evidence:

- compile-pass tests for supported lifetime shortening and higher-ranked callback use;
- compile-fail tests for substitutions that must remain impossible;
- downstream-style consumer fixtures for public generic APIs;
- trait assertions separately covering `Send`, `Sync`, and pinning expectations;
- review gates for field, marker, callback-signature, and interior-mutability changes.

Miri, fuzzing, and sanitizers can expose runtime consequences of an unsound unsafe implementation, but they do not prove that all rejected lifetime substitutions remain rejected. Variance is primarily enforced and regressed at compile time.

## Performance and Trade-offs

Variance itself has no runtime cost. The Reference provides no benchmark and does not justify wrapper layouts, boxing, copying, or synchronization choices. The real trade-off is API flexibility versus proof strength:

- covariance permits more ergonomic lifetime shortening;
- invariance rejects more programs but protects writable or otherwise sensitive storage;
- higher-ranked bounds increase callback flexibility while imposing a stronger implementation contract.

Do not redesign representation merely to recover covariance without a concrete API need and a complete soundness argument. A narrow honest signature is better than a permissive wrapper whose safety depends on caller restraint.

## Transfer Limits

- The chapter does not fully specify drop checking, implied bounds, trait-object default lifetimes, generic associated types, lending iterators, async closures, or `PhantomData` ownership recipes.
- A successful coercion does not prove semantic substitutability beyond Rust's lifetime rules.
- Compile-fail diagnostics and inference details can change across compiler versions even when the language relation remains stable.
- The page is normative-style Reference material, but its compact extracted table loses visual column formatting; claims were curated against the surrounding text rather than inferring extra rows.

## Open Questions

- Which first-party drop-check and `PhantomData` source best completes the unsafe-wrapper marker matrix?
- What semver tooling can detect public coercion changes caused only by private representation changes?
- Which mature libraries preserve HRTB and invariance contracts with UI or compile-fail tests?

## Source Notes

- [[2026-08-05-rust-reference-subtyping-and-variance]] — Rust Reference chapter defining lifetime-only subtyping, higher-ranked lifetime substitution, the variance table, and structural inference for user-defined types.

## Related

- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-trait-coherence-and-implementation-ownership]]
- [[rust-pinning-and-address-sensitive-types]]
- [[rust-async-cancellation-and-select]]
- [[internal-engineering-conventions]]
