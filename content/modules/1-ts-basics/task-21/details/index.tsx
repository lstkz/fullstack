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
      <TaskTitle>Równe tablice</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>equalArrays</Code>, która zwraca{' '}
        <Code>true</Code>, jeśli dane tablice są takie same. Tablice są takie
        same, jeśli mają taką samą liczbę elementów i każdy element na tej samej
        pozycji jest równy.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr1: number[]</Code> - Pierwsza tablica.
          <br />
          <TaskRange min={0} max={[10, 3]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
        <li>
          <Code>arr2: number[]</Code> - Druga tablica.
          <br />
          <TaskRange min={0} max={[10, 3]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>boolean</Code> - <Code>true</Code>, jeśli tablice są równe.{' '}
        <Code>false</Code>, w przeciwnym wypadku.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
equalArrays([1, 2], [1, 2])
true

// Przykład 3
equalArrays([1, 2, 3], [1, 2])
false

// Przykład 4
equalArrays([1, 2], [2, 2])
false

// Przykład 5
equalArrays([], [])
true

      `}
      />
    </TaskWrapper>
  );
}
