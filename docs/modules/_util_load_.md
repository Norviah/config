**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/load"

# Module: "util/load"

## Index

### Functions

* [load](_util_load_.md#load)

## Functions

### load

▸ **load**\<T>(`typings`: [Typings](_types_typings_.md#typings)\<T>, `options?`: [Options](../interfaces/_types_options_.options.md)\<T>): T

*Defined in [src/util/load.ts:26](https://github.com/Norviah/config/blob/8642475/src/util/load.ts#L26)*

Imports and returns the config file as an instance of the given inteface.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | Record\<string, any> |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`typings` | [Typings](_types_typings_.md#typings)\<T> | An object referencing desired types for each key in T. |
`options?` | [Options](../interfaces/_types_options_.options.md)\<T> | Optional options. |

**Returns:** T

An instance of T.
