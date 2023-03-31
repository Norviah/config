[@norviah/config](../README.md) / [Modules](../modules.md) / types/Structure

# Module: types/Structure

## Table of contents

### Interfaces

- [BaseKeyOptions](../interfaces/types_Structure.BaseKeyOptions.md)

### Type Aliases

- [KeyOptionalOptions](types_Structure.md#keyoptionaloptions)
- [KeyOptions](types_Structure.md#keyoptions)
- [Structure](types_Structure.md#structure)

## Type Aliases

### KeyOptionalOptions

Ƭ **KeyOptionalOptions**<`T`\>: `undefined` extends `T` ? `Pick`<`Required`<[`BaseKeyOptions`](../interfaces/types_Structure.BaseKeyOptions.md)<`T`\>\>, ``"optional"``\> : `unknown`

Enforces the `optional` property if `T` extends `undefined`.

In the case where the generic type `T` is `undefined`, the `optional`
property is only allowed to be set to `true`, however, the property itself is
not forced to be set. The interface essentially looks like this:
```ts
interface Options {
  optional?: true;
}
```

`KeyOptionalOptions` is used to enforce the `optional` property to be set to
`true` if the generic type `T` extends `undefined`.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the key. |

#### Defined in

[src/types/Structure.ts:82](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L82)

___

### KeyOptions

Ƭ **KeyOptions**<`T`\>: [`BaseKeyOptions`](../interfaces/types_Structure.BaseKeyOptions.md)<`T`\> & [`KeyOptionalOptions`](types_Structure.md#keyoptionaloptions)<`T`\>

Represents options for a key.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of the key. |

#### Defined in

[src/types/Structure.ts:90](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L90)

___

### Structure

Ƭ **Structure**<`T`\>: { [K in keyof T]-?: NonNullable<T[K]\> extends Record<string, T[K][keyof T]\> ? Structure<NonNullable<T[K]\>\> : undefined extends T[K] ? KeyOptions<T[K]\> : KeyOptions<T[K]\> \| KeyOptions<T[K]\>["type"] }

The configuration object.

`Config` represents the configuration object of the JSON file, defining the
desired structure for each key within the JSON file. When defining the
provided interface, only mark the keys as optional if you want the key to be
optional, optional sub-objects will be ignored and treated as required.

Note that the desired interface for the configuration object can be
infinitely deep, however of course the JSON file must reflect the same
structure.

**`Example`**

```ts

```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The interface that represents the config file to import. |

#### Defined in

[src/types/Structure.ts:106](https://github.com/norviah/config/blob/069aa2f/src/types/Structure.ts#L106)
