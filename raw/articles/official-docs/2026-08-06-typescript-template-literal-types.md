---
id: 2026-08-06-typescript-template-literal-types
type: source
title: TypeScript Template Literal Types
path: raw/articles/official-docs/2026-08-06-typescript-template-literal-types.md
author: TypeScript Team
publisher: TypeScript
url: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
date_published:
date_added: 2026-08-06
tags: [typescript, type-system, template-literal-types, string-literal-types, generics, inference, api-design, performance]
status: active
quality: high
summary: The official TypeScript handbook explains how template literal types derive bounded string vocabularies, cross-multiply unions, infer source keys from patterned strings, preserve callback payload correlations, and use compiler intrinsics for casing transforms.
related: [typescript-template-literal-types, typescript-mapped-types, typescript-conditional-types, typescript-module-systems]
---

# TypeScript Template Literal Types

## Source Metadata

- Path: raw/articles/official-docs/2026-08-06-typescript-template-literal-types.md
- Author: TypeScript Team
- Publisher: TypeScript
- Published: Not stated on the handbook page
- Added: 2026-08-06
- URL: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
- Provenance: Captured through the repository ingest CLI from the canonical TypeScript handbook URL, then curated without changing `## Source Text`.

## TL;DR

Template literal types compose literal strings and unions into new compile-time string vocabularies. They can infer a source key from a patterned argument and use indexed access to correlate an event name with its callback payload. They are erased at runtime, union interpolation forms Cartesian products, large vocabularies should be generated ahead of time, and built-in casing transforms use non-locale-aware JavaScript string operations inside the compiler.

## Key Claims

- A template literal type uses JavaScript template-literal syntax in a type position to concatenate literal types.
- Interpolated unions expand to every possible resulting string; multiple union positions are cross-multiplied.
- The handbook recommends ahead-of-time generation rather than checker expansion for large string unions.
- A pattern such as `${string & keyof T}Changed` constrains event names to strings derived from properties of `T`.
- A generic method can infer `Key` from the substring before `Changed`, then use `T[Key]` to type the callback payload.
- `Uppercase`, `Lowercase`, `Capitalize`, and `Uncapitalize` are compiler-provided intrinsic string manipulation types rather than declarations in the standard `.d.ts` libraries.
- The documented intrinsic casing implementation delegates to JavaScript string methods and is not locale aware.

## Important Details

- A concrete interpolation produces one literal type, while each union interpolation multiplies the output vocabulary.
- The watched-object example improves an unsafe `on(eventName: string, callback: (newValue: any) => void)` API in two stages: first constraining event names, then preserving the key-to-payload relation.
- `Key extends string & keyof Type` deliberately restricts derivation to string keys; number and symbol keys are outside that event-name protocol.
- Template matching supports both validation and deconstruction: the checker captures the literal prefix corresponding to `Key` and reuses it for indexed access.
- Intrinsic case transforms are special-cased in the compiler for performance and cannot be located as ordinary declaration-file implementations.
- The page documents syntax and examples, not runtime event registration, dispatch, validation, declaration benchmarks, or editor-latency guarantees.

## Entities

- Organization: TypeScript Team, Microsoft
- Language: TypeScript
- Features: template literal types, string literal types, unions, generic inference, indexed access, `keyof`, intrinsic string manipulation types
- API example: `makeWatchedObject`, `PropEventSource`, patterned `*Changed` event names
- Runtime dependency of compiler intrinsics: JavaScript `toUpperCase`, `toLowerCase`, `charAt`, and `slice`

## My Notes

