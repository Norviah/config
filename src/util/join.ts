/**
 * Converts the given array into a string, having the items separated via a
 * comma with the last two element, if there's more than one, separated with or.
 *
 * @examples
 * join(['you', 'me']) => 'you or me'
 *
 * @param  array The array to convert to a string.
 * @param  word  The word to append before the last element in the string.
 * @return       A string representing the elements of the array.
 */
export function join(array: any[]): string {
  return array.join(', ').replace(/, ?([^,]*)$/, ` or $1`);
}
