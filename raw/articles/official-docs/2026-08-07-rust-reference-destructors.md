---
id: 2026-08-07-rust-reference-destructors
type: source
title: Destructors - The Rust Reference
path: raw/articles/official-docs/2026-08-07-rust-reference-destructors.md
author: Rust Project
publisher: Rust Project
url: https://doc.rust-lang.org/reference/destructors.html
date_published:
date_added: 2026-08-07
tags:
  - rust
  - destructors
  - drop
  - ownership
  - lifetimes
  - resource-management
  - unsafe-rust
status: active
quality: high
summary: The Rust Reference defines when initialized values and temporaries are dropped, how nested drop scopes and field order determine teardown, which syntactic forms extend temporary lifetimes, and why soundness cannot depend on destructors always running.
related:
  - rust-destructors-drop-scopes-and-resource-lifecycle
  - rust-pinning-and-address-sensitive-types
  - rust-async-cancellation-and-select
  - rust-unsafe-validity-and-undefined-behavior
---

# Destructors - The Rust Reference

## Source Metadata

- Path: raw/articles/official-docs/2026-08-07-rust-reference-destructors.md
- Author: Rust Project
- Published: Not stated on the living Reference page
- Publisher: Rust Project
- URL: https://doc.rust-lang.org/reference/destructors.html
- Retrieved: 2026-08-07
- Retrieval evidence: HTTP 200; 75,228-byte HTML response; SHA-256 `8d10a2b0ef233bc6fb0840b02196a8aea08232c5f67f694ea1281eeaf2b6cb21`

## TL;DR

Rust teardown is deterministic only within the language's stated scope and ordering rules: initialized values are dropped on assignment or when their drop scope is exited, `Drop::drop` precedes recursive field destruction, locals and temporaries unwind in reverse declaration or creation order, and fields use their own specified declaration order. Temporary lifetimes can be narrowed by edition rules or extended by syntax. `mem::forget`, `ManuallyDrop`, aborting termination, and some ABI boundaries mean a sound type cannot require its destructor to execute.

## Key Claims

- Assignment drops an initialized left-hand operand; leaving a drop scope drops initialized variables and temporaries, while moved or never-initialized fields are not dropped.
- For `T: Drop`, Rust calls `Drop::drop` and then recursively drops fields. Struct, active enum-variant, tuple, array, and owned-slice fields have specified order, while move-captured closure fields have unspecified order.
- Variables and temporaries are associated with nested drop scopes. Exiting several scopes destroys from the innermost outward; within one scope, variables and temporaries are dropped in reverse declaration or creation order.
- Temporary scopes are syntax-sensitive. Rust 2024 narrows `if let` scrutinee and block-tail temporary scopes, while selected `let`, `const`, and `static` forms extend temporaries.
- Suppressing destruction with `mem::forget` or `ManuallyDrop` is safe, and aborting termination can skip destructors; therefore destructor execution cannot be a soundness precondition.

## Important Details

- **Ownership and partial initialization:** drop state follows which values remain initialized after moves. This is the compiler-managed basis for avoiding double destruction during partial moves and early exits.
- **Trait and API boundary:** `Drop` customizes teardown but does not change field destruction that follows it. Manual smart-pointer implementations may need `ptr::drop_in_place`; wrappers using `ManuallyDrop` assume the obligation to destroy exactly once when appropriate.
- **Lifetime boundary:** temporary lifetime extension is syntactic and the Reference says its exact rules are subject to change. It is not a general escape-analysis guarantee and does not apply uniformly through function calls, method receivers, matches, closures, async blocks, or loop breaks.
- **Concurrency and cancellation:** dropping a future uses these ordinary destruction rules, but the Reference does not promise remote rollback, child-task cancellation, or destructor execution after abort. Destruction order can coordinate local teardown but is not structured concurrency by itself.
- **Unsafe invariant:** a type may rely on destruction order when destruction occurs, but cannot require `Drop` to run for memory safety. Unsafe code must also preserve initialized-state bookkeeping and avoid double-drop, use-after-drop, invalid storage reuse, or unwinding across an unsupported ABI.
- **Crate graph and coherence:** this language-level source does not study crate topology or implementation overlap. Public `Drop` behavior is nevertheless an API and semver constraint because downstream code can observe resource timing and side effects.
- **Tooling enforcement:** the compiler supplies drop elaboration and rejects many invalid moves/borrows, but exact ordering, panic, partial initialization, `ManuallyDrop`, FFI, and cancellation behavior still need focused tests; Miri and sanitizers can detect some implementation bugs but cannot prove a liveness protocol.
- **Performance:** the Reference gives no benchmark evidence. Earlier release can reduce peak resource occupancy, while extra scopes or explicit `drop` can complicate control flow; measure memory, lock hold time, file-descriptor pressure, and tail latency in the actual workload.
- **Transfer limit:** RAII is reliable for ordinary scope exit and unwinding configurations, not a durable transaction, network acknowledgement, process-crash recovery mechanism, or guarantee under aborting termination.

