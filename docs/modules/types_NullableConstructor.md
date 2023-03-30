[@norviah/config](../README.md) / [Modules](../modules.md) / types/NullableConstructor

# Module: types/NullableConstructor

## Table of contents

### Type Aliases

- [NullableConstructor](types_NullableConstructor.md#nullableconstructor)

## Type Aliases

### NullableConstructor

Ƭ **NullableConstructor**<`T`\>: (`input`: `JsonValue`) => `T` \| ``null`` \| `undefined`

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The desired type to construct. |

#### Type declaration

▸ (`input`): `T` \| ``null`` \| `undefined`

Represents a constructor function that will create an instance of the
specified type `T`.

`NullableConstructor<T>` is used to represent a valid custom constructor for
keys, the constructor enforces that the value is a valid function that can
resolve to either the desired type or `null` or `undefined`.

This type is referenced to allow for custom constructors to be used for
keys, returning the desired type if the value can be parsed, or `null` if
the value cannot be parsed.

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `JsonValue` |

##### Returns

`T` \| ``null`` \| `undefined`

#### Defined in

[src/types/NullableConstructor.ts:16](https://github.com/norviah/config/blob/a09ff28/src/types/NullableConstructor.ts#L16)
