**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["types/result"](../modules/_types_result_.md) / Result

# Interface: Result\<T>

Represents the result of when a config has incorrect values set.

## Type parameters

Name | Type |
------ | ------ |
`T` | Record\<string, any> |

## Hierarchy

* **Result**

## Index

### Properties

* [key](_types_result_.result.md#key)
* [type](_types_result_.result.md#type)
* [value](_types_result_.result.md#value)

## Properties

### key

•  **key**: (keyof T \| keyof T[any])[]

*Defined in [src/types/result.ts:10](https://github.com/Norviah/config/blob/37a46e1/src/types/result.ts#L10)*

The key that had the incorrect value.

___

### type

•  **type**: [Types](../modules/_types_types_.md#types) \| [Types](../modules/_types_types_.md#types)[]

*Defined in [src/types/result.ts:20](https://github.com/Norviah/config/blob/37a46e1/src/types/result.ts#L20)*

The correct type for the key.

___

### value

•  **value**: any

*Defined in [src/types/result.ts:15](https://github.com/Norviah/config/blob/37a46e1/src/types/result.ts#L15)*

The incorrect value that was set to the key.
