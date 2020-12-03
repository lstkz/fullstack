import { spawn } from 'child_process';
import program from 'commander';
import {
  validateApp,
  getSpawnOptions,
  cpToPromise,
  initConfig,
} from '../helper';

export function build(app: string, { stage }: { stage?: boolean }) {
  validateApp(app);
  const config = initConfig(stage);
  return cpToPromise(
    spawn('yarn', ['run', 'build'], {
      env: {
        ...process.env,
        BUGSNAG_API_KEY: config.bugsnag.frontKey.toString(),
        GITHUB_CLIENT_ID: config.github.clientId,
        GOOGLE_CLIENT_ID: config.google.clientId,
        API_URL: config.apiBaseUrl,
        PROTECTED_BASE_URL: '/',
      },
      ...getSpawnOptions(app),
    })
  );
}

export function init() {
  program
    .command('build <app>')
    .option('--stage', 'use stage settings')
    .action(async (app, { stage }) => {
      validateApp(app);
      await build(app, { stage });
    });
}
