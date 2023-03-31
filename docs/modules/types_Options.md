[@norviah/config](../README.md) / [Modules](../modules.md) / types/Options

# Module: types/Options

## Table of contents

### Interfaces

- [BaseOptions](../interfaces/types_Options.BaseOptions.md)

### Type Aliases

- [Options](types_Options.md#options)

## Type Aliases

### Options

Ƭ **Options**<`E`\>: `E` extends `undefined` ? [`BaseOptions`](../interfaces/types_Options.BaseOptions.md) & { `enforce?`: `undefined`  } : [`BaseOptions`](../interfaces/types_Options.BaseOptions.md) & { `enforce`: `E`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `boolean` \| `undefined` = `undefined` |

#### Defined in

[src/types/Options.ts:15](https://github.com/norviah/config/blob/069aa2f/src/types/Options.ts#L15)
