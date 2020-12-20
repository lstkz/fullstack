import Path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import program from 'commander';
import { cpToPromise, getModulePath } from '../helper';

export function init() {
  program
    .command('tests-info <moduleNr> <taskNr>')
    .action(async (moduleNr, taskNr) => {
      const { modulePath } = getModulePath(moduleNr);
      const basePath = Path.join(modulePath, `task-${taskNr}`, 'source');
      if (!fs.existsSync(basePath)) {
        throw new Error(`${basePath} does not exist!`);
      }
      return cpToPromise(
        spawn(
          'yarn',
          [
            'run',
            'jest',
            '--reporters="default"',
            '--reporters="fullstack-tester/dist/SetupReporter.js"',
          ],
          {
            env: process.env,
            shell: true,
            cwd: basePath,
            stdio: 'inherit' as const,
          }
        )
      );
    });
}
