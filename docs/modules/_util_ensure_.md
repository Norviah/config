**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/ensure"

# Module: "util/ensure"

## Index

### Functions

* [ensure](_util_ensure_.md#ensure)

## Functions

### ensure

▸ **ensure**\<T>(`object`: T, `typings`: {}): [keyof T, any] \| null

*Defined in [src/util/ensure.ts:13](https://github.com/norviah/config/blob/641e50d/src/util/ensure.ts#L13)*

When JSON is imported as an object via a require import, it simply imports
that object as it is. The goal of this function is to ensure that the
imported object has the correct type for each key using the typings object
which is based off of an interface that can be used at runtime.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | T | The imported JSON object to check. |
`typings` | {} | The object which states each desired key and types. |

**Returns:** [keyof T, any] \| null

Either null to represent that types are valid, or a tuple to represent the key that has been set to an incorrect value.
