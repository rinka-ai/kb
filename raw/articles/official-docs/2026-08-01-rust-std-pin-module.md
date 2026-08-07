---
id: rust-std-pin-module
type: source
title: "std::pin: Pinning and address-sensitive types"
path: raw/articles/official-docs/2026-08-01-rust-std-pin-module.md
author: Rust Project Developers
publisher: Rust Project
url: https://doc.rust-lang.org/std/pin/
date_published:
date_added: 2026-08-01
tags:
  - rust
  - pinning
  - unsafe-rust
  - futures
  - memory-safety
  - api-design
status: active
quality: high
summary: The official standard-library pinning documentation defines Pin as a library-level contract for keeping address-sensitive values valid at one location through destruction, and derives the unsafe obligations for Unpin, projection, pointer traits, and Drop.
related:
  - rust-pinning-and-address-sensitive-types
---

# std::pin: Pinning and address-sensitive types

## Source Metadata

- Path: raw/articles/official-docs/2026-08-01-rust-std-pin-module.md
- Author: Rust Project Developers
- Published: Living standard-library documentation; no stable publication date stated
- Retrieved: 2026-08-01
- Publisher: Rust Project
- URL: https://doc.rust-lang.org/std/pin/
- Captured version marker: rustdoc displayed `std 1.97.1`
- Provenance: Acquired through `bun run kb:ingest --url https://doc.rust-lang.org/std/pin/`; the endpoint-selected note was curated and relocated without changing `## Source Text`.
- Reputation: This is the official Rust standard-library module documentation and explicitly identifies itself as the source of truth for authors implementing unsafe pieces of pinning-based interfaces.

## TL;DR

`Pin<Ptr>` does not make a value immovable through compiler magic. It is a shared library contract: once a non-`Unpin` pointee becomes pinned, unsafe code must keep it valid at the same address until its destructor runs. Safe APIs preserve that promise by restricting access that could move or invalidate the pointee. The contract enables allocation-efficient composition of compiler-generated futures and other address-sensitive structures, but it makes projection, `Deref`/`DerefMut`, `Drop`, storage reuse, and manual `Unpin` implementations part of the soundness boundary.

## Key Claims

- Rust ownership moves may also mechanically relocate a value; ordinary indirection such as `Box<T>` or `&mut T` does not by itself prevent moving the pointee.
- Pinning is required when unsafe implementation logic depends on an address-sensitive value remaining valid at one address, as with self-references, intrusive collections, and compiler-generated async state machines.
- `Pin<Ptr>` pins `Ptr::Target`, not the pointer object, and works by restricting safe access rather than changing compiler semantics.
- `Unpin` opts types out of pinning restrictions. Any type whose soundness depends on a stable address must prevent the automatic `Unpin` implementation, commonly with `PhantomPinned`, or provide a correct conditional implementation.
- The pinning promise includes a Drop guarantee: pinned storage cannot be invalidated or reused before the pinned value's destructor has run.
- Pin projection is an API-design decision per field. Declaring structural pinning propagates obligations into `Unpin`, destruction, storage reuse, and every operation that might move the field.
- Unsafe constructors and projections are locally small but globally consequential: one false promise can make later entirely safe code undefined behavior.

## Important Details

- **Crate and type graph:** `std::pin::{Pin, pin!}` forms the public surface; `std::marker::{Unpin, PhantomPinned}`, `std::ops::{Deref, DerefMut}`, `std::future::Future::poll`, `std::ptr::drop_in_place`, and destructors participate in the contract. `Pin<Ptr>` reasons about `<Ptr as Deref>::Target`.
- **Ownership and lifetimes:** ownership transfer allows semantic and potentially mechanical moves. Pinning narrows what can be done through a pointer for the pinned lifetime; the pointee must remain valid at its address until `Drop` completes or panics. Moving `Pin<Box<T>>` is fine because that moves the handle, not the heap pointee.
- **Trait and API boundaries:** safe consumers usually need only pinned methods such as `self: Pin<&mut Self>`. Unsafe implementers must audit `new_unchecked`, unchecked mutable access, projection, manual `Unpin`, custom pointer `Deref`/`DerefMut`, and destructor behavior together.
- **Async and concurrency:** compiler-generated futures can become self-referential when first polled, and `Future::poll` uses `Pin<&mut Self>` so nested futures can compose without requiring one heap allocation per combinator layer. This source does not specify executor scheduling, cancellation policy, `Send`/`Sync`, or structured concurrency; cancellation is relevant only indirectly because dropping a future must still respect the pinning and destruction contract.
- **Unsafe invariants:** the pointee is not moved; its storage is not deallocated or repurposed before drop; pointer implementations do not move or invalidate the target in `Deref`, `DerefMut`, or `Drop`; structurally pinned fields cannot escape through another move-capable API; and pinned destructors behave as if they receive `Pin<&mut Self>`.
- **Destruction edge cases:** custom allocators must call `drop_in_place` before reuse. `ManuallyDrop`, unsafe `Vec::set_len`, panic-skipping container destruction, and `#[repr(packed)]` can violate assumptions needed for structural pinning.
- **Performance:** the shared `Pin` contract avoids compulsory pointer indirection and heap allocation at every layer of composed address-sensitive futures. It does not promise that pinning itself improves runtime performance, nor does it provide benchmark evidence.
- **Tooling and enforcement:** the borrow checker enforces the restricted safe surface, but the compiler does not verify the semantic promise made by unsafe pin constructors or projections. The source provides compile-fail-style examples and safety reasoning, not a Miri, sanitizer, fuzzing, or test prescription.
- **Transfer limits:** most Rust types are `Unpin` and should not acquire pinning complexity. Pin is not a general immutability, anti-aliasing, synchronization, or lifetime-extension mechanism, and it cannot repair an already-invalid self-reference.

