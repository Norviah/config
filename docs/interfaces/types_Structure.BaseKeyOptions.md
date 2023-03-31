[@norviah/config](../README.md) / [Modules](../modules.md) / [types/Structure](../modules/types_Structure.md) / BaseKeyOptions

# Interface: BaseKeyOptions<T\>

[types/Structure](../modules/types_Structure.md).BaseKeyOptions

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [default](types_Structure.BaseKeyOptions.md#default)
- [optional](types_Structure.BaseKeyOptions.md#optional)
- [type](types_Structure.BaseKeyOptions.md#type)
- [typeName](types_Structure.BaseKeyOptions.md#typename)

## Properties

### default

• `Optional` **default**: `T`

The default value of the key.

If the key is not present within the JSON value, this default value will be
referenced as the value of the key.

#### Defined in

[src/types/Structure.ts:51](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L51)

___

### optional

• `Optional` **optional**: `undefined` extends `T` ? ``true`` : ``false``

Determines if the key is optional.

If `true`, the key is treated as optional and the program will not throw an
error if the key is not present within the JSON file.

The type of `optional` is constrained, dependent whether if the provided
type extends `undefined`, preventing the user from setting this property to
any boolean value.

#### Defined in

[src/types/Structure.ts:63](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L63)

___

### type

• **type**: [`NullableConstructor`](../modules/types_NullableConstructor.md#nullableconstructor)<`T`\> \| [`ToString`](../modules/types_Primitive.md#tostring)<`T`\> \| [`ToString`](../modules/types_Primitive.md#tostring)<`T`\>[]

The constructor for the key.

`type` represents how the parser should parse the value assigned to an
instance of `T`, the value being the assigned value of the key within the
JSON file. You can either pass a constructor function or, if `T` is a
primitive type, you can pass a string that will represent the desired
`typeof` value of the key.

When using a constructor function, the function will be passed the value
of the key, which should be expected to be any valid JSON value. The
function should then return an instance of `T`, it is up to the function
to implement the logic of determining if the value is valid or not,
returning `null` if the value is invalid.

The issue when using a constructor function is that when you define a key
to be a primitive type, such as `string` or `number`, the function will
only check the `typeof` value for the key, which can be tedious if you
have multiple keys that are primitive types. Instead, you can opt to pass
in strings, which will represent the desired `typeof` value of the key.
Valid options for strings are:
- `'string'`
- `'number'`
- `'boolean'`
- `'null'`

Of course, if using a string, the specified string will be constrained to
what string represents `T`.

#### Defined in

[src/types/Structure.ts:34](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L34)

___

### typeName

• `Optional` **typeName**: `string`

The string representation of the desired type(s) of the key.

This property is used to generate a more descriptive error message when
referencing the desired type(s) of the key. If this property is not set,
the strings are inferred from the `type` property.

#### Defined in

[src/types/Structure.ts:43](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L43)