## Entities

- **Organization:** Rust Project
- **Language:** Rust
- **Core APIs:** `Drop`, `ptr::drop_in_place`, `mem::forget`, `ManuallyDrop`, `process::exit`, `process::abort`
- **Language mechanisms:** drop scopes, temporary scopes, constant promotion, temporary lifetime extension, partial initialization, unwinding

## My Notes

- The reusable pattern is **teardown as an ownership graph**: each initialized value has one local destruction owner and a language-defined release point, while non-local obligations require separate acknowledgement or durability protocols.
- The strongest safety boundary is negative: safe code may leak values, so destructor-dependent safety is unsound even when destructor-dependent resource cleanup is idiomatic.
- This source sharpens the difference between Rust lifetimes and runtime liveness. Borrow validity can be extended by syntax, but operational completion and externally visible cleanup still need explicit ownership.

## Open Questions

- Which rustc drop-elaboration and drop-check sources best explain compiler enforcement for partial initialization, unwinding, and generic destructor constraints?
- Which mature async and FFI systems test teardown order, cancellation acknowledgement, and abort behavior as executable properties?
- Where should public libraries document observable destruction timing without overpromising process-level cleanup?

## Related

- [[rust-destructors-drop-scopes-and-resource-lifecycle]]
- [[rust-pinning-and-address-sensitive-types]]
- [[rust-async-cancellation-and-select]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-lifetime-subtyping-and-variance]]

## Source Text

Press ← or → to navigate between chapters
                Press S or / to search in the book
                Press ? to show this help
                Press Esc to hide this help

When an initialized variable or temporary goes out of scope, its destructor is run or it is dropped. Assignment also runs the destructor of its left-hand operand, if it’s initialized. If a variable has been partially initialized, only its initialized fields are dropped.

If T: Drop, calling <T as core::ops::Drop>::drop
Recursively running the destructor of all of its fields.

The fields of a struct are dropped in declaration order.
The fields of the active enum variant are dropped in declaration order.
The fields of a tuple are dropped in order.
The elements of an array or owned slice are dropped from the first element to the last.
The variables that a closure captures by move are dropped in an unspecified order.
Trait objects run the destructor of the underlying type.
Other types don’t result in any further drops.

If a destructor must be run manually, such as when implementing your own smart pointer, core::ptr::drop_in_place can be used.
Some examples:
#![allow(unused)]
fn main() {
struct PrintOnDrop(&'static str);

impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("{}", self.0);
    }
}

let mut overwritten = PrintOnDrop("drops when overwritten");
overwritten = PrintOnDrop("drops when scope ends");

let tuple = (PrintOnDrop("Tuple first"), PrintOnDrop("Tuple second"));

let moved;
// No destructor run on assignment.
moved = PrintOnDrop("Drops when moved");
// Drops now, but is then uninitialized.
moved;

// Uninitialized does not drop.
let uninitialized: PrintOnDrop;

// After a partial move, only the remaining fields are dropped.
let mut partial_move = (PrintOnDrop("first"), PrintOnDrop("forgotten"));
// Perform a partial move, leaving only `partial_move.0` initialized.
core::mem::forget(partial_move.1);
// When partial_move's scope ends, only the first field is dropped.
}

Each variable or temporary is associated to a drop scope. When control flow leaves a drop scope all variables associated to that scope are dropped in reverse order of declaration (for variables) or creation (for temporaries).