## Entities

- Project: Rust Project
- Standard-library items: `Pin`, `Unpin`, `PhantomPinned`, `pin!`, `Deref`, `DerefMut`, `Future`, `Drop`, `drop_in_place`
- Patterns: self-referential state machine, intrusive doubly linked list, structural pin projection, pinned destruction
- Safety concepts: address sensitivity, storage validity, Drop guarantee, unsafe library contract

## My Notes

- The reusable pattern is **restricted safe capability over an unsafe invariant**: centralize the proof that an address will remain stable, then expose only operations whose types preserve it.
- Pinning is a lifecycle protocol, not a pointer wrapper in isolation: creation, first address-sensitive use, projection, mutation, cancellation/drop, panic behavior, and storage reclamation must agree.
- Structural projection increases change amplification. Adding a take/swap/reallocation path or changing destructor panic behavior can invalidate an earlier projection proof even if the projection method itself is untouched.
- For async API review, separate three questions: whether a future requires pinning, who owns and drops it on cancellation, and whether it crosses threads (`Send`). This source settles the first contract and part of destruction, not the latter two.
- Prefer generated/audited projection mechanisms and narrow unsafe modules in production code, but that recommendation requires an additional source before endorsing any specific crate or macro.

## Open Questions

- Which current projection tools encode these requirements most faithfully, and what tests or Miri checks do mature async crates use around them?
- How do cancellation and panic paths in Tokio or another mature executor ensure pinned future destruction before task allocation reuse?
- Which formal aliasing guarantees should unsafe code assume for `Pin<&mut T>` as Rust's memory model evolves?

## Related

- [[rust-pinning-and-address-sensitive-types]]

## Source Text

Types that pin data to a location in memory.
It is sometimes useful to be able to rely upon a certain value not being able to move,
in the sense that its address in memory cannot change. This is useful especially when there
are one or more pointers pointing at that value. The ability to rely on this
guarantee that the value a pointer is pointing at (its pointee) will

Not be moved out of its memory location
More generally, remain valid at that same memory location

is called “pinning.” We would say that a value which satisfies these guarantees has been
“pinned,” in that it has been permanently (until the end of its lifespan) attached to its
location in memory, as though pinned to a pinboard. Pinning a value is an incredibly useful
building block for unsafe code to be able to reason about whether a raw pointer to the
pinned value is still valid. As we’ll see later, once a value is pinned,
it is necessarily valid at its memory location until the end of its lifespan. This concept
of “pinning” is necessary to implement safe interfaces on top of things like self-referential
types and intrusive data structures which cannot currently be modeled in fully safe Rust using
only borrow-checked references.
“Pinning” allows us to put a value which exists at some location in memory into a state where
safe code cannot move that value to a different location in memory or otherwise invalidate it
at its current location (unless it implements Unpin, which we will
talk about below). Anything that wants to interact with the pinned value in a way
that has the potential to violate these guarantees must promise that it will not actually
violate them, using the unsafe keyword to mark that such a promise is upheld by the user
and not the compiler. In this way, we can allow other unsafe code to rely on any pointers
that point to the pinned value to be valid to dereference while it is pinned.
Note that as long as you don’t use unsafe, it’s impossible to create or misuse a pinned
value in a way that is unsound. See the documentation of Pin<Ptr> for more
information on the practicalities of how to pin a value and how to use that pinned value from a
user’s perspective without using unsafe.
The rest of this documentation is intended to be the source of truth for users of Pin<Ptr>
that are implementing the unsafe pieces of an interface that relies on pinning for validity;
users of Pin<Ptr> in safe code do not need to read it in detail.
There are several sections to this documentation:

What is “moving”?
What is “pinning”?
Address sensitivity, AKA “when do we need pinning?”
Examples of types with address-sensitive states

Self-referential struct
Intrusive, doubly-linked list

§What is “moving”?
When we say a value is moved, we mean that the compiler copies, byte-for-byte, the
value from one location to another. In a purely mechanical sense, this is identical to
Copying a value from one place in memory to another. In Rust, “move” carries with it the
semantics of ownership transfer from one variable to another, which is the key difference
between a Copy and a move. For the purposes of this module’s documentation, however, when
we write move in italics, we mean specifically that the value has moved in the mechanical
sense of being located at a new place in memory.
All values in Rust are trivially moveable. This means that the address at which a value is
located is not necessarily stable in between borrows. The compiler is allowed to move a value
to a new address without running any code to notify that value that its address
has changed. Although the compiler will not insert memory moves where no semantic move has
occurred, there are many places where a value may be moved. For example, when doing
assignment or passing a value into a function.

#[derive(Default)]
struct AddrTracker(Option<usize>);

