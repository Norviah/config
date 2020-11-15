**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["structs/error"](../modules/_structs_error_.md) / ConfigError

# Class: ConfigError

## Hierarchy

* [Error](_structs_error_.configerror.md#error)

  ↳ **ConfigError**

  ↳↳ [AbsentError](_structs_errors_absent_.absenterror.md)

  ↳↳ [InvalidError](_structs_errors_invalid_.invaliderror.md)

  ↳↳ [InvalidTypeError](_structs_errors_invalidtype_.invalidtypeerror.md)

  ↳↳ [MissingError](_structs_errors_missing_.missingerror.md)

## Index

### Constructors

* [constructor](_structs_error_.configerror.md#constructor)

### Properties

* [message](_structs_error_.configerror.md#message)
* [name](_structs_error_.configerror.md#name)
* [stack](_structs_error_.configerror.md#stack)
* [Error](_structs_error_.configerror.md#error)

## Constructors

### constructor

\+ **new ConfigError**(`message`: string): [ConfigError](_structs_error_.configerror.md)

*Defined in [src/structs/error.ts:15](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** [ConfigError](_structs_error_.configerror.md)

## Properties

### message

•  **message**: string

*Overrides void*

*Defined in [src/structs/error.ts:17](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L17)*

___

### name

•  **name**: string = \`${logger.colorize('gray', '[CONFIG ERROR]')} ${this.constructor.name.replace('Error', '')}\`

*Overrides void*

*Defined in [src/structs/error.ts:8](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L8)*

The name of the Error, we'll have the name of this error, and the names of
child classes, to have a '[CONFIG]' before the name.

___

### stack

•  **stack**: undefined = undefined

*Overrides void*

*Defined in [src/structs/error.ts:15](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L15)*

When debugging errors, a stacktrace is extremely useful as it presents the
steps through execution that led to an error, however, errors thrown via
child classes are manual, so we don't need a stacktrace.

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/.pnpm/typescript@4.0.5/node_modules/typescript/lib/lib.es5.d.ts:984*
