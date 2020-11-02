import { spawn } from 'child_process';
import program from 'commander';
import {
  getSpawnOptions,
  getEnvSettings,
  cpToPromise,
  updateEnvSettings,
  getStack,
  getStackOutput,
} from '../helper';

export function init() {
  program
    .command('init')
    .option('--prod', 'deploy to production')
    .option('--stage', 'deploy to stage')
    .action(async ({ prod, stage }) => {
      const env = getEnvSettings({ prod, stage });

      await cpToPromise(
        spawn(
          'cdk',
          [
            'deploy',
            '--app',
            '"yarn workspace deploy run ts-node -T src/MainStack"',
          ],
          {
            env: {
              ...process.env,
              ...env,
              INIT_STACK: '1',
            },
            ...getSpawnOptions('deploy'),
          }
        )
      );
      const stack = await getStack(env.STACK_NAME);
      const getOutput = (name: string) => {
        return getStackOutput(stack, name);
      };
      env.API_URL = getOutput('apiUrl');
      env.S3_BUCKET_NAME = getOutput('bucketName');
      env.TOPIC_ARN = getOutput('topicArn');
      env.TABLE = getOutput('table');

      const addDefault = (name: string) => {
        if (!env[name]) {
          env[name] = '';
        }
      };

      addDefault('API_TOKEN');

      updateEnvSettings({ prod, stage }, env);
    });
}