impl AddrTracker {
    // If we haven't checked the addr of self yet, store the current
    // address. If we have, confirm that the current address is the same
    // as it was last time, or else panic.
    fn check_for_move(&mut self) {
        let current_addr = self as *mut Self as usize;
        match self.0 {
            None => self.0 = Some(current_addr),
            Some(prev_addr) => assert_eq!(prev_addr, current_addr),
        }
    }
}

// Create a tracker and store the initial address
let mut tracker = AddrTracker::default();
tracker.check_for_move();

// Here we shadow the variable. This carries a semantic move, and may therefore also
// come with a mechanical memory *move*
let mut tracker = tracker;

// May panic!
// tracker.check_for_move();
In this sense, Rust does not guarantee that check_for_move() will never panic, because the
compiler is permitted to move tracker in many situations.
Common smart-pointer types such as Box<T> and &mut T also allow moving the underlying
value they point at: you can move out of a Box<T>, or you can use mem::replace to
move a T out of a &mut T. Therefore, putting a value (such as tracker above) behind a
pointer isn’t enough on its own to ensure that its address does not change.
§What is “pinning”?
We say that a value has been pinned when it has been put into a state where it is guaranteed
to remain located at the same place in memory from the time it is pinned until its
drop is called.
§Address-sensitive values, AKA “when we need pinning”
Most values in Rust are entirely okay with being moved around at-will.
Types for which it is always the case that any value of that type can be
moved at-will should implement Unpin, which we will discuss more below.
Pin is specifically targeted at allowing the implementation of safe interfaces around
types which have some state during which they become “address-sensitive.” A value in such an
“address-sensitive” state is not okay with being moved around at-will. Such a value must
stay un-moved and valid during the address-sensitive portion of its lifespan because some
interface is relying on those invariants to be true in order for its implementation to be sound.
As a motivating example of a type which may become address-sensitive, consider a type which
contains a pointer to another piece of its own data, i.e. a “self-referential” type. In order
for such a type to be implemented soundly, the pointer which points into self’s data must be
proven valid whenever it is accessed. But if that value is moved, the pointer will still
point to the old address where the value was located and not into the new location of self,
thus becoming invalid. A key example of such self-referential types are the state machines
generated by the compiler to implement Future for async fns.
Such types that have an address-sensitive state usually follow a lifecycle
that looks something like so:

A value is created which can be freely moved around.

e.g. calling an async function which returns a state machine implementing Future

An operation causes the value to depend on its own address not changing

e.g. calling poll for the first time on the produced Future

Further pieces of the safe interface of the type use internal unsafe operations which
assume that the address of the value is stable

Before the value is invalidated (e.g. deallocated), it is dropped, giving it a chance to
notify anything with pointers to itself that those pointers will be invalidated

There are two possible ways to ensure the invariants required for 2. and 3. above (which
apply to any address-sensitive type, not just self-referential types) do not get broken.

Have the value detect when it is moved and update all the pointers that point to itself.
Guarantee that the address of the value does not change (and that memory is not re-used
for anything else) during the time that the pointers to it are expected to be valid to
dereference.

Since, as we discussed, Rust can move values without notifying them that they have moved, the
first option is ruled out.
In order to implement the second option, we must in some way enforce its key invariant,
i.e. prevent the value from being moved or otherwise invalidated (you may notice this
sounds an awful lot like the definition of pinning a value). There are a few ways one might
be able to enforce this invariant in Rust:

Offer a wholly unsafe API to interact with the object, thus requiring every caller to
uphold the invariant themselves
Store the value that must not be moved behind a carefully managed pointer internal to
the object
Leverage the type system to encode and enforce this invariant by presenting a restricted
API surface to interact with any object that requires these invariants

