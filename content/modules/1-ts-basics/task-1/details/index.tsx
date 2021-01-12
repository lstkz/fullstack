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
      <TaskFnArguments
        footer={
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Każda liczba jest z zakresu:
          </TaskRange>
        }
      >
        <li>
          <Code>a: number</Code> - Pierwsza liczba.
        </li>
        <li>
          <Code>b: number</Code> - Druga liczba.
        </li>
        <li>
          <Code>c: number</Code> - Trzecia liczba.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Środkowa liczba.
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
