import { Result } from '../types/result';
import { Types } from '../types/types';
import { Typings } from '../types/typings';
import { Strings } from '../types/typescript/strings';

import { validate } from './validate';

/**
 * Recursivelies determines if every property within the given object suffices
 * to the desired types determined by the typings object.
 * @param  object  The object to ensure.
 * @param  typings References the desired type for each property in the object.
 * @param  prop    Represents the current property this method is working on.
 * @return         If a property within the object isn't the correct type, an
 *                 object referencing the: key, value, and desired type is
 *                 returned, otherwise, undefined if all keys are properly set.
 */
export function ensure<T extends Record<string, any>>(object: Record<keyof T, any>, typings: Typings<T>, prop?: (keyof T)[]): Result<T> | Result<T[any]> | undefined {
  // First, we'll get a list of keys that are desired within the config file.
  const keys = Object.keys(typings) as (keyof T)[];

  // As we have a list of desired keys, we can determine the desired types for
  // each value by validating the set value using the typings object to
  // determine the desired type.

  // For every key, we'll determine if the correct type has been set. If a
  // incorrect type has been set, we'll return a tuple representing the key and
  // the value it has been set to.

  let result: Result<T> | Result<T[any]> | undefined;

  while (keys.length > 0 || !result) {
    // For every key within the desired typings object, we'll check it's type
    // within the given object.
    const key: keyof T | undefined = keys.shift();

    const types = (typeof typings[key as string] === 'object' ? null : Array.isArray(typings[key as string]) ? typings[key as string] : [typings[key as string]]) as
      | Strings<Types>[]
      | null;

    if (!key) {
      break;
    }

    // Before we check the elements type, we'll ensure that the element actually
    // exists within the given object.
    if ((Array.isArray(types) ? !types.includes('undefined') : true) && typeof object[key] === 'undefined') {
      result = { value: object[key], type: typings[key], key: prop ? [...prop, key] : [key] };
      break;
    }

    // Next, we'll check to see if the desired typing is an object. Arrays count
    // as objects and arrays are used to represent multiple different types, and
    // so we'll need to count for an array.
    if (typeof typings[key] === 'object' && !Array.isArray(typings[key])) {
      // Check to see if the type within the object isn't an object.
      if (typeof object[key] !== 'object' || Array.isArray(object[key])) {
        result = { value: object[key], type: typings[key], key: prop ? [...prop, key] : [key] };
        break;
      }

      // If this element is an object, we'll recall this method a level deeeper.
      else {
        result = ensure<T[any]>(object[key], typings[key] as Typings<T[any]>, prop ? [...prop, key] : [key]);

        if (result) {
          break;
        }
      }
    }

    // If the element isn't an object, we'll check its typings.
    else if (!validate(object[key], typings[key] as Strings<Types> | Strings<Types>[])) {
      result = { value: object[key], type: typings[key], key: prop ? [...prop, key] : [key] };
      break;
    }
  }

  return result;
}
