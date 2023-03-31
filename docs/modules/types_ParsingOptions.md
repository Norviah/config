[@norviah/config](../README.md) / [Modules](../modules.md) / types/ParsingOptions

# Module: types/ParsingOptions

## Table of contents

### Interfaces

- [BaseParsingOptions](../interfaces/types_ParsingOptions.BaseParsingOptions.md)

### Type Aliases

- [ParsingOptions](types_ParsingOptions.md#parsingoptions)

## Type Aliases

### ParsingOptions

Ƭ **ParsingOptions**<`T`, `E`\>: `E` extends `undefined` ? [`BaseParsingOptions`](../interfaces/types_ParsingOptions.BaseParsingOptions.md)<`T`\> & { `enforce?`: `undefined`  } : [`BaseParsingOptions`](../interfaces/types_ParsingOptions.BaseParsingOptions.md)<`T`\> & { `enforce`: `E`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |
| `E` | extends `boolean` \| `undefined` = `undefined` |

#### Defined in

[src/types/ParsingOptions.ts:28](https://github.com/norviah/config/blob/069aa2f/src/types/ParsingOptions.ts#L28)
