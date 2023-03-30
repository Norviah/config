import { ConfigError, ErrorCodes } from './ConfigError';
import { read } from '../util/read';
import { Options } from '../types/Options';

import type { JsonObject, JsonValue } from 'type-fest';
import type { Structure, KeyOptions } from '../types/Structure';
import type { NullableConstructor } from '../types/NullableConstructor';
import type { ToString, TypeMappings, Primitive } from '../types/Primitive';
import type { ParsingOptions } from '../types/ParsingOptions';

/**
 * Returns a string representation of the provided type.
 *
 * A quick and dirty way to get a string representation of the provided type,
 * the function will return the `typeName` property if it exists, otherwise it
 * infer the name from the `type` property.
 * @param options The options for the key.
 * @returns A string representation of the provided type.
 */
function typeName<T>(options: KeyOptions<T>): string {
  return options.typeName || (typeof options.type === 'string' ? options.type : Array.isArray(options.type) ? options.type.join(' | ') : options.type.name);
}

export class Config {
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
  private static IsKeyOptions<T extends Record<string, any>>(value: KeyOptions<T[keyof T]> | Structure<T[keyof T]>): value is KeyOptions<T[keyof T]> {
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

  /**
   * Ensures that the provided value is an instance of the specified type.
   *
   * `Ensure` is a type guard that ensures the provided value is an instance of
   * the specified type, implementing an `instanceof` check to ensure this. As
   * the method is a type guard, it will inform TypeScript, allowing for
   * type-safety when accessing the value.
   * @param value The value to check.
   * @param type The type to check against.
   * @returns Whether the value is an instance of the specified type.
   * @example
   * ```ts
   * const variable: unknown = 'sample text';
   *
   * if (Parser.Ensure(variable, ['string'])) {
   *   /* in this scope, `variable` is ensured to be of type `string` *\/
   * }
   * ```
   */
  public static Ensure<T extends Primitive>(value: unknown, type: T[]): value is TypeMappings[T] {
    return type.includes(typeof value as T);
  }

  /**
   * Casts the value into the specified type.
   *
   * Attempts to cast the provided JSON value into the desired type by using the
   * information provided in options. `options` represents important information
   * about the key, we will use this information to determine how to parse the
   * value.
   * @param pair The key and value to cast.
   * @param options The options for the key.
   * @returns An object representing the result of the cast.
   */
  public static Cast<T>(pair: [string[], JsonValue], options: KeyOptions<T>): T {
    const value: JsonValue = pair[1];

    // Before we attempt to parse the value, we need to ensure that the value
    // actually exists. If the value is undefined, we need to determine whether
    // if the key is optional and/or if the key was provided a default value.
    if (value === undefined) {
      if (options.default) {
        return options.default;
      } else if (options.optional) {
        return undefined as T;
      }

      throw new ConfigError(ErrorCodes.REQUIRED_KEY, [pair[0].join('.'), typeName(options)]);
    }

    // The goal of this method is to cast the JSON value into the desired type
    // specified within the provided options. The type can be specified as a
    // string, or multiple strings, or a constructor function. We'll need to
    // determine how to parse the value based on the type.

    // First, if the type is one or more strings. Strings are used as a
    // shorthand method for representing primitive types, such as `string` or
    // `number`, instead of creating a constructor function. If the type is a
    // string, all we need to do is ensure the value is of the specified type.
    if (Array.isArray(options.type) || typeof options.type === 'string') {
      if (!Config.Ensure(value, Array.isArray(options.type) ? options.type : [options.type])) {
        throw new ConfigError(ErrorCodes.INVALID_TYPE, [pair[0].join('.'), typeName(options)]);
      }

      return value as T;
    }

    let parsed: T | null | undefined;

    // Next, if the type is a constructor function. Functions are implemented by
    // the user, users can define their own logic for parsing the value. All we
    // check is if the resolved value is not `null` or `undefined`.

    // When we call the constructor, we need to wrap the call in a try-catch
    // block as we want to prevent the process from crashing as we're not sure
    // of the logic within the constructor.
    try {
      parsed = options.type(value);
    } catch {
      throw new ConfigError(ErrorCodes.INVALID_TYPE, [pair[0].join('.'), typeName(options)]);
    }

    // At this point, all we know is that the constructor was called without
    // throwing an error. We need to check if the function was successful by
    // checking if the resolved value is a valid, non nullable value.
    if (parsed === undefined || parsed === null || (typeof parsed === 'number' && isNaN(parsed))) {
      throw new ConfigError(ErrorCodes.INVALID_TYPE, [pair[0].join('.'), typeName(options)]);
    }

    return parsed;
  }

  /**
   * Parses the provided JSON object into an instance of `T`.
   *
   * `Parse` is the method that parses the provided JSON object into an instance
   * of the desired type. The method recursively iterates through the JSON
   * object in tandem with the defined structure, attempting to parse each key's
   * value into the type specified by the structure.
   * @param structure Defines the structure for each key, recursively.
   * @param json The JSON object to parse.
   * @param parents If specified, the method is in a recursive call, and the
   * parents of the current key are specified.
   * @returns An instance of `T` parsed from the provided JSON object.
   * @example
   * In order to properly call the `Parse` method, we must first define an
   * interface to base the desired result on.
   *
   * ```ts
   * interface Config {
   *   id: string;
   *   token: string;
   *   settings: {
   *     mentionAll?: boolean;
   *   }
   * }
   * ```
   *
   * Once we have defined the interface, we can call the `Parse`, providing an
   * object to define the desired structure for each key within the interface,
   * recursively.
   *
   * Note that when marking a key as optional, the key must be marked as
   * optional, rather than the parent object as a whole. Objects that are marked
   * as optional are ignored and will be treated as if the values are required.
   *
   * ```ts
   * const parsed: Config = Parser.Parse<Config>(
   *   {
   *     id: 'string',
   *     token: 'string',
   *     settings: {
   *       mentionAll: {
   *         type: 'boolean',
   *         optional: true,
   *       },
   *     },
   *   },
   *
   *   {
   *     /* the prvovided JSON object *\/
   *   }
   * );
   * ```
   *
   * Once parsed, you can access the parsed object as an instance of `Config`,
   * assuming that no errors occurred. The values are extracted from the
   * provided JSON object.
   */
  public static Parse<T extends Record<string, any>, E extends boolean | undefined = undefined>(options: ParsingOptions<T, E>): E extends true ? T : T | Record<string, any> {
    // The container for the resulting parsed object, while iterating through
    // the JSON object, each parsed value will be set within this container.
    const result: Record<string, any> = {};

    // Initially, all we know of the provided JSON object is that it is a valid
    // JSON object. We aren't sure of anything regarding the structure of the
    // object and its keys.

    // In order to parse the object into an instance of `T`, we will iterate
    // through the structure definition object in tandem with the JSON object.
    // Each key within the structure will represent important information
    // regarding that specific key, such as the constructor for the key's type.

    const { structure, json, parents, enforce } = options;

    for (const key in options.structure) {
      // When a key is defined in the structure, it can mean one of two things:
      // the key represents the key itself, or the key is a subobject. Here are
      // the valid types that a key can be:

      // - `KeyOptions<T>`: The key represents the desired key, with the value
      //    representing an object defining options for the key.
      // - `NullableConstructor<T> | ToString<T> | ToString<T>[]`: The key
      //    also represents the desired key, but the value is a shortcut for
      //    specifying the key's type.
      // - `Structure<T>`: The key is a subparent object, representing more keys
      //    within the object.

      let options = structure[key] as KeyOptions<T[keyof T]> | ToString<T[keyof T]> | NullableConstructor<T[keyof T]> | Structure<T[keyof T]>;

      // Note that the first two types essentially represent the same thing, as
      // the second type allows the user to quickly specify the desired type of
      // the key, without having to specify an object.

      // From this, we will convert the variable into a `KeyOptions<T>`
      // instance, if the key represents the second type.

      if (Array.isArray(options) || typeof options === 'string' || typeof options === 'function') {
        options = { type: options } as KeyOptions<T[keyof T]>;
      }

      // At this point, we'll need to determine whether if the key represents a
      // nested object or an actual key that is expected to be set within the
      // JSON object. `options` can be either a `KeyOptions<T>` instance, which
      // represents an actual key, or a `Config<T>` instance, which represents a
      // nested object.

      // Ensuring that the value represents options for a key, and not a nested
      // object, is done by the `isKeyOptions` function. If the value is a
      // nested object, we'll need to recursively call `parse` with the nested
      // config.
      if (!Config.IsKeyOptions(options)) {
        result[key] = Config.Parse<T[keyof T], E>({
          structure: options,
          json: (key in json ? json[key] : {}) as JsonObject,
          parents: parents ? [...parents, key] : [key],
          enforce,
        } as ParsingOptions<T[keyof T], E>);
      }

      // If the value defines options for the key, we'll need to attempt to
      // parse the JSON value into the desired type.
      else {
        result[key] = Config.Cast<T[keyof T]>([parents ? [...parents, key] : [key], (key in json ? json[key] : undefined) as JsonValue], options);
      }
    }

    if (options.enforce) {
      for (const key in json) {
        if (!(key in structure)) {
          throw new ConfigError(ErrorCodes.UNKNOWN_KEY, [`${parents ? `${parents.join('.')}.` : ''}${key}`]);
        }
      }
    }

    return result as T;
  }

  /**
   * Imports a JSON object from a file and parses it into an instance of `T`.
   *
   * @template T The desired type to parse the JSON object into.
   * @param structure Defines the structure for each key in the JSON object.
   * @param options Options for the loader.
   * @returns An instance of `T` with the values from the JSON object.
   * As a basic example, let's say we want to define a configuration object for
   * a Discord bot. The config will have two keys, `token` and `prefix`, both of
   * which are the primitive type, `string`.
   *
   * Here's how we can implement this:
   * ```ts
   * import { load } from '@norviah/config';
   * import type { JsonValue } from 'type-fest';
   *
   * interface Config {
   *   token: string;
   *   prefix: string;
   * }
   *
   * const config: Config = load<Config>(
   *   {
   *     token: {
   *       type: function (value: JsonValue): string | null {
   *         return typeof value === 'string' ? value : null;
   *       }
   *     },
   *
   *     prefix: {
   *       type: function (value: JsonValue): string | null {
   *         return typeof value === 'string' ? value : null;
   *       }
   *     }
   *   },
   *   { path: "./config.json" }
   * );
   *
   * console.log(config);
   * ```
   *
   * This example implements a custom constructor function for the two keys, the
   * functions ensures that the value set for the key is a string.
   *
   * As you can see, if you have multiple keys that are a primitive type, it can
   * be tedious to implement a constructor for each key. Instead, you can opt to
   * use a string to represent the value of the key. Here's how we can do that:
   *
   * ```ts
   * const config: Config = load<Config>(
   *   {
   *     token: {
   *       type: "string",
   *     },
   *
   *     prefix: {
   *       type: "string",
   *     }
   *   },
   *   { path: "./config.json" }
   * );
   * ```
   *
   * This is equivalent to the previous example, but it's much more consise.
   * Strings are used to *only* represent primitive types, so if you want to
   * represent anything else, you must use a constructor.
   *
   * These examples are rather simple, the main benefit of `type` comes from
   * defining keys with complex types. As constructors are manually defined, you
   * can implement any logic you want to form the value of the key.
   *
   * For example, let's say we want to define a configuraiton object for a
   * command-line application that will generate and build *something* based off
   * of an input file. The config will have two keys, `input` and `output`, with
   * `input` being a custom type. Here's how we can implement this:
   *
   * ```ts
   * import { existsSync, statSync } from 'fs';
   * import { baseName } from 'path';
   * import { load } from '@norviah/config';
   *
   * import type { Stats } from 'fs';
   * import type { JsonValue } from 'type-fest';
   *
   * interface File {
   *   path: string;
   *   fullName: string;
   *   info: Stats;
   * }
   *
   * interface Config {
   *   input: File;
   *   output: string;
   * }
   *
   * const config: Config = load<Config>(
   *   {
   *     input: {
   *       type: function (value: JsonValue): File | null {
   *         if (typeof value !== 'string') {
   *           return null;
   *         } else if (!existsSync(value) || !statSync(value).isDirectory() ) {
   *           return null;
   *         }
   *
   *         return { path: value, fullName: baseName(value), info: statSync(value) };
   *       }
   *     }.
   *
   *     output: {
   *       type: 'string',
   *     }
   *   },
   *   { path: './config.json' },
   * );
   * ```
   *
   * In this example, we are using a custom constructor to parse the value of
   * the `input` key into the custom `File` type, the constructor ensures that
   * the file exists and is a directory.
   *
   * Note how the constructor function is used to parse a JSON value into a
   * non-native JavaScript type. This is the main benefit of using a constructor
   * function, and it is also why it is recommended to use a custom constructor
   * than a built-in constructor, such as `String` or `Number`.
   */
  public static Import<T extends Record<string, any>, E extends boolean | undefined = undefined>(structure: Structure<T>, options: Options<E>): E extends true ? T : T & Record<string, any> {
    return Config.Parse<T>({ structure: structure, json: read(options.path) });
  }
}

interface Confi {
  prefix: string;
  parent: {
    child: {
      subchild: {
        subsubchild: string;
      };
    };
  };
}

const c = Config.Parse<Confi, true>({
  structure: {
    prefix: 'string',
    parent: {
      child: {
        subchild: {
          subsubchild: 'string',
        },
      },
    },
  },

  json: {
    prefix: 'D',
    parent: {
      child: {
        subchild: {
          subsubchild: '',
        },
      },
    },
  },

  enforce: true,
});

// const config = Config.Import<Structure<Config>>(
//   {
//     prefix: {
//       type: 'string',
//     },
//   },
//   {
//     path: './config.json',
//   }
// );
