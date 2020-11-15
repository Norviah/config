import { logger } from './logger';

export abstract class ConfigError extends Error {
  /**
   * The name of the Error, we'll have the name of this error, and the names of
   * child classes, to have a '[CONFIG]' before the name.
   */
  public name: string = `${logger.colorize('gray', '[CONFIG ERROR]')} ${this.constructor.name.replace('Error', '')}`;

  /**
   * When debugging errors, a stacktrace is extremely useful as it presents the
   * steps through execution that led to an error, however, errors thrown via
   * child classes are manual, so we don't need a stacktrace.
   */
  stack = undefined;

  constructor(public message: string) {
    super(message);
  }
}
