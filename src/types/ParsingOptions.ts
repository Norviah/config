import type { Structure } from './Structure';
import type { JsonObject } from 'type-fest';

export interface ParsingOptions<T extends Record<string, any>> {
  /**
   * The structure to use for parsing the JSON object.
   *
   * `structure` represents the desired structure for the resulting object after
   * parsing, each key in the structure defines how each the respective key in
   * the resulting object should be parsed.
   */
  structure: Structure<T>;

  /**
   * The JSON object to parse.
   */
  json: JsonObject;

  /**
   * The parents of the current object being parsed.
   *
   * This is used internally to keep track of the current path of the object
   * during recursive parsing.
   */
  parents?: string[];

  /**
   * Whether to enforce the structure.
   *
   * If `true`, the parser will throw an error if the JSON object contains any
   * keys that are not defined in the structure.
   */
  enforce?: boolean;
}
