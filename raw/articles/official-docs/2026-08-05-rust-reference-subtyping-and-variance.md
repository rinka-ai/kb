---
id: 2026-08-05-rust-reference-subtyping-and-variance
type: source
title: Subtyping and Variance
path: raw/articles/official-docs/2026-08-05-rust-reference-subtyping-and-variance.md
author: Rust Project
publisher: The Rust Reference
url: https://doc.rust-lang.org/reference/subtyping.html
date_published:
date_added: 2026-08-05
tags:
  - rust
  - lifetimes
  - subtyping
  - variance
  - generics
  - higher-ranked-trait-bounds
  - unsafe-rust
  - api-design
status: active
quality: high
summary: The Rust Reference restricts subtyping to lifetime variance and higher-ranked lifetime substitution, then defines how references, pointers, functions, UnsafeCell, PhantomData, trait objects, and user-defined fields determine generic variance.
related:
  - rust-lifetime-subtyping-and-variance
  - rust-unsafe-validity-and-undefined-behavior
  - rust-send-sync-and-thread-safety
---

# Subtyping and Variance

## Source Metadata

- Path: raw/articles/official-docs/2026-08-05-rust-reference-subtyping-and-variance.md
- Author: Rust Project
- Published: Unknown
- Publisher: The Rust Reference
- URL: https://doc.rust-lang.org/reference/subtyping.html
- Acquisition: Captured through `bun run kb:ingest --url ... --no-refresh` on 2026-08-05, then relocated to the established `official-docs` collection and curated without changing `## Source Text`.

## TL;DR

Rust has no broad class-like subtyping after lifetimes are erased. Its subtype relations come from lifetime outlives relationships and substitution into higher-ranked lifetimes; variance determines whether those relations pass through generic constructors, reverse direction, or are blocked. Because field types determine a user-defined type's variance, representation choices such as `&mut`, raw mutable pointers, `UnsafeCell`, function arguments, and `PhantomData` become public lifetime and soundness constraints.

## Key Claims

- Subtyping is implicit during type checking and inference, but is restricted to lifetime variance and higher-ranked lifetime substitution.
- If `'static` outlives `'a`, then `&'static T` can be used where `&'a T` is required.
- A value polymorphic over every lifetime (`for<'a>`) is a subtype of a version specialized to a particular lifetime; the same relation applies to higher-ranked trait objects.
- Covariance preserves a parameter's subtype direction, contravariance reverses it, and invariance permits no derived subtype relation.
- Shared references are covariant in lifetime and pointee; mutable references are covariant in lifetime but invariant in pointee.
- Raw const pointers are covariant, while raw mutable pointers and `UnsafeCell<T>` are invariant in `T`; function returns are covariant and function arguments contravariant.
- Struct, enum, and union variance is inferred from all field uses; conflicting positions make the parameter invariant.

## Important Details

- **Crate graph and API surface:** variance is inferred structurally rather than declared on a Rust type. A private field change can therefore alter which lifetime coercions downstream users can express, even when method names remain unchanged.
- **Ownership and lifetimes:** covariance allows a longer borrow to be shortened. Invariance blocks changing a nested lifetime where mutation could otherwise store a shorter-lived value into storage observed as longer-lived.
- **Trait and generic boundaries:** higher-ranked function pointers and `dyn for<'a> Fn(...)` promise validity for every caller-selected lifetime, which is stronger than accepting one fixed lifetime. Function-input contravariance follows from what inputs the callable can safely accept.
- **Unsafe invariants:** raw pointers do not remove type-system obligations. `*mut T` and `UnsafeCell<T>` force invariance because writable storage must not admit lifetime substitution that could create dangling contents. `PhantomData<T>` is covariant and can deliberately make an otherwise absent generic parameter participate in variance; unsafe wrappers must choose marker shape to match actual ownership and access.
- **Concurrency and cancellation ownership:** this chapter establishes no `Send`, `Sync`, task-lifetime, cancellation, or destructor-thread guarantee. Variance composes with those separate capability proofs but does not imply them.
- **Tooling enforcement:** compile-pass and compile-fail tests can lock intended coercions, higher-ranked callback acceptance, and rejection of unsound lifetime substitutions. Miri, fuzzers, and sanitizers cannot by themselves prove that a public generic signature expresses the intended variance.
- **Performance:** the chapter presents type relations only and contains no runtime benchmark. Variance itself is compile-time; wrapper layouts and indirections chosen to preserve invariants still require workload-specific measurement.
- **Transfer limits:** the source is a concise language-reference chapter, not a complete ownership tutorial, drop-check specification, trait-object lifetime guide, or unsafe `PhantomData` design manual.

## Entities

- Organization: Rust Project
- Reference: The Rust Reference
- Language mechanisms: lifetimes, subtyping, covariance, contravariance, invariance, higher-ranked lifetimes
- Types and traits: `&T`, `&mut T`, `*const T`, `*mut T`, `UnsafeCell<T>`, `PhantomData<T>`, function pointers, trait objects

## My Notes

