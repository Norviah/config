import { Types } from '../types/types';

/**
 * As this project uses a config object to set values, and TypeScript doesn't
 * determine typings at run time, we'll be using this set to determine if a
 * given element is a certain type.
 */
const types: { [key in Types]: (element: any) => boolean } = {
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
   * type: array<number>
   * Determines if the given element is an array containing only numbers.
   */
  'array<number>': (element: any): boolean => {
    return Array.isArray(element) && element.every((entry: any): boolean => typeof entry === 'number');
  },

  /**
   * type: array<string>
   * Determines if the given element is an array containing only strings.
   */
  'array<string>': (element: any): boolean => {
    return Array.isArray(element) && element.every((entry: any): boolean => typeof entry === 'string');
  },

  /**
   * type: array<boolean>
   * Determines if the given element is an array containing only booleans.
   */
  'array<boolean>': (element: any): boolean => {
    return Array.isArray(element) && element.every((entry: any): boolean => typeof entry === 'boolean');
  },
};

/**
 * Determines if the given element is any of the desired types.
 * @param  element The element to check.
 * @param  list    The list of types to ensure the element complies with.
 * @return         Determines if the element's type exists within the list.
 */
export function check(element: any, type: Types | Types[]): boolean {
  // As multiple desired types can be given within an array, we'll check if a
  // single type is  given and cast it into an array so we can deal a single
  // solution to check the type if either a string or an array is given.
  type = Array.isArray(type) ? type : [type];

  return type.map((type: Types) => types[type](element)).some((entry: boolean) => entry === true);
}
