import type { NullableConstructor } from './NullableConstructor';
import type { ToString } from './Primitive';

export interface BaseKeyOptions<T> {
  /**
   * The constructor for the key.
   *
   * `type` represents how the parser should parse the value assigned to an
   * instance of `T`, the value being the assigned value of the key within the
   * JSON file. You can either pass a constructor function or, if `T` is a
   * primitive type, you can pass a string that will represent the desired
   * `typeof` value of the key.
   *
   * When using a constructor function, the function will be passed the value
   * of the key, which should be expected to be any valid JSON value. The
   * function should then return an instance of `T`, it is up to the function
   * to implement the logic of determining if the value is valid or not,
   * returning `null` if the value is invalid.
   *
   * The issue when using a constructor function is that when you define a key
   * to be a primitive type, such as `string` or `number`, the function will
   * only check the `typeof` value for the key, which can be tedious if you
   * have multiple keys that are primitive types. Instead, you can opt to pass
   * in strings, which will represent the desired `typeof` value of the key.
   * Valid options for strings are:
   * - `'string'`
   * - `'number'`
   * - `'boolean'`
   * - `'null'`
   *
   * Of course, if using a string, the specified string will be constrained to
   * what string represents `T`.
   */
  type: NullableConstructor<T> | ToString<T> | ToString<T>[];

  /**
   * The string representation of the desired type(s) of the key.
   *
   * This property is used to generate a more descriptive error message when
   * referencing the desired type(s) of the key. If this property is not set,
   * the strings are inferred from the `type` property.
   */
  typeName?: string;

  /**
   * The default value of the key.
   *
   * If the key is not present within the JSON value, this default value will be
   * referenced as the value of the key.
   */
  default?: T;

  /**
   * Determines if the key is optional.
   *
   * If `true`, the key is treated as optional and the program will not throw an
   * error if the key is not present within the JSON file.
   *
   * The type of `optional` is constrained, dependent whether if the provided
   * type extends `undefined`, preventing the user from setting this property to
   * any boolean value.
   */
  optional?: undefined extends T ? true : false;
}

/**
 * Enforces the `optional` property if `T` extends `undefined`.
 *
 * In the case where the generic type `T` is `undefined`, the `optional`
 * property is only allowed to be set to `true`, however, the property itself is
 * not forced to be set. The interface essentially looks like this:
 * ```ts
 * interface Options {
 *   optional?: true;
 * }
 * ```
 *
 * `KeyOptionalOptions` is used to enforce the `optional` property to be set to
 * `true` if the generic type `T` extends `undefined`.
 * @template T The type of the key.
 */
export type KeyOptionalOptions<T> = undefined extends T ? Pick<Required<BaseKeyOptions<T>>, 'optional'> : unknown;

/**
 * Represents options for a key.
 *
 *
 * @template T The type of the key.
 */
export type KeyOptions<T> = BaseKeyOptions<T> & KeyOptionalOptions<T>;

/**
 * The configuration object.
 *
 * `Config` represents the configuration object of the JSON file, defining the
 * desired structure for each key within the JSON file. When defining the
 * provided interface, only mark the keys as optional if you want the key to be
 * optional, optional sub-objects will be ignored and treated as required.
 *
 * Note that the desired interface for the configuration object can be
 * infinitely deep, however of course the JSON file must reflect the same
 * structure.
 * @template T The interface that represents the config file to import.
 * @example
 */
export type Structure<T extends Record<string, any>> = {
  [K in keyof T]-?: NonNullable<T[K]> extends Record<string, T[K][keyof T]> ? Structure<NonNullable<T[K]>> : undefined extends T[K] ? KeyOptions<T[K]> : KeyOptions<T[K]> | KeyOptions<T[K]>['type'];
};
