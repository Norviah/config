import { existsSync } from 'fs';

/**
 * Imports the given JSON path as an object.
 * @param  path The path to import.
 * @return      The given path as an object, or null if it doesn't exist.
 */
export function json<T>(path: string): T | null {
  return existsSync(path) && path.endsWith('.json') ? require(path) : null;
}
