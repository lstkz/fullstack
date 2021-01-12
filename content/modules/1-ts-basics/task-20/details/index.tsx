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
      <TaskTitle>Suma dwóch najwiekszych</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>sumTwoGreatest</Code>, która oblicza sumę
        dwóch największych elementów z każdej tablicy.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr1: number[]</Code> - Pierwsza tablica.
          <br />
          <TaskRange min={1} max={[10, 5]}>
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
          <TaskRange min={1} max={[10, 5]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Suma dwóch największych liczb.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
sumTwoGreatest([11, 2], [7])
18

// Przykład 2
sumTwoGreatest([10, 10, 11], [11, 10])
22

// Przykład 3
sumTwoGreatest([10, 10, 11], [11, 10])
22

// Przykład 4
sumTwoGreatest([1, 2, 3], [3, 2, 1])
6

// Przykład 5
sumTwoGreatest([-100, -101, -102], [-10, -20, -30])
-110
      `}
      />
    </TaskWrapper>
  );
}
