import { ConfigError } from '../error';

export class InvalidError extends ConfigError {
  /**
   * Represents when a config file exists, but it isn't a valid JSON file.
   * @param path The config's path.
   */
  constructor(path: string) {
    super(`The config file doesn't exist or it isn't a JSON file, please create a config file here '${path}' as JSON.`);
  }
}
