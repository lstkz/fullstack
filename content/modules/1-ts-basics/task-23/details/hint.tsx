import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Żeby znaleźć drugą największą liczbę w tablicy, stwórz zmienne{' '}
      <Code>max1</Code> i <Code>max2</Code>. Ustaw je na <Code>-Infinity</Code>.{' '}
      <Code>max1</Code> oznacza największą liczbę, a <Code>max2</Code> oznacza
      drugą największą. Następnie iteruj po tablicy. Jeżeli iterowana liczba
      jest większa od <Code>max1</Code>, to ustaw <Code>max1</Code> na tę
      liczbę, a <Code>max2</Code> na poprzednią wartość <Code>max1</Code>.
      Jeżeli iterowana liczba, jest mniejsza od <Code>max1</Code> i większa od{' '}
      <Code>max2</Code>, to ustaw <Code>max2</Code> na tę liczbę.
    </div>
  );
}
