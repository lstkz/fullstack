import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Sprawdzaj po kolei wszystkie możliwości zaokrągleń, zaczynając od
      najwyższego <Code>6</Code>, później <Code>5</Code> itd., aż do{' '}
      <Code>0</Code>.
    </div>
  );
}
