---
id: 2026-08-02-rustonomicon-send-and-sync
type: source
title: "Send and Sync"
path: raw/articles/official-docs/2026-08-02-rustonomicon-send-and-sync.md
author:
publisher: Rust Project
url: https://doc.rust-lang.org/nomicon/send-and-sync.html
date_published:
date_added: 2026-08-02
tags:
  - rust
  - concurrency
  - send
  - sync
  - unsafe-rust
  - auto-traits
  - interior-mutability
status: active
quality: high
summary: The official Rustonomicon chapter defines Send and Sync as unsafe auto-trait contracts, explains why raw pointers, UnsafeCell, and Rc block automatic thread-safety, and derives conditional implementations for an owning raw-pointer abstraction.
related:
  - rust-send-sync-and-thread-safety
  - rust-pinning-and-address-sensitive-types
---

# Send and Sync

## Source Metadata

- Path: raw/articles/official-docs/2026-08-02-rustonomicon-send-and-sync.md
- Author: Not stated on the chapter page
- Published: Not stated
- Publisher: Rust Project
- Canonical URL: https://doc.rust-lang.org/nomicon/send-and-sync.html
- Acquired through: `bun run kb:ingest --url ... --no-refresh`; the endpoint-selected note was relocated into the established `official-docs` collection without changing the captured source text.
- Authority: first-party Rust Project educational material for advanced and unsafe Rust. It is stronger than practitioner folklore but is not the language Reference, and the chapter ends with an explicit explanatory TODO.

## TL;DR

`Send` means ownership of a value may cross a thread boundary; `Sync` means shared references may cross that boundary, equivalently `T: Sync` when `&T: Send`. These unsafe marker traits are usually derived structurally, but a manual implementation is a global soundness claim that other unsafe code may trust. Raw ownership, interior mutability, destructor thread affinity, and generic bounds therefore belong in one audit.

## Key Claims

- `Send` permits transfer to another thread; `Sync` permits sharing between threads and is defined by the `&T: Send` relationship.
- Both are unsafe marker traits: an incorrect manual implementation can enable undefined behavior in downstream code that relies on the promise.
- They are auto traits, so a composite type normally inherits them from its fields. Raw pointers, `UnsafeCell` (and therefore `Cell`/`RefCell`), and `Rc` deliberately interrupt that derivation.
- A raw pointer's negative defaults act partly as an audit lint: wrappers with untracked ownership must prove thread-safety rather than inheriting it accidentally.
- The `Carton<T>` example justifies `Send` from unique ownership plus `T: Send`, and `Sync` from unsynchronized shared access exposing only `&T` plus `T: Sync`.
- Destruction is part of thread-transfer safety. A guard can be `!Send` when its underlying API requires release on the acquiring thread even if shared references to the guard can remain `Sync`.

## Important Details

- **Crate graph:** this is a language-level chapter, not a crate study. Its relevant dependency graph is semantic: wrapper auto traits depend on field auto traits and generic bounds; a public `Deref<Target = T>` makes the wrapper's shared-reference behavior depend on `T: Sync`.
- **Ownership and lifetimes:** unique ownership can support transfer, but the proof must include all hidden aliases and the validity of references returned by `Deref`/`DerefMut`. Borrow lifetimes prevent concurrent mutation only if unsafe internals actually preserve their stated uniqueness.
- **Trait/API boundary:** `unsafe impl Send/Sync` exports a property with no runtime check. Keep it near the representation and safety argument, and use conditional bounds that mirror the capabilities the API exposes.
- **Concurrency and cancellation ownership:** the chapter addresses thread transfer and destructor location, not cancellation or structured concurrency. For tasks and futures, independently establish who owns cancellation and where destruction runs.
- **Unsafe and FFI invariants:** `Carton` assumes a unique, non-null, aligned, initialized allocation; valid deallocation through the matching allocator; no hidden aliases; and cross-thread legality for both the payload and `free`. A real allocator wrapper must also audit zero-sized types, unwind paths, provenance, and platform contracts beyond this teaching example.
- **Tooling enforcement:** auto-trait derivation and generic bounds provide compile-time pressure. Negative impls are shown with a feature gate in the captured chapter. Compile-fail assertions, Miri, Loom/model tests, sanitizers, and allocator/FFI tests are useful follow-on enforcement, but this source does not prescribe or evaluate them.
- **Performance:** auto traits are marker contracts with no direct runtime synchronization cost. They do not make access synchronized; synchronization or thread confinement must come from the representation and API.
- **Transfer limits:** `Send` is not `Sync`, either trait is not proof of race-free protocol design, and neither establishes pinning, cancellation safety, deadlock freedom, fairness, atomic ordering, or structured concurrency. The chapter's `Carton` is an explanatory sketch, not a production allocator recipe.

