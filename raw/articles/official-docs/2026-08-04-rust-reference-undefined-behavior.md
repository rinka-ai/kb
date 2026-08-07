---
id: 2026-08-04-rust-reference-undefined-behavior
type: source
title: Behavior Considered Undefined — The Rust Reference
path: raw/articles/official-docs/2026-08-04-rust-reference-undefined-behavior.md
author: Rust Project
publisher: Rust Project
url: https://doc.rust-lang.org/reference/behavior-considered-undefined.html
date_published:
date_added: 2026-08-04
tags:
  - rust
  - unsafe-rust
  - undefined-behavior
  - memory-safety
  - aliasing
  - validity
  - ffi
status: active
quality: high
summary: The Rust Reference defines the current non-exhaustive boundary for undefined behavior, connecting unsafe-code soundness to pointer alignment and liveness, aliasing, immutable bytes, type validity, ABI and unwinding, runtime assumptions, const provenance, and whole-program FFI effects.
related:
  - rust-unsafe-validity-and-undefined-behavior
  - rust-pinning-and-address-sensitive-types
  - rust-send-sync-and-thread-safety
  - rust-async-cancellation-and-select
---

# Behavior Considered Undefined — The Rust Reference

## Source Metadata

- Path: raw/articles/official-docs/2026-08-04-rust-reference-undefined-behavior.md
- Author: Rust Project
- Published: continuously maintained; no page-level publication date
- Publisher: Rust Project
- URL: https://doc.rust-lang.org/reference/behavior-considered-undefined.html
- Acquisition: captured through `bun run kb:ingest --url ... --no-refresh` on 2026-08-04, then curated without changing `## Source Text`

## TL;DR

`unsafe` transfers proof responsibility; it does not suspend Rust's prohibition on undefined behavior. Unsafe code is sound only when no safe client can use it to trigger UB. The Reference's current, explicitly non-exhaustive boundary spans pointer alignment and allocation liveness, aliasing and immutable bytes, type validity, ABI and unwinding, target features, inline assembly, runtime assumptions, const provenance, and foreign code.

## Key Claims

- Undefined behavior is forbidden in all Rust code, including inside `unsafe` blocks and functions; `unsafe` changes who must prove correctness, not what behavior is permitted.
- An unsafe abstraction is sound only if every interaction available to safe code preserves the abstraction's hidden validity and memory-safety invariants.
- UB includes accessing dangling or misaligned places, out-of-bounds place projection, violating aliasing rules, mutating immutable bytes, producing invalid typed values, using the wrong ABI or unwinding contract, violating runtime assumptions, and invoking invalid intrinsics, target features, or assembly.
- Type validity is immediate at the point a value is produced, not merely when a later operation observes it; nested fields, discriminants, references, boxes, metadata, and constrained scalar ranges all participate.
- UB is a whole-program property across FFI. Undefined behavior in foreign code can invalidate Rust execution, and Rust UB can affect foreign callers.
- The list is deliberately non-exhaustive and parts of aliasing, union validity, pointer validity, and runtime semantics remain unsettled; this page is a current boundary, not a complete formal Rust memory model.

## Important Details

- `&T` generally requires no mutation during liveness except through `UnsafeCell`; `&mut T` generally requires exclusive derived access. The Reference gives bounds on liveness but says the exact aliasing model is not determined.
- Immutability is transitive through references and boxes. A write that overlaps immutable bytes counts as mutation even when it writes the same bit pattern.
- A pointer is dangling when its pointed-to byte span is not wholly inside one live allocation. Zero-sized pointees are never dangling by this definition, even for null pointers; dynamically sized metadata must not imply a size beyond the allocation or `isize::MAX`.
- A place based on a misaligned pointer becomes UB when loaded from or stored to; forming a raw reference to the place is allowed, while forming `&` or `&mut` has its own alignment and validity requirements.
- Invalid values include uninitialized integers, floats, and raw pointers; out-of-range `bool` or `char`; invalid enum discriminants or active fields; invalid nested fields; and invalid reference, box, or wide-pointer metadata.
- Const evaluation imposes additional provenance rules: integer-like data cannot carry provenance, while pointer data must contain coherent fragments of one original pointer in order.
- Calling with the wrong ABI, unwinding through a non-unwinding frame, unsupported `target_feature` execution, invalid inline assembly, or stack deallocation that skips owned local destructors can be UB.

