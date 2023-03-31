export interface Options {
  /**
   * The path to the JSON file.
   *
   * `dir` represents the absolute path to the JSON file to import.
   */
  path: string;

  /**
   * Whether if the JSON object should be enforced.
   *
   * If set, the parser will throw an error if the JSON object contains any
   * keys that are not defined in the desired interface.
   */
  enforce?: boolean;
}
