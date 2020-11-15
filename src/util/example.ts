import { Types } from '../types/types';
import { join } from './join';

/**
 * Generates a value representing the type for the given key to use within an
 * example object with the given generic type T as a base. This function
 * essentially returns the type itself, unless if it's either undefined or a
 * type consisting of only arrays, which it then returns an array.
 * @param  typings The typing object which represents types for each key.
 * @param  key     The key to generate an example for.
 * @return         The value for the key.
 */
function value<T>(typings: { [key in keyof Required<T>]: Types | Types[] }, key: keyof T) {
  // First, we'll get the desired type for the given key.
  let types: Types | Types[] = typings[key];

  // As a type for a key may have multiple types, we'll ensure that the
  // current type is wrapped within an array.
  types = Array.isArray(types) ? types : [types];

  types = types.filter((type: Types, i: number): boolean => types.indexOf(type) === i);

  // We'll check to see if undefined is the only desired type, no idea why
  // this happen, but if it would, we wouldn't want to set a value as an error
  // would be thrown when trying to load the config.
  const absent: boolean = types.every((type: Types): boolean => type === 'undefined');

  // We'll also check to see if every type for the given key is an array.
  const array: boolean = types.every((type: Types): boolean => /^array<\w+>$/.test(type));

  const value: string = join(
    types.map((type: string): string =>
      type === 'undefined' ? '[no value]' : type.replace(/^array<(\w+)>$/, 'array of $1(s)')
    )
  );

  return absent ? undefined : array ? [value] : value;
}

/**
 * If a config doesn't exist, this function is used to create an example using
 * the typings object that reference the interface.
 * @param  typings The typing object to create an example from.
 * @return         An example config for the interface.
 */
export function example<T>(typings: { [key in keyof Required<T>]: Types | Types[] }): Record<string, any> {
  // Represents the object we'll push values to.
  const example: Record<string, any> = {};

  // First, we'll get a list of keys that are desired within the config file.
  const keys: (keyof T)[] = Object.keys(typings) as (keyof T)[];

  // With a list of keys, we can determine the desired type, by using the
  // typings parameter, and the actual value set within the config, by using
  // the object parameter.

  for (const key of keys) {
    example[key as string] = value<T>(typings, key);
  }

  return example;
}
