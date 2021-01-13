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
      <TaskTitle>Odległość liczb</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>numberDistance</Code>, która oblicza
        odległość na osi liczbowej między danymi liczbami.
      </div>
      <TaskFnArguments>
        <li>
          <Code>a: number</Code> - Pierwsza liczba.
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
        <li>
          <Code>b: number</Code> - Druga liczba.
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Odległość między dwoma liczbami.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
numberDistance(0, 6)
6

// Przykład 2
numberDistance(1, 6)
5

// Przykład 3
numberDistance(-1, 6)
7

// Przykład 4
numberDistance(-3, -5)
2

// Przykład 5
numberDistance(-5, -3)
2

// Przykład 6
numberDistance(3, 3)
0

      `}
      />
    </TaskWrapper>
  );
}