The first option is quite obviously undesirable, as the unsafety of the interface will
become viral throughout all code that interacts with the object.
The second option is a viable solution to the problem for some use cases, in particular
for self-referential types. Under this model, any type that has an address sensitive state
would ultimately store its data in something like a Box<T>, carefully manage internal
access to that data to ensure no moves or other invalidation occurs, and finally
provide a safe interface on top.
There are a couple of linked disadvantages to using this model. The most significant is that
each individual object must assume it is on its own to ensure
that its data does not become moved or otherwise invalidated. Since there is no shared
contract between values of different types, an object cannot assume that others interacting
with it will properly respect the invariants around interacting with its data and must
therefore protect it from everyone. Because of this, composition of address-sensitive types
requires at least a level of pointer indirection each time a new object is added to the mix
(and, practically, a heap allocation).
Although there were other reasons as well, this issue of expensive composition is the key thing
that drove Rust towards adopting a different model. It is particularly a problem
when one considers, for example, the implications of composing together the Futures which
will eventually make up an asynchronous task (including address-sensitive async fn state
machines). It is plausible that there could be many layers of Futures composed together,
including multiple layers of async fns handling different parts of a task. It was deemed
unacceptable to force indirection and allocation for each layer of composition in this case.
Pin<Ptr> is an implementation of the third option. It allows us to solve the issues
discussed with the second option by building a shared contractual language around the
guarantees of “pinning” data.
§Using Pin<Ptr> to pin values
In order to pin a value, we wrap a pointer to that value (of some type Ptr) in a
Pin<Ptr>. Pin<Ptr> can wrap any pointer type, forming a promise that the pointee
will not be moved or otherwise invalidated.
We call such a Pin-wrapped pointer a pinning pointer, (or pinning reference, or pinning
Box, etc.) because its existence is the thing that is conceptually pinning the underlying
pointee in place: it is the metaphorical “pin” securing the data in place on the pinboard
(in memory).
Notice that the thing wrapped by Pin is not the value which we want to pin itself, but
rather a pointer to that value! A Pin<Ptr> does not pin the Ptr; instead, it pins the
pointer’s pointee value.
§Pinning as a library contract
Pinning does not require nor make use of any compiler “magic”2, only a specific
contract between the unsafe parts of a library API and its users.
It is important to stress this point as a user of the unsafe parts of the Pin API.
Practically, this means that performing the mechanics of “pinning” a value by creating a
Pin<Ptr> to it does not actually change the way the compiler behaves towards the
inner value! It is possible to use incorrect unsafe code to create a Pin<Ptr> to a
value which does not actually satisfy the invariants that a pinned value must satisfy, and in
this way lead to undefined behavior even in (from that point) fully safe code. Similarly, using
unsafe, one may get access to a bare &mut T from a Pin<Ptr> and
use that to invalidly move the pinned value out. It is the job of the user of the
unsafe parts of the Pin API to ensure these invariants are not violated.
This differs from e.g. UnsafeCell which changes the semantics of a program’s compiled
output. A Pin<Ptr> is a handle to a value which we have promised we will not move out of,
but Rust still considers all values themselves to be fundamentally moveable through, e.g.
assignment or mem::replace.
§How Pin prevents misuse in safe code
In order to accomplish the goal of pinning the pointee value, Pin<Ptr> restricts access to
the wrapped Ptr type in safe code. Specifically, Pin disallows the ability to access
the wrapped pointer in ways that would allow the user to move the underlying pointee value or
otherwise re-use that memory for something else without using unsafe. For example, a
Pin<&mut T> makes it impossible to obtain the wrapped &mut T safely because
through that &mut T it would be possible to move the underlying value out of
the pointer with mem::replace, etc.
As discussed above, this promise must be upheld manually by unsafe code which interacts
with the Pin<Ptr> so that other unsafe code can rely on the pointee value being
un-moved and valid. Interfaces that operate on values which are in an address-sensitive state
accept an argument like Pin<&mut T> or Pin<Box<T>> to
indicate this contract to the caller.
As discussed below, opting in to using pinning guarantees in the interface
of an address-sensitive type has consequences for the implementation of some safe traits on
that type as well.
§Interaction between Deref and Pin<Ptr>
Since Pin<Ptr> can wrap any pointer type, it uses Deref and DerefMut in
order to identify the type of the pinned pointee data and provide (restricted) access to it.
A Pin<Ptr> where Ptr: Deref is a “Ptr-style pinning pointer” to a pinned
Ptr::Target – so, a Pin<Box<T>> is an owned, pinning pointer to a
pinned T, and a Pin<Rc<T>> is a reference-counted, pinning pointer to a
pinned T.
Pin<Ptr> also uses the <Ptr as Deref>::Target type information to modify the
interface it is allowed to provide for interacting with that data (for example, when a
pinning pointer points at pinned data which implements Unpin, as
discussed below).
Pin<Ptr> requires that implementations of Deref and DerefMut on Ptr return a
pointer to the pinned data directly and do not move out of the self parameter during their
implementation of DerefMut::deref_mut. It is unsound for unsafe code to wrap pointer
types with such “malicious” implementations of Deref; see Pin<Ptr>::new_unchecked for
details.
§Fixing AddrTracker
The guarantee of a stable address is necessary to make our AddrTracker example work. When
check_for_move sees a Pin<&mut AddrTracker>, it can safely assume that value
will exist at that same address until said value goes out of scope, and thus multiple calls
to it cannot panic.

use std::marker::PhantomPinned;
use std::pin::Pin;
use std::pin::pin;

#[derive(Default)]
struct AddrTracker {
    prev_addr: Option<usize>,
    // remove auto-implemented `Unpin` bound to mark this type as having some
    // address-sensitive state. This is essential for our expected pinning
    // guarantees to work, and is discussed more below.
    _pin: PhantomPinned,
}

impl AddrTracker {
    fn check_for_move(self: Pin<&mut Self>) {
        let current_addr = &*self as *const Self as usize;
        match self.prev_addr {
            None => {
                // SAFETY: we do not move out of self
                let self_data_mut = unsafe { self.get_unchecked_mut() };
                self_data_mut.prev_addr = Some(current_addr);
            },
            Some(prev_addr) => assert_eq!(prev_addr, current_addr),
        }
    }
}

// 1. Create the value, not yet in an address-sensitive state
let tracker = AddrTracker::default();

// 2. Pin the value by putting it behind a pinning pointer, thus putting
// it into an address-sensitive state
let mut ptr_to_pinned_tracker: Pin<&mut AddrTracker> = pin!(tracker);
ptr_to_pinned_tracker.as_mut().check_for_move();

// Trying to access `tracker` or pass `ptr_to_pinned_tracker` to anything that requires
// mutable access to a non-pinned version of it will no longer compile

