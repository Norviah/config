export enum ErrorCodes {
  /**
   * Represents the event where the JSON config file to import is missing.
   */
  JSON_NOT_FOUND = 'JSON_NOT_FOUND',

  /**
   * Represents the event where the JSON config file to import is not a JSON
   * file.
   */
  NON_JSON_FILE = 'NON_JSON_FILE',

  /**
   * Represents the event where the JSON config file to import is invalid,
   * mostly due to invalid JSON syntax.
   */
  INVALID_JSON = 'INVALID_JSON',

  /**
   * Represents the event where the type of a key in the JSON config file is
   * invalid.
   */
  INVALID_TYPE = 'INVALID_TYPE',

  /**
   * Represents the event where a key in the JSON config file was not found
   * while being required.
   */
  REQUIRED_KEY = 'REQUIRED_KEY',

  /**
   * Represents the event where a key in the JSON config file was not specified
   * in the provided schema.
   */
  UNKNOWN_KEY = 'UNKNOWN_KEY',

  /**
   * Represents the event where the type of the parent key of a key in the
   * JSON config file is invalid.
   */
  INVALID_PARENT_TYPE = 'INVALID_PARENT_TYPE',
}

export const MessageGenerator = {
  /**
   * Returns the error message for the `JSON_NOT_FOUND` error code.
   * @param path The path to the JSON file.
   * @returns The constructed error message.
   */
  JSON_NOT_FOUND: (path: string): string => {
    return `missing JSON config file at path \`${path}\``;
  },

  /**
   * Returns the error message for the `NON_JSON_FILE` error code.
   * @param path The path to the JSON file.
   * @returns The constructed error message.
   */
  NON_JSON_FILE: (path: string): string => {
    return `the file at path \`${path}\` is not a JSON file`;
  },

  /**
   * Returns the error message for the `INVALID_JSON` error code.
   * @param path The path to the JSON file.
   * @returns The constructed error message.
   */
  INVALID_JSON: (path: string): string => {
    return `invalid JSON config file at path \`${path}\``;
  },

  /**
   * Returns the error message for the `INVALID_TYPE` error code.
   * @param key The key that has an invalid type.
   * @param type The expected type of the key.
   * @returns The constructed error message.
   */
  INVALID_TYPE: (key: string, type: string): string => {
    return `the type of the key \`${key}\` is invalid, expected \`${type}\``;
  },

  /**
   * Returns the error message for the `REQUIRED_KEY` error code.
   * @param key The key that is required.
   * @param type The expected type of the key.
   * @returns The constructed error message.
   */
  REQUIRED_KEY: (key: string, type: string): string => {
    return `the key \`${key}\` is required, expected \`${type}\``;
  },

  /**
   * Returns the error message for the `UNKNOWN_KEY` error code.
   * @param key The key that is unknown.
   * @returns The constructed error message.
   */
  UNKNOWN_KEY: (key: string): string => {
    return `unexpected key \`${key}\``;
  },

  /**
   * Returns the error message for the `INVALID_PARENT_TYPE` error code.
   * @param key The key that has an invalid parent type.
   * @returns The constructed error message.
   */
  INVALID_PARENT_TYPE: (key: string): string => {
    return `the type of the parent key of \`${key}\` is invalid, expected an object`;
  },
};

export class ConfigError<T extends keyof typeof ErrorCodes> extends Error {
  /**
   * Represents the code for the thrown error.
   *
   * `code` allows for the possibility to identify the specific error that
   * occurred, which can be used to handle the error in a specific way.
   */
  public code: T;

  /**
   * Arguments passed to the error code.
   *
   * `ConfigError` represents errors that may occur when attempting to import
   * and parse a JSON config file, and as such, the error message for each error
   * code may require arguments to be passed to it.
   *
   * `args` represents the arguments passed to the error code.
   */
  public args: (typeof MessageGenerator)[T] extends (...args: infer P) => any ? P : undefined;

  /**
   * Initializes a new `ConfigError` instance.
   * @param code The code for the error.
   * @param args Any arguments to pass to the error code.
   */
  public constructor(code: T, args: (typeof MessageGenerator)[T] extends (...args: infer P) => any ? P : undefined) {
    const message: string = (MessageGenerator[code] as (...args: any[]) => string)(...(args as any[])) as string;

    super(`${code}: ${message}`);

    this.code = code;
    this.args = args;
  }

  /**
   * Determines the specific type of error that occured.
   *
   * When catching an instance of `ConfigError`, by default the type of the
   * error is unknown. `is` implements a type guard to determine the specific
   * type of error that occured, which can be used to handle the error in a
   * specific way.
   * @param code The code to check against.
   * @returns Whether if the error is of the specified type.
   * @example
   * ```ts
   * try {
   *   /* ... *\/
   * } catch (error) {
   *   if (error instanceof ConfigError && error.is(ErrorCodes.JSON_NOT_FOUND)) {
   *     /* Represents the error when the specified JSON file couldn't be found *\/
   *   }
   * }
   * ```
   * In the example above, the `is` check ensures that the error thrown is the
   * error `PARSING_ARGUMENT_ERROR`. This informs us of the error code and also
   * allows us to safely access the `args` property of the error.
   */
  public is<T extends ErrorCodes>(code: T): this is ConfigError<T> {
    return (this.code satisfies keyof typeof ErrorCodes) === code;
  }
}
