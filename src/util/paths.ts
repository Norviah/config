import { path } from 'app-root-path';
import { join } from 'path';

/**
 * Represents the absolute path for this project's root directory.
 */
export const root: string = path;

/**
 * Represents the absolute path for the config directory.
 */
export const configDir: string = join(root, 'config');

/**
 * Represents the absolute path for the config file.
 */
export const config: string = join(configDir, 'config.json');
