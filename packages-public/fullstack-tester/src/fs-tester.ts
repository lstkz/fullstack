import Path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { spawn } from 'child_process';
import tar from 'tar';
import fetch from 'node-fetch';
import { getApiClient } from './getApiClient';
import crypto from 'crypto';
import { getTaskInfo } from './getTaskInfo';

export function md5(data: string | Buffer) {
  return crypto.createHash('md5').update(data).digest('hex');
}

function _getTestRelativePath(fileName: string) {
  return Path.join('__tests__', fileName);
}

async function start() {
  const api = getApiClient();
  const { moduleId, taskId } = getTaskInfo();
  const testInfo = await api.module_getTaskTestInfo(moduleId, taskId);
  let revertFiles: string[] = [];
  testInfo.testFiles.forEach(item => {
    const basePath = _getTestRelativePath(item.path);
    const filePath = Path.join(process.cwd(), basePath);
    if (!fs.existsSync(filePath)) {
      revertFiles.push(basePath);
      console.log(chalk.yellow(`File ${basePath} missing. Reverting...`));
    } else {
      const fileHash = md5(fs.readFileSync(filePath));
      if (fileHash !== item.hash) {
        revertFiles.push(basePath);
        console.log(chalk.yellow(`File ${basePath} changed. Reverting...`));
      }
    }
  });
  if (revertFiles.length) {
    const res = await fetch(testInfo.sourceUrl);
    const stream = tar.extract({
      filter: path => {
        return revertFiles.includes(path);
      },
    });
    await new Promise(resolve => {
      stream.on('finish', resolve);
      res.body.pipe(stream);
    });
  }
  spawn(
    'yarn',
    [
      'run',
      'jest',
      '--reporters="default"',
      '--reporters="fullstack-tester/dist/FsReporter.js"',
      '--runTestsByPath=true',
      ...testInfo.testFiles.map(
        item => `--testPathPattern=${_getTestRelativePath(item.path)}`
      ),
    ],
    {
      env: process.env,
      shell: true,
      stdio: 'inherit' as const,
    }
  );
}

start().catch(e => {
  chalk.red('An error occurred.');
  console.error(e);
  process.exit(1);
});
