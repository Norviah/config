import { Types } from './types';

/**
 * Represents the result of when a config has incorrect values set.
 */
export interface Result<T extends Record<string, any>> {
  /**
   * The key that had the incorrect value.
   */
  key: (keyof T | keyof T[any])[];

  /**
   * The incorrect value that was set to the key.
   */
  value: any;

  /**
   * The correct type for the key.
   */
  type: Types | Types[];
}
