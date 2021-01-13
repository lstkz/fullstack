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
      <TaskTitle>Strony</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>calcPages</Code>, która oblicza ilość stron
        w zależności od ilości elementów i wielkości wybranej strony.
      </div>
      <TaskFnArguments>
        <li>
          <Code>itemCount: number</Code> - Ilość elementów.
          <br />
          <TaskRange min={0} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
        <li>
          <Code>pageSize: number</Code> - Wielkość strony.
          <br />
          <TaskRange min={1} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Ilość stron.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
calcPages(10, 5)
2
// Wytłumaczenie:
// 2 pełne strony po 5 elementów

// Przykład 2
calcPages(11, 5)
3
// Wytłumaczenie:
// 2 pełne strony po 5 elementów,
// na 3 stronie tylko 1 element

// Przykład 3
calcPages(1, 100)
1

// Przykład 4
calcPages(0, 100)
0

// Przykład 5
calcPages(1000, 100)
10

      `}
      />
    </TaskWrapper>
  );
}
