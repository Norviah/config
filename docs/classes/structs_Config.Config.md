[@norviah/config](../README.md) / [Modules](../modules.md) / [structs/Config](../modules/structs_Config.md) / Config

# Class: Config

[structs/Config](../modules/structs_Config.md).Config

## Table of contents

### Constructors

- [constructor](structs_Config.Config.md#constructor)

### Methods

- [Cast](structs_Config.Config.md#cast)
- [Ensure](structs_Config.Config.md#ensure)
- [Import](structs_Config.Config.md#import)
- [IsKeyOptions](structs_Config.Config.md#iskeyoptions)
- [Parse](structs_Config.Config.md#parse)

## Constructors

### constructor

• **new Config**()

## Methods

### Cast

▸ `Static` **Cast**<`T`\>(`pair`, `options`): `T`

Casts the value into the specified type.

Attempts to cast the provided JSON value into the desired type by using the
information provided in options. `options` represents important information
about the key, we will use this information to determine how to parse the
value.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pair` | [`string`[], `JsonValue`] | The key and value to cast. |
| `options` | [`KeyOptions`](../modules/types_Structure.md#keyoptions)<`T`\> | The options for the key. |

#### Returns

`T`

An object representing the result of the cast.

#### Defined in

[src/structs/Config.ts:92](https://github.com/norviah/config/blob/a09ff28/src/structs/Config.ts#L92)

___

### Ensure

▸ `Static` **Ensure**<`T`\>(`value`, `type`): value is TypeMappings[T]

Ensures that the provided value is an instance of the specified type.

`Ensure` is a type guard that ensures the provided value is an instance of
the specified type, implementing an `instanceof` check to ensure this. As
the method is a type guard, it will inform TypeScript, allowing for
type-safety when accessing the value.

**`Example`**

```ts
const variable: unknown = 'sample text';

if (Parser.Ensure(variable, ['string'])) {
  /* in this scope, `variable` is ensured to be of type `string` */
}
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`TypeMappings`](../modules/types_Primitive.md#typemappings) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to check. |
| `type` | `T`[] | The type to check against. |

#### Returns

value is TypeMappings[T]

Whether the value is an instance of the specified type.

#### Defined in

[src/structs/Config.ts:77](https://github.com/norviah/config/blob/a09ff28/src/structs/Config.ts#L77)

___

### Import

▸ `Static` **Import**<`T`, `E`\>(`structure`, `options`): `E` extends ``true`` ? `T` : `T` & `Record`<`string`, `any`\>

Imports a JSON object from a file and parses it into an instance of `T`.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The desired type to parse the JSON object into. |
| `E` | extends `undefined` \| `boolean` = `undefined` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `structure` | [`Structure`](../modules/types_Structure.md#structure)<`T`\> | Defines the structure for each key in the JSON object. |
| `options` | [`Options`](../modules/types_Options.md#options)<`E`\> | Options for the loader. |

#### Returns

`E` extends ``true`` ? `T` : `T` & `Record`<`string`, `any`\>

An instance of `T` with the values from the JSON object.
As a basic example, let's say we want to define a configuration object for
a Discord bot. The config will have two keys, `token` and `prefix`, both of
which are the primitive type, `string`.

Here's how we can implement this:
```ts
import { load } from '@norviah/config';
import type { JsonValue } from 'type-fest';

interface Config {
  token: string;
  prefix: string;
}

const config: Config = load<Config>(
  {
    token: {
      type: function (value: JsonValue): string | null {
        return typeof value === 'string' ? value : null;
      }
    },

    prefix: {
      type: function (value: JsonValue): string | null {
        return typeof value === 'string' ? value : null;
      }
    }
  },
  { path: "./config.json" }
);

console.log(config);
```

This example implements a custom constructor function for the two keys, the
functions ensures that the value set for the key is a string.

As you can see, if you have multiple keys that are a primitive type, it can
be tedious to implement a constructor for each key. Instead, you can opt to
use a string to represent the value of the key. Here's how we can do that:

```ts
const config: Config = load<Config>(
  {
    token: {
      type: "string",
    },

    prefix: {
      type: "string",
    }
  },
  { path: "./config.json" }
);
```

This is equivalent to the previous example, but it's much more consise.
Strings are used to *only* represent primitive types, so if you want to
represent anything else, you must use a constructor.

These examples are rather simple, the main benefit of `type` comes from
defining keys with complex types. As constructors are manually defined, you
can implement any logic you want to form the value of the key.

For example, let's say we want to define a configuraiton object for a
command-line application that will generate and build *something* based off
of an input file. The config will have two keys, `input` and `output`, with
`input` being a custom type. Here's how we can implement this:

```ts
import { existsSync, statSync } from 'fs';
import { baseName } from 'path';
import { load } from '@norviah/config';

import type { Stats } from 'fs';
import type { JsonValue } from 'type-fest';

interface File {
  path: string;
  fullName: string;
  info: Stats;
}

interface Config {
  input: File;
  output: string;
}

const config: Config = load<Config>(
  {
    input: {
      type: function (value: JsonValue): File | null {
        if (typeof value !== 'string') {
          return null;
        } else if (!existsSync(value) || !statSync(value).isDirectory() ) {
          return null;
        }

        return { path: value, fullName: baseName(value), info: statSync(value) };
      }
    }.

    output: {
      type: 'string',
    }
  },
  { path: './config.json' },
);
```

In this example, we are using a custom constructor to parse the value of
the `input` key into the custom `File` type, the constructor ensures that
the file exists and is a directory.

Note how the constructor function is used to parse a JSON value into a
non-native JavaScript type. This is the main benefit of using a constructor
function, and it is also why it is recommended to use a custom constructor
than a built-in constructor, such as `String` or `Number`.

#### Defined in

[src/structs/Config.ts:412](https://github.com/norviah/config/blob/a09ff28/src/structs/Config.ts#L412)

___

### IsKeyOptions

▸ `Static` `Private` **IsKeyOptions**<`T`\>(`value`): value is KeyOptions<T[keyof T]\>

Ensures that the provided key, provided from a `Structure` instance,
represents options for the key.

When parsing a JSON object using the `Parse` method, we iterate through the
structure object along with the JSON object itself. The issue is, at
runtime, we're not sure whether if a key within the structure object
represents either a sub-structure or options for the key.

`IsKeyOptions` is a helper method to ensure that an extract key from a
`Structure` instance is an instance of `KeyOptions`, rather than a
`Structure`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`KeyOptions`](../modules/types_Structure.md#keyoptions)<`T`[keyof `T`]\> \| [`Structure`](../modules/types_Structure.md#structure)<`T`[keyof `T`]\> | The value of the key within the structure object. |

#### Returns

value is KeyOptions<T[keyof T]\>

Whether the value represents options for the key.

#### Defined in

[src/structs/Config.ts:40](https://github.com/norviah/config/blob/a09ff28/src/structs/Config.ts#L40)

___

### Parse

▸ `Static` **Parse**<`T`, `E`\>(`options`): `E` extends ``true`` ? `T` : `Record`<`string`, `any`\> \| `T`

Parses the provided JSON object into an instance of `T`.

`Parse` is the method that parses the provided JSON object into an instance
of the desired type. The method recursively iterates through the JSON
object in tandem with the defined structure, attempting to parse each key's
value into the type specified by the structure.

**`Example`**

In order to properly call the `Parse` method, we must first define an
interface to base the desired result on.

```ts
interface Config {
  id: string;
  token: string;
  settings: {
    mentionAll?: boolean;
  }
}
```

Once we have defined the interface, we can call the `Parse`, providing an
object to define the desired structure for each key within the interface,
recursively.

Note that when marking a key as optional, the key must be marked as
optional, rather than the parent object as a whole. Objects that are marked
as optional are ignored and will be treated as if the values are required.

```ts
const parsed: Config = Parser.Parse<Config>(
  {
    id: 'string',
    token: 'string',
    settings: {
      mentionAll: {
        type: 'boolean',
        optional: true,
      },
    },
  },

  {
    /* the prvovided JSON object */
  }
);
```

Once parsed, you can access the parsed object as an instance of `Config`,
assuming that no errors occurred. The values are extracted from the
provided JSON object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |
| `E` | extends `undefined` \| `boolean` = `undefined` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ParsingOptions`](../modules/types_ParsingOptions.md#parsingoptions)<`T`, `E`\> |

#### Returns

`E` extends ``true`` ? `T` : `Record`<`string`, `any`\> \| `T`

An instance of `T` parsed from the provided JSON object.

#### Defined in

[src/structs/Config.ts:207](https://github.com/norviah/config/blob/a09ff28/src/structs/Config.ts#L207)
