[@norviah/config](../README.md) / [Modules](../modules.md) / [structs/ConfigError](../modules/structs_ConfigError.md) / ErrorCodes

# Enumeration: ErrorCodes

[structs/ConfigError](../modules/structs_ConfigError.md).ErrorCodes

## Table of contents

### Enumeration Members

- [INVALID\_JSON](structs_ConfigError.ErrorCodes.md#invalid_json)
- [INVALID\_TYPE](structs_ConfigError.ErrorCodes.md#invalid_type)
- [JSON\_NOT\_FOUND](structs_ConfigError.ErrorCodes.md#json_not_found)
- [NON\_JSON\_FILE](structs_ConfigError.ErrorCodes.md#non_json_file)
- [REQUIRED\_KEY](structs_ConfigError.ErrorCodes.md#required_key)
- [UNKNOWN\_KEY](structs_ConfigError.ErrorCodes.md#unknown_key)

## Enumeration Members

### INVALID\_JSON

• **INVALID\_JSON** = ``"INVALID_JSON"``

Represents the event where the JSON config file to import is invalid,
mostly due to invalid JSON syntax.

#### Defined in

[src/structs/ConfigError.ts:17](https://github.com/norviah/config/blob/a09ff28/src/structs/ConfigError.ts#L17)

___

### INVALID\_TYPE

• **INVALID\_TYPE** = ``"INVALID_TYPE"``

Represents the event where the type of a key in the JSON config file is
invalid.

#### Defined in

[src/structs/ConfigError.ts:23](https://github.com/norviah/config/blob/a09ff28/src/structs/ConfigError.ts#L23)

___

### JSON\_NOT\_FOUND

• **JSON\_NOT\_FOUND** = ``"JSON_NOT_FOUND"``

Represents the event where the JSON config file to import is missing.

#### Defined in

[src/structs/ConfigError.ts:5](https://github.com/norviah/config/blob/a09ff28/src/structs/ConfigError.ts#L5)

___

### NON\_JSON\_FILE

• **NON\_JSON\_FILE** = ``"NON_JSON_FILE"``

Represents the event where the JSON config file to import is not a JSON
file.

#### Defined in

[src/structs/ConfigError.ts:11](https://github.com/norviah/config/blob/a09ff28/src/structs/ConfigError.ts#L11)

___

### REQUIRED\_KEY

• **REQUIRED\_KEY** = ``"REQUIRED_KEY"``

Represents the event where a key in the JSON config file was not found
while being required.

#### Defined in

[src/structs/ConfigError.ts:29](https://github.com/norviah/config/blob/a09ff28/src/structs/ConfigError.ts#L29)

___

### UNKNOWN\_KEY

• **UNKNOWN\_KEY** = ``"UNKNOWN_KEY"``

#### Defined in

[src/structs/ConfigError.ts:34](https://github.com/norviah/config/blob/a09ff28/src/structs/ConfigError.ts#L34)