## Entities

- **Traits and types:** `Send`, `Sync`, `UnsafeCell`, `Cell`, `RefCell`, `Rc`, raw pointers, `NonNull`, `MutexGuard`, `Box`, `Carton`
- **APIs:** `Deref`, `DerefMut`, `Drop`, `posix_memalign`, `free`
- **Concepts:** unsafe auto traits, inherited mutability, interior mutability, thread transfer, shared access, conditional trait bounds, destructor affinity, FFI allocation

## My Notes

- The reusable review pattern is **representation → exposed capabilities → conditional auto-trait bounds → destruction context**. Auditing only the pointer field or only the method signatures misses cross-thread `Drop` and hidden-alias obligations.
- Negative defaults around raw pointers intentionally increase review friction. Encapsulate raw ownership behind a narrow safe API, but do not add manual auto-trait implementations merely to satisfy an executor or container bound.
- This source closes the thread-transfer gap left explicit in [[rust-pinning-and-address-sensitive-types]]: pinning controls relocation after address sensitivity; `Send`/`Sync` separately control cross-thread movement and sharing.

## Open Questions

- Which current Rust tools best enforce expected positive and negative auto-trait behavior across public API changes?
- How should async runtimes document the interaction among future `Send` bounds, task migration, cancellation, thread-affine resources, and destructor execution?
- Which parts of the `Carton` teaching example need revision under current strict-provenance and allocator guidance?

## Related

- [[rust-send-sync-and-thread-safety]]
- [[rust-pinning-and-address-sensitive-types]]

## Source Text

Press ← or → to navigate between chapters
                Press S or / to search in the book
                Press ? to show this help
                Press Esc to hide this help

Send and Sync
Not everything obeys inherited mutability, though. Some types allow you to
have multiple aliases of a location in memory while mutating it. Unless these types use
synchronization to manage this access, they are absolutely not thread-safe. Rust
captures this through the Send and Sync traits.

A type is Send if it is safe to send it to another thread.
A type is Sync if it is safe to share between threads (T is Sync if and only if &T is Send).

Send and Sync are fundamental to Rust’s concurrency story. As such, a
substantial amount of special tooling exists to make them work right. First and
foremost, they’re unsafe traits. This means that they are unsafe to
implement, and other unsafe code can assume that they are correctly
implemented. Since they’re marker traits (they have no associated items like
methods), correctly implemented simply means that they have the intrinsic
properties an implementor should have. Incorrectly implementing Send or Sync can
cause Undefined Behavior.
Send and Sync are also automatically derived traits. This means that, unlike
every other trait, if a type is composed entirely of Send or Sync types, then it
is Send or Sync. Almost all primitives are Send and Sync, and as a consequence
pretty much all types you’ll ever interact with are Send and Sync.
Major exceptions include:

raw pointers are neither Send nor Sync (because they have no safety guards).
UnsafeCell isn’t Sync (and therefore Cell and RefCell aren’t).
Rc isn’t Send or Sync (because the refcount is shared and unsynchronized).

