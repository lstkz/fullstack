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
      <TaskTitle>Docelowa suma</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>targetArraySum</Code>, która zwraca
        sub-tablice, taką że suma liczb jest równa danej sumie.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Dana tablica.
          <br />
          <TaskRange min={1} max={[10, 3]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={1} max={[10, 5]}>
            Zakres elementu:
          </TaskRange>
        </li>
        <li>
          <Code>sum: number</Code> - Docelowa suma. Możesz założyć, że
          rozwiązanie istnieje dla danej liczby.
          <br />
          <TaskRange min={1} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number[]</Code> - Sub-tablica z <Code>arr</Code>. Jeżeli istnieje
        wiele rozwiązań, zwróć wynik, który zaczyna się od najwcześniejszego
        indeksu z tablicy <Code>arr</Code>.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
targetArraySum([1, 2, 3], 3)
[1, 2]

// Przykład 2
targetArraySum([1, 2, 3, 4, 5, 6], 14)
[2, 3, 4, 5]

// Przykład 3
targetArraySum([10, 20, 30], 10)
[10]

// Przykład 4
targetArraySum([10, 10, 20, 1], 21)
[20, 1]

      `}
      />
    </TaskWrapper>
  );
}
