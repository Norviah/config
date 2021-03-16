import { existsSync } from 'fs';

/**
 * Imports the given JSON path as an object, if the path exists.
 * @param  path The path for the JSON file.
 * @return      The JSON object.
 */
export function json(path: string): Record<string, any> | null {
  return existsSync(path) && path.endsWith('.json') ? require(path) : null;
}
