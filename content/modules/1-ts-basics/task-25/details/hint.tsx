import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Występuje pewien schemat w generowaniu jedynek i zer (zakładamy, że poziom
      1 to czubek).
      <br />
      Poziom 1 zawiera <Code>n - 1</Code> zer.
      <br />
      Poziom 2 zawiera <Code>n - 2</Code> zer.
      <br />
      Poziom 3 zawiera <Code>n - 2</Code> zer itd.
      <br />
      Poziom 1 zawiera <Code>1</Code> jedynkę.
      <br />
      Poziom 2 zawiera <Code>3</Code> jedynki.
      <br />
      Poziom <Code>i</Code> zawiera <Code>1 + (i - 1) * 2</Code> jedynek.
    </div>
  );
}
