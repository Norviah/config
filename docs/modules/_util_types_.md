**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/types"

# Module: "util/types"

## Index

### Functions

* [check](_util_types_.md#check)

### Object literals

* [types](_util_types_.md#types)

## Functions

### check

▸ **check**(`element`: any, `type`: [Types](_types_types_.md#types) \| [Types](_types_types_.md#types)[]): boolean

*Defined in [src/util/types.ts:64](https://github.com/norviah/config/blob/641e50d/src/util/types.ts#L64)*

Determines if the given element is any of the desired types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`element` | any | The element to check. |
`type` | [Types](_types_types_.md#types) \| [Types](_types_types_.md#types)[] | - |

**Returns:** boolean

Determines if the element's type exists within the list.

## Object literals

### types

▪ `Const` **types**: object

*Defined in [src/util/types.ts:8](https://github.com/norviah/config/blob/641e50d/src/util/types.ts#L8)*

As this project uses a config object to set values, and TypeScript doesn't
determine typings at run time, we'll be using this set to determine if a
given element is a certain type.

#### Properties:

Name | Type | Value | Description |
------ | ------ | ------ | ------ |
`array<boolean>` | function | (element: any) => boolean | type: array<boolean> Determines if the given element is an array containing only booleans. |
`array<number>` | function | (element: any) => boolean | type: array<number> Determines if the given element is an array containing only numbers. |
`array<string>` | function | (element: any) => boolean | type: array<string> Determines if the given element is an array containing only strings. |
`boolean` | function | (element: any) => boolean | type: boolean Determines if the given element is a boolean. |
`number` | function | (element: any) => boolean | type: number Determines if the given element is a number. |
`string` | function | (element: any) => boolean | type: string Determines if the given element is a string. |
`undefined` | function | (element: any) => boolean | type: undefined Determines if the given element is undefined. |
