import Path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import crypto from 'crypto';
import type { AggregatedResult } from '@jest/test-result';
import { Reporter, ReporterOnStartOptions, Context } from '@jest/reporters';
import { hashTestResults } from './serialize';

interface TestsInfo {
  resultHash: string;
  files: Array<{
    path: string;
    hash: string;
  }>;
}
export function md5(data: string | Buffer) {
  return crypto.createHash('md5').update(data).digest('hex');
}

export function getAllFiles(
  baseDir: string,
  ignore?: (name: string) => boolean
) {
  const ret: string[] = [];
  const travel = (dirName: string) => {
    const list = fs.readdirSync(dirName);
    list
      .filter(x => !ignore || !ignore(x))
      .map(name => {
        const fullPath = Path.join(dirName, name);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          travel(fullPath);
        } else {
          ret.push(fullPath);
        }
      });
  };
  travel(baseDir);

  return ret;
}

export default class SetupReporter implements Reporter {
  onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    if (results.numFailedTests || results.numPendingTests) {
      return;
    }
    const resultHash = hashTestResults(results);
    const destFile = Path.join(process.cwd(), '..', 'tests-info.json');

    // const files = getAllFiles(Path.join(process.cwd(), '__tests__'));
    const files = getAllFiles(Path.join(process.cwd(), '__tests__')).map(
      filePath => {
        const fileHash = md5(fs.readFileSync(filePath));
        return {
          path: filePath.split('__tests__')[1],
          hash: fileHash,
        };
      }
    );
    const testsInfo: TestsInfo = {
      resultHash,
      files,
    };
    fs.writeFileSync(destFile, JSON.stringify(testsInfo, null, 2));
    console.log(chalk.green('Saved ' + destFile));
  }

  async onRunStart(
    results: AggregatedResult,
    options: ReporterOnStartOptions
  ) {}

  getLastError() {
    return undefined;
  }
}
