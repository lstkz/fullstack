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
      <TaskTitle>Przedziały liczb</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>intervals</Code>, która dzieli tablicę nad
        sub-tablice. Każda sub-tablica, powinna zawierać elementy, gdzie każdy
        kolejny element jest o 1 większy od poprzedniego.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Tablica do podzielenia.
          <br />
          <TaskRange min={1} max={500}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={1} max={[10, 5]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number[][]</Code> - Podzielona tablica. Liczba elementów powinna
        być możliwe jak najmniejsza (sub-tablice powinny zawierać możliwie jak
        najwięcej elementów).
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
intervals([1, 2, 3, 4, 6])
[[1, 2, 3, 4], [6]]

// Przykład 2
intervals([1, 3, 5])
[[1], [3], [5]]

// Przykład 3
intervals([1, 2, 3])
[[1, 2, 3]]

// Przykład 4
intervals([1, 1, 3, 3, 4])
[[1], [1], [3], [3, 4]]
      `}
      />
    </TaskWrapper>
  );
}
