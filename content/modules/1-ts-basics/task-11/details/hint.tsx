import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Trzymaj obecną sub-tablice w pomocniczej zmiennej. Iteruj po każdym
      elemencie z <Code>arr</Code>. Jeżeli ostatni element z obecnej
      sub-tablicy, jest o jeden większy od obecnej liczby (iterowanej z{' '}
      <Code>arr</Code>), to dodaj ten element do sub-tablicy. W przeciwnym
      wypadku stwórz nową sub-tablice i dodaj ją do wyniku.
    </div>
  );
}