// 3. We can now assume that the tracker value will never be moved, thus
// this will never panic!
ptr_to_pinned_tracker.as_mut().check_for_move();
Note that this invariant is enforced by simply making it impossible to call code that would
perform a move on the pinned value. This is the case since the only way to access that pinned
value is through the pinning Pin<&mut T>, which in turn restricts our access.
§Unpin
The vast majority of Rust types have no address-sensitive states. These types
implement the Unpin auto-trait, which cancels the restrictive effects of
Pin when the pointee type T is Unpin. When T: Unpin,
Pin<Box<T>> functions identically to a non-pinning Box<T>; similarly,
Pin<&mut T> would impose no additional restrictions above a regular
&mut T.
The idea of this trait is to alleviate the reduced ergonomics of APIs that require the use
of Pin for soundness for some types, but which also want to be used by other types that
don’t care about pinning. The prime example of such an API is Future::poll. There are many
Future types that don’t care about pinning. These futures can implement Unpin and
therefore get around the pinning related restrictions in the API, while still allowing the
subset of Futures which do require pinning to be implemented soundly.
Note that the interaction between a Pin<Ptr> and Unpin is through the type of the
pointee value, <Ptr as Deref>::Target. Whether the Ptr type itself
implements Unpin does not affect the behavior of a Pin<Ptr>. For example, whether or not
Box is Unpin has no effect on the behavior of Pin<Box<T>>, because
T is the type of the pointee value, not Box. So, whether T implements Unpin is
the thing that will affect the behavior of the Pin<Box<T>>.
Builtin types that are Unpin include all of the primitive types, like bool, i32,
and f32, references (&T and &mut T), etc., as well as many
core and standard library types like Box<T>, String, and more.
These types are marked Unpin because they do not have an address-sensitive state like the
ones we discussed above. If they did have such a state, those parts of their interface would be
unsound without being expressed through pinning, and they would then need to not
implement Unpin.
The compiler is free to take the conservative stance of marking types as Unpin so long as
all of the types that compose its fields are also Unpin. This is because if a type
implements Unpin, then it is unsound for that type’s implementation to rely on
pinning-related guarantees for soundness, even when viewed through a “pinning” pointer! It is
the responsibility of the implementor of a type that relies upon pinning for soundness to
ensure that type is not marked as Unpin by adding PhantomPinned field. This is
exactly what we did with our AddrTracker example above. Without doing this, you must not
rely on pinning-related guarantees to apply to your type!
If you really need to pin a value of a foreign or built-in type that implements Unpin,
you’ll need to create your own wrapper type around the Unpin type you want to pin and then
opt-out of Unpin using PhantomPinned.
Exposing access to the inner field which you want to remain pinned must then be carefully
considered as well! Remember, exposing a method that gives access to a
Pin<&mut InnerT> where InnerT: Unpin would allow safe code to
trivially move the inner value out of that pinning pointer, which is precisely what you’re
seeking to prevent! Exposing a field of a pinned value through a pinning pointer is called
“projecting” a pin, and the more general case of deciding in which cases a pin should be able
to be projected or not is called “structural pinning.” We will go into more detail about this
below.
§Examples of address-sensitive types§A self-referential struct
Self-referential structs are the simplest kind of address-sensitive type.
It is often useful for a struct to hold a pointer back into itself, which
allows the program to efficiently track subsections of the struct.
Below, the slice field is a pointer into the data field, which
we could imagine being used to track a sliding window of data in parser
code.
As mentioned before, this pattern is also used extensively by compiler-generated
Futures.

use std::pin::Pin;
use std::marker::PhantomPinned;
use std::ptr::NonNull;

/// This is a self-referential struct because `self.slice` points into `self.data`.
struct Unmovable {
    /// Backing buffer.
    data: [u8; 64],
    /// Points at `self.data` which we know is itself non-null. Raw pointer because we can't do
    /// this with a normal reference.
    slice: NonNull<[u8]>,
    /// Suppress `Unpin` so that this cannot be moved out of a `Pin` once constructed.
    _pin: PhantomPinned,
}

impl Unmovable {
    /// Creates a new `Unmovable`.
    ///
    /// To ensure the data doesn't move we place it on the heap behind a pinning Box.
    /// Note that the data is pinned, but the `Pin<Box<Self>>` which is pinning it can
    /// itself still be moved. This is important because it means we can return the pinning
    /// pointer from the function, which is itself a kind of move!
    fn new() -> Pin<Box<Self>> {
        let res = Unmovable {
            data: [0; 64],
            // We only create the pointer once the data is in place
            // otherwise it will have already moved before we even started.
            slice: NonNull::from(&[]),
            _pin: PhantomPinned,
        };
        // First we put the data in a box, which will be its final resting place
        let mut boxed = Box::new(res);

// Then we make the slice field point to the proper part of that boxed data.
        // From now on we need to make sure we don't move the boxed data.
        boxed.slice = NonNull::from(&boxed.data);

// To do that, we pin the data in place by pointing to it with a pinning
        // (`Pin`-wrapped) pointer.
        //
        // `Box::into_pin` makes existing `Box` pin the data in-place without moving it,
        // so we can safely do this now *after* inserting the slice pointer above, but we have
        // to take care that we haven't performed any other semantic moves of `res` in between.
        let pin = Box::into_pin(boxed);

// Now we can return the pinned (through a pinning Box) data
        pin
    }
}

let unmovable: Pin<Box<Unmovable>> = Unmovable::new();

// The inner pointee `Unmovable` struct will now never be allowed to move.
// Meanwhile, we are free to move the pointer around.
let mut still_unmoved = unmovable;
assert_eq!(still_unmoved.slice, NonNull::from(&still_unmoved.data));

