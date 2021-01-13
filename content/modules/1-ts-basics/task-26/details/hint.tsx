import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Najprościej jest to rozbić na dwie osobne pętle <Code>for</Code>. Jedna od{' '}
      <Code>start</Code> do <Code>end</Code> z inkrementowaniem <Code>i</Code>{' '}
      dla <Code>{'start < end'}</Code>, lub drugą <Code>end</Code> do{' '}
      <Code>start</Code> z dekrementowaniem <Code>i</Code> dla{' '}
      <Code>{'start > end'}</Code>.
    </div>
  );
}
