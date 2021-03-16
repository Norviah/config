/**
 * Extracts strings within a given union type.
 */
export type Strings<T> = T extends string ? T : never;