Drop scopes can be determined by replacing for, if, and while expressions with equivalent expressions using match, loop and break.

Overloaded operators are not distinguished from built-in operators and binding modes are not considered.

Given a function, or closure, there are drop scopes for:

In the case of a block expression, the scope for the block and the expression are the same scope.

Drop scopes are nested within one another as follows. When multiple scopes are left at once, such as when returning from a function, variables are dropped from the inside outwards.

The entire function scope is the outer most scope.

[destructors.scope.nesting.function-body]

The function body block is contained within the scope of the entire function.

The parent of the expression in an expression statement is the scope of the statement.

The parent of the initializer of a let statement is the let statement’s scope.

The parent of a statement scope is the scope of the block that contains the statement.

The parent of the expression for a match guard is the scope of the arm that the guard is for.

The parent of the expression after the => in a match expression is the scope of the arm that it’s in.

The parent of the arm scope is the scope of the match expression that it belongs to.

The parent of all other scopes is the scope of the immediately enclosing expression.

Scopes of function parameters
All function parameters are in the scope of the entire function body, so are dropped last when evaluating the function. Each actual function parameter is dropped after any bindings introduced in that parameter’s pattern.
#![allow(unused)]
fn main() {
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
// Drops `y`, then the second parameter, then `x`, then the first parameter
fn patterns_in_parameters(
    (x, _): (PrintOnDrop, PrintOnDrop),
    (_, y): (PrintOnDrop, PrintOnDrop),
) {}

// drop order is 3 2 0 1
patterns_in_parameters(
    (PrintOnDrop("0"), PrintOnDrop("1")),
    (PrintOnDrop("2"), PrintOnDrop("3")),
);
}

Local variables declared in a let statement are associated to the scope of the block that contains the let statement.
#![allow(unused)]
fn main() {
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
let declared_first = PrintOnDrop("Dropped last in outer scope");
{
    let declared_in_block = PrintOnDrop("Dropped in inner scope");
}
let declared_last = PrintOnDrop("Dropped first in outer scope");
}

Local variables declared in a match expression or pattern-matching match guard are associated to the arm scope of the match arm that they are declared in.
#![allow(unused)]
fn main() {
#![allow(irrefutable_let_patterns)]
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
match PrintOnDrop("Dropped last in the first arm's scope") {
    // When guard evaluation succeeds, control-flow stays in the arm and
    // values may be moved from the scrutinee into the arm's bindings,
    // causing them to be dropped in the arm's scope.
    x if let y = PrintOnDrop("Dropped second in the first arm's scope")
        && let z = PrintOnDrop("Dropped first in the first arm's scope") =>
    {
        let declared_in_block = PrintOnDrop("Dropped in inner scope");
        // Pattern-matching guards' bindings and temporaries are dropped in
        // reverse order, dropping each guard condition operand's bindings
        // before its temporaries. Lastly, variables bound by the arm's
        // pattern are dropped.
    }
    _ => unreachable!(),
}

match PrintOnDrop("Dropped in the enclosing temporary scope") {
    // When guard evaluation fails, control-flow leaves the arm scope,
    // causing bindings and temporaries from earlier pattern-matching
    // guard condition operands to be dropped. This occurs before evaluating
    // the next arm's guard or body.
    _ if let y = PrintOnDrop("Dropped in the first arm's scope")
        && false => unreachable!(),
    // When a guard is executed multiple times due to self-overlapping
    // or-patterns, control-flow leaves the arm scope when the guard fails
    // and re-enters the arm scope before executing the guard again.
    _ | _ if let y = PrintOnDrop("Dropped in the second arm's scope twice")
        && false => unreachable!(),
    _ => {},
}
}

Variables in patterns are dropped in reverse order of declaration within the pattern.
#![allow(unused)]
fn main() {
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
let (declared_first, declared_last) = (
    PrintOnDrop("Dropped last"),
    PrintOnDrop("Dropped first"),
);
}

