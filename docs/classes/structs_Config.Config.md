[@norviah/config](../README.md) / [Modules](../modules.md) / [structs/Config](../modules/structs_Config.md) / Config

# Class: Config

[structs/Config](../modules/structs_Config.md).Config

## Table of contents

### Constructors

- [constructor](structs_Config.Config.md#constructor)

### Methods

- [Cast](structs_Config.Config.md#cast)
- [Ensure](structs_Config.Config.md#ensure)
- [Helper](structs_Config.Config.md#helper)
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

| Name | Description |
| :------ | :------ |
| `T` | The desired type of the value. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pair` | [`string`[], `JsonValue`] | The key and value to cast. |
| `options` | [`KeyOptions`](../modules/types_Structure.md#keyoptions)<`T`\> | The options for the key. |

#### Returns

`T`

An object representing the result of the cast.

#### Defined in

[src/structs/Config.ts:98](https://github.com/norviah/config/blob/069aa2f/src/structs/Config.ts#L98)

___

### Ensure

▸ `Static` **Ensure**<`T`\>(`value`, `type`): value is TypeMappings[T]

Ensures that the provided value is an instance of the specified
_primitive_, type.

`Ensure` is a type guard that ensures the provided value is of the
specified primitive type, implementing an `instanceof` check to ensure
this. As this method implements a type guard, it can be used to narrow
the type of the provided value.

Note that this method only considers primitive types, and will not
consider any other type.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends keyof [`TypeMappings`](../modules/types_Primitive.md#typemappings) | The primitive type(s) to check against. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value to check |
| `type` | `T` \| `T`[] | The type to check against |

#### Returns

value is TypeMappings[T]

`true` if the value is an instance of the specified type.
```ts
const variable: unknown = 'Hello, world!';

if (Config.Ensure(variable, ['string', 'boolean'])) {
  /* in this scope, `variable` is ensured to be a string or a boolean */
}
```

#### Defined in

[src/structs/Config.ts:49](https://github.com/norviah/config/blob/069aa2f/src/structs/Config.ts#L49)

___

### Helper

▸ `Static` `Private` **Helper**<`T`, `E`\>(`options`): `T`

A helper method for parsing a JSON object into an instance of `T`.

This method is used internally by the `Parse` method to implement the
logic of recursively parsing a JSON object into an instance of `T`. During
the parsing process, for a given key, this method will determine if the key
represents a recursive structure, or if the key represents an actual key to
be parsed.

If the key represents a recursive structure, this method will recursively
call the `Parse` method to parse the value of the key into an instance of
the specified structure.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The type of the JSON object. |
| `E` | extends `undefined` \| `boolean` = `undefined` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ParsingOptions`](../modules/types_ParsingOptions.md#parsingoptions)<`T`, `E`\> & { `key`: `Extract`<keyof `T`, `string`\>  } | Options for parsing. |

#### Returns

`T`

The parsed value of the key.

#### Defined in

[src/structs/Config.ts:172](https://github.com/norviah/config/blob/069aa2f/src/structs/Config.ts#L172)

___

### Import

▸ `Static` **Import**<`T`, `E`\>(`structure`, `options`): [`ParsedResults`](../modules/types_ParsedResults.md#parsedresults)<`T`, `E`\>

Imports a JSON object from the specified path and parses it into an
instance of `T`.

`Import` will attempt to read the JSON object from the specified path and
pass it to the `Parse` method, providing the necessary arguments to the
method. Once parsed, the resulting object will be an instance of `T` with
the values parsed from the JSON object.

As this method is essentially a wrapper around the `Parse` method, please
refer to the documentation for the <code>[Parse](structs_Config.Config.md#parse)</code> method
for more information and examples.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The desired structure to parse the JSON object into. |
| `E` | extends `undefined` \| `boolean` = `undefined` | Whether if the program should enforce only explicitly defined properties in the structure. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `structure` | [`Structure`](../modules/types_Structure.md#structure)<`T`\> | The structure that defines each key within `T`. |
| `options` | [`Options`](../modules/types_Options.md#options)<`E`\> | The options to use when importing the JSON object. |

#### Returns

[`ParsedResults`](../modules/types_ParsedResults.md#parsedresults)<`T`, `E`\>

An instance of `T` with the values parsed from the JSON object.

#### Defined in

[src/structs/Config.ts:427](https://github.com/norviah/config/blob/069aa2f/src/structs/Config.ts#L427)

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

[src/structs/Config.ts:68](https://github.com/norviah/config/blob/069aa2f/src/structs/Config.ts#L68)

___

### Parse

▸ `Static` **Parse**<`T`, `E`\>(`options`): [`ParsedResults`](../modules/types_ParsedResults.md#parsedresults)<`T`, `E`\>

Parses the provided JSON object into an instance of `T`.

The main entry point for the library, `Parse` will attempt to parse the
provided JSON object into an instance of the specified interface. The
method will recursively iterate through the JSON object in tandem with the
define structure, attempting to parse each key's value into the type
specified in the structure.

When parsing a JSON object, you **must** provide a structure object for the
desired interface, this object will define how each key within the
interface should be parsed along with any additional options.

By default, `Parse` will allow any key that isn't explicitly defined in
the structure to be parsed into the resulting object, constricting the
type of the object to `T & Record<string, unknown>`. To enforce that only
explicitly defined keys are parsed, set the `enforce` option to `true`.

**`Example`**

In order to properly call the `Parse` method, we must first define an
interface to base the desired result on. As a basic example, we'll define
a simple interface for a configuration file of a Discord bot.

```ts
interface BotConfig {
  id: string;
  token: string;
  settings: {
    mentionAll?: boolean;
  }
}
```

Once we have defined the interface, we can then call the `Parse` method,
providing a structure object to define how each key within the interface
should be parsed.

```ts
const config: Config = Config.Parse<BotConfig>(
  {
    id: {
      type: 'string',
    },
    token: {
      type: 'string',
    },
    settings: {
      mentionAll: {
        type: 'boolean',
        optional: true
      },
    },
  },

  {
    /* the JSON object */
  }
);
```

If the JSON object is valid and no errors are encountered, the `Parse`
method will return an instance of the specified interface. From there, we
can access the properties of the object as we would normally.

> Note: If you wish to mark something as optional, you **must** only mark
> a key as optional, not a parent key. Parents that are marked as optional
> will not be treated as optional, they will be treated as a required
> property.

As previously mentioned, the above example is a basic example of how to
use the `Parse` method. The potential of the library lies when you provide
a custom constructor for a key, allowing you to implement the logic of how
to parse the value of a key.

For this more advanced example, we'll be creating a configuration file for
a build script which will do _something_ with a file as an input. The
configuration file will allow the user to specify the path to the input
file, here is how we can implement this.

```ts
import { existsSync, statSync } from 'fs';

import type { Stats } from 'fs';
import type { JsonValue } from 'type-fest';
import type { Structure } from '@norviah/config';

interface BuildConfig {
  input: Stats;
}

const structure: Structure<BuildConfig> = {
  input: {
    type: function (value: JsonValue): Stats | null {
      if (typeof value !== 'string') {
        return null;
      } else if (!existsSync(value) || !statSync(value).isFile()) {
        return null;
      }

      return statSync(value);
    },
  },
};

const config = Config.Parse<BuildConfig>(structure, { /* ... */ }});
```

In the above example, we've defined a custom constructor for the `input`
key, which will attempt to parse the value of the key into a `Stats`
instance. If the value is not a string, or the path does not exist, or the
path is not a file, the constructor will return `null`, which will cause
the `Parse` method to throw an error.

Here is the main potential of the library, you can define a custom
constructor which can cast the value of a key into any type you wish,
using any logic you wish, such as an API call.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The desired structure to parse the JSON object into. |
| `E` | extends `undefined` \| `boolean` = `undefined` | Whether if the program should enforce only explicitly defined properties in the structure. |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ParsingOptions`](../modules/types_ParsingOptions.md#parsingoptions)<`T`, `E`\> |

#### Returns

[`ParsedResults`](../modules/types_ParsedResults.md#parsedresults)<`T`, `E`\>

An instance of `T` with the values parsed from the provided JSON
object.

#### Defined in

[src/structs/Config.ts:355](https://github.com/norviah/config/blob/069aa2f/src/structs/Config.ts#L355)