## Entities

- Organization: Rust Project
- Documentation: The Rust Reference; The Rustonomicon
- Language mechanisms: `unsafe`, references, `Box`, `UnsafeCell`, raw pointers, wide pointers, `MaybeUninit`, enums, unions, `target_feature`, inline assembly, ABI and unwinding
- Tools and enforcement surfaces mentioned or implied: rustc type validity assumptions, const evaluator, Miri and sanitizers as adjacent validation tools (not evaluated by this page)

## My Notes

- **Pattern:** treat every unsafe boundary as a capability proof. Write the invariant next to the unsafe operation, expose only safe methods that preserve it, and review every representation or API change against that proof.
- **Crate graph:** soundness is transitive across dependencies and language boundaries. A safe crate can still be unsound because of an upstream unsafe abstraction or foreign library; dependency review should locate unsafe/FFI ownership rather than assume safe call sites contain the risk.
- **Ownership and lifetimes:** borrow-checker lifetimes provide only an upper bound on reference liveness for the aliasing outline. Unsafe code must also reason about dereferences, reborrows, calls, returned values, allocation liveness, and metadata-sized byte spans.
- **Trait and API boundaries:** safe constructors and trait implementations must prevent invalid states from being produced. `Send`, `Sync`, pin projections, dereference traits, and FFI wrappers are global promises because downstream code may rely on their representations and safe surfaces.
- **Concurrency and cancellation:** this page does not prove data-race freedom or cancellation safety separately, but aliasing, immutable-byte, destructor, and FFI rules remain active when tasks race, migrate, unwind, or are dropped. Cancellation paths must not reuse storage, skip required destruction, or violate foreign runtime assumptions.
- **Unsafe invariants:** audit allocation identity, alignment, provenance, initialized bytes, valid discriminants and metadata, alias exclusivity, mutation through `UnsafeCell`, ABI, unwinding, target features, and destructor execution. A safety comment that covers only non-nullness is usually incomplete.
- **Tooling:** the compiler enforces safe-language constraints but assumes unsafe promises are true. Miri, sanitizers, fuzzing, compile-fail tests, and target-specific integration tests can find classes of violations, but none turns this evolving, non-formal list into a complete proof.
- **Performance:** the source provides no benchmark evidence. Any claim that unsafe representation, unchecked access, custom allocation, or FFI improves performance must be measured independently and weighed against larger review and change-amplification costs.
- **Transfer limit:** do not turn the aliasing outline or debated validity clauses into folklore stated as a frozen formal model. Pin exact compiler/toolchain behavior when a design depends on an unsettled edge.

## Open Questions

- Which current Rust memory-model and strict-provenance documents should supplement this intentionally incomplete Reference page?
- Which Miri-supported UB classes map directly to this list, and which unsafe invariants still require architecture-level or target-specific evidence?
- How should libraries encode negative and positive validity tests without accidentally constructing UB in ordinary test processes?

## Related

- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-pinning-and-address-sensitive-types]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-async-cancellation-and-select]]

## Source Text

Press ← or → to navigate between chapters
                Press S or / to search in the book
                Press ? to show this help
                Press Esc to hide this help

Rust code is incorrect if it exhibits any of the behaviors in the following
list. This includes code within unsafe blocks and unsafe functions.
unsafe only means that avoiding undefined behavior is on the programmer; it
does not change anything about the fact that Rust programs must never cause
undefined behavior.

It is the programmer’s responsibility when writing unsafe code to ensure that
any safe code interacting with the unsafe code cannot trigger these
behaviors. unsafe code that satisfies this property for any safe client is
called sound; if unsafe code can be misused by safe code to exhibit
undefined behavior, it is unsound.

The following list is not exhaustive; it may grow or shrink. There is no formal model of Rust’s semantics for what is and is not allowed in unsafe code, so there may be more behavior considered unsafe. We also reserve the right to make some of the behavior in that list defined in the future. In other words, this list does not say that anything will definitely always be undefined in all future Rust versions (but we might make such commitments for some list items in the future).
Please read the Rustonomicon before writing unsafe code.

