import type { KeyOptions, Structure } from '../types/Structure';

/**
 * Ensures that the provided key, provided from a `Structure` instance,
 * represents options for the key.
 *
 * When parsing a JSON object using the `Parse` method, we iterate through the
 * structure object along with the JSON object itself. The issue is, at
 * runtime, we're not sure whether if a key within the structure object
 * represents either a sub-structure or options for the key.
 *
 * `IsKeyOptions` is a helper method to ensure that an extract key from a
 * `Structure` instance is an instance of `KeyOptions`, rather than a
 * `Structure`.
 * @param value The value of the key within the structure object.
 * @returns Whether the value represents options for the key.
 */
export function isKeyOptions<T extends Record<string, any>>(value: KeyOptions<T[keyof T]> | Structure<T[keyof T]>): value is KeyOptions<T[keyof T]> {
  // In order to determine whether if the value defines options for the key,
  // we will need to consider the `type` property, as this proprety is the
  // only property that is required within `KeyOptions`.

  // When considering the `type` property, we first need to ensure that the
  // value is an object. This should always be the case, but we'll check just
  // to be safe. We will also ensure that the `type` property exists.
  if (typeof value !== 'object' || !('type' in value)) {
    return false;
  }

  // `type` represents the type of the key, and can either be a string, an
  // array of strings, or a constructor function. If the type is one of these
  // three, we can safely assume that the value defines options for the key.
  return Array.isArray(value.type) || ['string', 'function'].includes(typeof value.type);
}
