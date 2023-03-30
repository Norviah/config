interface BaseOptions {
  /**
   * The path to the JSON file.
   *
   * `dir` represents the absolute path to the JSON file to import.
   */
  path: string;

  /**
   *
   */
  enforce?: boolean | undefined;
}

export type Options<E extends boolean | undefined = undefined> = E extends undefined ? BaseOptions & { enforce?: undefined } : BaseOptions & { enforce: E };
