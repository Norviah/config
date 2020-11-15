**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/load"

# Module: "util/load"

## Index

### Functions

* [load](_util_load_.md#load)

## Functions

### load

▸ **load**\<T>(`typings`: {}, `options?`: [Options](../interfaces/_types_options_.options.md)\<T>): T

*Defined in [src/util/load.ts:27](https://github.com/norviah/config/blob/4c1b602/src/util/load.ts#L27)*

Imports and returns the config file as an object based off of the given interface.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`typings` | {} | An object referencing each key within the desired interface, the value of each key should represent the desired value of the key.s |
`options?` | [Options](../interfaces/_types_options_.options.md)\<T> | Optional options. |

**Returns:** T

The config file saved to disk as an instance of the given interface.
