import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Sprawdź czy prawdziwe są wszystko kombinacje boków:{' '}
      <Code>{'a + b > c'}</Code>, <Code>{'a + c > b'}</Code>,{' '}
      <Code>{'b + c > c'}</Code>.
    </div>
  );
}