- **Type/API boundary:** template literal types are strongest when they derive a small, domain-owned protocol vocabulary such as event names, route tokens, cache keys, or discriminants while retaining a direct relation to source keys and payloads.
- **Runtime/type boundary:** the checker accepts or rejects string patterns, but emits no parser, validator, event registry, dispatcher, authorization check, or casing normalization. External strings still require runtime admission before they receive the derived type.
- **Package graph:** exported helpers are instantiated by downstream compilers through `.d.ts` files. The vocabulary owner should publish named, shallow aliases and test packed consumer imports across supported TypeScript versions.
- **Composition/lifecycle ownership:** a domain package owns source keys and naming semantics; a library may derive event names and callback types; runtime components own registration, duplicate policy, dispatch, cleanup, errors, and extension behavior.
- **Tests:** lock accepted names, rejected typos, key-to-payload inference, broad `string` fallbacks, non-string keys, union cross products, intrinsic casing, declaration imports, and runtime protocol behavior into separate type and value-level tests.
- **Performance:** union positions multiply rather than add. The handbook explicitly recommends ahead-of-time generation for large vocabularies but provides no numeric threshold, benchmark, or compiler-version guarantee.
- **Practical implication:** prefer one bounded derivation over duplicated string unions, but switch to generated artifacts or an explicit runtime schema when the vocabulary is large, externally supplied, locale-sensitive, independently extensible, or operationally meaningful.

## Open Questions

- At what vocabulary widths and nesting depths do current supported compilers show unacceptable cold-check, incremental, declaration-emit, or language-service cost in representative consumers?
- Should a public naming protocol reject number and symbol keys explicitly, stringify number keys at runtime, or expose a separate API for them?
- Which locale-sensitive identifiers must avoid `Uppercase` and related intrinsics because the documented compiler behavior is not locale aware?
- When should a package publish generated literal unions instead of making every consumer expand the template relation?

## Related

- [[typescript-template-literal-types]]
- [[typescript-mapped-types]]
- [[typescript-conditional-types]]
- [[typescript-structural-compatibility]]
- [[typescript-module-systems]]
- [[typescript-control-flow-narrowing]]
- [[internal-engineering-conventions]]

## Source Text

Template literal types build on string literal types, and have the ability to expand into many strings via unions.
They have the same syntax as template literal strings in JavaScript, but are used in type positions.
When used with concrete literal types, a template literal produces a new string literal type by concatenating the contents.
tstype World = "world";type Greeting = `hello ${World}`;        type Greeting = "hello world"Try
When a union is used in the interpolated position, the type is the set of every possible string literal that could be represented by each union member:
tstype EmailLocaleIDs = "welcome_email" | "email_heading";type FooterLocaleIDs = "footer_title" | "footer_sendoff";type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;          type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"Try
For each interpolated position in the template literal, the unions are cross multiplied:
tstype AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;type Lang = "en" | "ja" | "pt";type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;            type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"Try
We generally recommend that people use ahead-of-time generation for large string unions, but this is useful in smaller cases.
String Unions in Types
The power in template literals comes when defining a new string based on information inside a type.
Consider the case where a function (makeWatchedObject) adds a new function
called on() to a passed object.  In JavaScript, its call might look like:
makeWatchedObject(baseObject). We can imagine the base object as looking
like:
tsconst passedObject = {  firstName: "Saoirse",  lastName: "Ronan",  age: 26,};Try
The on function that will be added to the base object expects two arguments, an eventName (a string) and a callback (a function).
The eventName should be of the form attributeInThePassedObject + "Changed"; thus, firstNameChanged as derived from the attribute firstName in the base object.
The callback function, when called:

Should be passed a value of the type associated with the name attributeInThePassedObject; thus, since firstName is typed as string, the callback for the firstNameChanged event expects a string to be passed to it at call time. Similarly events associated with age should expect to be called with a number argument
Should have void return type (for simplicity of demonstration)

