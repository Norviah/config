import type { JsonValue } from 'type-fest';

/**
 * Represents a constructor function that will create an instance of the
 * specified type `T`.
 *
 * `NullableConstructor<T>` is used to represent a valid custom constructor for
 * keys, the constructor enforces that the value is a valid function that can
 * resolve to either the desired type or `null` or `undefined`.
 *
 * This type is referenced to allow for custom constructors to be used for
 * keys, returning the desired type if the value can be parsed, or `null` if
 * the value cannot be parsed.
 * @template T The desired type to construct.
 */
export type NullableConstructor<T> = (input: JsonValue) => T | null | undefined;
