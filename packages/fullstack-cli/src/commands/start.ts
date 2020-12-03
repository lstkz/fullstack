import { spawn } from 'child_process';
import program from 'commander';
import { validateApp, getSpawnOptions, getEnvSettings } from '../helper';

export function init() {
  program
    .command('start <app>')
    .option('-p, --prod', 'start in production mode')
    .option('-b, --build', 'build app before starting')
    .action(async (app, { prod, build }) => {
      let isWorker = app === 'worker';
      if (isWorker) {
        app = 'api';
      }
      validateApp(app);
      const env = getEnvSettings({});
      spawn(
        'yarn',
        ['run', prod ? (isWorker ? 'start:worker' : 'start') : 'dev'],
        {
          env: {
            ...process.env,
            ...env,
          },
          ...getSpawnOptions(app),
        }
      );
    });
}
