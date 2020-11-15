**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["types/options"](../modules/_types_options_.md) / Options

# Interface: Options\<T>

## Type parameters

Name |
------ |
`T` |

## Hierarchy

* **Options**

## Index

### Properties

* [default](_types_options_.options.md#default)
* [path](_types_options_.options.md#path)

## Properties

### default

• `Optional` **default**: T

*Defined in [src/types/options.ts:11](https://github.com/norviah/config/blob/641e50d/src/types/options.ts#L11)*

If a user doesn't have a config set, this value could represent the default
object for the config file, which will be saved to the config's path.

___

### path

• `Optional` **path**: undefined \| string

*Defined in [src/types/options.ts:5](https://github.com/norviah/config/blob/641e50d/src/types/options.ts#L5)*

Represents the config's absolute path.
