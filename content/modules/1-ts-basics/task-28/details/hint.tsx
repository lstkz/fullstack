import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Zrób zmienną pomocniczą <Code>currentLength</Code>, która oznacza długość
      obecnego rosnącego ciągu, oraz zmienną <Code>maxLength</Code>, która
      oznacza wynik zadania. Iteruj po wszystkich elementach. Jeżeli element
      jest większy od poprzedniego, to zwiększ <Code>currentLength</Code> o 1, w
      przeciwnym wypadku ustaw <Code>currentLength = 1</Code>. Po każdej
      iteracji sprawdzaj czy <Code>currentLength</Code> jest większe od{' '}
      <Code>maxLength</Code>.
    </div>
  );
}
