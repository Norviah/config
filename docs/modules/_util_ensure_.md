**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/ensure"

# Module: "util/ensure"

## Index

### Functions

* [ensure](_util_ensure_.md#ensure)

## Functions

### ensure

▸ **ensure**\<T>(`object`: Record\<keyof T, any>, `typings`: [Typings](_types_typings_.md#typings)\<T>, `prop?`: keyof T[]): [Result](../interfaces/_types_result_.result.md)\<T> \| [Result](../interfaces/_types_result_.result.md)\<T[any]> \| undefined

*Defined in [src/util/ensure.ts:18](https://github.com/Norviah/config/blob/8642475/src/util/ensure.ts#L18)*

Recursivelies determines if every property within the given object suffices
to the desired types determined by the typings object.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | Record\<string, any> |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`object` | Record\<keyof T, any> | The object to ensure. |
`typings` | [Typings](_types_typings_.md#typings)\<T> | References the desired type for each property in the object. |
`prop?` | keyof T[] | Represents the current property this method is working on. |

**Returns:** [Result](../interfaces/_types_result_.result.md)\<T> \| [Result](../interfaces/_types_result_.result.md)\<T[any]> \| undefined

If a property within the object isn't the correct type, an
                object referencing the: key, value, and desired type is
                returned, otherwise, undefined if all keys are properly set.
