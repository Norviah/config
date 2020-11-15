**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/json"

# Module: "util/json"

## Index

### Functions

* [json](_util_json_.md#json)

## Functions

### json

▸ **json**\<T>(`path`: string): T \| null

*Defined in [src/util/json.ts:8](https://github.com/norviah/config/blob/641e50d/src/util/json.ts#L8)*

Imports the given JSON path as an object.

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | The path to import. |

**Returns:** T \| null

The given path as an object, or null if it doesn't exist.
