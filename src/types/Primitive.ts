import type { ValueOf } from 'type-fest';

/**
 * Represents the supported `typeof` strings and their corresponding types.
 *
 * `TypeMappings` acts as a lookup table for supported strings that can be used
 * as an alternative to providing a constructor function for a key when defining
 * options for a structure.
 *
 * In JavaScript, primitive types refer to basic data types that are not objects
 * and do not have any methods or properties. There are 6 primitive types:
 *   - `Boolean`
 *   - `Null`
 *   - `undefined`
 *   - `Number`
 *   - `String`
 *   - `Symbol`
 *
 * Since we are working with JSON, we only need to provide support for types can
 * be represented in JSON.
 */
export type TypeMappings = { string: string; number: number; boolean: boolean; null: null };

/**
 * Represents primitive types that can be used to represent a key.
 */
export type Primitive = keyof TypeMappings;

/**
 * Converts a type to its corresponding `typeof` value.
 * @template T The type to convert.
 */
export type ToString<T> = ValueOf<{ [K in Primitive]: TypeMappings[K] extends T ? K : never }>;
