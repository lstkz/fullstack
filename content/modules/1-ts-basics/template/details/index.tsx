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
      <TaskTitle>Środkowa Liczba</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>middleNumber</Code>, która przyjmuje 3
        argumenty. Funkcja powinna zwracać liczbę, która znajduje się pomiedzy
        dwiema pozostałymi (jest większa lub równa od liczby pierwszej i
        mniejsza lub równa od liczba drugiej).
      </div>
      <TaskFnArguments>
        <li>
          <Code>a: number</Code> - Foo.
          <br />
          <TaskRange min={1} max={[10, 5]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[-10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Foo.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
middleNumber(10, 1, 7)
7

// Przykład 2
middleNumber(1, 1, 7)
1

// Przykład 3
middleNumber(7, 7, 7)
7

// Przykład 4
middleNumber(1, 2, 3)
2
      `}
      />
    </TaskWrapper>
  );
}
