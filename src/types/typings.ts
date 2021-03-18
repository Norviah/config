import { Types } from './types';
import { Strings } from './typescript/strings';

type Values = Strings<Types> | Strings<Types>[];
type Objects = 'object<string>' | 'object<number>' | 'object<boolean>' | ('object<string>' | 'object<number>' | 'object<boolean>')[];

/**
 * As TypeScript only exists within compile time, we'll need a type to reference
 * desired types of a given interface within runtime.
 */
export type Typings<T extends Record<string, any>> = {
  [K in keyof Required<T>]: T[K] extends Record<string, unknown> ? Typings<T[K]> | Objects : Values;
};