// We cannot mutably dereference a `Pin<Ptr>` unless the pointee is `Unpin` or we use unsafe.
// Since our type doesn't implement `Unpin`, this will fail to compile.
// let mut new_unmoved = Unmovable::new();
// std::mem::swap(&mut *still_unmoved, &mut *new_unmoved);§An intrusive, doubly-linked list
In an intrusive doubly-linked list, the collection itself does not own the memory in which
each of its elements is stored. Instead, each client is free to allocate space for elements it
adds to the list in whichever manner it likes, including on the stack! Elements can be stored
in a stack frame shorter-lived than the collection, provided they are removed from the list
before that frame goes out of scope.
To make such an intrusive data structure work, every element stores pointers to its predecessor
and successor within its own data, rather than having the list structure itself managing those
pointers. It is in this sense that the structure is “intrusive”: the details of how an
element is stored within the larger structure “intrudes” on the implementation of the element
type itself!
The full implementation details of such a data structure are outside the scope of this
documentation, but we will discuss how Pin can help to do so.
Using such an intrusive pattern, elements may only be added when they are pinned. If we think
about the consequences of adding non-pinned values to such a list, this becomes clear:
Moving or otherwise invalidating an element’s data would invalidate the pointers back to it
which are stored in the elements ahead and behind it. Thus, in order to soundly dereference
the pointers stored to the next and previous elements, we must satisfy the guarantee that
nothing has invalidated those pointers (which point to data that we do not own).
Moreover, the Drop implementation of each element must in some way notify its
predecessor and successor elements that it should be removed from the list before it is fully
destroyed, otherwise the pointers back to it would again become invalidated.
Crucially, this means we have to be able to rely on drop always being called before an
element is invalidated. If an element could be deallocated or otherwise invalidated without
calling drop, the pointers to it stored in its neighboring elements would
become invalid, which would break the data structure.
Therefore, pinning data also comes with the “Drop guarantee”.
§Subtle details and the Drop guarantee
The purpose of pinning is not just to prevent a value from being moved, but more
generally to be able to rely on the pinned value remaining valid at a specific place in
memory.
To do so, pinning a value adds an additional invariant that must be upheld in order for use
of the pinned data to be valid, on top of the ones that must be upheld for a non-pinned value
of the same type to be valid:
From the moment a value is pinned by constructing a Pinning pointer to it, that value
must remain, valid, at that same address in memory, until its drop handler is
called.
There is some subtlety to this which we have not yet talked about in detail. The invariant
described above means that, yes,

The value must not be moved out of its location in memory

The memory location that stores the value must not get invalidated or otherwise repurposed
during the lifespan of the pinned value until its drop returns or panics

This point is subtle but required for intrusive data structures to be implemented soundly.
§Drop guarantee
There needs to be a way for a pinned value to notify any code that is relying on its pinned
status that it is about to be destroyed. In this way, the dependent code can remove the
pinned value’s address from its data structures or otherwise change its behavior with the
knowledge that it can no longer rely on that value existing at the location it was pinned to.
Thus, in any situation where we may want to overwrite a pinned value, that value’s drop must
be called beforehand (unless the pinned value implements Unpin, in which case we can ignore
all of Pin’s guarantees, as usual).
The most common storage-reuse situations occur when a value on the stack is destroyed as part
of a function return and when heap storage is freed. In both cases, drop gets run for us
by Rust when using standard safe code. However, for manual heap allocations or otherwise
custom-allocated storage, unsafe code must make sure to call ptr::drop_in_place before
deallocating and re-using said storage.
In addition, storage “re-use”/invalidation can happen even if no storage is (de-)allocated.
For example, if we had an Option which contained a Some(v) where v is pinned, then v
would be invalidated by setting that option to None.
Similarly, if a Vec was used to store pinned values and Vec::set_len was used to
manually “kill” some elements of a vector, all of the items “killed” would become invalidated,
which would be undefined behavior if those items were pinned.
Both of these cases are somewhat contrived, but it is crucial to remember that Pinned data
must be dropped before it is invalidated; not just to prevent memory leaks, but as a
matter of soundness. As a corollary, the following code can never be made safe:

// Pin something inside a `ManuallyDrop`. This is fine on its own.
let mut pin: Pin<Box<ManuallyDrop<Type>>> = Box::pin(ManuallyDrop::new(Type));

// However, creating a pinning mutable reference to the type *inside*
// the `ManuallyDrop` is not!
let inner: Pin<&mut Type> = unsafe {
    Pin::map_unchecked_mut(pin.as_mut(), |x| &mut **x)
};
Because mem::ManuallyDrop inhibits the destructor of Type, it won’t get run when the
Box<ManuallyDrop<Type>> is dropped, thus violating the drop guarantee of the
Pin<&mut Type>>.
Of course, leaking memory in such a way that its underlying storage will never get invalidated
or re-used is still fine: mem::forgeting a Box<T> prevents its storage from ever getting
re-used, so the drop guarantee is still satisfied.
§Implementing an address-sensitive type.
This section goes into detail on important considerations for implementing your own
address-sensitive types, which are different from merely using Pin<Ptr> in a generic
way.
§Implementing Drop for types with address-sensitive states
The drop function takes &mut self, but this is called even if that self has been
pinned! Implementing Drop for a type with address-sensitive states requires some care, because if self was
indeed in an address-sensitive state before drop was called, it is as if the compiler
automatically called Pin::get_unchecked_mut.
This can never cause a problem in purely safe code because creating a pinning pointer to
a type which has address-sensitive states (and thus does not implement Unpin) requires unsafe,
but it is important to note that choosing to take advantage of pinning-related guarantees
to justify validity in the implementation of your type has consequences for that type’s
Drop implementation as well: if an element of your type could have been pinned,
you must treat Drop as implicitly taking self: Pin<&mut Self>.
You should implement Drop as follows:

