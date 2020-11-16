import { spawn } from 'child_process';
import program from 'commander';
import { getSpawnOptions, cpToPromise, getEnvSettings } from '../helper';

export function init() {
  program
    .command('deploy-course <courseName>')
    .option('--prod', 'use prod settings')
    .option('--stage', 'use stage settings')
    .action(async (courseName, { prod, stage }) => {
      return cpToPromise(
        spawn('yarn', ['run', 'deploy'], {
          env: {
            ...process.env,
            ...getEnvSettings({ prod, stage }),
            COURSE_NAME: courseName,
          },
          ...getSpawnOptions('courses'),
        })
      );
    });
}