- The durable pattern is **representation-derived public capability**: a generic type's fields determine not just layout and auto traits but also which lifetime substitutions its API permits.
- Treat a variance change as an API and unsafe-review event. Adding interior mutability, changing a raw pointer's mutability, or altering a marker field can widen or narrow legal coercions without changing runtime code.
- Use higher-ranked bounds when the callee truly needs a callback that works for any fresh borrow; a callback tied to one chosen lifetime is a weaker contract.
- Prefer invariance when writable foreign or raw storage cannot safely accept lifetime substitution. Do not seek covariance merely for ergonomics.

## Open Questions

- Which current Reference or Nomicon source best completes this chapter with drop checking, `PhantomData` marker recipes, and ownership variance for unsafe containers?
- Which mature crate has compile-fail tests that intentionally lock higher-ranked callback or invariant wrapper behavior across releases?
- How should semver tooling detect representation changes that alter inferred variance but leave exported item names unchanged?

## Related

- [[rust-lifetime-subtyping-and-variance]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-pinning-and-address-sensitive-types]]

## Source Text

Press ← or → to navigate between chapters
                Press S or / to search in the book
                Press ? to show this help
                Press Esc to hide this help

Subtyping is implicit and can occur at any stage in type checking or inference.

Subtyping is restricted to two cases: variance with respect to lifetimes and between types with higher ranked lifetimes. If we were to erase lifetimes from types, then the only subtyping would be due to type equality.
Consider the following example: string literals always have 'static lifetime. Nevertheless, we can assign s to t:
#![allow(unused)]
fn main() {
fn bar<'a>() {
    let s: &'static str = "hi";
    let t: &'a str = s;
}
}
Since 'static outlives the lifetime parameter 'a, &'static str is a subtype of &'a str.

Higher-ranked function pointers and trait objects have another subtype relation. They are subtypes of types that are given by substitutions of the higher-ranked lifetimes. Some examples:
#![allow(unused)]
fn main() {
// Here 'a is substituted for 'static
let subtype: &(for<'a> fn(&'a i32) -> &'a i32) = &((|x| x) as fn(&_) -> &_);
let supertype: &(fn(&'static i32) -> &'static i32) = subtype;

// This works similarly for trait objects
let subtype: &(dyn for<'a> Fn(&'a i32) -> &'a i32) = &|x| x;
let supertype: &(dyn Fn(&'static i32) -> &'static i32) = subtype;

// We can also substitute one higher-ranked lifetime for another
let subtype: &(for<'a, 'b> fn(&'a i32, &'b i32)) = &((|x, y| {}) as fn(&_, &_));
let supertype: &for<'c> fn(&'c i32, &'c i32) = subtype;
}

Variance is a property that generic types have with respect to their arguments. A generic type’s variance in a parameter is how the subtyping of the parameter affects the subtyping of the type.

F<T> is covariant over T if T being a subtype of U implies that F<T> is a subtype of F<U> (subtyping “passes through”)

F<T> is contravariant over T if T being a subtype of U implies that F<U> is a subtype of F<T>

F<T> is invariant over T otherwise (no subtyping relation can be derived)

Variance of types is automatically determined as follows

&'a Tcovariantcovariant
&'a mut Tcovariantinvariant
*const Tcovariant
*mut Tinvariant
[T] and [T; n]covariant
fn() -> Tcovariant
fn(T) -> ()contravariant
std::cell::UnsafeCell<T>invariant
std::marker::PhantomData<T>covariant
dyn Trait<T> + 'acovariantinvariant

The variance of other struct, enum, and union types is decided by looking at the variance of the types of their fields. If the parameter is used in positions with different variances then the parameter is invariant. For example the following struct is covariant in 'a and T and invariant in 'b, 'c, and U.
#![allow(unused)]
fn main() {
use std::cell::UnsafeCell;
struct Variance<'a, 'b, 'c, T, U: 'a> {
    x: &'a U,               // This makes `Variance` covariant in 'a, and would
                            // make it covariant in U, but U is used later
    y: *const T,            // Covariant in T
    z: UnsafeCell<&'b f64>, // Invariant in 'b
    w: *mut U,              // Invariant in U, makes the whole struct invariant

f: fn(&'c ()) -> &'c () // Both co- and contravariant, makes 'c invariant
                            // in the struct.
}
}

When used outside of an struct, enum, or union, the variance for parameters is checked at each location separately.
#![allow(unused)]
fn main() {
use std::cell::UnsafeCell;
fn generic_tuple<'short, 'long: 'short>(
    // 'long is used inside of a tuple in both a co- and invariant position.
    x: (&'long u32, UnsafeCell<&'long u32>),
) {
    // As the variance at these positions is computed separately,
    // we can freely shrink 'long in the covariant position.
    let _: (&'short u32, UnsafeCell<&'long u32>) = x;
}

fn takes_fn_ptr<'short, 'middle: 'short>(
    // 'middle is used in both a co- and contravariant position.
    f: fn(&'middle ()) -> &'middle (),
) {
    // As the variance at these positions is computed separately,
    // we can freely shrink 'middle in the covariant position
    // and extend it in the contravariant position.
    let _: fn(&'static ()) -> &'short () = f;
}
}
