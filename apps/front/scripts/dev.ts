import { getConfig } from 'config';
import { runScript } from './run';

const config = getConfig('dev');
runScript(config, 'yarn run webpack serve', 'development');
