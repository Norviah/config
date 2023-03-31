import type { KeyOptions } from '../types/Structure';

/**
 * Returns a string representation of the provided type.
 *
 * A quick and dirty way to get a string representation of the provided type,
 * the function will return the `typeName` property if it exists, otherwise it
 * infer the name from the `type` property.
 * @param options The options for the key.
 * @returns A string representation of the provided type.
 */
export function typeName<T>(options: KeyOptions<T>): string {
  return options.typeName || (typeof options.type === 'string' ? options.type : Array.isArray(options.type) ? options.type.join(' | ') : options.type.name);
}
