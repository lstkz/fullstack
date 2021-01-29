import React from 'react';
import {
  TaskTitle,
  Code,
  TaskWrapper,
  TaskFnArguments,
  TaskFnReturn,
  TaskFnExamples,
  TaskRange,
} from 'ui';

export function Details() {
  return (
    <TaskWrapper>
      <TaskTitle>Brakująca liczba</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>missingNumber</Code>. Dana jest tablica
        liczb, zawierająca różne pary takich samych liczb (np.{' '}
        <Code>[1, 3, 3, 1, 5, 5]</Code>). Jedna liczba jest ukryta i jej wartość
        została zamieniona na <Code>null</Code>. Znając sumę wszystkich liczb,
        znajdź wartość ukrytej liczby.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: {'Array<number | null>'}</Code> - Tablica liczb. Dokładnie
          jeden element jest równy <Code>null</Code>.
          <br />
          <TaskRange min={2} max={100}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={1} max={1000}>
            Zakres elementu:
          </TaskRange>
        </li>
        <li>
          <Code>sum: number</Code> - Suma liczb.
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Brakująca liczba. Możesz założyć, że rozwiązanie
        zawsze istnieje.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
missingNumber([1, 1, 2, null], 6)
2

// Przykład 2
missingNumber([1, 1, null, 10, 2, 2], 26)
10

// Przykład 3
missingNumber([5, null], 10)
5

// Przykład 4
missingNumber([null, 1, 2, 3, 2, 3], 12)
1

      `}
      />
    </TaskWrapper>
  );
}
