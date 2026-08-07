---
id: rust-pinning-and-address-sensitive-types
type: concept
title: Rust Pinning and Address-Sensitive Types
tags:
  - rust
  - pinning
  - unsafe-rust
  - futures
  - memory-safety
  - api-design
summary: Rust pinning is a library-enforced lifecycle contract that lets unsafe implementations rely on an address-sensitive pointee remaining valid in place through destruction while safe APIs prevent moves and invalidation.
source_count: 5
canonical_for:
  - Rust pinning
  - Pin and Unpin
  - address-sensitive Rust types
  - structural pin projection
  - Rust Drop guarantee
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2027-02-07
confidence: "0.92"
---

# Rust Pinning and Address-Sensitive Types

## Summary

Rust pinning is not compiler-enforced immobility. It is a contract shared by unsafe implementation code and a restricted safe API: after a non-`Unpin` pointee enters an address-sensitive state, it must remain valid at the same address until its destructor runs. `Pin<Ptr>` communicates this promise and removes safe operations that could move or invalidate `Ptr::Target`. The design makes self-referential futures and intrusive structures composable without forcing each layer to own a separate heap allocation, but it extends the safety proof across projection, trait implementations, destruction, panic paths, and storage reuse. [[2026-08-01-rust-std-pin-module]]

## Mental Model

Separate four things that are easy to conflate:

1. **The value** may have a lifecycle phase in which its address matters.
2. **The pointer** is wrapped by `Pin`, but can often move freely; the pointee is what remains in place.
3. **The safe capability** restricts access so callers cannot obtain a move-capable `&mut T` for a pinned non-`Unpin` pointee.
4. **The unsafe proof** establishes and maintains the promise that makes those restrictions meaningful.

A false unsafe proof is not contained at the call site. It can make later code that uses only safe `Pin` APIs undefined behavior.

## Lifecycle Contract

A useful review model is:

1. Construct the value while it is still movable.
2. Place it at its intended location.
3. Create the pinning pointer and enter the address-sensitive phase.
4. Permit only operations that preserve address and validity invariants.
5. On cancellation, replacement, or normal teardown, run pinned destruction before invalidating or reusing storage.

The contract is stronger than “do not move.” The location must not be deallocated, overwritten, or repurposed before destruction. Leaking storage can preserve the contract despite skipping `Drop`; reusing storage cannot. The Reference's destructor rules make the distinction explicit: safe Rust may suppress destruction with `mem::forget`, so soundness cannot require `Drop` to run, even though pinned storage that is actively reclaimed must perform pinned destruction before reuse. [[2026-08-07-rust-reference-destructors]] [[rust-destructors-drop-scopes-and-resource-lifecycle]]

## Ownership, Lifetimes, and Trait Boundaries

- Rust ownership transfer may mechanically relocate a value. `Box<T>` and `&mut T` alone do not prevent moving the pointee.
- `Pin<Ptr>` reasons about `<Ptr as Deref>::Target`; whether the pointer object itself is `Unpin` is usually irrelevant to whether its target is pinned.
- `Unpin` means a type has no pinning-dependent validity invariant. For such a pointee, `Pin` intentionally imposes no extra restriction.
- A type whose unsafe implementation relies on stable address must opt out of automatic `Unpin`, often with `PhantomPinned`, or implement only a sound conditional `Unpin` boundary.
- Custom pointers usable with `Pin` bring `Deref`, `DerefMut`, and `Drop` into the proof: none may unexpectedly move or invalidate the target.

## Projection and Change Amplification

Projection decides whether pinning the parent also pins a field.

- A **non-structurally pinned** field may be exposed as `&mut Field`, but unsafe code must never rely on that field's address remaining stable.
- A **structurally pinned** field may be exposed as `Pin<&mut Field>`, but the parent now inherits requirements for conditional `Unpin`, pinned destruction, storage-validity notification, and the removal of every take, swap, reallocation, or alternate-access path that could move the field.

This is an API-wide decision, not a local accessor trick. A later `Option::take`-style method, mutable aliasing route, packed representation, or destructor panic behavior can invalidate an older projection proof.

## Async Implications

Compiler-generated futures can become self-referential after polling. `Future::poll(self: Pin<&mut Self>, ...)` gives combinators a common way to poll nested address-sensitive futures without allocating every nested state machine separately.

Pinning answers only part of async correctness:

