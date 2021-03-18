**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["structs/errors/invalidType"](../modules/_structs_errors_invalidtype_.md) / InvalidTypeError

# Class: InvalidTypeError

## Hierarchy

* [ConfigError](_structs_error_.configerror.md)

  ↳ **InvalidTypeError**

## Index

### Constructors

* [constructor](_structs_errors_invalidtype_.invalidtypeerror.md#constructor)

### Properties

* [message](_structs_errors_invalidtype_.invalidtypeerror.md#message)
* [name](_structs_errors_invalidtype_.invalidtypeerror.md#name)
* [stack](_structs_errors_invalidtype_.invalidtypeerror.md#stack)

## Constructors

### constructor

\+ **new InvalidTypeError**(`key`: string, `type`: string \| [Types](../modules/_types_types_.md#types)): [InvalidTypeError](_structs_errors_invalidtype_.invalidtypeerror.md)

*Overrides [ConfigError](_structs_error_.configerror.md).[constructor](_structs_error_.configerror.md#constructor)*

*Defined in [src/structs/errors/invalidType.ts:4](https://github.com/Norviah/config/blob/d9b32fc/src/structs/errors/invalidType.ts#L4)*

Represents when, within the config, a key has been set to a wrong type.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | The key with the incorrect type. |
`type` | string \| [Types](../modules/_types_types_.md#types) | The correct type for the key.  |

**Returns:** [InvalidTypeError](_structs_errors_invalidtype_.invalidtypeerror.md)

## Properties

### message

•  **message**: string

*Inherited from [ConfigError](_structs_error_.configerror.md).[message](_structs_error_.configerror.md#message)*

*Overrides void*

*Defined in [src/structs/error.ts:17](https://github.com/Norviah/config/blob/d9b32fc/src/structs/error.ts#L17)*

___

### name

•  **name**: string = \`${logger.colorize('gray', '[CONFIG ERROR]')} ${this.constructor.name.replace('Error', '')}\`

*Inherited from [ConfigError](_structs_error_.configerror.md).[name](_structs_error_.configerror.md#name)*

*Overrides void*

*Defined in [src/structs/error.ts:8](https://github.com/Norviah/config/blob/d9b32fc/src/structs/error.ts#L8)*

The name of the Error, we'll have the name of this error, and the names of
child classes, to have a '[CONFIG]' before the name.

___

### stack

•  **stack**: undefined = undefined

*Inherited from [ConfigError](_structs_error_.configerror.md).[stack](_structs_error_.configerror.md#stack)*

*Overrides void*

*Defined in [src/structs/error.ts:15](https://github.com/Norviah/config/blob/d9b32fc/src/structs/error.ts#L15)*

When debugging errors, a stacktrace is extremely useful as it presents the
steps through execution that led to an error, however, errors thrown via
child classes are manual, so we don't need a stacktrace.