Rc and UnsafeCell are very fundamentally not thread-safe: they enable
unsynchronized shared mutable state. However raw pointers are, strictly
speaking, marked as thread-unsafe as more of a lint. Doing anything useful
with a raw pointer requires dereferencing it, which is already unsafe. In that
sense, one could argue that it would be “fine” for them to be marked as thread
safe.
However it’s important that they aren’t thread-safe to prevent types that
contain them from being automatically marked as thread-safe. These types have
non-trivial untracked ownership, and it’s unlikely that their author was
necessarily thinking hard about thread safety. In the case of Rc, we have a nice
example of a type that contains a *mut that is definitely not thread-safe.
Types that aren’t automatically derived can simply implement them if desired:
#![allow(unused)]
fn main() {
struct MyBox(*mut u8);

unsafe impl Send for MyBox {}
unsafe impl Sync for MyBox {}
}
In the incredibly rare case that a type is inappropriately automatically
derived to be Send or Sync, then one can also unimplement Send and Sync:
#![allow(unused)]
#![feature(negative_impls)]

fn main() {
// I have some magic semantics for some synchronization primitive!
struct SpecialThreadToken(u8);

impl !Send for SpecialThreadToken {}
impl !Sync for SpecialThreadToken {}
}
Note that in and of itself it is impossible to incorrectly derive Send and
Sync. Only types that are ascribed special meaning by other unsafe code can
possibly cause trouble by being incorrectly Send or Sync.
Most uses of raw pointers should be encapsulated behind a sufficient abstraction
that Send and Sync can be derived. For instance all of Rust’s standard
collections are Send and Sync (when they contain Send and Sync types) in spite
of their pervasive use of raw pointers to manage allocations and complex ownership.
Similarly, most iterators into these collections are Send and Sync because they
largely behave like an & or &mut into the collection.
Example
Box is implemented as its own special intrinsic type by the
compiler for various reasons, but we can implement something
with similar-ish behavior ourselves to see an example of when it is sound to
implement Send and Sync. Let’s call it a Carton.
We start by writing code to take a value allocated on the stack and transfer it
to the heap.
#![allow(unused)]
fn main() {
pub mod libc {
   pub use ::std::os::raw::{c_int, c_void};
   #[allow(non_camel_case_types)]
   pub type size_t = usize;
   unsafe extern "C" { pub fn posix_memalign(memptr: *mut *mut c_void, align: size_t, size: size_t) -> c_int; }
}
use std::{
    mem::{align_of, size_of},
    ptr,
    cmp::max,
};

impl<T> Carton<T> {
    pub fn new(value: T) -> Self {
        // Allocate enough memory on the heap to store one T.
        assert_ne!(size_of::<T>(), 0, "Zero-sized types are out of the scope of this example");
        let mut memptr: *mut T = ptr::null_mut();
        unsafe {
            let ret = libc::posix_memalign(
                (&mut memptr as *mut *mut T).cast(),
                max(align_of::<T>(), size_of::<usize>()),
                size_of::<T>()
            );
            assert_eq!(ret, 0, "Failed to allocate or invalid alignment");
        };

// NonNull is just a wrapper that enforces that the pointer isn't null.
        let ptr = {
            // Safety: memptr is dereferenceable because we created it from a
            // reference and have exclusive access.
            ptr::NonNull::new(memptr)
                .expect("Guaranteed non-null if posix_memalign returns 0")
        };

// Move value from the stack to the location we allocated on the heap.
        unsafe {
            // Safety: If non-null, posix_memalign gives us a ptr that is valid
            // for writes and properly aligned.
            ptr.as_ptr().write(value);
        }

Self(ptr)
    }
}
}
This isn’t very useful, because once our users give us a value they have no way
to access it. Box implements Deref and
DerefMut so that you can access the inner value. Let’s do
that.
#![allow(unused)]
fn main() {
use std::ops::{Deref, DerefMut};

impl<T> Deref for Carton<T> {
    type Target = T;

fn deref(&self) -> &Self::Target {
        unsafe {
            // Safety: The pointer is aligned, initialized, and dereferenceable
            //   by the logic in [`Self::new`]. We require readers to borrow the
            //   Carton, and the lifetime of the return value is elided to the
            //   lifetime of the input. This means the borrow checker will
            //   enforce that no one can mutate the contents of the Carton until
            //   the reference returned is dropped.
            self.0.as_ref()
        }
    }
}

impl<T> DerefMut for Carton<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        unsafe {
            // Safety: The pointer is aligned, initialized, and dereferenceable
            //   by the logic in [`Self::new`]. We require writers to mutably
            //   borrow the Carton, and the lifetime of the return value is
            //   elided to the lifetime of the input. This means the borrow
            //   checker will enforce that no one else can access the contents
            //   of the Carton until the mutable reference returned is dropped.
            self.0.as_mut()
        }
    }
}
}
Finally, let’s think about whether our Carton is Send and Sync. Something can
safely be Send unless it shares mutable state with something else without
enforcing exclusive access to it. Each Carton has a unique pointer, so
we’re good.
#![allow(unused)]
fn main() {
struct Carton<T>(std::ptr::NonNull<T>);
// Safety: No one besides us has the raw pointer, so we can safely transfer the
// Carton to another thread if T can be safely transferred.
unsafe impl<T> Send for Carton<T> where T: Send {}
}
What about Sync? For Carton to be Sync we have to enforce that you can’t
write to something stored in a &Carton while that same something could be read
or written to from another &Carton. Since you need an &mut Carton to
write to the pointer, and the borrow checker enforces that mutable
references must be exclusive, there are no soundness issues making Carton
sync either.
#![allow(unused)]
fn main() {
struct Carton<T>(std::ptr::NonNull<T>);
// Safety: Since there exists a public way to go from a `&Carton<T>` to a `&T`
// in an unsynchronized fashion (such as `Deref`), then `Carton<T>` can't be
// `Sync` if `T` isn't.
// Conversely, `Carton` itself does not use any interior mutability whatsoever:
// all the mutations are performed through an exclusive reference (`&mut`). This
// means it suffices that `T` be `Sync` for `Carton<T>` to be `Sync`:
unsafe impl<T> Sync for Carton<T> where T: Sync  {}
}
When we assert our type is Send and Sync we usually need to enforce that every
contained type is Send and Sync. When writing custom types that behave like
standard library types we can assert that we have the same requirements.
For example, the following code asserts that a Carton is Send if the same
sort of Box would be Send, which in this case is the same as saying T is Send.
#![allow(unused)]
fn main() {
struct Carton<T>(std::ptr::NonNull<T>);
unsafe impl<T> Send for Carton<T> where Box<T>: Send {}
}
Right now Carton<T> has a memory leak, as it never frees the memory it allocates.
Once we fix that we have a new requirement we have to ensure we meet to be Send:
we need to know free can be called on a pointer that was yielded by an
allocation done on another thread. We can check this is true in the docs for
libc::free.
#![allow(unused)]
fn main() {
struct Carton<T>(std::ptr::NonNull<T>);
mod libc {
    pub use ::std::os::raw::c_void;
    unsafe extern "C" { pub fn free(p: *mut c_void); }
}
impl<T> Drop for Carton<T> {
    fn drop(&mut self) {
        unsafe {
            libc::free(self.0.as_ptr().cast());
        }
    }
}
}
A nice example where this does not happen is with a MutexGuard: notice how
it is not Send. The implementation of MutexGuard
uses libraries that require you to ensure you
don’t try to free a lock that you acquired in a different thread. If you were
able to Send a MutexGuard to another thread the destructor would run in the
thread you sent it to, violating the requirement. MutexGuard can still be Sync
because all you can send to another thread is an &MutexGuard and dropping a
reference does nothing.
TODO: better explain what can or can’t be Send or Sync. Sufficient to appeal
only to data races?