Accessing (loading from or storing to) a place that is dangling or based on
a misaligned pointer.

Performing a place projection that violates the requirements of in-bounds
pointer arithmetic. A place projection is a field
expression, a tuple index expression, or an
array/slice index expression.

Breaking the pointer aliasing rules. The exact aliasing rules are not determined yet, but here is an outline of the general principles:
&T must point to memory that is not mutated while they are live (except for data inside an UnsafeCell<U>),
and &mut T must point to memory that is not read or written by any pointer not derived from the reference and that no other reference points to while they are live.
Box<T> is treated similar to &'static mut T for the purpose of these rules.
The exact liveness duration is not specified, but some bounds exist:

For references, the liveness duration is upper-bounded by the syntactic
lifetime assigned by the borrow checker; it cannot be live any longer than that lifetime.
Each time a reference or box is dereferenced or reborrowed, it is considered live.
Each time a reference or box is passed to or returned from a function, it is considered live.
When a reference (but not a Box!) is passed to a function, it is live at least as long as that function call, again except if the &T contains an UnsafeCell<U>.

All this also applies when values of these types are passed in a (nested) field of a compound type, but not behind pointer indirections.

Mutating immutable bytes.
All bytes reachable through a const-promoted expression are immutable, as well as bytes reachable through borrows in static and const initializers that have been lifetime-extended to 'static.
The bytes owned by an immutable binding or immutable static are immutable, unless those bytes are part of an UnsafeCell<U>.
Moreover, the bytes pointed to by a shared reference, including transitively through other references (both shared and mutable) and Boxes, are immutable; transitivity includes those references stored in fields of compound types.
A mutation is any write of more than 0 bytes which overlaps with any of the relevant bytes (even if that write does not change the memory contents).

Invoking undefined behavior via compiler intrinsics.

Executing code compiled with platform features that the current platform
does not support (see target_feature), except if the platform explicitly documents this to be safe.

Calling a function with the wrong call ABI, or unwinding past a stack frame that does not allow unwinding (e.g. by calling a "C-unwind" function imported or transmuted as a "C" function or function pointer).

Producing an invalid value. “Producing” a
value happens any time a value is assigned to or read from a place, passed to
a function/primitive operation or returned from a function/primitive
operation.

Incorrect use of inline assembly. For more details, refer to the rules to
follow when writing code that uses inline assembly.

Violating assumptions of the Rust runtime. Most assumptions of the Rust runtime are currently not explicitly documented.

For assumptions specifically related to unwinding, see the panic documentation.
The runtime assumes that a Rust stack frame is not deallocated without executing destructors for local variables owned by the stack frame. This assumption can be violated by C functions like longjmp.

Undefined behavior affects the entire program. For example, calling a function in C that exhibits undefined behavior of C means your entire program contains undefined behaviour that can also affect the Rust code. And vice versa, undefined behavior in Rust can cause adverse affects on code executed by any FFI calls to other languages.

Pointed-to bytes
The span of bytes a pointer or reference “points to” is determined by the pointer value and the size of the pointee type (using size_of_val).

A place is said to be “based on a misaligned pointer” if the last * projection
during place computation was performed on a pointer that was not aligned for its
type. (If there is no * projection in the place expression, then this is
accessing the field of a local or static and rustc will guarantee proper alignment. If
there are multiple * projections, then each of them incurs a load of the
pointer-to-be-dereferenced itself from memory, and each of these loads is
subject to the alignment constraint. Note that some * projections can be
omitted in surface Rust syntax due to automatic dereferencing; we are
considering the fully expanded place expression here.)
For instance, if ptr has type *const S where S has an alignment of 8, then
ptr must be 8-aligned or else (*ptr).f is “based on an misaligned pointer”.
This is true even if the type of the field f is u8 (i.e., a type with
alignment 1). In other words, the alignment requirement derives from the type of
the pointer that was dereferenced, not the type of the field that is being
accessed.

Note that a place based on a misaligned pointer only leads to undefined behavior
when it is loaded from or stored to.

&raw const/&raw mut on such a place is allowed.

