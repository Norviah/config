[@norviah/config](../README.md) / [Modules](../modules.md) / util/read

# Module: util/read

## Table of contents

### Functions

- [read](util_read.md#read)

## Functions

### read

▸ **read**(`path`): `JsonObject` \| `never`

Loads and imports a JSON file into an object.

`read` takes a file path and attempts to import the file as a JSON object,
performing a series of checks to ensure the file is a valid JSON file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The file path to the JSON file. |

#### Returns

`JsonObject` \| `never`

The JSON object imported from the file.

#### Defined in

[src/util/read.ts:15](https://github.com/norviah/config/blob/a09ff28/src/util/read.ts#L15)
