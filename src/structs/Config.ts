import { Options } from '../types/Options';
import { read } from '../util/read';
import { typeName } from '../util/typeName';
import { ConfigError, ErrorCodes } from './ConfigError';
import { isKeyOptions } from '../util/isKeyOptions';

import type { JsonValue } from 'type-fest';
import type { NullableConstructor } from '../types/NullableConstructor';
import type { ParsingOptions } from '../types/ParsingOptions';
import type { Primitive, ToString, TypeMappings } from '../types/Primitive';
import type { KeyOptions, Structure } from '../types/Structure';

export class Config {
  /**
   * Ensures that the provided value is an instance of the specified
   * _primitive_, type.
   *
   * `Ensure` is a type guard that ensures the provided value is of the
   * specified primitive type, implementing an `instanceof` check to ensure
   * this. As this method implements a type guard, it can be used to narrow
   * the type of the provided value.
   *
   * Note that this method only considers primitive types, and will not
   * consider any other type.
   * @template T The primitive type(s) to check against.
   * @param value The value to check
   * @param type The type to check against
   * @returns `true` if the value is an instance of the specified type.
   * ```ts
   * const variable: unknown = 'Hello, world!';
   *
   * if (Config.Ensure(variable, ['string', 'boolean'])) {
   *   /* in this scope, `variable` is ensured to be a string or a boolean *\/
   * }
   * ```
   */
  public static Ensure<T extends Primitive>(value: unknown, type: T | T[]): value is TypeMappings[T] {
    return (Array.isArray(type) ? type : [type]).includes(typeof value as T);
  }

