**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "types/typings"

# Module: "types/typings"

## Index

### Type aliases

* [Objects](_types_typings_.md#objects)
* [Typings](_types_typings_.md#typings)
* [Values](_types_typings_.md#values)

## Type aliases

### Objects

Ƭ  **Objects**: \"undefined\" \| \"object\<string>\" \| \"object\<number>\" \| \"object\<boolean>\" \| (\"undefined\" \| \"object\<string>\" \| \"object\<number>\" \| \"object\<boolean>\")[]

*Defined in [src/types/typings.ts:5](https://github.com/Norviah/config/blob/8642475/src/types/typings.ts#L5)*

___

### Typings

Ƭ  **Typings**\<T>: {}

*Defined in [src/types/typings.ts:11](https://github.com/Norviah/config/blob/8642475/src/types/typings.ts#L11)*

As TypeScript only exists within compile time, we'll need a type to reference
desired types of a given interface within runtime.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | Record\<string, any> |

___

### Values

Ƭ  **Values**: [Strings](_types_typescript_strings_.md#strings)\<[Types](_types_types_.md#types)> \| [Strings](_types_typescript_strings_.md#strings)\<[Types](_types_types_.md#types)>[]

*Defined in [src/types/typings.ts:4](https://github.com/Norviah/config/blob/8642475/src/types/typings.ts#L4)*
