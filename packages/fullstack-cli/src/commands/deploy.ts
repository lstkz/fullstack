import AWS from 'aws-sdk';
import { spawn } from 'child_process';
import program from 'commander';
import Path from 'path';
import fs from 'mz/fs';
import {
  getSpawnOptions,
  cpToPromise,
  walk,
  getAppRoot,
  getStack,
  getStackOutput,
} from '../helper';
import { build as buildApp } from './build';
import mime from 'mime-types';
import { getPasswordEnv } from 'config';

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
    .option('--stage', 'deploy to stage')
    .option('--no-build', 'skip build')
    .action(async ({ stage, build }) => {
      if (build) {
        const buildOptions = { stage };
        await Promise.all([buildApp('front', buildOptions)]);
      }
      const stackName = process.env.STACK_NAME ?? 'fs-dev-new';
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
              STACK_NAME: stackName,
              ...getPasswordEnv(stage ? 'stage' : undefined),
            },
            ...getSpawnOptions('deploy'),
          }
        )
      );
      const stack = await getStack(stackName);
      await uploadS3('front/build', getStackOutput(stack, 'appDeployBucket'));
    });
}
