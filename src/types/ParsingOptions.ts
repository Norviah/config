// public static Parse<T extends Record<string, any>, E extends boolean | undefined = undefined>(structure: Structure<T>, json: JsonObject, parents?: string[]): T {

import type { Structure } from './Structure';
import type { JsonObject } from 'type-fest';

export interface BaseParsingOptions<T extends Record<string, any>> {
  /**
   *
   */
  structure: Structure<T>;

  /**
   *
   */
  json: JsonObject;

  /**
   *
   */
  parents?: string[];

  /**
   *
   */
  enforce?: boolean | undefined;
}

export type ParsingOptions<T extends Record<string, any>, E extends boolean | undefined = undefined> = E extends undefined
  ? BaseParsingOptions<T> & { enforce?: undefined }
  : BaseParsingOptions<T> & { enforce: E };
