---
id: 2026-08-05-typescript-mapped-types
type: source
title: TypeScript Mapped Types
path: raw/articles/official-docs/2026-08-05-typescript-mapped-types.md
author: TypeScript Team
publisher: TypeScript
url: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
date_published:
date_added: 2026-08-05
tags: [typescript, type-system, mapped-types, generics, keyof, key-remapping, api-design]
status: active
quality: high
summary: The official TypeScript handbook explains how mapped types transform property sets, add or remove property modifiers, remap and filter keys, and compose with conditional and template-literal types.
related: [typescript-mapped-types, typescript-conditional-types, typescript-structural-compatibility, typescript-module-systems]
---

# TypeScript Mapped Types

## Source Metadata

- Path: raw/articles/official-docs/2026-08-05-typescript-mapped-types.md
- Author: TypeScript Team
- Publisher: TypeScript
- Published: Not stated on the handbook page
- Added: 2026-08-05
- URL: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
- Provenance: Captured through the repository ingest CLI from the canonical TypeScript handbook URL, then curated without changing `## Source Text`.

## TL;DR

Mapped types derive object-like types by iterating over a key union, usually `keyof T`. They can preserve or alter value types, add or remove `readonly` and optional modifiers, rename or remove keys through an `as` clause, and map discriminated-union members into keyed handler tables. These transformations are compile-time declarations, not runtime object conversions or validation.

## Key Claims

- A mapped type is a generic type that iterates over a union of `PropertyKey` values to construct properties.
- `keyof` commonly supplies the key union, while indexed access such as `T[K]` preserves the relation between each property key and its value.
- Mapping modifiers can add or remove `readonly` and `?`; an omitted prefix means `+`.
- TypeScript 4.1 and later can remap keys with `as`, including template-literal-derived names.
- Mapping a key to `never` filters that key from the output.
- The iterated union need not contain only primitive keys: a discriminated union can be remapped by each member's discriminator into a handler table whose callback retains the member type.
- Conditional types can classify each property value independently inside a mapped type.

## Important Details

- `OptionsFlags<T>` demonstrates a shape-preserving value transform: each key of `T` becomes a `boolean` property.
- `CreateMutable<T>` removes `readonly`; `Concrete<T>` removes optionality. These alter the static contract but do not mutate an existing runtime object.
- `Getters<T>` combines key remapping, template literal types, and `Capitalize` to derive getter names while retaining each source property's value type.
- `RemoveKindField<T>` filters a key by remapping it to `never`.
- `EventConfig<E>` maps a union of `{ kind: string }` variants into a record keyed by each literal `kind`, retaining variant-specific handler parameters.
- The chapter closes with `ExtractPII<T>`, which combines property iteration and conditional classification; it demonstrates composition rather than runtime data-deletion logic.

## Entities

- Organization: TypeScript Team, Microsoft
- Language: TypeScript
- Features: mapped types, index signatures, `keyof`, indexed access types, mapping modifiers, key remapping, template literal types, conditional types, discriminated unions, `never`
- Version marker: key remapping via `as` is documented as available in TypeScript 4.1 and later

## My Notes

- **Type/API boundary:** mapped types are best for named, bounded relations over an owned property vocabulary. Public helpers should communicate whether they preserve keys, modifiers, and correlations or intentionally rename/filter them.
- **Runtime/type boundary:** the output exists only to the checker. `CreateMutable<T>` does not unfreeze an object, `Concrete<T>` does not fill missing values, and a generated handler type does not register callbacks or validate events.
- **Package graph:** exported mapped helpers execute in downstream compilers through `.d.ts` files. Package owners should test emitted declarations and supported compiler versions through public exports, not only local source aliases.
- **Composition/lifecycle ownership:** the domain owner should own key/discriminator vocabularies; a library may derive views and registries; runtime code still owns registration, dispatch, authorization, cleanup, and behavior for missing or extra keys.
- **Tests:** include positive and negative type fixtures for key preservation, modifier changes, filtering, collisions, union members, symbol/number keys, and public package imports; pair these with runtime tests for any implementation said to realize the transform.
- **Performance:** mapped types are erased at runtime, but broad key unions, template-literal cross products, and nested mapped/conditional types can increase checker, declaration, diagnostic, and language-service work. The handbook supplies no benchmark or threshold.
- **Practical implication:** derive repetitive projections from one domain-owned source type, but do not use a clever mapped alias to hide materially different semantics or make downstream diagnostics unreadable.

