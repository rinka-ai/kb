---
id: rust-send-sync-and-thread-safety
type: concept
title: Rust Send, Sync, and Thread-Safety Boundaries
tags:
  - rust
  - concurrency
  - send
  - sync
  - unsafe-rust
  - auto-traits
  - interior-mutability
  - api-design
summary: Rust thread-safety boundaries arise from what ownership and shared-reference capabilities a type exposes, with Send and Sync auto traits turning representation, generic bounds, hidden aliases, and destructor context into auditable soundness contracts.
source_count: 4
canonical_for:
  - Rust Send and Sync
  - Rust thread safety
  - unsafe impl Send
  - unsafe impl Sync
  - Rust auto traits
  - Rust thread-affine destructors
review_status: reviewed
last_reviewed: 2026-08-05
review_due: 2027-02-04
confidence: "0.88"
---

# Rust Send, Sync, and Thread-Safety Boundaries

## Summary

Rust does not make a type thread-safe merely because its methods compile or its raw pointer is accessed inside `unsafe`. `Send` promises that ownership may cross a thread boundary; `Sync` promises that shared references may cross it, equivalently that `&T` is `Send`. Because both are unsafe auto traits, representation usually derives the answer, while a manual implementation asserts a global invariant that downstream unsafe code may trust. Review must connect fields, generic bounds, aliases, public capabilities, and destructor context. [[2026-08-02-rustonomicon-send-and-sync]]

## Capability Model

Ask separate questions rather than applying a generic “thread-safe” label:

1. **Transfer:** can ownership of the value move to another thread? This is the `Send` question.
2. **Shared access:** can multiple threads hold `&T` without an unsynchronized mutation or validity violation? This is the `Sync` question.
3. **Mutation path:** what capability permits mutation—exclusive `&mut`, atomics, locks, thread confinement, or unchecked interior mutability?
4. **Destruction:** may cleanup happen on a different thread from construction or acquisition?

`Send` and `Sync` constrain capabilities, not business protocols. They do not prove deadlock freedom, fairness, correct atomic ordering, cancellation safety, or structured task ownership.

## Structural Derivation and Audit Friction

The compiler normally derives auto traits from fields and generic arguments. That gives representation choices API consequences:

- `Rc` is neither `Send` nor `Sync` because its reference count is shared without synchronization.
- `UnsafeCell` is not `Sync`; every safe interior-mutability abstraction must add the synchronization or confinement argument that raw shared mutation lacks.
- Raw pointers block automatic derivation so wrappers with untracked ownership do not silently advertise thread-safety.
- Collections can still derive conditional traits despite internal pointers because their unsafe internals preserve ownership and aliasing behind safe APIs.

Treat a failed auto-trait bound as a design signal. Do not immediately add `unsafe impl`: identify which field blocked derivation and whether that field exposes real aliases, thread affinity, or unsynchronized mutation.

Field structure also derives a separate public contract: lifetime variance. `UnsafeCell<T>` and `*mut T` are invariant in `T`, while shared references and `*const T` are covariant; function inputs are contravariant. This does not determine `Send` or `Sync`, but the analyses can fail together when a wrapper's representation understates writable aliases or lifetime ownership. Audit auto traits and variance independently whenever raw pointers, interior mutability, callbacks, or marker fields change. [[2026-08-05-rust-reference-subtyping-and-variance]] [[rust-lifetime-subtyping-and-variance]]

## Manual Implementation Proof

For every `unsafe impl Send` or `unsafe impl Sync`, require a nearby safety argument that answers:

- Who uniquely owns every allocation and raw handle?
- Can any alias outlive, bypass, or race the wrapper?
- Which references can the public API produce, and for how long?
- Which generic bounds are required by those exposed capabilities?
- Does `Drop` call a thread-affine allocator, lock API, event loop, FFI runtime, or OS resource?
- Can panic, cancellation, or partial initialization change the cleanup path?
- Could a future field or accessor invalidate the proof while the implementation continues compiling?

Conditional bounds should match the safe surface. If `&Wrapper<T>` can yield `&T`, a `Sync` implementation generally needs `T: Sync`; if ownership of the payload moves with the wrapper, `Send` generally needs `T: Send`.

## Destructor Affinity

Thread transfer includes where destruction may run. A resource can permit shared references across threads yet forbid moving the owning guard because release must occur on the acquisition thread. This distinction matters for FFI handles, GUI/event-loop resources, thread-local runtimes, lock guards, and async tasks whose executors may migrate them.

Cancellation is therefore not settled by a future being `Send`. The runtime and API must still define who owns cancellation, whether a task may migrate, and where its captured resources are dropped.

