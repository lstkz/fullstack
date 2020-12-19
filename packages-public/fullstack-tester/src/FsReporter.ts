import chalk from 'chalk';
import tar from 'tar';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import tmp from 'tmp';
import type { AggregatedResult } from '@jest/test-result';
import { Reporter, ReporterOnStartOptions, Context } from '@jest/reporters';
import { hashTestResults } from './serialize';
import { getApiClient } from './getApiClient';
import util from 'util';
import { getTaskInfo } from './getTaskInfo';

async function _zipFolder(source: string, target: string) {
  await new Promise(resolve =>
    tar
      .create(
        {
          gzip: true,
          portable: true,
          cwd: source,
          filter(path, stat) {
            if (
              ['__tests__', '.git', 'node_modules', '.log'].some(part =>
                path.endsWith(part)
              )
            ) {
              return false;
            }
            if (stat.size > 256 * 1024 * 1024) {
              console.log(
                chalk.yellow(
                  `ignoring file ${path}. File too big (limit 256KB).`
                )
              );
              return false;
            }
            return true;
          },
        },
        ['.']
      )
      .pipe(fs.createWriteStream(target))
      .on('close', resolve)
  );
}

async function _uploadS3(
  url: string,
  sourceFile: string,
  fields: Record<string, string>
) {
  const formData = new FormData();
  Object.keys(fields).forEach(name => {
    formData.append(name, fields[name]);
  });
  formData.append('file', fs.createReadStream(sourceFile));
  const contentLength = await util.promisify(
    formData.getLength.bind(formData)
  )();
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...formData.getHeaders(),
      'content-length': contentLength.toString(),
    },
    body: formData,
  });
  if (res.status !== 204) {
    console.log(await res.text());
    console.log(chalk.red('Failed to upload solution'));
    process.exit(1);
  }
}

export default class MyCustomReporter implements Reporter {
  async onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    if (results.wasInterrupted) {
      return;
    }
    if (results.numFailedTests || results.numPendingTests) {
      console.log(chalk.red('PLEASE FIX TESTS...'));
      return;
    }
    const resultHash = hashTestResults(results);
    results.testResults.forEach(testResult => {
      const stat = fs.statSync(testResult.testFilePath);
      if (stat.mtimeMs > results.startTime) {
        chalk.red('TESTS MODIFIED DURING TESTING. ABORTING.');
        process.exit(1);
      }
    });
    console.log(chalk.green('SUBMITTING RESULT...'));
    const api = await getApiClient();
    const {
      url: sourceUrl,
      key,
      fields,
    } = await api.module_getSolutionUploadUrl();
    const basePath = process.cwd();
    tmp.setGracefulCleanup();
    const tmpFile = tmp.fileSync();
    await _zipFolder(basePath, tmpFile.name);
    await _uploadS3(sourceUrl, tmpFile.name, fields);
    const { moduleId, taskId } = getTaskInfo();

    await api.module_submitSolution({
      moduleId: moduleId,
      taskId: taskId,
      resultHash,
      uploadKey: key,
    });
    console.log(chalk.green('👏 SUCCESS'));
  }

  async onRunStart(
    results: AggregatedResult,
    options: ReporterOnStartOptions
  ) {}

  getLastError() {
    return undefined;
  }
}
