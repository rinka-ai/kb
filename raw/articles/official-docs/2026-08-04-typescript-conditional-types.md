---
id: 2026-08-04-typescript-conditional-types
type: source
title: TypeScript Conditional Types
path: raw/articles/official-docs/2026-08-04-typescript-conditional-types.md
author: TypeScript Team
publisher: Microsoft
url: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
date_published:
date_added: 2026-08-04
tags: [typescript, type-system, conditional-types, generics, inference, unions, api-design]
status: active
quality: high
summary: The official TypeScript handbook explains how conditional types relate generic inputs to outputs, infer components from matched structures, and distribute over unions unless explicitly suppressed.
related: [typescript-conditional-types, typescript-structural-compatibility, typescript-control-flow-narrowing, typescript-module-systems]
---

# TypeScript Conditional Types

## Source Metadata

- Path: raw/articles/official-docs/2026-08-04-typescript-conditional-types.md
- Author: TypeScript Team
- Published: Unknown; this is a continuously maintained handbook chapter.
- Publisher: Microsoft
- URL: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
- Provenance: Captured through `bun run kb:ingest --url` on 2026-08-04, then relocated into the established `official-docs` collection and curated without changing `## Source Text`.

## TL;DR

Conditional types are generic type-level branches: they test structural assignability, refine the checked type in the true branch, extract matched components with `infer`, and distribute over union members when the checked parameter is naked. They can compress repeated overload families into one input-output relation, but they are erased at runtime and can become opaque or expensive when public APIs expose deep recursion or unintended distribution.

## Key Claims

- A conditional type has the form `T extends U ? X : Y`; branch choice is based on whether the checked type is assignable to the constraint.
- Generic conditional types can encode a correlation between an input type and its output type, replacing repeated overloads when the relationship is uniform.
- The true branch can use information established by the constraint, including safe indexed access to members proven present.
- `infer` introduces a type variable from the structure matched in the true branch, enabling reusable extractors such as element-type and return-type helpers.
- Inference from an overloaded function type uses its last, usually most permissive signature; conditional types do not perform overload resolution from argument lists.
- A conditional type with a naked generic parameter distributes over union members.
- Wrapping both sides of `extends` in single-element tuples suppresses distribution and tests the union as a whole.

## Important Details

- **Type/API boundary:** conditional types are best used where one implementation has a stable, explainable input-output relation. Export named helper aliases and preserve discriminants when consumers must reason about branches; do not hide semantically different lifecycle operations behind one clever generic.
- **Runtime-versus-type boundary:** the branch exists only in the checker. A runtime function must still implement the corresponding value-level decision, and values from JSON, plugins, databases, environment variables, or network calls still require validation before a conditional return type is trustworthy.
- **Package graph:** exported conditional types become part of declaration files and are instantiated in consumer projects. Their behavior therefore depends on public declarations and the consumer compiler, while the runtime export still has to match the declared correlation through every package condition.
- **Composition/lifecycle ownership:** the domain/API owner owns the input-output relation and whether a union should be transformed member-by-member or as one set. Callers should not be forced to understand internal recursive machinery to use the API.
- **Tests:** compile positive and negative fixtures for each branch, union distribution, non-distribution, `never`, broad `any`/`unknown` inputs, overloaded inputs, and public package imports; pair these with runtime branch tests for the implementation.
- **Performance:** the handbook gives no compiler or language-service benchmarks. Measure public recursive/distributive helpers with the actual supported compiler and declaration graph; avoid claiming runtime cost because conditional types are erased.
- **Transfer limits:** the chapter presents the core semantics, not recursion-depth limits, version-specific inference changes, declaration emit behavior, or ergonomics under large generated schemas.
- **Practical implication:** use a named conditional helper to express a genuine generic relation, choose distributivity deliberately, keep the runtime branch and declarations aligned, and lock edge cases into package-consumer type tests.

## Entities

