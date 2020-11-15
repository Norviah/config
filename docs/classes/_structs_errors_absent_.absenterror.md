**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["structs/errors/absent"](../modules/_structs_errors_absent_.md) / AbsentError

# Class: AbsentError

## Hierarchy

* [ConfigError](_structs_error_.configerror.md)

  ↳ **AbsentError**

## Index

### Constructors

* [constructor](_structs_errors_absent_.absenterror.md#constructor)

### Properties

* [message](_structs_errors_absent_.absenterror.md#message)
* [name](_structs_errors_absent_.absenterror.md#name)
* [stack](_structs_errors_absent_.absenterror.md#stack)

## Constructors

### constructor

\+ **new AbsentError**(`key`: string, `type`: string \| [Types](../modules/_types_types_.md#types)): [AbsentError](_structs_errors_absent_.absenterror.md)

*Overrides [ConfigError](_structs_error_.configerror.md).[constructor](_structs_error_.configerror.md#constructor)*

*Defined in [src/structs/errors/absent.ts:4](https://github.com/norviah/config/blob/4c1b602/src/structs/errors/absent.ts#L4)*

Represents when, within the config, a key isn't set.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | The key that hasn't been set. |
`type` | string \| [Types](../modules/_types_types_.md#types) | The correct type for the given key.  |

**Returns:** [AbsentError](_structs_errors_absent_.absenterror.md)

## Properties

### message

•  **message**: string

*Inherited from [ConfigError](_structs_error_.configerror.md).[message](_structs_error_.configerror.md#message)*

*Overrides void*

*Defined in [src/structs/error.ts:17](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L17)*

___

### name

•  **name**: string = \`${logger.colorize('gray', '[CONFIG ERROR]')} ${this.constructor.name.replace('Error', '')}\`

*Inherited from [ConfigError](_structs_error_.configerror.md).[name](_structs_error_.configerror.md#name)*

*Overrides void*

*Defined in [src/structs/error.ts:8](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L8)*

The name of the Error, we'll have the name of this error, and the names of
child classes, to have a '[CONFIG]' before the name.

___

### stack

•  **stack**: undefined = undefined

*Inherited from [ConfigError](_structs_error_.configerror.md).[stack](_structs_error_.configerror.md#stack)*

*Overrides void*

*Defined in [src/structs/error.ts:15](https://github.com/norviah/config/blob/4c1b602/src/structs/error.ts#L15)*

When debugging errors, a stacktrace is extremely useful as it presents the
steps through execution that led to an error, however, errors thrown via
child classes are manual, so we don't need a stacktrace.
