import { existsSync, readFileSync, statSync } from 'fs';
import { extname } from 'path';
import { ConfigError, ErrorCodes } from '../structs/ConfigError';

import type { JsonObject } from 'type-fest';

/**
 * Loads and imports a JSON file into an object.
 *
 * `read` takes a file path and attempts to import the file as a JSON object,
 * performing a series of checks to ensure the file is a valid JSON file.
 * @param path The file path to the JSON file.
 * @returns The JSON object imported from the file.
 */
export function read(path: string): JsonObject | never {
  if (!existsSync(path)) {
    throw new ConfigError(ErrorCodes.JSON_NOT_FOUND, [path]);
  } else if (statSync(path).isDirectory() || extname(path) !== '.json') {
    throw new ConfigError(ErrorCodes.NON_JSON_FILE, [path]);
  }

  let json: JsonObject;

  try {
    json = JSON.parse(readFileSync(path, 'utf-8'));
  } catch (error) {
    throw new ConfigError(ErrorCodes.INVALID_JSON, [path]);
  }

  return json;
}
