import { path } from 'app-root-path';
import { join } from 'path';

/**
 * The absolute path for the project's root.
 */
export const root: string = path;

/**
 * The absolute path for the config directory.
 */
export const configDir: string = join(root, 'config');

/**
 * The absolute path for the config file.
 */
export const config: string = join(configDir, 'config.json');