- **Pinning:** may this future move after it becomes address-sensitive?
- **Cancellation ownership:** who drops it, on which path, before task storage is reused?
- **Thread transfer:** does it satisfy the separate `Send`/`Sync` requirements?
- **Structured concurrency:** which scope owns completion and teardown?

Do not treat `Pin`, `Send`, cancellation safety, and structured concurrency as interchangeable guarantees.

The `Send`/`Sync` boundary follows the capabilities and destruction context of the pinned value rather than pinning itself. A future can be pinned while remaining `!Send`; conversely, a `Send` future may migrate while cancellation drops captured resources on a thread the resource did not originate on. Manual auto-trait implementations must therefore audit aliases, generic bounds, and destructor affinity independently of the no-move proof. [[2026-08-02-rustonomicon-send-and-sync]] [[rust-send-sync-and-thread-safety]]

Tokio's `select!` tutorial supplies the operational bridge: an in-flight future that must survive repeated loop iterations is constructed once, pinned, and passed by mutable reference. Pinning preserves that operation's location-sensitive state across polls; branch guards prevent polling it after completion, while `Pin::set` makes replacement an explicit transition. Dropping a losing branch still cancels by teardown, so pinning does not make partial effects reversible or stop work spawned outside the future's ownership. [[2026-08-03-tokio-select]] [[rust-async-cancellation-and-select]]

## Unsafe Review Checklist

For any unsafe pinning implementation, verify:

- the value reaches its stable location before self-references or address-derived pointers are created;
- no safe API can move or invalidate the non-`Unpin` pointee;
- every unchecked constructor and projection states the invariant it relies on;
- manual `Unpin` implementations match exactly the fields declared structurally pinned;
- custom pointer `Deref`, `DerefMut`, and `Drop` preserve the target;
- pinned `Drop` code behaves as though it receives `Pin<&mut Self>`;
- storage reuse calls destruction first, including cancellation, replacement, panic, and custom-allocation paths;
- `#[repr(packed)]`, `ManuallyDrop`, manual length changes, and panic-skipping container destruction have been excluded or proved safe;
- performance claims distinguish avoided allocation requirements from measured runtime gains.

The type checker enforces the resulting safe surface, not the truth of the original unsafe promise. Additional Miri, fuzzing, sanitizer, and compile-fail guidance remains an open acquisition need.

The broader UB boundary adds that pinning's location promise sits inside allocation liveness, alignment, aliasing, type validity, and destruction requirements. A stable address is insufficient if metadata extends beyond the allocation, a projection creates an invalid reference, storage becomes dead, or safe clients can trigger the hidden violation. [[2026-08-04-rust-reference-undefined-behavior]] [[rust-unsafe-validity-and-undefined-behavior]]

## Performance and Design Trade-offs

The main architectural benefit is composability: a shared contract avoids one defensive pointer indirection and allocation per address-sensitive layer. Costs include harder mutation APIs, larger unsafe audit surfaces, coupling between field projection and destruction, and higher change amplification.

Default to `Unpin` and ordinary ownership for types without genuine address sensitivity. Pinning is not immutability, anti-aliasing, synchronization, or lifetime extension, and it cannot retroactively repair a self-reference created before the value reached its stable address.

## Open Questions

- Which projection-generation mechanisms have the strongest current soundness and maintenance evidence?
- How do mature executors test task cancellation, panic, and allocation-reuse paths for pinned futures?
- What operational assumptions about `Pin<&mut T>` should be revisited as Rust's aliasing model becomes more formal?

## Source Notes

- [[2026-08-01-rust-std-pin-module]] — Official standard-library source of truth for `Pin` implementers; defines address sensitivity, `Unpin`, the Drop guarantee, projection choices, and pointer/destructor obligations.
- [[2026-08-02-rustonomicon-send-and-sync]] — Official advanced Rust guidance separating ownership transfer and shared-reference safety from pinning, including destructor thread-affinity implications.
- [[2026-08-03-tokio-select]] — First-party runtime tutorial showing why one future is pinned and polled by reference across repeated selection loops, and how losing futures are dropped.
- [[2026-08-04-rust-reference-undefined-behavior]] — Normative Reference boundary showing that pinning proofs remain subordinate to allocation liveness, aliasing, validity, ABI, and destruction rules.
- [[2026-08-07-rust-reference-destructors]] — Normative rules for destruction order, manual suppression, partial initialization, and termination paths that clarify pinning's Drop guarantee.

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-async-cancellation-and-select]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-destructors-drop-scopes-and-resource-lifecycle]]
