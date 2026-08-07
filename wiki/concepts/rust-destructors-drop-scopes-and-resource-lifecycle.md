---
id: rust-destructors-drop-scopes-and-resource-lifecycle
type: concept
title: Rust Destructors, Drop Scopes, and Resource Lifecycle
tags:
  - rust
  - destructors
  - drop
  - ownership
  - lifetimes
  - resource-management
  - unsafe-rust
  - api-design
summary: Rust destruction is deterministic local ownership cleanup with specified scope and ordering rules, but sound APIs must tolerate leaked values, aborting termination, and externally incomplete teardown.
source_count: 1
canonical_for:
  - Rust destructors
  - Rust Drop trait
  - Rust drop scopes
  - Rust drop order
  - Rust temporary lifetime extension
  - Rust RAII resource lifecycle
  - ManuallyDrop and mem forget
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2027-02-07
confidence: "0.92"
---

# Rust Destructors, Drop Scopes, and Resource Lifecycle

## Summary

Rust destruction is a local ownership protocol. The compiler tracks which values remain initialized, associates variables and temporaries with nested drop scopes, and runs custom `Drop::drop` plus recursive field destruction at specified release points. This makes ordinary RAII teardown predictable enough for memory, locks, files, and other process-local resources. It is not a completion protocol: safe code can leak a value, aborting termination can skip destruction, and external effects can outlive local teardown. Soundness must therefore survive a destructor never running, while operational correctness must state which stronger completion or durability mechanism owns non-local obligations. [[2026-08-07-rust-reference-destructors]]

## Ownership and Initialization State

Destruction follows initialized ownership, not variable names alone:

1. Construction creates initialized fields that each need at most one destruction path.
2. A move transfers destruction responsibility and leaves the source wholly or partially uninitialized.
3. Assignment first destroys an initialized destination, then installs the replacement.
4. Leaving a drop scope destroys the values still initialized in that scope.
5. Custom teardown runs before recursive field teardown.

This model prevents ordinary double drops and supports partial moves, early return, and unwinding. Unsafe containers, FFI wrappers, and manual initialization code must preserve the same state machine explicitly: every resource is either uninitialized, initialized and owned, moved, manually suppressed, or destroyed—never ambiguously two at once.

## Drop Order Is Two Different Rules

Do not collapse scope order and field order:

- **Scopes:** when control exits nested scopes, destruction proceeds from inner to outer. Within one scope, local variables and temporaries are destroyed in reverse declaration or creation order.
- **Aggregate fields:** after custom `Drop::drop`, struct fields, an active enum variant's fields, tuple fields, and array or owned-slice elements are recursively destroyed in their specified declaration/index order.
- **Patterns and parameters:** bindings add finer ordering rules; parameter values are dropped after function-body locals, and pattern bindings generally drop in reverse declaration order.
- **Closures:** move-captured variables have unspecified field drop order, so APIs must not coordinate safety or external protocols through that order.

When order matters operationally, encode it visibly with nested scopes, field layout chosen deliberately, or explicit teardown methods. Even then, do not make memory safety depend on externally visible side effects occurring.

## Lifetimes Versus Runtime Liveness

Borrow lifetimes and destruction times are related but distinct. Temporary scopes determine when an unnamed runtime value is normally destroyed; temporary lifetime extension uses specific syntax to keep selected borrowed temporaries alive longer. The Reference explicitly says the exact extension rules are subject to change.

Consequences for API design:

- do not infer a general escape-analysis rule from one accepted `let` expression;
- function calls, method receivers, match scrutinees, closures, async blocks, and loop breaks do not all propagate extension;
- Rust 2024 narrows some `if let` and block-tail temporary scopes;
- named ownership is clearer than relying on subtle temporary extension when a resource or pinning boundary matters;
- a longer borrow does not prove an external operation completed, only that the referenced local value remains valid for that use.

## Trait and API Boundaries

`Drop` is observable API behavior:

- `Drop::drop(&mut self)` permits custom teardown but does not let the value move fields out normally; recursive field destruction follows.
- `ptr::drop_in_place` is an unsafe primitive for manually owned storage and smart-pointer implementations.
- `ManuallyDrop<T>` suppresses automatic destruction, transferring exactly-once teardown responsibility to the implementation.
- `mem::forget` safely leaks ownership because Rust does not promise that every destructor executes.
- explicit `drop(value)` can shorten process-local resource occupancy, but it consumes ownership rather than invoking `Drop::drop` as an ordinary method.

Changing field order, adding side-effectful fields, changing panic behavior, or changing when an API retains a guard can alter observable destruction timing. Treat those as compatibility and operational-review concerns even when type signatures remain unchanged.

## Async, Cancellation, and Structured Concurrency

Dropping a future destroys its owned local state under the same language rules, which is why cancellation by drop works locally. That fact proves only that the future will not be polled again and that its currently owned state is eligible for teardown.