impl Drop for Type {
    fn drop(&mut self) {
        // `new_unchecked` is okay because we know this value is never used
        // again after being dropped.
        inner_drop(unsafe { Pin::new_unchecked(self)});
        fn inner_drop(this: Pin<&mut Type>) {
            // Actual drop code goes here.
        }
    }
}
The function inner_drop has the signature that drop should have in this situation.
This makes sure that you do not accidentally use self/this in a way that is in conflict
with pinning’s invariants.
Moreover, if your type is #[repr(packed)], the compiler will automatically
move fields around to be able to drop them. It might even do
that for fields that happen to be sufficiently aligned. As a consequence, you cannot use
pinning with a #[repr(packed)] type.
§Implementing Drop for pointer types which will be used as Pinning pointers
It should further be noted that creating a pinning pointer of some type Ptr also carries
with it implications on the way that Ptr type must implement Drop
(as well as Deref and DerefMut)! When implementing a pointer type that may be used as
a pinning pointer, you must also take the same care described above not to move out of or
otherwise invalidate the pointee during Drop, Deref, or DerefMut
implementations.
§“Assigning” pinned data
Although in general it is not valid to swap data or assign through a Pin<Ptr> for the same
reason that reusing a pinned object’s memory is invalid, it is possible to do validly when
implemented with special care for the needs of the exact data structure which is being
modified. For example, the assigning function must know how to update all uses of the pinned
address (and any other invariants necessary to satisfy validity for that type). For
Unmovable (from the example above), we could write an assignment function like so:

impl Unmovable {
    // Copies the contents of `src` into `self`, fixing up the self-pointer
    // in the process.
    fn assign(self: Pin<&mut Self>, src: Pin<&mut Self>) {
        unsafe {
            let unpinned_self = Pin::into_inner_unchecked(self);
            let unpinned_src = Pin::into_inner_unchecked(src);
            *unpinned_self = Self {
                data: unpinned_src.data,
                slice: NonNull::from(&mut []),
                _pin: PhantomPinned,
            };

let data_ptr = unpinned_src.data.as_ptr() as *const u8;
            let slice_ptr = unpinned_src.slice.as_ptr() as *const u8;
            let offset = slice_ptr.offset_from(data_ptr) as usize;
            let len = unpinned_src.slice.as_ptr().len();

unpinned_self.slice = NonNull::from(&mut unpinned_self.data[offset..offset+len]);
        }
    }
}
Even though we can’t have the compiler do the assignment for us, it’s possible to write
such specialized functions for types that might need it.
Note that it is possible to assign generically through a Pin<Ptr> by way of Pin::set().
This does not violate any guarantees, since it will run drop on the pointee value before
assigning the new value. Thus, the drop implementation still has a chance to perform the
necessary notifications to dependent values before the memory location of the original pinned
value is overwritten.
§Projections and Structural Pinning
With ordinary structs, it is natural that we want to add projection methods that allow
borrowing one or more of the inner fields of a struct when the caller has access to a
borrow of the whole struct:

struct Struct {
    field: Field,
    // ...
}

impl Struct {
    fn field(&mut self) -> &mut Field { &mut self.field }
}
When working with address-sensitive types, it’s not obvious what the signature of these
functions should be. If field takes self: Pin<&mut Struct>, should it
return &mut Field or Pin<&mut Field>? This question also arises with
enums and wrapper types like Vec<T>, Box<T>, and RefCell<T>. (This question
applies just as well to shared references, but we’ll examine the more common case of mutable
references for illustration)
It turns out that it’s up to the author of Struct to decide which type the “projection”
should produce. The choice must be consistent though: if a pin is projected to a field
in one place, then it should very likely not be exposed elsewhere without projecting the
pin.
As the author of a data structure, you get to decide for each field whether pinning
“propagates” to this field or not. Pinning that propagates is also called “structural”,
because it follows the structure of the type.
This choice depends on what guarantees you need from the field for your unsafe code to work.
If the field is itself address-sensitive, or participates in the parent struct’s address
sensitivity, it will need to be structurally pinned.
A useful test is if unsafe code that consumes Pin<&mut Struct>
also needs to take note of the address of the field itself, it may be evidence that that field
is structurally pinned. Unfortunately, there are no hard-and-fast rules.
§Choosing pinning not to be structural for field…
While counter-intuitive, it’s often the easier choice: if you do not expose a
Pin<&mut Field>, you do not need to be careful about other code
moving out of that field, you just have to ensure that you never create a pinning
reference to that field. This does of course also mean that if you decide a field does not
have structural pinning, you must not write unsafe code that assumes (invalidly) that the
field is structurally pinned!
Fields without structural pinning may have a projection method that turns
Pin<&mut Struct> into &mut Field:

