import { spawn } from 'child_process';
import program from 'commander';
import { getSpawnOptions, cpToPromise } from '../helper';

export function init() {
  program
    .command('deploy-module <moduleName>')
    .option('--prod', 'use prod settings')
    .option('--stage', 'use stage settings')
    .action(async (moduleName, { prod, stage }) => {
      return cpToPromise(
        spawn('yarn', ['run', 'deploy'], {
          env: {
            ...process.env,
            CONFIG_NAME: prod ? 'prod' : stage ? 'stage' : '',
            MODULE_NAME: moduleName,
          },
          ...getSpawnOptions('content'),
        })
      );
    });
}
