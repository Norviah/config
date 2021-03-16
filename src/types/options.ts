export interface Options<T extends Record<string, any>> {
  /**
   * Represents the config's absolute path.
   */
  path?: string;

  /**
   * Represents default values for the config. If a config file doesn't exist,
   * this default object will be saved to the config's path. If this property
   * isn't given, the typings object will be saved instead.
   */
  default?: T;
}
