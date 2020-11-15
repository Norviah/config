export interface Options<T> {
  /**
   * Represents the config's absolute path.
   */
  path?: string;

  /**
   * If a user doesn't have a config set, this value could represent the default
   * object for the config file, which will be saved to the config's path.
   */
  default?: T;
}
