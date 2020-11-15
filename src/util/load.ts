import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { basename } from 'path';

import { AbsentError } from '../structs/errors/absent';
import { InvalidError } from '../structs/errors/invalid';
import { InvalidTypeError } from '../structs/errors/invalidType';
import { MissingError } from '../structs/errors/missing';

import { Options } from '../types/options';
import { Types } from '../types/types';

import { ensure } from '../util/ensure';
import { join } from '../util/join';
import { example } from '../util/example';
import { json } from '../util/json';

import * as paths from '../util/paths';

/**
 * Imports and returns the config file as an object based off of the given interface.
 * @param  typings         An object referencing each key within the desired interface, the value of each key should represent the desired value of the key.s
 * @param  options         Optional options.
 * @param  options.path    The path for the config file, defaults to 'config/config.json' within the project's root directory.
 * @param  options.default An object containing default values for your config file, this will be saved if a config file doesn't exist.
 * @return                 The config file saved to disk as an instance of the given interface.
 */
export function load<T>(typings: { [key in keyof Required<T>]: Types | Types[] }, options?: Options<T>): T {
  const path: string = options?.path ?? paths.config;

  if (!existsSync(path)) {
    // If the user doesn't have a config file saved, we'll create one using an
    // example for the user. First, we'll create an example object based from
    // the given typings object.

    // Before we save the example, we'll ensure the config's path exists.
    if (!existsSync(path.replace(basename(path), ''))) {
      mkdirSync(path.replace(basename(path), ''), { recursive: true });
    }

    writeFileSync(path, JSON.stringify(options?.default ?? example(typings), null, 2));

    // We'll inform the user to fill in the values, and then we'll quit the
    // program.
    throw new MissingError(path);
  }

  // Now that we now a config file exists, first, we'll import it into a
  // variable.
  const object: { [key in keyof T]: any } | null = json<T>(path);

  // If null is resolved, it isn't due to the path not existing, as we checked
  // for that possibility earlier, instead, it's due to the path not pointing to
  // a JSON file. So we'll throw that error now.
  if (!object) {
    throw new InvalidError(path);
  }

  const valid: [keyof T, any] | null = ensure<T>(object, typings);

  // If a value is returned from checking if the object has correct types, the
  // returned value is a tuple representing the key that has an incorrect type
  // set with the second element representing the value set for the key.
  if (valid) {
    // First, we'll get the desired type for the key with an incorrect value.
    let type: string | string[] = typings[valid[0]];

    // As multiple types may be used via an array, we'll ensure that the type is
    // wrapped within an array.
    type = Array.isArray(type) ? type : [type];

    // Next, we'll edit array types to 'an array of x' to be more descriptive
    // for the end user.
    type = type.map((type: string): string => type.replace(/^array<(\w+)>$/, 'an array of $1(s)'));

    // If the value of the key is undefined, meaning that the user did not set a
    // value for it in the config file, we'll inform them to do so. Otherwise,
    // we'll inform them to fix the value.
    const Error = valid[1] === undefined ? AbsentError : InvalidTypeError;

    throw new Error(valid[0] as string, join(type));
  }

  return object as T;
}
