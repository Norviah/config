import { ConfigError } from '../error';
import { Types } from '../../types/types';

export class InvalidTypeError extends ConfigError {
  /**
   * Represents when, within the config, a key has been set to a wrong type.
   * @param key  The key with the incorrect type.
   * @param type The correct type for the key.
   */
  constructor(key: string, type: string | Types) {
    super(`The key '${key}' within the config file should be of type \`${type}\`, please fix this value and run this program again.`);
  }
}
