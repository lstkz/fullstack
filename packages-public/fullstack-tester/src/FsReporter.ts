import chalk from 'chalk';
import type { AggregatedResult } from '@jest/test-result';
import { Reporter, ReporterOnStartOptions, Context } from '@jest/reporters';
import { hashTestResults } from './serialize';

export default class MyCustomReporter implements Reporter {
  async onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
    if (results.numFailedTests || results.numPendingTests) {
      return;
    }
    console.log(hashTestResults(results));

    console.log(chalk.green('SUBMITTING RESULT...'));
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(chalk.green('SUBMITTING RESULT... SUCCESS'));
        resolve();
      }, 10000);
    });
  }

  async onRunStart(
    results: AggregatedResult,
    options: ReporterOnStartOptions
  ) {}

  getLastError() {
    return undefined;
  }
}
