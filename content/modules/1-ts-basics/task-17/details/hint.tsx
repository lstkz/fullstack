import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Podziel tablice na trzy sub-tablice. Pierwsza - od indeksu 0 do{' '}
      <Code>start - 1</Code>. Druga - od <Code>start</Code> do <Code>end</Code>.
      Trzecia - od <Code>end + 1</Code> do końca tablicy. Druga tablica zawiera
      fragment, który musi być odwrócony. Użyj na nim metody{' '}
      <Code>reverse</Code>, a następnie połącz trzy tablice, używając operatora
      spread <Code>...</Code>.
    </div>
  );
}
