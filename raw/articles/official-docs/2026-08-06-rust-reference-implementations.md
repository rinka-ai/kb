---
id: 2026-08-06-rust-reference-implementations
type: source
title: Implementations
path: raw/articles/official-docs/2026-08-06-rust-reference-implementations.md
author: Rust Project
publisher: The Rust Reference
url: https://doc.rust-lang.org/reference/items/implementations.html
date_published:
date_added: 2026-08-06
tags:
  - rust
  - traits
  - generics
  - coherence
  - orphan-rules
  - api-design
  - semver
status: active
quality: high
summary: The Rust Reference defines inherent and trait implementations, coherence through overlap and orphan checks, fundamental-type handling, and the constraints that make generic implementation parameters identifiable.
related:
  - rust-trait-coherence-and-implementation-ownership
  - rust-lifetime-subtyping-and-variance
  - rust-send-sync-and-thread-safety
  - rust-unsafe-validity-and-undefined-behavior
---

# Implementations

## Source Metadata

- Path: raw/articles/official-docs/2026-08-06-rust-reference-implementations.md
- Author: Rust Project
- Published: Unknown
- Publisher: The Rust Reference
- URL: https://doc.rust-lang.org/reference/items/implementations.html
- Acquisition: Captured through `bun run kb:ingest --url ... --no-refresh` on 2026-08-06, then relocated to the established `official-docs` collection and curated without changing `## Source Text`.

## TL;DR

Rust permits multiple inherent `impl` blocks only for a type owned by the current crate, while trait implementations must satisfy both non-overlap and orphan checks. Coherence assigns implementation authority across the crate graph: a crate may implement its own trait broadly or implement a foreign trait where a local type appears early enough to cover preceding generic parameters, but may not claim a foreign-trait/foreign-type pair. Generic type and const parameters must constrain the implementation; lifetimes must do so when used in associated types.

## Key Claims

- Inherent implementations attach methods and associated constants to a nominal type defined in the same crate; they cannot declare associated type aliases.
- Trait implementations must supply every non-default associated item, may replace defaults, and cannot add undeclared items.
- Implementing an unsafe trait requires an `unsafe impl`, making the implementer's proof obligation explicit at the trait boundary.
- A trait implementation is incoherent if it fails the orphan rules or overlaps another implementation instance.
- Two implementations overlap when some substitution lets them apply to the same trait/type combination.
- The orphan rule permits an implementation when the trait is local or when a local type appears in the trait/type inputs with no uncovered generic parameters before that first local type.
- Fundamental types receive special coherence treatment: `Box<LocalType>` is local for this purpose, but its `T` does not cover a type parameter.
- Type and const parameters must constrain an implementation; a lifetime must constrain it when the lifetime appears in an associated type.

## Important Details

- **Crate graph and implementation ownership:** coherence partitions extension authority. Trait owners can add implementations for downstream types; type owners can implement downstream traits for their local types. A crate that owns neither side cannot create a globally competing meaning.
- **Ownership and lifetimes:** the local-type test is about definition ownership, not value ownership or borrowing. Lifetime parameters may be unconstrained on an inherent implementation, but a lifetime used to define an associated type must be constrained so the resulting type is not selected ambiguously.
- **Trait and API boundaries:** adding a broad blanket implementation can overlap downstream impls or reserve combinations that downstream crates hoped to implement. Coherence therefore shapes semver compatibility even though a new impl may look additive.
- **Generic boundaries:** a parameter is constraining when it appears in the implemented trait, implementing type, or through an associated-type equality attached to another constraining parameter. Merely mentioning it in a method body or ordinary where-bound is insufficient.
- **Unsafe invariants:** `unsafe impl Trait for Type` declares that the implementation upholds the unsafe trait's contract; coherence guarantees uniqueness, not correctness. The chapter provides syntax but not the trait-specific safety argument.
- **Concurrency and cancellation ownership:** coherence decides which `Send`, `Sync`, async, or cancellation-related implementation is selectable; it does not establish thread safety, task ownership, teardown behavior, or structured concurrency.
- **Tooling enforcement:** use compile-pass consumer fixtures for intended extension points and compile-fail/UI tests for expected overlap, orphan, and unconstrained-parameter failures. Test downstream-style crates because current-crate examples cannot model every semver conflict.
- **Performance:** coherence and parameter constraints are compile-time rules. The source contains no runtime benchmark and does not justify dynamic dispatch, monomorphization, boxing, or specialization choices.
- **Transfer limits:** the page does not specify specialization, negative impls, auto-trait leakage, sealed-trait patterns, object safety, trait solving algorithms, or all semver consequences of adding implementations.

