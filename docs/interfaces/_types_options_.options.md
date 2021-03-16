**[@norviah/config](../README.md)**

> [Globals](../globals.md) / ["types/options"](../modules/_types_options_.md) / Options

# Interface: Options\<T>

## Type parameters

Name | Type |
------ | ------ |
`T` | Record\<string, any> |

## Hierarchy

* **Options**

## Index

### Properties

* [default](_types_options_.options.md#default)
* [path](_types_options_.options.md#path)

## Properties

### default

• `Optional` **default**: T

*Defined in [src/types/options.ts:12](https://github.com/Norviah/config/blob/54727f7/src/types/options.ts#L12)*

Represents default values for the config. If a config file doesn't exist,
this default object will be saved to the config's path. If this property
isn't given, the typings object will be saved instead.

___

### path

• `Optional` **path**: undefined \| string

*Defined in [src/types/options.ts:5](https://github.com/Norviah/config/blob/54727f7/src/types/options.ts#L5)*

Represents the config's absolute path.
