[@norviah/config](../README.md) / [Modules](../modules.md) / [structs/ConfigError](../modules/structs_ConfigError.md) / ConfigError

# Class: ConfigError<T\>

[structs/ConfigError](../modules/structs_ConfigError.md).ConfigError

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof typeof [`ErrorCodes`](../enums/structs_ConfigError.ErrorCodes.md) |

## Hierarchy

- `Error`

  ↳ **`ConfigError`**

## Table of contents

### Constructors

- [constructor](structs_ConfigError.ConfigError.md#constructor)

### Properties

- [args](structs_ConfigError.ConfigError.md#args)
- [code](structs_ConfigError.ConfigError.md#code)
- [message](structs_ConfigError.ConfigError.md#message)
- [name](structs_ConfigError.ConfigError.md#name)
- [stack](structs_ConfigError.ConfigError.md#stack)
- [prepareStackTrace](structs_ConfigError.ConfigError.md#preparestacktrace)
- [stackTraceLimit](structs_ConfigError.ConfigError.md#stacktracelimit)

### Methods

- [is](structs_ConfigError.ConfigError.md#is)
- [captureStackTrace](structs_ConfigError.ConfigError.md#capturestacktrace)

## Constructors

### constructor

• **new ConfigError**<`T`\>(`code`, `args`)

Initializes a new `ConfigError` instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"JSON_NOT_FOUND"`` \| ``"NON_JSON_FILE"`` \| ``"INVALID_JSON"`` \| ``"INVALID_TYPE"`` \| ``"REQUIRED_KEY"`` \| ``"UNKNOWN_KEY"`` \| ``"INVALID_PARENT_TYPE"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `T` | The code for the error. |
| `args` | { `INVALID_JSON`: (`path`: `string`) => `string` ; `INVALID_PARENT_TYPE`: (`key`: `string`) => `string` ; `INVALID_TYPE`: (`key`: `string`, `type`: `string`) => `string` ; `JSON_NOT_FOUND`: (`path`: `string`) => `string` ; `NON_JSON_FILE`: (`path`: `string`) => `string` ; `REQUIRED_KEY`: (`key`: `string`, `type`: `string`) => `string` ; `UNKNOWN_KEY`: (`key`: `string`) => `string`  }[`T`] extends (...`args`: `P`) => `any` ? `P` : `undefined` | Any arguments to pass to the error code. |

#### Overrides

Error.constructor

#### Defined in

[src/structs/ConfigError.ts:134](https://github.com/norviah/config/blob/069aa2f/src/structs/ConfigError.ts#L134)

## Properties

### args

• **args**: { `INVALID_JSON`: (`path`: `string`) => `string` ; `INVALID_PARENT_TYPE`: (`key`: `string`) => `string` ; `INVALID_TYPE`: (`key`: `string`, `type`: `string`) => `string` ; `JSON_NOT_FOUND`: (`path`: `string`) => `string` ; `NON_JSON_FILE`: (`path`: `string`) => `string` ; `REQUIRED_KEY`: (`key`: `string`, `type`: `string`) => `string` ; `UNKNOWN_KEY`: (`key`: `string`) => `string`  }[`T`] extends (...`args`: `P`) => `any` ? `P` : `undefined`

Arguments passed to the error code.

`ConfigError` represents errors that may occur when attempting to import
and parse a JSON config file, and as such, the error message for each error
code may require arguments to be passed to it.

`args` represents the arguments passed to the error code.

#### Defined in

[src/structs/ConfigError.ts:127](https://github.com/norviah/config/blob/069aa2f/src/structs/ConfigError.ts#L127)

___

### code

• **code**: `T`

Represents the code for the thrown error.

`code` allows for the possibility to identify the specific error that
occurred, which can be used to handle the error in a specific way.

#### Defined in

[src/structs/ConfigError.ts:116](https://github.com/norviah/config/blob/069aa2f/src/structs/ConfigError.ts#L116)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/.pnpm/typescript@5.0.2/node_modules/typescript/lib/lib.es5.d.ts:1055

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/.pnpm/typescript@5.0.2/node_modules/typescript/lib/lib.es5.d.ts:1054

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/.pnpm/typescript@5.0.2/node_modules/typescript/lib/lib.es5.d.ts:1056

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/.pnpm/@types+node@18.15.11/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/.pnpm/@types+node@18.15.11/node_modules/@types/node/globals.d.ts:13

## Methods

### is

▸ **is**<`T`\>(`code`): this is ConfigError<T\>

Determines the specific type of error that occured.

When catching an instance of `ConfigError`, by default the type of the
error is unknown. `is` implements a type guard to determine the specific
type of error that occured, which can be used to handle the error in a
specific way.

**`Example`**

```ts
try {
  /* ... */
} catch (error) {
  if (error instanceof ConfigError && error.is(ErrorCodes.JSON_NOT_FOUND)) {
    /* Represents the error when the specified JSON file couldn't be found */
  }
}
```
In the example above, the `is` check ensures that the error thrown is the
error `PARSING_ARGUMENT_ERROR`. This informs us of the error code and also
allows us to safely access the `args` property of the error.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ErrorCodes`](../enums/structs_ConfigError.ErrorCodes.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `T` | The code to check against. |

#### Returns

this is ConfigError<T\>

Whether if the error is of the specified type.

#### Defined in

[src/structs/ConfigError.ts:166](https://github.com/norviah/config/blob/069aa2f/src/structs/ConfigError.ts#L166)

___

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/.pnpm/@types+node@18.15.11/node_modules/@types/node/globals.d.ts:4
