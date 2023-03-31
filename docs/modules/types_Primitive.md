[@norviah/config](../README.md) / [Modules](../modules.md) / types/Primitive

# Module: types/Primitive

## Table of contents

### Type Aliases

- [Primitive](types_Primitive.md#primitive)
- [ToString](types_Primitive.md#tostring)
- [TypeMappings](types_Primitive.md#typemappings)

## Type Aliases

### Primitive

Ƭ **Primitive**: keyof [`TypeMappings`](types_Primitive.md#typemappings)

Represents primitive types that can be used to represent a key.

#### Defined in

[src/types/Primitive.ts:27](https://github.com/norviah/config/blob/069aa2f/src/types/Primitive.ts#L27)

___

### ToString

Ƭ **ToString**<`T`\>: `ValueOf`<{ [K in Primitive]: TypeMappings[K] extends T ? K : never }\>

Converts a type to its corresponding `typeof` value.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type to convert. |

#### Defined in

[src/types/Primitive.ts:33](https://github.com/norviah/config/blob/069aa2f/src/types/Primitive.ts#L33)

___

### TypeMappings

Ƭ **TypeMappings**: `Object`

Represents the supported `typeof` strings and their corresponding types.

`TypeMappings` acts as a lookup table for supported strings that can be used
as an alternative to providing a constructor function for a key when defining
options for a structure.

In JavaScript, primitive types refer to basic data types that are not objects
and do not have any methods or properties. There are 6 primitive types:
  - `Boolean`
  - `Null`
  - `undefined`
  - `Number`
  - `String`
  - `Symbol`

Since we are working with JSON, we only need to provide support for types can
be represented in JSON.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `boolean` | `boolean` |
| `null` | ``null`` |
| `number` | `number` |
| `string` | `string` |

#### Defined in

[src/types/Primitive.ts:22](https://github.com/norviah/config/blob/069aa2f/src/types/Primitive.ts#L22)