- Organization: Microsoft TypeScript Team
- Languages/runtimes: TypeScript, JavaScript
- Type-system mechanisms: conditional types, generic constraints, structural assignability, `infer`, indexed access, overloads, unions, distributivity, `never`

## My Notes

- Conditional types are type-level adapters, not runtime validators. They become most valuable after a boundary has admitted values into a truthful internal union.
- Distribution is an API semantic choice: mapping each union alternative preserves member-wise correlation, while suppressing distribution asks a property of the union as a whole.
- Replacing overloads is beneficial only when all cases share one coherent implementation and relation. Distinct effects, authorization, error, or lifecycle contracts still deserve distinct APIs.
- Consumer compile cost and diagnostic clarity are part of the public API budget because exported helpers are evaluated outside the owning package.

## Open Questions

- Which recursion and union-width thresholds materially affect current TypeScript compiler and language-service latency in generated API clients?
- When does an overload set communicate intent better than a conditional generic despite duplication?
- How stable are complex conditional declarations across the oldest and newest compiler versions a library supports?

## Related

- [[typescript-conditional-types]]
- [[typescript-structural-compatibility]]
- [[typescript-control-flow-narrowing]]
- [[typescript-module-systems]]
- [[internal-engineering-conventions]]
- [[codebase-architecture]]
- [[2026-05-30-backend-stack-patterns-blueprint]]

## Source Text

At the heart of most useful programs, we have to make decisions based on input.
JavaScript programs are no different, but given the fact that values can be easily introspected, those decisions are also based on the types of the inputs.
Conditional types help describe the relation between the types of inputs and outputs.
tsinterface Animal {  live(): void;}interface Dog extends Animal {  woof(): void;}type Example1 = Dog extends Animal ? number : string;        type Example1 = numbertype Example2 = RegExp extends Animal ? number : string;        type Example2 = stringTry
Conditional types take a form that looks a little like conditional expressions (condition ? trueExpression : falseExpression) in JavaScript:
ts  SomeType extends OtherType ? TrueType : FalseType;Try
When the type on the left of the extends is assignable to the one on the right, then you’ll get the type in the first branch (the “true” branch); otherwise you’ll get the type in the latter branch (the “false” branch).
From the examples above, conditional types might not immediately seem useful - we can tell ourselves whether or not Dog extends Animal and pick number or string!
But the power of conditional types comes from using them with generics.
For example, let’s take the following createLabel function:
tsinterface IdLabel {  id: number /* some fields */;}interface NameLabel {  name: string /* other fields */;}function createLabel(id: number): IdLabel;function createLabel(name: string): NameLabel;function createLabel(nameOrId: string | number): IdLabel | NameLabel;function createLabel(nameOrId: string | number): IdLabel | NameLabel {  throw "unimplemented";}Try
These overloads for createLabel describe a single JavaScript function that makes a choice based on the types of its inputs. Note a few things:

If a library has to make the same sort of choice over and over throughout its API, this becomes cumbersome.
We have to create three overloads: one for each case when we’re sure of the type (one for string and one for number), and one for the most general case (taking a string | number). For every new type createLabel can handle, the number of overloads grows exponentially.

