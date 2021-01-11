import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Żeby zaokrąglić liczbę do p-tego miejsca po przecinku, musisz pomnożyć ją
      przez{' '}
      <Code>
        10<sup>p</sup>
      </Code>
      , wywołać <Code>Math.round</Code>, a następnie podzielić wynik przez{' '}
      <Code>
        10<sup>p</sup>
      </Code>
      .
      <br />
      <br />
      <Code>
        10<sup>p</sup>
      </Code>{' '}
      - oznacza 10 do potęgi p-tej. Potęgę możesz obliczyć za pomocą operatora{' '}
      <Code>**</Code>.
    </div>
  );
}