The naive function signature of on() might thus be: on(eventName: string, callback: (newValue: any) => void). However, in the preceding description, we identified important type constraints that we’d like to document in our code. Template Literal types let us bring these constraints into our code.
tsconst person = makeWatchedObject({  firstName: "Saoirse",  lastName: "Ronan",  age: 26,});// makeWatchedObject has added `on` to the anonymous Objectperson.on("firstNameChanged", (newValue) => {  console.log(`firstName was changed to ${newValue}!`);});Try
Notice that on listens on the event "firstNameChanged", not just "firstName". Our naive specification of on() could be made more robust if we were to ensure that the set of eligible event names was constrained by the union of attribute names in the watched object with “Changed” added at the end. While we are comfortable with doing such a calculation in JavaScript i.e. Object.keys(passedObject).map(x => `${x}Changed`), template literals inside the type system provide a similar approach to string manipulation:
tstype PropEventSource<Type> = {    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;};/// Create a "watched object" with an `on` method/// so that you can watch for changes to properties.declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;Try
With this, we can build something that errors when given the wrong property:
tsconst person = makeWatchedObject({  firstName: "Saoirse",  lastName: "Ronan",  age: 26});person.on("firstNameChanged", () => {});// Prevent easy human error (using the key instead of the event name)person.on("firstName", () => {});Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.2345Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.// It's typo-resistantperson.on("frstNameChanged", () => {});Argument of type '"frstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.2345Argument of type '"frstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.Try
Inference with Template Literals
Notice that we did not benefit from all the information provided in the original passed object. Given change of a firstName (i.e. a firstNameChanged event),  we should expect that the callback will receive an argument of type string. Similarly, the callback for a change to age should receive a number argument. We’re naively using any to type the callback’s argument. Again, template literal types make it possible to ensure an attribute’s data type will be the same type as that attribute’s callback’s first argument.
The key insight that makes this possible is this: we can use a function with a generic such that:

The literal used in the first argument is captured as a literal type
That literal type can be validated as being in the union of valid attributes in the generic
The type of the validated attribute can be looked up in the generic’s structure using Indexed Access
This typing information can then be applied to ensure the argument to the
callback function is of the same type

tstype PropEventSource<Type> = {    on<Key extends string & keyof Type>        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;};declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;const person = makeWatchedObject({  firstName: "Saoirse",  lastName: "Ronan",  age: 26});person.on("firstNameChanged", newName => {                                (parameter) newName: string    console.log(`new name is ${newName.toUpperCase()}`);});person.on("ageChanged", newAge => {                          (parameter) newAge: number    if (newAge < 0) {        console.warn("warning! negative age");    }})Try
Here we made on into a generic method.
When a user calls with the string "firstNameChanged", TypeScript will try to infer the right type for Key.
To do that, it will match Key against the content before "Changed" and infer the string "firstName".
Once TypeScript figures that out, the on method can fetch the type of firstName on the original object, which is string in this case.
Similarly, when called with "ageChanged", TypeScript finds the type for the property age which is number.
Inference can be combined in different ways, often to deconstruct strings, and reconstruct them in different ways.
Intrinsic String Manipulation Types
To help with string manipulation, TypeScript includes a set of types which can be used in string manipulation. These types come built-in to the compiler for performance and can’t be found in the .d.ts files included with TypeScript.
Uppercase<StringType>
Converts each character in the string to the uppercase version.
Example
tstype Greeting = "Hello, world"type ShoutyGreeting = Uppercase<Greeting>           type ShoutyGreeting = "HELLO, WORLD"type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`type MainID = ASCIICacheKey<"my_app">       type MainID = "ID-MY_APP"Try
Lowercase<StringType>
Converts each character in the string to the lowercase equivalent.
Example
tstype Greeting = "Hello, world"type QuietGreeting = Lowercase<Greeting>          type QuietGreeting = "hello, world"type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`type MainID = ASCIICacheKey<"MY_APP">       type MainID = "id-my_app"Try
Capitalize<StringType>
Converts the first character in the string to an uppercase equivalent.
Example
tstype LowercaseGreeting = "hello, world";type Greeting = Capitalize<LowercaseGreeting>;        type Greeting = "Hello, world"Try
Uncapitalize<StringType>
Converts the first character in the string to a lowercase equivalent.
Example
tstype UppercaseGreeting = "HELLO WORLD";type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;              type UncomfortableGreeting = "hELLO WORLD"Try

Technical details on the intrinsic string manipulation types
    The code, as of TypeScript 4.1, for these intrinsic functions uses the JavaScript string runtime functions directly for manipulation and are not locale aware.

function applyStringMapping(symbol: Symbol, str: string) {
    switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
        case IntrinsicTypeKind.Uppercase: return str.toUpperCase();
        case IntrinsicTypeKind.Lowercase: return str.toLowerCase();
        case IntrinsicTypeKind.Capitalize: return str.charAt(0).toUpperCase() + str.slice(1);
        case IntrinsicTypeKind.Uncapitalize: return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
}