  /**
   * Casts the value into the specified type.
   *
   * Attempts to cast the provided JSON value into the desired type by using the
   * information provided in options. `options` represents important information
   * about the key, we will use this information to determine how to parse the
   * value.
   * @template T The desired type of the value.
   * @param pair The key and value to cast.
   * @param options The options for the key.
   * @returns An object representing the result of the cast.
   */
  public static Cast<T>(pair: [string[], JsonValue | undefined], options: KeyOptions<T>): T {
    const value: JsonValue | undefined = pair[1];

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
   * A helper method for parsing a JSON object into an instance of `T`.
   *
   * This method is used internally by the `Parse` method to implement the
   * logic of recursively parsing a JSON object into an instance of `T`. During
   * the parsing process, for a given key, this method will determine if the key
   * represents a recursive structure, or if the key represents an actual key to
   * be parsed.
   *
   * If the key represents a recursive structure, this method will recursively
   * call the `Parse` method to parse the value of the key into an instance of
   * the specified structure.
   * @template T The type of the JSON object.
   * @param options Options for parsing.
   * @returns The parsed value of the key.
   */
  private static Helper<T extends Record<string, any>>(options: { parents?: string[]; enforce?: boolean; key: Extract<keyof T, string>; json: JsonValue | undefined; structure: Structure<T> }): T {
    const { key, json, parents, enforce } = options;

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

    let structure = options.structure as KeyOptions<T[keyof T]> | ToString<T[keyof T]> | NullableConstructor<T[keyof T]> | Structure<T[keyof T]>;

    // Note that the first two types essentially represent the same thing, as
    // the second type allows the user to quickly specify the desired type of
    // the key, without having to specify an object.

    // From this, we will convert the variable into a `KeyOptions<T>`
    // instance, if the key represents the second type.

    if (Array.isArray(structure) || typeof structure === 'string' || typeof structure === 'function') {
      structure = { type: structure } as KeyOptions<T[keyof T]>;
    }

    // At this point, we'll need to determine whether if the key represents a
    // nested object or an actual key that is expected to be set within the
    // JSON object. `structure` can be either a `KeyOptions<T>` instance, which
    // represents an actual key, or a `Config` instance, which represents a
    // nested object.

    // Ensuring that the value represents options for a key, and not a nested
    // object, is done by the `IsKeyOptions` method. If the value represents
    // options for a key, we'll cast the value into the desired type, returning
    // the resolved value.

    if (isKeyOptions(structure)) {
      return Config.Cast<T[keyof T]>([parents ? [...parents, key] : [key], json], structure);
    }

    // If the value represents a nested object, we'll need to recursively call
    // the `Parse` method to parse the subobject into an instance of the
    // desired structure.

    // Before we do that, we'll need to ensure that the value specified within
    // the JSON object, if a value is specified, is an object. If the value is
    // not an object, we'll throw an error, as the value is not valid.

    if (json && (typeof json !== 'object' || Array.isArray(json))) {
      throw new ConfigError(ErrorCodes.INVALID_PARENT_TYPE, [`${parents ? `${parents.join('.')}.` : ''}${String(key)}`]);
    }

    return Config.Parse({ structure, json, enforce, parents: parents ? [...parents, String(key)] : [String(key)] } as ParsingOptions<T[keyof T]>);
  }

  /**
   * Parses the provided JSON object into an instance of `T`.
   *
   * The main entry point for the library, `Parse` will attempt to parse the
   * provided JSON object into an instance of the specified interface. The
   * method will recursively iterate through the JSON object in tandem with the
   * define structure, attempting to parse each key's value into the type
   * specified in the structure.
   *
   * When parsing a JSON object, you **must** provide a structure object for the
   * desired interface, this object will define how each key within the
   * interface should be parsed along with any additional options.
   * @template T The desired structure to parse the JSON object into.
   * @param options Options for parsing.
   * @returns An instance of `T` with the values parsed from the provided JSON
   * object.
   * @example
   * In order to properly call the `Parse` method, we must first define an
   * interface to base the desired result on. As a basic example, we'll define
   * a simple interface for a configuration file of a Discord bot.
   *
   * ```ts
   * interface BotConfig {
   *   id: string;
   *   token: string;
   *   settings: {
   *     mentionAll?: boolean;
   *   }
   * }
   * ```
   *
   * Once we have defined the interface, we can then call the `Parse` method,
   * providing a structure object to define how each key within the interface
   * should be parsed.
   *
   * ```ts
   * const config: Config = Config.Parse<BotConfig>(
   *   {
   *     id: {
   *       type: 'string',
   *     },
   *     token: {
   *       type: 'string',
   *     },
   *     settings: {
   *       mentionAll: {
   *         type: 'boolean',
   *         optional: true
   *       },
   *     },
   *   },
   *
   *   {
   *     /* the JSON object *\/
   *   }
   * );
   * ```
   *
   * If the JSON object is valid and no errors are encountered, the `Parse`
   * method will return an instance of the specified interface. From there, we
   * can access the properties of the object as we would normally.
   *
   * > Note: If you wish to mark something as optional, you **must** only mark
   * > a key as optional, not a parent key. Parents that are marked as optional
   * > will not be treated as optional, they will be treated as a required
   * > property.
   *
   * As previously mentioned, the above example is a basic example of how to
   * use the `Parse` method. The potential of the library lies when you provide
   * a custom constructor for a key, allowing you to implement the logic of how
   * to parse the value of a key.
   *
   * For this more advanced example, we'll be creating a configuration file for
   * a build script which will do _something_ with a file as an input. The
   * configuration file will allow the user to specify the path to the input
   * file, here is how we can implement this.
   *
   * ```ts
   * import { existsSync, statSync } from 'fs';
   *
   * import type { Stats } from 'fs';
   * import type { JsonValue } from 'type-fest';
   * import type { Structure } from '@norviah/config';
   *
   * interface BuildConfig {
   *   input: Stats;
   * }
   *
   * const structure: Structure<BuildConfig> = {
   *   input: {
   *     type: function (value: JsonValue): Stats | null {
   *       if (typeof value !== 'string') {
   *         return null;
   *       } else if (!existsSync(value) || !statSync(value).isFile()) {
   *         return null;
   *       }
   *
   *       return statSync(value);
   *     },
   *   },
   * };
   *
   * const config = Config.Parse<BuildConfig>(structure, { /* ... *\/ }});
   * ```
   *
   * In the above example, we've defined a custom constructor for the `input`
   * key, which will attempt to parse the value of the key into a `Stats`
   * instance. If the value is not a string, or the path does not exist, or the
   * path is not a file, the constructor will return `null`, which will cause
   * the `Parse` method to throw an error.
   *
   * Here is the main potential of the library, you can define a custom
   * constructor which can cast the value of a key into any type you wish,
   * using any logic you wish, such as an API call.
   */
  public static Parse<T extends Record<string, any>>(options: ParsingOptions<T>): T {
    const { structure, json, parents } = options;

    // The container for the resulting parsed object, while iterating thorugh
    // the JSON object, each parsed value will be set within this container.
    const result: Record<string, any> = {};

    // Initially, all we know of the provided JSON object is that it is a valid
    // JSON object. We aren't sure of anything regarding the structure of the
    // object and its keys.

    // In order to parse the object into an instance of `T`, we will iterate
    // through each key within the structur in tandem with the JSON obejct, for
    // each key, we will attempt to parse the value of the key into the
    // specified type.

    for (const key in options.structure) {
      // If the key is not a property of the structure, we will skip it. This
      // is to prevent any potential errors that may occur if the structure
      // object contains any inherited properties.
      if (!options.structure.hasOwnProperty(key)) {
        continue;
      }

      result[key] = Config.Helper<T[keyof T]>({
        key,
        structure: structure[key] as Structure<T[keyof T]>,
        json: json ? json[key] : undefined,
        parents: parents,
      });
    }

    // After we have iterated through the structure, parsing each key and saving
    // the resolved value into the result container, we'll check if the user has
    // set the `enforce` option.

    // If this option is set, the user wants to ensure that the JSON object has
    // no unknown keys, essentially enforcing that no unknown keys have been set
    // by the json object. If set, we'll iterate through each key within the
    // JSON object and check if the key also exists within the structure.

    if (options.enforce) {
      for (const key in options.json) {
        if (!options.structure.hasOwnProperty(key)) {
          throw new ConfigError(ErrorCodes.UNKNOWN_KEY, [`${options.parents ? `${options.parents.join('.')}.` : ''}${key}`]);
        }
      }
    }

    return result as T;
  }

  /**
   * Imports a JSON object from the specified path and parses it into an
   * instance of `T`.
   *
   * `Import` will attempt to read the JSON object from the specified path and
   * pass it to the `Parse` method, providing the necessary arguments to the
   * method. Once parsed, the resulting object will be an instance of `T` with
   * the values parsed from the JSON object.
   *
   * As this method is essentially a wrapper around the `Parse` method, please
   * refer to the documentation for the <code>{@link Config.Parse}</code> method
   * for more information and examples.
   * @template T The desired structure to parse the JSON object into.
   * @param structure The structure that defines each key within `T`.
   * @param options The options to use when importing the JSON object.
   * @returns An instance of `T` with the values parsed from the JSON object.
   */
  public static Import<T extends Record<string, any>>(structure: Structure<T>, options: Options): T {
    return Config.Parse<T>({ structure, json: read(options.path), enforce: options.enforce } as ParsingOptions<T>);
  }
}
