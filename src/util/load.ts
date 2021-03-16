import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { basename } from 'path';
import { inspect } from 'util';

import { AbsentError } from '../structs/errors/absent';
import { InvalidError } from '../structs/errors/invalid';
import { InvalidTypeError } from '../structs/errors/invalidType';
import { MissingError } from '../structs/errors/missing';

import { Options } from '../types/options';
import { Typings } from '../types/typings';
import { Result } from '../types/result';

import { ensure } from '../util/ensure';
import { join } from '../util/join';
import { json } from '../util/json';

import * as paths from '../util/paths';

export function load<T extends Record<string, any>>(typings: Typings<T>, options?: Options<T>): T {
  /**
   * Represents the absolute path for the config file.
   */
  const path: string = options?.path ?? paths.config;

  if (!existsSync(path)) {
    // If the user doesn't have a config file saved, we'll create one using
    // a default object, if one is given, or using the typings object itself.

    // Before we save, we'll ensure the config's full path exists.
    if (!existsSync(path.replace(basename(path), ''))) {
      mkdirSync(path.replace(basename(path), ''), { recursive: true });
    }

    writeFileSync(path, JSON.stringify(options?.default ?? typings, null, 2));

    // We'll inform the user to fill in the correct values for the config and
    // then we'll quit the program.
    throw new MissingError(path);
  }

  // As we know a config file does exist, we'll import it into a variable.
  const object: Record<string, any> | null = json(path);

  // If null is resolved, it isn't due to the path not existing, as we checked
  // for that possibility earlier, instead, it's due to the path not pointing to
  // a JSON file. So we'll throw that error now.
  if (!object) {
    throw new InvalidError(path);
  }

  // Next, we'll ensure that the imported config file has the correct types by
  // checking types using the given typings object.
  const result: Result<T> | Result<T[any]> | undefined = ensure<T>(object as Record<keyof T, any>, typings);

  // If a value is returned, that represents that some property within the
  // object is set to an incorrect type.
  if (result) {
    // Represents the desired type for the element.
    const type: string = Array.isArray(result.type) ? join(result.type) : typeof result.type === 'object' ? inspect(result.type) : result.type;

    // Depending on the type of the value, we'll throw a specific error.
    // Essentially, we'll check if the value exists to determine the error.
    const Error = result.value === undefined ? AbsentError : InvalidTypeError;

    throw new Error(result.key.join('.'), type);
  }

  return object as T;
}
