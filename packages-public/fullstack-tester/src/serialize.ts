import type { AggregatedResult } from '@jest/test-result';
import hash from './hash/hash';
import { secret } from './secret';

function xor(str: string) {
  const input = Buffer.from(str, 'ascii');
  const length = Math.max(input.length, secret.length);
  const buffer = Buffer.allocUnsafe(length);
  for (var i = 0; i < length; ++i) {
    buffer[i] = input[i] ^ secret[i];
  }
  return buffer.toString('hex');
}

export function hashTestResults(results: AggregatedResult) {
  const serialized = results.testResults
    .map(testResult => {
      return {
        file: testResult.testFilePath.split('__tests__')[1],
        items: testResult.testResults
          .map(x => xor(x.fullName))
          .sort((a, b) => a.localeCompare(b)),
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file));
  serialized.forEach(x => {
    x.file = xor(x.file + x.file);
  });
  const sha256 = hash.sha256();
  return sha256.update(JSON.stringify(serialized)).digest('hex');
}
