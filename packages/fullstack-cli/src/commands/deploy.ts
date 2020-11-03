import AWS from 'aws-sdk';
import { spawn } from 'child_process';
import program from 'commander';
import Path from 'path';
import fs from 'mz/fs';
import {
  getSpawnOptions,
  getEnvSettings,
  cpToPromise,
  walk,
  getAppRoot,
  getStack,
  getStackOutput,
} from '../helper';
import { build as buildApp } from './build';
import mime from 'mime-types';

const s3 = new AWS.S3();

async function uploadS3(name: string, bucketName: string) {
  const [app, folder] = name.split('/');
  const frontRoot = getAppRoot(app);
  const buildDir = Path.join(frontRoot, folder);
  const files = walk(buildDir);

  await Promise.all(
    files
      .filter(path => !path.endsWith('.DS_Store'))
      .map(async filePath => {
        const contentType = mime.lookup(filePath);
        if (!contentType) {
          throw new Error('no contentType for ' + filePath);
        }
        const noCache =
          filePath.endsWith('.html') ||
          filePath.endsWith('app-data.json') ||
          filePath.includes('page-data');
        const file = Path.relative(buildDir, filePath);
        await s3
          .upload({
            Bucket: bucketName,
            Key: file.replace(/\\/g, '/'),
            Body: await fs.readFile(filePath),
            ContentType: contentType,
            CacheControl: noCache ? `max-age=0` : undefined,
          })
          .promise();
      })
  );
}

export function init() {
  program
    .command('deploy')
    .option('--prod', 'deploy to production')
    .option('--stage', 'deploy to stage')
    .option('--no-build', 'skip build')
    .action(async ({ prod, stage, build }) => {
      if (build) {
        const buildOptions = { prod, stage };
        await Promise.all([
          buildApp('blog', buildOptions),
          buildApp('api', buildOptions),
        ]);
      }
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
            },
            ...getSpawnOptions('deploy'),
          }
        )
      );
      const stack = await getStack(env.STACK_NAME || process.env.STACK_NAME!);
      await uploadS3('blog/public', getStackOutput(stack, 'blogDeployBucket'));
    });
}
