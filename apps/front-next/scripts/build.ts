import { getConfig } from 'config';
import { runScript } from './run';

const config = getConfig();
if (config.deploy.cdn) {
  process.env.CDN_DOMAIN = 'https://' + config.deploy.cdn.domainName;
}

runScript(config, 'yarn run next build', 'production');