## Open Questions

- How do current compiler versions scale across nested mapped/conditional types and large template-literal key spaces in representative downstream packages?
- Which key-collision behaviors in remapped public types need explicit fixtures for the package's supported compiler matrix?
- When should a generated runtime schema or code generator replace an erased mapped type so the runtime and type-level transformations share one source of truth?

## Related

- [[typescript-mapped-types]]
- [[typescript-conditional-types]]
- [[typescript-structural-compatibility]]
- [[typescript-module-systems]]
- [[typescript-control-flow-narrowing]]
- [[internal-engineering-conventions]]

## Source Text

When you don’t want to repeat yourself, sometimes a type needs to be based on another type.
Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time:
tstype OnlyBoolsAndHorses = {  [key: string]: boolean | Horse;};const conforms: OnlyBoolsAndHorses = {  del: true,  rodney: false,};Try
A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a keyof) to iterate through keys to create a type:
tstype OptionsFlags<Type> = {  [Property in keyof Type]: boolean;};Try
In this example, OptionsFlags will take all the properties from the type Type and change their values to be a boolean.
tstype Features = {  darkMode: () => void;  newUserProfile: () => void;};type FeatureOptions = OptionsFlags<Features>;           type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
}Try
Mapping Modifiers
There are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionality respectively.
You can remove or add these modifiers by prefixing with - or +. If you don’t add a prefix, then + is assumed.
ts// Removes 'readonly' attributes from a type's propertiestype CreateMutable<Type> = {  -readonly [Property in keyof Type]: Type[Property];};type LockedAccount = {  readonly id: string;  readonly name: string;};type UnlockedAccount = CreateMutable<LockedAccount>;           type UnlockedAccount = {
    id: string;
    name: string;
}Try
ts// Removes 'optional' attributes from a type's propertiestype Concrete<Type> = {  [Property in keyof Type]-?: Type[Property];};type MaybeUser = {  id: string;  name?: string;  age?: number;};type User = Concrete<MaybeUser>;      type User = {
    id: string;
    name: string;
    age: number;
}Try
Key Remapping via as
In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:
tstype MappedTypeWithNewProperties<Type> = {    [Properties in keyof Type as NewKeyType]: Type[Properties]}
You can leverage features like template literal types to create new property names from prior ones:
tstype Getters<Type> = {    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]};interface Person {    name: string;    age: number;    location: string;}type LazyPerson = Getters<Person>;         type LazyPerson = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}Try
You can filter out keys by producing never via a conditional type:
ts// Remove the 'kind' propertytype RemoveKindField<Type> = {    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]};interface Circle {    kind: "circle";    radius: number;}type KindlessCircle = RemoveKindField<Circle>;           type KindlessCircle = {
    radius: number;
}Try
You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:
tstype EventConfig<Events extends { kind: string }> = {    [E in Events as E["kind"]]: (event: E) => void;}type SquareEvent = { kind: "square", x: number, y: number };type CircleEvent = { kind: "circle", radius: number };type Config = EventConfig<SquareEvent | CircleEvent>       type Config = {
    square: (event: SquareEvent) => void;
    circle: (event: CircleEvent) => void;
}Try
Further Exploration
Mapped types work well with other features in this type manipulation section, for example here is a mapped type using a conditional type which returns either a true or false depending on whether an object has the property pii set to the literal true:
tstype ExtractPII<Type> = {  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;};type DBFields = {  id: { format: "incrementing" };  name: { type: string; pii: true };};type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;                 type ObjectsNeedingGDPRDeletion = {
    id: false;
    name: true;
}Try
