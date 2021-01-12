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
      <TaskTitle>Trójkąt</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>triangle</Code>, która zwraca{' '}
        <Code>true</Code>, jeżeli można zbudować trójkąt z podanych trzech
        boków. Trójkąt można zbudować, jeżeli suma dwóch krótszych boków jest
        większa od trzeciego boku.
      </div>
      <TaskFnArguments
        footer={
          <TaskRange min={1} max={[10, 9]}>
            Zakres wszystkich liczb:
          </TaskRange>
        }
      >
        <li>
          <Code>a: number</Code> - Długość pierwszego boku.
        </li>
        <li>
          <Code>b: number</Code> - Długość drugiego boku.
        </li>
        <li>
          <Code>c: number</Code> - Długość trzeciego boku.
          <br />
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>boolean</Code> - <Code>true</Code>, jeśli można zbudować trójkąt,{' '}
        <Code>false</Code>, jeśli nie można.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
triangle(3, 1, 2)
false

// Przykład 2
triangle(5, 5, 4)
true

// Przykład 3
triangle(1, 10, 1)
false

// Przykład 4
triangle(1, 1, 1)
true
      `}
      />
    </TaskWrapper>
  );
}
