**[@norviah/config](../README.md)**

> [Globals](../globals.md) / "util/join"

# Module: "util/join"

## Index

### Functions

* [join](_util_join_.md#join)

## Functions

### join

▸ **join**(`array`: any[]): string

*Defined in [src/util/join.ts:12](https://github.com/Norviah/config/blob/54727f7/src/util/join.ts#L12)*

Converts the given array into a string, having the items separated via a
comma with the last two element, if there's more than one, separated with or.

**`examples`** 
join(['you', 'me']) => 'you or me'

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`array` | any[] | The array to convert to a string. |

**Returns:** string

A string representing the elements of the array.
