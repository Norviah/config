**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["structs/errors/missing"](../modules/_structs_errors_missing_.md) / MissingError

# Class: MissingError

## Hierarchy

* [ConfigError](_structs_error_.configerror.md)

  ↳ **MissingError**

## Index

### Constructors

* [constructor](_structs_errors_missing_.missingerror.md#constructor)

### Properties

* [message](_structs_errors_missing_.missingerror.md#message)
* [name](_structs_errors_missing_.missingerror.md#name)
* [stack](_structs_errors_missing_.missingerror.md#stack)

## Constructors

### constructor

\+ **new MissingError**(`path`: string): [MissingError](_structs_errors_missing_.missingerror.md)

*Overrides [ConfigError](_structs_error_.configerror.md).[constructor](_structs_error_.configerror.md#constructor)*

*Defined in [src/structs/errors/missing.ts:3](https://github.com/norviah/config/blob/641e50d/src/structs/errors/missing.ts#L3)*

Represents when a config file doesn't exist.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`path` | string | The config's path.  |

**Returns:** [MissingError](_structs_errors_missing_.missingerror.md)

## Properties

### message

•  **message**: string

*Inherited from [ConfigError](_structs_error_.configerror.md).[message](_structs_error_.configerror.md#message)*

*Overrides void*

*Defined in [src/structs/error.ts:17](https://github.com/norviah/config/blob/641e50d/src/structs/error.ts#L17)*

___

### name

•  **name**: string = \`${logger.colorize('gray', '[CONFIG ERROR]')} ${this.constructor.name.replace('Error', '')}\`

*Inherited from [ConfigError](_structs_error_.configerror.md).[name](_structs_error_.configerror.md#name)*

*Overrides void*

*Defined in [src/structs/error.ts:8](https://github.com/norviah/config/blob/641e50d/src/structs/error.ts#L8)*

The name of the Error, we'll have the name of this error, and the names of
child classes, to have a '[CONFIG]' before the name.

___

### stack

•  **stack**: undefined = undefined

*Inherited from [ConfigError](_structs_error_.configerror.md).[stack](_structs_error_.configerror.md#stack)*

*Overrides void*

*Defined in [src/structs/error.ts:15](https://github.com/norviah/config/blob/641e50d/src/structs/error.ts#L15)*

When debugging errors, a stacktrace is extremely useful as it presents the
steps through execution that led to an error, however, errors thrown via
child classes are manual, so we don't need a stacktrace.