Instead, we can encode that logic in a conditional type:
tstype NameOrId<T extends number | string> = T extends number  ? IdLabel  : NameLabel;Try
We can then use that conditional type to simplify our overloads down to a single function with no overloads.
tsfunction createLabel<T extends number | string>(idOrName: T): NameOrId<T> {  throw "unimplemented";}let a = createLabel("typescript");   let a: NameLabellet b = createLabel(2.8);   let b: IdLabellet c = createLabel(Math.random() ? "hello" : 42);let c: NameLabel | IdLabelTry
Conditional Type Constraints
Often, the checks in a conditional type will provide us with some new information.
Just like narrowing with type guards can give us a more specific type, the true branch of a conditional type will further constrain generics by the type we check against.
For example, let’s take the following:
tstype MessageOf<T> = T["message"];Type '"message"' cannot be used to index type 'T'.2536Type '"message"' cannot be used to index type 'T'.Try
In this example, TypeScript errors because T isn’t known to have a property called message.
We could constrain T, and TypeScript would no longer complain:
tstype MessageOf<T extends { message: unknown }> = T["message"];interface Email {  message: string;}type EmailMessageContents = MessageOf<Email>;              type EmailMessageContents = stringTry
However, what if we wanted MessageOf to take any type, and default to something like never if a message property isn’t available?
We can do this by moving the constraint out and introducing a conditional type:
tstype MessageOf<T> = T extends { message: unknown } ? T["message"] : never;interface Email {  message: string;}interface Dog {  bark(): void;}type EmailMessageContents = MessageOf<Email>;              type EmailMessageContents = stringtype DogMessageContents = MessageOf<Dog>;             type DogMessageContents = neverTry
Within the true branch, TypeScript knows that T will have a message property.
As another example, we could also write a type called Flatten that flattens array types to their element types, but leaves them alone otherwise:
tstype Flatten<T> = T extends any[] ? T[number] : T;// Extracts out the element type.type Str = Flatten<string[]>;     type Str = string// Leaves the type alone.type Num = Flatten<number>;     type Num = numberTry
When Flatten is given an array type, it uses an indexed access with number to fetch out string[]’s element type.
Otherwise, it just returns the type it was given.
Inferring Within Conditional Types
We just found ourselves using conditional types to apply constraints and then extract out types.
This ends up being such a common operation that conditional types make it easier.
Conditional types provide us with a way to infer from types we compare against in the true branch using the infer keyword.
For example, we could have inferred the element type in Flatten instead of fetching it out “manually” with an indexed access type:
tstype Flatten<Type> = Type extends Array<infer Item> ? Item : Type;Try
Here, we used the infer keyword to declaratively introduce a new generic type variable named Item instead of specifying how to retrieve the element type of Type within the true branch.
This frees us from having to think about how to dig through and probing apart the structure of the types we’re interested in.
We can write some useful helper type aliases using the infer keyword.
For example, for simple cases, we can extract the return type out from function types:
tstype GetReturnType<Type> = Type extends (...args: never[]) => infer Return  ? Return  : never;type Num = GetReturnType<() => number>;     type Num = numbertype Str = GetReturnType<(x: string) => string>;     type Str = stringtype Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;      type Bools = boolean[]Try
When inferring from a type with multiple call signatures (such as the type of an overloaded function), inferences are made from the last signature (which, presumably, is the most permissive catch-all case). It is not possible to perform overload resolution based on a list of argument types.
tsdeclare function stringOrNum(x: string): number;declare function stringOrNum(x: number): string;declare function stringOrNum(x: string | number): string | number;type T1 = ReturnType<typeof stringOrNum>;     type T1 = string | numberTry
Distributive Conditional Types
When conditional types act on a generic type, they become distributive when given a union type.
For example, take the following:
tstype ToArray<Type> = Type extends any ? Type[] : never;Try
If we plug a union type into ToArray, then the conditional type will be applied to each member of that union.
tstype ToArray<Type> = Type extends any ? Type[] : never;type StrArrOrNumArr = ToArray<string | number>;           type StrArrOrNumArr = string[] | number[]Try
What happens here is that ToArray distributes on:
ts  string | number;Try
and maps over each member type of the union, to what is effectively:
ts  ToArray<string> | ToArray<number>;Try
which leaves us with:
ts  string[] | number[];Try
Typically, distributivity is the desired behavior.
To avoid that behavior, you can surround each side of the extends keyword with square brackets.
tstype ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;// 'ArrOfStrOrNum' is no longer a union.type ArrOfStrOrNum = ToArrayNonDist<string | number>;          type ArrOfStrOrNum = (string | number)[]Try
