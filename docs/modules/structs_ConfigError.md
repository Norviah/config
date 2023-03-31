[@norviah/config](../README.md) / [Modules](../modules.md) / structs/ConfigError

# Module: structs/ConfigError

## Table of contents

### Enumerations

- [ErrorCodes](../enums/structs_ConfigError.ErrorCodes.md)

### Classes

- [ConfigError](../classes/structs_ConfigError.ConfigError.md)

### Variables

- [MessageGenerator](structs_ConfigError.md#messagegenerator)

## Variables

### MessageGenerator

• `Const` **MessageGenerator**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `INVALID_JSON` | (`path`: `string`) => `string` |
| `INVALID_PARENT_TYPE` | (`key`: `string`) => `string` |
| `INVALID_TYPE` | (`key`: `string`, `type`: `string`) => `string` |
| `JSON_NOT_FOUND` | (`path`: `string`) => `string` |
| `NON_JSON_FILE` | (`path`: `string`) => `string` |
| `REQUIRED_KEY` | (`key`: `string`, `type`: `string`) => `string` |
| `UNKNOWN_KEY` | (`key`: `string`) => `string` |

#### Defined in

[src/structs/ConfigError.ts:42](https://github.com/norviah/config/blob/069aa2f/src/structs/ConfigError.ts#L42)