&/&mut on a place requires the alignment of the field type (or
else the program would be “producing an invalid value”), which generally is a
less restrictive requirement than being based on an aligned pointer.

Taking a reference will lead to a compiler error in cases where the field type might be
more aligned than the type that contains it, i.e., repr(packed). This means
that being based on an aligned pointer is always sufficient to ensure that the
new reference is aligned, but it is not always necessary.

A reference/pointer is “dangling” if not all of the bytes it
points to are part of the same live allocation (so in particular they all have to be
part of some allocation).

If the size is 0, then the pointer is trivially never “dangling”
(even if it is a null pointer).

Note that dynamically sized types (such as slices and strings) point to their
entire range, so it is important that the length metadata is never too large.

In particular, the dynamic size of a Rust value (as determined by size_of_val)
must never exceed isize::MAX, since it is impossible for a single allocation
to be larger than isize::MAX.

The Rust compiler assumes that all values produced during program execution are
“valid”, and producing an invalid value is hence immediate UB.
Whether a value is valid depends on the type:

A bool value must be false (0) or true (1).

A char value must not be a surrogate (i.e., must not be in the range 0xD800..=0xDFFF) and must be equal to or less than char::MAX.

An integer (i*/u*), floating point value (f*), or raw pointer must be
initialized, i.e., must not be obtained from uninitialized memory.

A str value is treated like [u8], i.e. it must be initialized.

An enum must have a valid discriminant, and all fields of the variant indicated by that discriminant must be valid at their respective type.

A struct, tuple, and array requires all fields/elements to be valid at their respective type.

For a union, the exact validity requirements are not decided yet.
Obviously, all values that can be created entirely in safe code are valid.
If the union has a zero-sized field, then every possible value is valid.
Further details are still being debated.

A reference or Box<T> must be aligned and non-null, it cannot be dangling, and it must point to a valid value
(in case of dynamically sized types, using the actual dynamic type of the
pointee as determined by the metadata).
Note that the last point (about pointing to a valid value) remains a subject of some debate.

The metadata of a wide reference, Box<T>, or raw pointer must match
the type of the unsized tail:

dyn Trait metadata must be a pointer to a compiler-generated vtable for Trait.
(For raw pointers, this requirement remains a subject of some debate.)
Slice ([T]) metadata must be a valid usize.
Furthermore, for wide references and Box<T>, slice metadata is invalid
if it makes the total size of the pointed-to value bigger than isize::MAX.

If a type has a custom range of a valid values, then a valid value must be in that range.
In the standard library, this affects NonNull<T> and NonZero<T>.

rustc achieves this with the unstable rustc_layout_scalar_valid_range_* attributes.

In const contexts: In addition to what is described above, further provenance-related requirements apply during const evaluation. Any value that holds pure integer data (the i*/u*/f* types as well as bool and char, enum discriminants, and slice metadata) must not carry any provenance. Any value that holds pointer data (references, raw pointers, function pointers, and dyn Trait metadata) must either carry no provenance, or all bytes must be fragments of the same original pointer value in the correct order.
This implies that transmuting or otherwise reinterpreting a pointer (reference, raw pointer, or function pointer) into a non-pointer type (such as integers) is undefined behavior if the pointer had provenance.

All of the following are UB:
#![allow(unused)]
fn main() {
use core::mem::MaybeUninit;
use core::ptr;
// We cannot reinterpret a pointer with provenance as an integer,
// as then the bytes of the integer will have provenance.
const _: usize = {
    let ptr = &0;
    unsafe { (&raw const ptr as *const usize).read() }
};

// We cannot rearrange the bytes of a pointer with provenance and
// then interpret them as a reference, as then a value holding
// pointer data will have pointer fragments in the wrong order.
const _: &i32 = {
    let mut ptr = &0;
    let ptr_bytes = &raw mut ptr as *mut MaybeUninit::<u8>;
    unsafe { ptr::swap(ptr_bytes.add(1), ptr_bytes.add(2)) };
    ptr
};
}

Note: Uninitialized memory is also implicitly invalid for any type that has
a restricted set of valid values. In other words, the only cases in which
reading uninitialized memory is permitted are inside unions and in “padding”
(the gaps between the fields of a type).
