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
      <TaskTitle>Odwróć część tablicy</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>revertSubArray</Code>, która odwraca
        kolejność elementów w danym zakresie.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Tablica wejściowa. Dozwolone jest
          modyfikowanie tablicy wejściowej.
          <br />
          <TaskRange min={2} max={[10, 4]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
        <li>
          <Code>start: number</Code> - Indeks (numerowane od 0) elementu, od
          którego zaczyna się odwracanie (włącznie). Możesz założyć, że wartość
          będzie zawsze prawidłowa.
        </li>
        <li>
          <Code>end: number</Code> - Indeks (numerowane od 0) elementu, na
          którym kończy się odwracanie (włącznie). Możesz założyć, że wartość
          będzie zawsze prawidłowa i większa od <Code>start</Code>.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number[]</Code> - Tablica z odwróconym zakresem.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
revertSubArray([1, 2, 3, 4, 5], 0, 1)
[2, 1, 3, 4, 5]

// Przykład 2
revertSubArray([1, 2, 3, 4, 5], 0, 3)
[4, 3, 2, 1, 5]

// Przykład 3
revertSubArray([1, 2, 3, 4, 5], 1, 3)
[1, 4, 3, 2, 5]

// Przykład 4
revertSubArray([1, 2, 3, 4, 5], 0, 4)
[5, 4, 3, 2, 1]
      `}
      />
    </TaskWrapper>
  );
}
