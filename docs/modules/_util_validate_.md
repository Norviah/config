**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/validate"

# Module: "util/validate"

## Index

### Functions

* [validate](_util_validate_.md#validate)

### Object literals

* [checks](_util_validate_.md#checks)

## Functions

### validate

▸ **validate**(`element`: any, `type`: [Strings](_types_typescript_strings_.md#strings)\<[Types](_types_types_.md#types)> \| [Strings](_types_typescript_strings_.md#strings)\<[Types](_types_types_.md#types)>[]): boolean

*Defined in [src/util/validate.ts:65](https://github.com/Norviah/config/blob/54727f7/src/util/validate.ts#L65)*

Determines if the given element is the desired type.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`element` | any | The element to check. |
`type` | [Strings](_types_typescript_strings_.md#strings)\<[Types](_types_types_.md#types)> \| [Strings](_types_typescript_strings_.md#strings)\<[Types](_types_types_.md#types)>[] | The type(s) to check for the given element. |

**Returns:** boolean

Represents if the given element is the desired type.

## Object literals

### checks

▪ `Const` **checks**: object

*Defined in [src/util/validate.ts:9](https://github.com/Norviah/config/blob/54727f7/src/util/validate.ts#L9)*

As this project uses a config object to set values, and TypeScript doesn't
determine typings at run time, we'll be using an object to determine if a
given element is a certain type.

#### Properties:

Name | Type | Value | Description |
------ | ------ | ------ | ------ |
`boolean` | function | (element: any) => boolean | type: boolean Determines if the given element is a boolean. |
`boolean[]` | function | (element: any) => boolean | type: boolean[] Determines if the given element is an array containing only booleans. |
`number` | function | (element: any) => boolean | type: number Determines if the given element is a number. |
`number[]` | function | (element: any) => boolean | type: number[] Determines if the given element is an array containing only numbers. |
`string` | function | (element: any) => boolean | type: string Determines if the given element is a string. |
`string[]` | function | (element: any) => boolean | type: string[] Determines if the given element is an array containing only strings. |
`undefined` | function | (element: any) => boolean | type: undefined Determines if the given element is undefined. |
