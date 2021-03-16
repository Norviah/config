import { ConfigError } from '../error';

export class MissingError extends ConfigError {
  /**
   * Represents when a config file doesn't exist.
   * @param path The config's path.
   */
  constructor(path: string) {
    super(`A config file doesn't exist at '${path}', so one has been created for you. Please fill these values using the appropriate type.`);
  }
}