For the purpose of drop order, or-patterns declare bindings in the order given by the first subpattern.
#![allow(unused)]
fn main() {
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
// Drops `x` before `y`.
fn or_pattern_drop_order<T>(
    (Ok([x, y]) | Err([y, x])): Result<[T; 2], [T; 2]>
//   ^^^^^^^^^^   ^^^^^^^^^^^ This is the second subpattern.
//   |
//   This is the first subpattern.
//
//   In the first subpattern, `x` is declared before `y`. Since it is
//   the first subpattern, that is the order used even if the second
//   subpattern, where the bindings are declared in the opposite
//   order, is matched.
) {}

// Here we match the first subpattern, and the drops happen according
// to the declaration order in the first subpattern.
or_pattern_drop_order(Ok([
    PrintOnDrop("Declared first, dropped last"),
    PrintOnDrop("Declared last, dropped first"),
]));

// Here we match the second subpattern, and the drops still happen
// according to the declaration order in the first subpattern.
or_pattern_drop_order(Err([
    PrintOnDrop("Declared last, dropped first"),
    PrintOnDrop("Declared first, dropped last"),
]));
}

The temporary scope of an expression is the scope that is used for the temporary variable that holds the result of that expression when used in a place context, unless it is promoted.

Apart from lifetime extension, the temporary scope of an expression is the smallest scope that contains the expression and is one of the following:

The entire function.
A statement.
The body of an if, while or loop expression.
The else block of an if expression.
The non-pattern matching condition expression of an if or while expression or a non-pattern-matching match guard condition operand.
The pattern-matching guard, if present, and body expression for a match arm.
Each operand of a lazy boolean expression.
The pattern-matching condition(s) and consequent body of if (destructors.scope.temporary.edition2024).
The pattern-matching condition and loop body of while.
The entirety of the tail expression of a block (destructors.scope.temporary.edition2024).

The scrutinee of a match expression is not a temporary scope, so temporaries in the scrutinee can be dropped after the match expression. For example, the temporary for 1 in match 1 { ref mut z => z }; lives until the end of the statement.

The 2024 edition added two new temporary scope narrowing rules: if let temporaries are dropped before the else block, and temporaries of tail expressions of blocks are dropped immediately after the tail expression is evaluated.

Some examples:
#![allow(unused)]
fn main() {
#![allow(irrefutable_let_patterns)]
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
let local_var = PrintOnDrop("local var");

// Dropped once the condition has been evaluated
if PrintOnDrop("If condition").0 == "If condition" {
    // Dropped at the end of the block
    PrintOnDrop("If body").0
} else {
    unreachable!()
};

if let "if let scrutinee" = PrintOnDrop("if let scrutinee").0 {
    PrintOnDrop("if let consequent").0
    // `if let consequent` dropped here
}
// `if let scrutinee` is dropped here
else {
    PrintOnDrop("if let else").0
    // `if let else` dropped here
};

while let x = PrintOnDrop("while let scrutinee").0 {
    PrintOnDrop("while let loop body").0;
    break;
    // `while let loop body` dropped here.
    // `while let scrutinee` dropped here.
}

// Dropped before the first ||
(PrintOnDrop("first operand").0 == ""
// Dropped before the )
|| PrintOnDrop("second operand").0 == "")
// Dropped before the ;
|| PrintOnDrop("third operand").0 == "";

// Scrutinee is dropped at the end of the function, before local variables
// (because this is the tail expression of the function body block).
match PrintOnDrop("Matched value in final expression") {
    // Non-pattern-matching guards' temporaries are dropped once the
    // condition has been evaluated
    _ if PrintOnDrop("guard condition").0 == "" => (),
    // Pattern-matching guards' temporaries are dropped when leaving the
    // arm's scope
    _ if let "guard scrutinee" = PrintOnDrop("guard scrutinee").0 => {
        let _ = &PrintOnDrop("lifetime-extended temporary in inner scope");
        // `lifetime-extended temporary in inner scope` is dropped here
    }
    // `guard scrutinee` is dropped here
    _ => (),
}
}

