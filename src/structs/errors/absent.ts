import { ConfigError } from '../error';
import { Types } from '../../types/types';

export class AbsentError extends ConfigError {
  /**
   * Represents when, within the config, a key isn't set.
   * @param key  The key that hasn't been set.
   * @param type The correct type for the given key.
   */
  constructor(key: string, type: string | Types) {
    super(`The key '${key}' is missing within the config file, it should be of type \`${type}\`.`);
  }
}
