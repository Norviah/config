**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/example"

# Module: "util/example"

## Index

### Functions

* [example](_util_example_.md#example)
* [value](_util_example_.md#value)

## Functions

### example

▸ **example**\<T>(`typings`: {}): Record\<string, any>

*Defined in [src/util/example.ts:46](https://github.com/norviah/config/blob/641e50d/src/util/example.ts#L46)*

If a config doesn't exist, this function is used to create an example using
the typings object that reference the interface.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`typings` | {} | The typing object to create an example from. |

**Returns:** Record\<string, any>

An example config for the interface.

___

### value

▸ **value**\<T>(`typings`: {}, `key`: keyof T): undefined \| string \| string[]

*Defined in [src/util/example.ts:13](https://github.com/norviah/config/blob/641e50d/src/util/example.ts#L13)*

Generates a value representing the type for the given key to use within an
example object with the given generic type T as a base. This function
essentially returns the type itself, unless if it's either undefined or a
type consisting of only arrays, which it then returns an array.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`typings` | {} | The typing object which represents types for each key. |
`key` | keyof T | The key to generate an example for. |

**Returns:** undefined \| string \| string[]

The value for the key.