impl Struct {
    fn field(self: Pin<&mut Self>) -> &mut Field {
        // This is okay because `field` is never considered pinned, therefore we do not
        // need to uphold any pinning guarantees for this field in particular. Of course,
        // we must not elsewhere assume this field *is* pinned if we choose to expose
        // such a method!
        unsafe { &mut self.get_unchecked_mut().field }
    }
}
You may also in this situation impl Unpin for Struct {} even if the type of
field is not Unpin. Since we have explicitly chosen not to care about pinning guarantees
for field, the way field’s type interacts with pinning is no longer relevant in the
context of its use in Struct.
§Choosing pinning to be structural for field…
The other option is to decide that pinning is “structural” for field,
meaning that if the struct is pinned then so is the field.
This allows writing a projection that creates a Pin<&mut Field>, thus
witnessing that the field is pinned:

impl Struct {
    fn field(self: Pin<&mut Self>) -> Pin<&mut Field> {
        // This is okay because `field` is pinned when `self` is.
        unsafe { self.map_unchecked_mut(|s| &mut s.field) }
    }
}
Structural pinning comes with a few extra requirements:

Structural Unpin. A struct can be Unpin only if all of its
structurally-pinned fields are, too. This is Unpin’s behavior by default.
However, as a library author, it is your responsibility not to write something like
impl<T> Unpin for Struct<T> {} and then offer a method that provides
structural pinning to an inner field of T, which may not be Unpin! (Adding any
projection operation requires unsafe code, so the fact that Unpin is a safe trait does
not break the principle that you only have to worry about any of this if you use
unsafe)

Pinned Destruction. As discussed above, drop takes
&mut self, but the struct (and hence its fields) might have been pinned
before. The destructor must be written as if its argument was
self: Pin<&mut Self>, instead.
As a consequence, the struct must not be #[repr(packed)].

Structural Notice of Destruction. You must uphold the
Drop guarantee: once your struct is pinned, the struct’s storage cannot
be re-used without calling the structurally-pinned fields’ destructors, as well.
This can be tricky, as witnessed by VecDeque<T>: the destructor of VecDeque<T>
can fail to call drop on all elements if one of the destructors panics. This violates
the Drop guarantee, because it can lead to elements being deallocated
without their destructor being called.
VecDeque<T> has no pinning projections, so its destructor is sound. If it wanted
to provide such structural pinning, its destructor would need to abort the process if any
of the destructors panicked.

You must not offer any other operations that could lead to data being moved out of
the structural fields when your type is pinned. For example, if the struct contains an
Option<T> and there is a take-like operation with type
fn(Pin<&mut Struct<T>>) -> Option<T>,
then that operation can be used to move a T out of a pinned Struct<T> – which
means pinning cannot be structural for the field holding this data.
For a more complex example of moving data out of a pinned type,
imagine if RefCell<T> had a method
fn get_pin_mut(self: Pin<&mut Self>) -> Pin<&mut T>.
Then we could do the following:

ⓘfn exploit_ref_cell<T>(mut rc: Pin<&mut RefCell<T>>) {
    // Here we get pinned access to the `T`.
    let _: Pin<&mut T> = rc.as_mut().get_pin_mut();

// And here we have `&mut T` to the same data.
    let shared: &RefCell<T> = rc.into_ref().get_ref();
    let mut borrow = shared.borrow_mut();
    let content = &mut *borrow;
}
This is catastrophic: it means we can first pin the content of the
RefCell<T> (using RefCell::get_pin_mut) and then move that
content using the mutable reference we got later.

§Structural Pinning examples
For a type like Vec<T>, both possibilities (structural pinning or not) make
sense. A Vec<T> with structural pinning could have get_pin/get_pin_mut
methods to get pinning references to elements. However, it could not allow calling
pop on a pinned Vec<T> because that would move the (structurally
pinned) contents! Nor could it allow push, which might reallocate and thus also
move the contents.
A Vec<T> without structural pinning could
impl<T> Unpin for Vec<T>, because the contents are never pinned
and the Vec<T> itself is fine with being moved as well.
At that point pinning just has no effect on the vector at all.
In the standard library, pointer types generally do not have structural pinning,
and thus they do not offer pinning projections. This is why Box<T>: Unpin
holds for all T. It makes sense to do this for pointer types, because moving the
Box<T> does not actually move the T: the Box<T> can be freely
movable (aka Unpin) even if the T is not. In fact, even Pin<Box<T>> and
Pin<&mut T> are always Unpin themselves, for the same reason:
their contents (the T) are pinned, but the pointers themselves can be moved without moving
the pinned data. For both Box<T> and Pin<Box<T>>,
whether the content is pinned is entirely independent of whether the
pointer is pinned, meaning pinning is not structural.
When implementing a Future combinator, you will usually need structural pinning
for the nested futures, as you need to get pinning (Pin-wrapped) references to them to
call poll. But if your combinator contains any other data that does not need to be pinned,
you can make those fields not structural and hence freely access them with a
mutable reference even when you just have Pin<&mut Self>
(such as in your own poll implementation).
Futures themselves do not ever need to notify other bits of code that
they are being dropped, however data structures like stack-based intrusive linked lists do. ↩There is a bit of nuance here that is still being decided about what the aliasing
semantics of Pin<&mut T> should be, but this is true as of today. ↩
