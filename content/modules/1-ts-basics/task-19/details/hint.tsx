import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Stwórz, pomocniczą tablicę <Code>prefixSums</Code>, która będzie zawierać
      sumę prefiksową dla tablicy <Code>arr</Code>.<Code>prefixSums[i]</Code>{' '}
      oznacza sumę od <Code>arr[0]</Code> do <Code>arr[i - 1]</Code>. Tablica
      prefiksów, powinna mieć jeden element więcej niż <Code>arr</Code>, a
      pierwszy element to zawsze <Code>0</Code>.
      <br />
      Następnie sprawdź wszystkie kombinacje zakresów, używając dwóch pętel.
      Sprawdź, czy <Code>prefixSums[j] - prefixSums[i] == sum</Code>. Jeżeli
      tak, to znaczy, że szukany zakres jest od <Code>i</Code> do{' '}
      <Code>j - 1</Code>.
    </div>
  );
}