Operands
Temporaries are also created to hold the result of operands to an expression while the other operands are evaluated. The temporaries are associated to the scope of the expression with that operand. Since the temporaries are moved from once the expression is evaluated, dropping them has no effect unless one of the operands to an expression breaks out of the expression, returns, or panics.
#![allow(unused)]
fn main() {
struct PrintOnDrop(&'static str);
impl Drop for PrintOnDrop {
    fn drop(&mut self) {
        println!("drop({})", self.0);
    }
}
loop {
    // Tuple expression doesn't finish evaluating so operands drop in reverse order
    (
        PrintOnDrop("Outer tuple first"),
        PrintOnDrop("Outer tuple second"),
        (
            PrintOnDrop("Inner tuple first"),
            PrintOnDrop("Inner tuple second"),
            break,
        ),
        PrintOnDrop("Never created"),
    );
}
}

Constant promotion
Promotion of a value expression to a 'static slot occurs when the expression could be written in a constant and borrowed, and that borrow could be dereferenced where the expression was originally written, without changing the runtime behavior. That is, the promoted expression can be evaluated at compile-time and the resulting value does not contain interior mutability or destructors (these properties are determined based on the value where possible, e.g. &None always has the type &'static Option<_>, as it contains nothing disallowed).

The exact rules for temporary lifetime extension are subject to change. This is describing the current behavior only.

The temporary scopes for expressions in let statements are sometimes extended to the scope of the block containing the let statement. This is done when the usual temporary scope would be too small, based on certain syntactic rules. For example:
#![allow(unused)]
fn main() {
let x = &mut 0;
// Usually a temporary would be dropped by now, but the temporary for `0` lives
// to the end of the block.
println!("{}", x);
}

Lifetime extension also applies to static and const items, where it makes temporaries live until the end of the program. For example:
#![allow(unused)]
fn main() {
const C: &Vec<i32> = &Vec::new();
// Usually this would be a dangling reference as the `Vec` would only
// exist inside the initializer expression of `C`, but instead the
// borrow gets lifetime-extended so it effectively has `'static` lifetime.
println!("{:?}", C);
}

If a borrow, dereference, field, or tuple indexing expression has an extended temporary scope, then so does its operand. If an indexing expression has an extended temporary scope, then the indexed expression also has an extended temporary scope.

An identifier pattern that binds by reference or mutable reference.
#![allow(unused)]
fn main() {
fn temp() {}
let ref x = temp(); // Binds by reference.
x;
let ref mut x = temp(); // Binds by mutable reference.
x;
}

A struct, tuple, tuple struct, slice, or or-pattern where at least one of the direct subpatterns is an extending pattern.
#![allow(unused)]
fn main() {
use core::sync::atomic::{AtomicU64, Ordering::Relaxed};
static X: AtomicU64 = AtomicU64::new(0);
struct W<T>(T);
impl<T> Drop for W<T> { fn drop(&mut self) { X.fetch_add(1, Relaxed); } }
let W { 0: ref x } = W(()); // Struct pattern.
x;
let W(ref x) = W(()); // Tuple struct pattern.
x;
let (W(ref x),) = (W(()),); // Tuple pattern.
x;
let [W(ref x), ..] = [W(())]; // Slice pattern.
x;
let (Ok(W(ref x)) | Err(&ref x)) = Ok(W(())); // Or pattern.
x;
//
// All of the temporaries above are still live here.
assert_eq!(0, X.load(Relaxed));
}

So ref x, V(ref x) and [ref x, y] are all extending patterns, but x, &ref x and &(ref x,) are not.

If the pattern in a let statement is an extending pattern then the temporary scope of the initializer expression is extended.
#![allow(unused)]
fn main() {
fn temp() {}
// This is an extending pattern, so the temporary scope is extended.
let ref x = *&temp(); // OK
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// This is neither an extending pattern nor an extending expression,
// so the temporary is dropped at the semicolon.
let &ref x = *&&temp(); // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// This is not an extending pattern but it is an extending expression,
// so the temporary lives beyond the `let` statement.
let &ref x = &*&temp(); // OK
x;
}

For a let statement with an initializer, an extending expression is an expression which is one of the following:

The initializer expression.
The operand of an extending borrow expression.
The super operands of an extending super macro call expression.
The operand(s) of an extending array, cast, braced struct, or tuple expression.
The arguments to an extending tuple struct or tuple enum variant constructor expression.
The final expression of an extending block expression except for an async block expression.
The final expression of an extending if expression’s consequent, else if, or else block.
An arm expression of an extending match expression.

