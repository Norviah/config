import { Strings } from './typescript/strings';

/**
 * Represents the possible types that is supported within a config file.
 */
export type Types = 'string' | 'number' | 'boolean' | 'undefined' | 'number[]' | 'string[]' | 'boolean[]' | { [key: string]: Types | Strings<Types>[] };