It does not prove:

- a spawned child task was cancelled or joined;
- a kernel or foreign operation stopped;
- a database or message transaction rolled back;
- a peer observed cancellation;
- cleanup ran after process abort;
- a destructor completed successfully if it panicked.

Use explicit task scopes, abort/join handles, cancellation acknowledgement, transactional recovery, or durable state for these stronger properties. See [[rust-async-cancellation-and-select]].

## Pinning, Unsafe Rust, and FFI

Destruction is part of several unsafe proofs:

- pinned storage must remain valid and unreused through pinned destruction;
- manual initialization must avoid dropping invalid or uninitialized typed values;
- `ManuallyDrop`, raw allocation, or custom length manipulation must avoid leaks becoming double drops or use-after-free;
- callbacks and foreign owners need an explicit allocator, thread, and teardown authority;
- panic/unwinding must not cross an ABI boundary that does not permit it;
- a type may rely on specified order **if destruction runs**, but cannot require destruction to run for soundness.

The final rule is decisive. A missing unlock may deadlock and a missing flush may lose data, but neither may permit safe Rust to trigger undefined behavior merely because a value was forgotten. See [[rust-pinning-and-address-sensitive-types]] and [[rust-unsafe-validity-and-undefined-behavior]].

## Tooling and Executable Enforcement

The compiler provides drop elaboration, move checking, borrow checking, and much of partial-initialization bookkeeping. Add evidence at the layer the compiler does not establish:

- unit tests with event logs for exact local and field order where the API intentionally exposes it;
- tests for partial moves, replacement, early return, panic/unwind, and destructor panic;
- cancellation tests that distinguish local future drop from child/remote completion;
- Miri runs over unsafe manual-drop, raw-storage, and aliasing paths;
- sanitizers and fuzzing for native FFI, allocator, and partial-initialization failures;
- abort-mode and process-restart tests for protocols that claim crash tolerance;
- compile-fail tests around temporary-lifetime assumptions and edition migrations.

Tool success is not proof that cleanup eventually occurs. Liveness, acknowledgement, and durable recovery require separate properties and tests.

## Performance and Production Operations

Deterministic early release can reduce lock hold time, peak memory, file-descriptor pressure, connection occupancy, and shutdown latency. Destructors can also hide expensive I/O, blocking work, lock acquisition, or panic risk on an otherwise innocent scope exit.

Prefer destructors for bounded, infallible process-local cleanup. Prefer explicit `close`, `flush`, `shutdown`, `commit`, `join`, or `finish` operations when callers must observe errors or completion. A destructor may remain a best-effort fallback, but silently swallowing a required completion result is not equivalent to a successful operation. The Reference offers no benchmark data, so measure resource pressure and latency in the actual workload.

## Pattern: Local RAII Plus Explicit Completion

A transferable design is:

1. Give each process-local resource one Rust owner.
2. Use RAII to guarantee ordinary local release on scope exit and supported unwinding paths.
3. Expose an explicit, fallible completion method for externally meaningful work.
4. Make that method idempotent or state-checked where retries are possible.
5. Keep `Drop` bounded and infallible as a local fallback.
6. Record or recover unfinished durable work outside destructor-only state.
7. Test leak, abort, panic, cancellation, and restart separately.

This limits change amplification: memory safety stays inside ownership and unsafe invariants, while business completion stays in visible APIs and protocols.

## Transfer Limits

- RAII does not survive process abort, power loss, `mem::forget`, intentional leaks, or every foreign termination path.
- Destructor order is not a substitute for dependency injection, an explicit shutdown graph, or distributed transaction semantics.
- Temporary lifetime extension is syntax- and edition-sensitive; avoid making public operational contracts depend on obscure forms.
- `Drop` has no fallible return channel, so required error reporting needs an explicit method.
- The Reference specifies language behavior but does not provide production benchmarks, crate case studies, rustc implementation details, or complete FFI guidance.

## Open Questions

- Which rustc drop-elaboration and drop-check implementation sources should ground the compiler/tooling layer?
- Which mature Tokio, rustls, or storage-system codebase best demonstrates explicit async shutdown layered over RAII?
- What lint or API pattern best catches fallible external completion hidden only inside `Drop`?
- How should edition migrations test temporary-scope changes in macro-generated and async-heavy code?

## Source Notes

- [[2026-08-07-rust-reference-destructors]] — First-party Rust Reference rules for destructor invocation, recursive field order, nested drop scopes, temporary scopes and extension, manual suppression, and termination paths that skip cleanup.

## Related

- [[rust-pinning-and-address-sensitive-types]]
- [[rust-async-cancellation-and-select]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-lifetime-subtyping-and-variance]]
- [[rust-send-sync-and-thread-safety]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
