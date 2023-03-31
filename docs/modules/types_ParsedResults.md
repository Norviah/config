[@norviah/config](../README.md) / [Modules](../modules.md) / types/ParsedResults

# Module: types/ParsedResults

## Table of contents

### Type Aliases

- [Deep](types_ParsedResults.md#deep)
- [ParsedResults](types_ParsedResults.md#parsedresults)

## Type Aliases

### Deep

Ƭ **Deep**<`T`\>: { [K in keyof T]: T[K] extends Record<string, any\> ? Deep<T[K]\> : T[K] } & `Record`<`string`, `unknown`\>

Recursively constructs a type that extends `T`, in addition to consisting of
unknown keys.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> |

#### Defined in

src/types/ParsedResults.ts:5

___

### ParsedResults

Ƭ **ParsedResults**<`T`, `E`\>: `E` extends ``true`` ? `T` : `T` & [`Deep`](types_ParsedResults.md#deep)<`T`\>

Represents the results of parsing a JSON object.

The results of parsing a JSON object will depend on whether if the `enforce`
flag is set. When parsing a JSON object, it's possible that extra keys are
present that are not defined within the desired structure.

If the `enforce` flag is set, the results will only contain the explicitly
defined keys within the desired structure. If the `enforce` flag is not set,
the results will contain the explicitly defined keys within the desired
structure, as well as any extra keys that were present within the JSON
object.

**`Example`**

```ts
interface Config {
  foo: string;
  bar: {
    baz: string;
  }
}

const config = Config.Import(
  {
    foo: "string",
    bar: {
      baz: "string",
    }
  },
  {
    path: "config.json",
    enforce: false,
  }
);

config.bar.baz;        // type string
config.bar.unknownKey; // type unknown
```

In the above example, we have imported a JSON file that has the structure of
the defined `Config` interface. We're ensured that all of the keys in the
interface are present, however, the object may contain extra keys that are
not defined within the interface.

Instead, we can set the `enforce` flag to `true` to ensure that the object
only contains the explicitly defined keys within the interface. If any extra
keys are present, the program will throw an error.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<`string`, `any`\> | The desired structure to parse the JSON object into. |
| `E` | extends `boolean` \| `undefined` = `undefined` | Whether if the program should enforce only explicitly defined properties in the structure. |

#### Defined in

src/types/ParsedResults.ts:59