## Entities

- Organization: Rust Project
- Reference: The Rust Reference
- Language mechanisms: inherent implementations, trait implementations, coherence, overlap, orphan rules, generic constraints
- Types and syntax: `impl`, `unsafe impl`, associated functions, methods, associated constants, associated types, `Box<T>`

## My Notes

- The durable pattern is **implementation authority follows trait-or-type ownership**. Coherence is not just a compiler restriction; it is the rule that lets separately versioned crates evolve without silently selecting competing behavior.
- Treat blanket impls and fundamental wrappers as crate-graph design decisions. Review who retains future implementation authority before publishing them.
- A new impl can be source-breaking when it creates overlap or inference ambiguity downstream, so semver review should inspect the implementation matrix, not only exported item signatures.
- Coherence only establishes one selectable implementation. Unsafe-trait soundness, cancellation ownership, auto traits, and runtime behavior remain independent proofs.

## Open Questions

- Which current first-party semver guidance best enumerates downstream breakage from adding blanket, auto-trait, and fundamental-type implementations?
- How should libraries test intended third-party extension points across a multi-crate fixture matrix?
- Which stable portions of negative impl and specialization behavior should be added without conflating nightly design with the Reference's stable contract?

## Related

- [[rust-trait-coherence-and-implementation-ownership]]
- [[rust-lifetime-subtyping-and-variance]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[internal-engineering-conventions]]

## Source Text

Press ← or → to navigate between chapters
                Press S or / to search in the book
                Press ? to show this help
                Press Esc to hide this help

An implementation is an item that associates items with an implementing type. Implementations are defined with the keyword impl and contain functions that belong to an instance of the type that is being implemented or to the type statically.

inherent implementations
trait implementations

An inherent implementation is defined as the sequence of the impl keyword, generic type declarations, a path to a nominal type, a where clause, and a bracketed set of associable items.

The nominal type is called the implementing type and the associable items are the associated items to the implementing type.

Inherent implementations associate the contained items to the implementing type.

Inherent implementations can contain associated functions (including methods) and associated constants.

They cannot contain associated type aliases.

The path to an associated item is any path to the implementing type, followed by the associated item’s identifier as the final path component.

A type can also have multiple inherent implementations. An implementing type must be defined within the same crate as the original type definition.
pub mod color {
    pub struct Color(pub u8, pub u8, pub u8);

impl Color {
        pub const WHITE: Color = Color(255, 255, 255);
    }
}

mod values {
    use super::color::Color;
    impl Color {
        pub fn red() -> Color {
            Color(255, 0, 0)
        }
    }
}

pub use self::color::Color;
fn main() {
    // Actual path to the implementing type and impl in the same module.
    color::Color::WHITE;

// Impl blocks in different modules are still accessed through a path to the type.
    color::Color::red();

// Re-exported paths to the implementing type also work.
    Color::red();

// Does not work, because use in `values` is not pub.
    // values::Color::red();
}

A trait implementation is defined like an inherent implementation except that the optional generic type declarations are followed by a trait, followed by the keyword for, followed by a path to a nominal type.

The trait is known as the implemented trait. The implementing type implements the implemented trait.

A trait implementation must define all non-default associated items declared by the implemented trait, may redefine default associated items defined by the implemented trait, and cannot define any other items.

The path to the associated items is < followed by a path to the implementing type followed by as followed by a path to the trait followed by > as a path component followed by the associated item’s path component.

Unsafe traits require the trait implementation to begin with the unsafe keyword.
#![allow(unused)]
fn main() {
#[derive(Copy, Clone)]
struct Point {x: f64, y: f64};
type Surface = i32;
struct BoundingBox {x: f64, y: f64, width: f64, height: f64};
trait Shape { fn draw(&self, s: Surface); fn bounding_box(&self) -> BoundingBox; }
fn do_draw_circle(s: Surface, c: Circle) { }
struct Circle {
    radius: f64,
    center: Point,
}

impl Clone for Circle {
    fn clone(&self) -> Circle { *self }
}

impl Shape for Circle {
    fn draw(&self, s: Surface) { do_draw_circle(s, *self); }
    fn bounding_box(&self) -> BoundingBox {
        let r = self.radius;
        BoundingBox {
            x: self.center.x - r,
            y: self.center.y - r,
            width: 2.0 * r,
            height: 2.0 * r,
        }
    }
}
}

