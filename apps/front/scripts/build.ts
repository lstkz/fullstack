import { getConfig } from 'config';
import { runScript } from './run';
import { fixTestConfig } from './_utils';

const config = getConfig();
if (config.deploy?.cdn) {
  process.env.CDN_DOMAIN = 'https://' + config.deploy.cdn.domainName;
}
fixTestConfig(config);

runScript(config, 'yarn run next build', 'production');
