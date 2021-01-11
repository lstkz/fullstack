import React from 'react';
import { Code } from 'ui';

export function Hint() {
  return (
    <div>
      Stwórz tablicę stanu światełek. Powinna mieć dokładnie{' '}
      <Code>lightCount</Code> elementów. Ustaw każdy element na <Code>0</Code>.
      Następnie iteruj po tablicy <Code>actions</Code>. Element tablicy{' '}
      <Code>actions</Code> oznacza indeks wciśniętego przycisku. Pobierz z{' '}
      <Code>toggleButtons</Code> definicje wciśniętego przycisku i iteruj po
      niej. Jeżeli wartość jest <Code>1</Code>, to odwróć stan światełka. Możesz
      użyć operatora XOR <Code>^</Code>.
    </div>
  );
}
