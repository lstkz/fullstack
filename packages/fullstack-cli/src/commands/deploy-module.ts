import { spawn } from 'child_process';
import program from 'commander';
import { getSpawnOptions, cpToPromise, getModulePath } from '../helper';

export function init() {
  program
    .command('deploy-module <moduleNr>')
    .option('--prod', 'use prod settings')
    .option('--stage', 'use stage settings')
    .action(async (moduleNr, { prod, stage }) => {
      const { moduleName } = getModulePath(moduleNr);
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
