import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Sprawdź ile można użyć maksymalnie nominałow 100, później 50 itd. Użyj{' '}
      <Code>Math.floor</Code> i dzielenia, żeby sprawdzić ile można użyć
      maksymalnie danych banknotów. Następnie użyj modulo <Code>%</Code>, żeby
      obliczyć ile zostało reszty.
    </div>
  );
}
