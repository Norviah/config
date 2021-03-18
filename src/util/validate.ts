import { Types } from '../types/types';
import { Strings } from '../types/typescript/strings';

/**
 * As this project uses a config object to set values, and TypeScript doesn't
 * determine typings at run time, we'll be using an object to determine if a
 * given element is a certain type.
 */
const checks: { [key in Strings<Types>]: (element: any) => boolean } = {
  /**
   * type: string
   * Determines if the given element is a string.
   */
  string: (element: any): boolean => !Array.isArray(element) && typeof element === 'string',

  /**
   * type: number
   * Determines if the given element is a number.
   */
  number: (element: any): boolean => !Array.isArray(element) && typeof element === 'number',

  /**
   * type: boolean
   * Determines if the given element is a boolean.
   */
  boolean: (element: any): boolean => !Array.isArray(element) && typeof element === 'boolean',

  /**
   * type: undefined
   * Determines if the given element is undefined.
   */
  undefined: (element: any): boolean => typeof element === 'undefined',

  /**
   * type: number[]
   * Determines if the given element is an array containing only numbers.
   */
  'number[]': (element: any): boolean => {
    return Array.isArray(element) && element.every((entry: any): boolean => typeof entry === 'number');
  },

  /**
   * type: string[]
   * Determines if the given element is an array containing only strings.
   */
  'string[]': (element: any): boolean => {
    return Array.isArray(element) && element.every((entry: any): boolean => typeof entry === 'string');
  },

  /**
   * type: boolean[]
   * Determines if the given element is an array containing only booleans.
   */
  'boolean[]': (element: any): boolean => {
    return Array.isArray(element) && element.every((entry: any): boolean => typeof entry === 'boolean');
  },

  /**
   * type: object<string>
   * Determines if the given element is an object where every value is a string.
   */
  'object<string>': (element: any): boolean => {
    return typeof element === 'object' && !Array.isArray(element) && Object.values(element).every((value: any) => typeof value === 'string');
  },

  /**
   * type: object<number>
   * Determines if the given element is an object where every value is a number.
   */
  'object<number>': (element: any): boolean => {
    return typeof element === 'object' && !Array.isArray(element) && Object.values(element).every((value: any) => typeof value === 'number');
  },

  /**
   * type: object<boolean>
   * Determines if the given element is an object where every value is a
   * boolean.
   */
  'object<boolean>': (element: any): boolean => {
    return typeof element === 'object' && !Array.isArray(element) && Object.values(element).every((value: any) => typeof value === 'boolean');
  },
};

/**
 * Determines if the given element is the desired type.
 * @param  element The element to check.
 * @param  type    The type(s) to check for the given element.
 * @return         Represents if the given element is the desired type.
 */
export function validate(element: any, type: Strings<Types> | Strings<Types>[]): boolean {
  // As multiple types can be given, if a single type is given, we'll cast it
  // into an array to have one solution for both possibilities.
  type = Array.isArray(type) ? type : [type];

  // Next, we'll determine if the given element is one of the desired type.
  return type.some((type: Strings<Types>): boolean => checks[type](element) === true);
}
