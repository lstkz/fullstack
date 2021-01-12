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
      <TaskTitle>Clamp</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>clamp</Code>, która ogranicza podaną liczbę
        do podanego <Code>min</Code> i <Code>max</Code>.
        <br />
        Jeżeli <Code>n</Code> jest mniejsze od <Code>min</Code>, zwróć{' '}
        <Code>min</Code>.
        <br />
        Jeżeli <Code>n</Code> jest większe od <Code>max</Code>, zwróć{' '}
        <Code>max</Code>.
        <br />
        Jeżeli <Code>n</Code> znajduje się pomiędzy <Code>min</Code> i{' '}
        <Code>max</Code>, zwróć <Code>n</Code>.
      </div>
      <TaskFnArguments
        footer={
          <TaskRange min={[-10, -9]} max={[10, 9]}>
            Zakres każdej liczby:
          </TaskRange>
        }
      >
        <li>
          <Code>n: number</Code> - Liczba do sprawdzenia.
        </li>
        <li>
          <Code>min: number</Code> - Minimalna wartość.
        </li>
        <li>
          <Code>max: number</Code> - Maksymalna wartość. Możesz założyć, że{' '}
          <Code>max</Code> będzie większe lub równe <Code>min</Code>.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Liczba między <Code>min</Code> i <Code>max</Code>.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
clamp(0, 2, 5)
2

// Przykład 2
clamp(10, 2, 5)
5

// Przykład 3
clamp(3, 2, 5)
3

// Przykład 4
clamp(-3, -2, 5)
-2

// Przykład 5
clamp(-3, 0, 0)
0

      `}
      />
    </TaskWrapper>
  );
}
