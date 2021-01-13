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
      <TaskTitle>Suma prawie dwóch największych</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>sumAlmostTwoGreatest</Code>, która oblicza
        sumę prawie dwóch największych elementów z każdej tablicy. Liczba prawie
        największa to druga największa liczba w tablicy.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr1: number</Code> - Pierwsza tablica.
          <br />
          <TaskRange min={2} max={[10, 5]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
        <li>
          <Code>arr2: number</Code> - Druga tablica.
          <br />
          <TaskRange min={2} max={[10, 5]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Suma prawie dwóch największych liczb.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
sumAlmostTwoGreatest([1, 2, 3], [10, 20, 30])
22

// Przykład 2
sumAlmostTwoGreatest([5, 5, 1], [1, 2])
6

// Przykład 3
sumAlmostTwoGreatest([3, 3, 3, 3], [1, 1, 1, 1])
4

// Przykład 5
sumAlmostTwoGreatest([1, 2, 3, 4], [4, 3, 2, 1])
6

// Przykład 6
sumAlmostTwoGreatest([-100, -101, -102], [-10, -20, -30])
-121
      `}
      />
    </TaskWrapper>
  );
}
