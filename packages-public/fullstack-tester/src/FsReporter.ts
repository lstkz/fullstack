import chalk from 'chalk';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import Archiver from 'archiver';
import Path from 'path';
import tmp from 'tmp';
import type { AggregatedResult } from '@jest/test-result';
import type {
  Reporter,
  ReporterOnStartOptions,
  Context,
} from '@jest/reporters';
import { hashTestResults } from './serialize';
import { getApiClient } from './getApiClient';
import util from 'util';
import { getTaskInfo } from './getTaskInfo';

function _getSourceFiles(dir: string) {
  const results: Array<{ fullPath: string; stats: fs.Stats }> = [];
  const list = fs.readdirSync(dir);
  list.forEach(name => {
    if (
      ['__tests__', '.git', 'node_modules', '.log'].some(part =>
        name.endsWith(part)
      )
    ) {
      return;
    }
    const fullPath = Path.join(dir, name);
    var stats = fs.statSync(fullPath);
    if (stats && stats.isDirectory()) {
      results.push(..._getSourceFiles(fullPath));
    } else {
      if (stats.size > 256 * 1024 * 1024) {
        console.log(
          chalk.yellow(`ignoring file ${fullPath}. File too big (limit 256KB).`)
        );
      } else {
        results.push({ fullPath, stats });
      }
    }
  });
  return results;
}

async function _zipFolder(source: string, target: string) {
  return new Promise((resolve, reject) => {
    const archive = Archiver('zip', {});
    const output = fs.createWriteStream(target);
    output.on('close', resolve);
    output.on('error', reject);
    archive.pipe(output);
    const files = _getSourceFiles(source);
    files.forEach(({ fullPath, stats }) => {
      archive.file(fullPath, {
        name: Path.relative(source, fullPath),
        stats,
      });
    });
    archive.finalize();
  });
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
    if (
      results.numFailedTests ||
      results.numPendingTests ||
      results.numFailedTestSuites ||
      results.numRuntimeErrorTestSuites
    ) {
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
