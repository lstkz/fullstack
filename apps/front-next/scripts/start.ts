import { getConfig } from 'config';
import { runScript } from './run';

const config = getConfig();
runScript(config, `yarn run next start -p ${config.web.port}`, 'development');
