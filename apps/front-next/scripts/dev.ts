import { getConfig } from 'config';
import { runScript } from './run';

const config = getConfig('dev');
runScript(config, `yarn run next dev -p ${config.web.port}`, 'development');
