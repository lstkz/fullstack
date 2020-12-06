import { getConfig } from 'config';
import { runScript } from './run';

const config = getConfig();
runScript(config, 'yarn run next build', 'production');