So the borrow expressions in &mut 0, (&1, &mut 2), and Some(&mut 3) are all extending expressions. The borrows in &0 + &1 and f(&mut 0) are not.

The operand of an extending borrow expression has its temporary scope extended.

The super temporaries of an extending super macro call expression have their scopes extended.

Examples
Here are some examples where expressions have extended temporary scopes:
#![allow(unused)]
fn main() {
use core::pin::pin;
use core::sync::atomic::{AtomicU64, Ordering::Relaxed};
static X: AtomicU64 = AtomicU64::new(0);
#[derive(Debug)] struct S;
impl Drop for S { fn drop(&mut self) { X.fetch_add(1, Relaxed); } }
const fn temp() -> S { S }
let x = &temp(); // Operand of borrow.
x;
let x = &raw const *&temp(); // Operand of raw borrow.
assert_eq!(X.load(Relaxed), 0);
let x = &temp() as &dyn Send; // Operand of cast.
x;
let x = (&*&temp(),); // Operand of tuple constructor.
x;
struct W<T>(T);
let x = W(&temp()); // Argument to tuple struct constructor.
x;
let x = Some(&temp()); // Argument to tuple enum variant constructor.
x;
let x = { [Some(&temp())] }; // Final expr of block.
x;
let x = const { &temp() }; // Final expr of `const` block.
x;
let x = unsafe { &temp() }; // Final expr of `unsafe` block.
x;
let x = if true { &temp() } else { &temp() };
//              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//           Final exprs of `if`/`else` blocks.
x;
let x = match () { _ => &temp() }; // `match` arm expression.
x;
let x = pin!(temp()); // Super operand of super macro call expression.
x;
let x = pin!({ &mut temp() }); // As above.
x;
let x = format_args!("{:?}", temp()); // As above.
x;
//
// All of the temporaries above are still live here.
assert_eq!(0, X.load(Relaxed));
}
Here are some examples where expressions don’t have extended temporary scopes:
#![allow(unused)]
fn main() {
fn temp() {}
// Arguments to function calls are not extending expressions. The
// temporary is dropped at the semicolon.
let x = core::convert::identity(&temp()); // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
trait Use { fn use_temp(&self) -> &Self { self } }
impl Use for () {}
// Receivers of method calls are not extending expressions.
let x = (&temp()).use_temp(); // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// Scrutinees of match expressions are not extending expressions.
let x = match &temp() { x => x }; // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// Final expressions of `async` blocks are not extending expressions.
let x = async { &temp() }; // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// Final expressions of closures are not extending expressions.
let x = || &temp(); // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// Operands of loop breaks are not extending expressions.
let x = loop { break &temp() }; // ERROR
x;
}
#![allow(unused)]
fn main() {
fn temp() {}
// Operands of breaks to labels are not extending expressions.
let x = 'a: { break 'a &temp() }; // ERROR
x;
}
#![allow(unused)]
fn main() {
use core::pin::pin;
fn temp() {}
// The argument to `pin!` is only an extending expression if the call
// is an extending expression. Since it's not, the inner block is not
// an extending expression, so the temporaries in its trailing
// expression are dropped immediately.
pin!({ &temp() }); // ERROR
}
#![allow(unused)]
fn main() {
fn temp() {}
// As above.
format_args!("{:?}", { &temp() }); // ERROR
}

Manually suppressing destructors
core::mem::forget can be used to prevent the destructor of a variable from being run, and core::mem::ManuallyDrop provides a wrapper to prevent a variable or field from being dropped automatically.

Preventing a destructor from being run via core::mem::forget or other means is safe even if it has a type that isn’t 'static. Besides the places where destructors are guaranteed to run as defined by this document, types may not safely rely on a destructor being run for soundness.

Process termination without unwinding
There are some ways to terminate the process without unwinding, in which case destructors will not be run.
The standard library provides std::process::exit and std::process::abort to do this explicitly. Additionally, if the panic handler is set to abort, panicking will always terminate the process without destructors being run.
There is one additional case to be aware of: when a panic reaches a non-unwinding ABI boundary, either no destructors will run, or all destructors up until the ABI boundary will run.