A trait implementation is considered incoherent if either the orphan rules check fails or there are overlapping implementation instances.

Two trait implementations overlap when there is a non-empty intersection of the traits the implementation is for, the implementations can be instantiated with the same type.

The orphan rule states that a trait implementation is only allowed if either the trait or at least one of the types in the implementation is defined in the current crate. It prevents conflicting trait implementations across different crates and is key to ensuring coherence.
An orphan implementation is one that implements a foreign trait for a foreign type. If these were freely allowed, two crates could implement the same trait for the same type in incompatible ways, creating a situation where adding or updating a dependency could break compilation due to conflicting implementations.
The orphan rule enables library authors to add new implementations to their traits without fear that they’ll break downstream code. Without these restrictions, a library couldn’t add an implementation like impl<T: Display> MyTrait for T without potentially conflicting with downstream implementations.

Given impl<P1..=Pn> Trait<T1..=Tn> for T0, an impl is valid only if at least one of the following is true:

At least one of the types T0..=Tn must be a local type. Let Ti be the first such type.
No uncovered type parameters P1..=Pn may appear in T0..Ti (excluding Ti)

Only the appearance of uncovered type parameters is restricted.

Note that for the purposes of coherence, fundamental types are special. The T in Box<T> is not considered covered, and Box<LocalType> is considered local.

An implementation can take generic parameters, which can be used in the rest of the implementation. Implementation parameters are written directly after the impl keyword.
#![allow(unused)]
fn main() {
trait Seq<T> { fn dummy(&self, _: T) { } }
impl<T> Seq<T> for Vec<T> {
    /* ... */
}
impl Seq<bool> for u32 {
    /* Treat the integer as a sequence of bits */
}
}

Generic parameters constrain an implementation if the parameter appears at least once in one of:

The implemented trait, if it has one
The implementing type
As an associated type in the bounds of a type that contains another parameter that constrains the implementation

Type and const parameters must always constrain the implementation. Lifetimes must constrain the implementation if the lifetime is used in an associated type.
Examples of constraining situations:
#![allow(unused)]
fn main() {
trait Trait{}
trait GenericTrait<T> {}
trait HasAssocType { type Ty; }
struct Struct;
struct GenericStruct<T>(T);
struct ConstGenericStruct<const N: usize>([(); N]);
// T constrains by being an argument to GenericTrait.
impl<T> GenericTrait<T> for i32 { /* ... */ }

// T constrains by being an argument to GenericStruct
impl<T> Trait for GenericStruct<T> { /* ... */ }

// Likewise, N constrains by being an argument to ConstGenericStruct
impl<const N: usize> Trait for ConstGenericStruct<N> { /* ... */ }

// T constrains by being in an associated type in a bound for type `U` which is
// itself a generic parameter constraining the trait.
impl<T, U> GenericTrait<U> for u32 where U: HasAssocType<Ty = T> { /* ... */ }

// Like previous, except the type is `(U, isize)`. `U` appears inside the type
// that includes `T`, and is not the type itself.
impl<T, U> GenericStruct<U> where (U, isize): HasAssocType<Ty = T> { /* ... */ }
}
Examples of non-constraining situations:
#![allow(unused)]
fn main() {
// The rest of these are errors, since they have type or const parameters that
// do not constrain.

// T does not constrain since it does not appear at all.
impl<T> Struct { /* ... */ }

// N does not constrain for the same reason.
impl<const N: usize> Struct { /* ... */ }

// Usage of T inside the implementation does not constrain the impl.
impl<T> Struct {
    fn uses_t(t: &T) { /* ... */ }
}

// T is used as an associated type in the bounds for U, but U does not constrain.
impl<T, U> Struct where U: HasAssocType<Ty = T> { /* ... */ }

// T is used in the bounds, but not as an associated type, so it does not constrain.
impl<T, U> GenericTrait<U> for u32 where U: GenericTrait<T> {}
}
Example of an allowed unconstraining lifetime parameter:
#![allow(unused)]
fn main() {
struct Struct;
impl<'a> Struct {}
}
Example of a disallowed unconstraining lifetime parameter:
#![allow(unused)]
fn main() {
struct Struct;
trait HasAssocType { type Ty; }
impl<'a> HasAssocType for Struct {
    type Ty = &'a Struct;
}
}

Attributes on implementations
Implementations may contain outer attributes before the impl keyword and inner attributes inside the brackets that contain the associated items. Inner attributes must come before any associated items. The attributes that have meaning here are cfg, deprecated, doc, and the lint check attributes.
