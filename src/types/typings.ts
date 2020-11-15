import { Types } from './types';

/**
 * This interface represents the list of keys that is wanted within a config and
 * the desired type of each key.
 */
export interface Typings {
  [key: string]: Types | Types[];
}
