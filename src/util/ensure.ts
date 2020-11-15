import { Types } from '../types/types';
import { check } from '../util/types';

/**
 * When JSON is imported as an object via a require import, it simply imports
 * that object as it is. The goal of this function is to ensure that the
 * imported object has the correct type for each key using the typings object
 * which is based off of an interface that can be used at runtime.
 * @param  object  The imported JSON object to check.
 * @param  typings The object which states each desired key and types.
 * @return         Either null to represent that types are valid, or a tuple to represent the key that has been set to an incorrect value.
 */
export function ensure<T>(object: T, typings: { [key in keyof Required<T>]: Types | Types[] }): [keyof T, any] | null {
  // First, we'll get a list of keys that are desired within the config file.
  const keys: (keyof T)[] = Object.keys(typings) as (keyof T)[];

  // With a list of keys, we can determine the desired types, by using the
  // typings parameter, and the actual value set within the config, by using
  // the object parameter.

  // For every key, we'll check to see if the correct type has been set. If an
  // incorrect type is set, we'll return a tuple representing the key itself
  // and the value that was set.

  for (const key of keys) {
    if (!check(object[key], typings[key])) {
      return [key, object[key]];
    }
  }

  return null;
}
