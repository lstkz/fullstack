import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Stwórz zmienną <Code>max1</Code> i ustaw ją na <Code>-Infinity</Code>.
      Iteruj po pierwszej tablicy i porównaj element ze zmienną{' '}
      <Code>max1</Code>. Jeżeli jest większy to ustaw wartość <Code>max1</Code>{' '}
      na ten element.
      <br />
      Stwórz zmienna <Code>max2</Code> i napisz analogiczny kod dla drugiej
      tablicy.
    </div>
  );
}