Tokio's `select!` sharpens the ownership distinction. Same-task branches may borrow local state and are never run simultaneously, while `tokio::spawn` requires owned captures and permits independent scheduling across runtime threads. Losing `select!` branches are dropped by the enclosing task, but a task spawned inside a branch is a separately owned operation and may survive unless an explicit shutdown, abort, or join path connects their lifecycles. [[2026-08-03-tokio-select]] [[rust-async-cancellation-and-select]]

## Unsafe, FFI, and Ownership Boundaries

The Rustonomicon's `Carton<T>` example connects raw allocation to auto-trait proofs: unique ownership, initialized aligned storage, borrow-checked `Deref`/`DerefMut`, conditional payload bounds, and a cross-thread-safe deallocator. The transferable lesson is the proof shape, not the sample allocator code.

Production FFI wrappers must additionally verify allocator pairing, platform and thread-affinity rules, pointer provenance, zero-sized and dynamically sized cases, partial initialization, unwinding, callbacks, and foreign aliases. A safe Rust facade cannot compensate for a false foreign-runtime assumption.

The Reference makes the consequence explicit: unsafe code is sound only if no safe client can trigger UB, and UB in either Rust or foreign code affects the whole program. Manual auto-trait proofs must therefore include baseline validity, alignment, aliasing, allocation-liveness, ABI, and unwinding invariants before reasoning about cross-thread capability. [[2026-08-04-rust-reference-undefined-behavior]] [[rust-unsafe-validity-and-undefined-behavior]]

## Tooling and Enforcement

Use multiple enforcement layers:

- let automatic derivation and conditional generic bounds do as much work as possible;
- add compile-time assertions for expected positive and negative trait behavior;
- keep unsafe implementations and their safety comments close to representation;
- use Miri for supported undefined-behavior checks and model concurrency protocols with tools such as Loom where applicable;
- test panic, cancellation, construction failure, and cross-thread destruction paths;
- run sanitizers and platform-specific FFI tests when native code participates;
- treat field additions and new shared accessors as unsafe-review triggers.

The source establishes the trait contracts but does not evaluate these tools. Tool-specific claims need dedicated primary evidence.

## Performance and API Trade-offs

`Send` and `Sync` are marker traits and add no synchronization by themselves. The cost comes from the representation chosen to make their promises true: atomics, locks, ownership transfer, copying, channels, pinning to a thread, or refusing cross-thread use.

Broad auto-trait support improves composability with executors and concurrent containers, but forcing it can enlarge unsafe surface area or erase useful thread-affinity constraints. Prefer the narrowest honest capability. A clear `!Send` or `!Sync` boundary is safer than an implementation added solely to satisfy a framework bound.

## Relationship to Pinning

Pinning and thread transfer are independent dimensions:

- `Pin` constrains relocation of an address-sensitive pointee through a capability.
- `Send` constrains moving ownership across threads.
- `Sync` constrains sharing references across threads.
- cancellation and structured concurrency determine who owns teardown and completion.

A pinned future may be `Send` or `!Send`; a `Send` future may still capture a resource whose cancellation and destructor semantics require careful executor behavior. See [[rust-pinning-and-address-sensitive-types]].

## Transfer Limits

- Auto-trait success is not evidence that a higher-level concurrent protocol is correct.
- `Sync` does not mean mutation is impossible; it means mutation reachable through shared references is synchronized or otherwise sound.
- The Rustonomicon is first-party advanced guidance, but this chapter is educational rather than a complete normative memory-model specification and contains an explicit explanatory TODO.
- The chapter does not settle atomics, memory ordering, scoped threads, async scheduler policy, cancellation safety, or current strict-provenance details.

## Open Questions

- What is the best stable compile-time pattern for asserting that public types remain intentionally `!Send` or `!Sync`?
- How do Tokio and other mature runtimes specify and test drop-thread behavior for migrated and cancelled tasks?
- Which thread-affine FFI wrappers provide the strongest documented negative-auto-trait and destructor designs?

## Source Notes

- [[2026-08-02-rustonomicon-send-and-sync]] — Official Rustonomicon chapter defining the unsafe auto-trait contracts, principal non-thread-safe building blocks, a raw-owning wrapper proof, and destructor thread affinity.
- [[2026-08-03-tokio-select]] — First-party Tokio tutorial distinguishing same-task borrowed multiplexing from independently scheduled spawned tasks and drop-based cancellation.
- [[2026-08-04-rust-reference-undefined-behavior]] — Rust Reference boundary connecting unsafe trait promises and FFI to whole-program validity, aliasing, ABI, unwinding, and runtime assumptions.
- [[2026-08-05-rust-reference-subtyping-and-variance]] — Rust Reference chapter separating lifetime variance and higher-ranked substitution from auto-trait capability while showing their shared dependence on representation.

## Related

- [[rust-pinning-and-address-sensitive-types]]
- [[rust-async-cancellation-and-select]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-lifetime-subtyping-and-variance]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
