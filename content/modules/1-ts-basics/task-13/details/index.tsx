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
      <TaskTitle>Wspaniałe trójki</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>awesomeTriples</Code>. Wspaniała trójka jest
        to trójka liczb z tablicy spełniająca następujące warunki:
        <ul className="list-decimal pl-4">
          <li>
            <Code>{'i < j < k'}</Code> - gdzie <Code>i</Code> oznacza indeks
            pierwszej liczby, <Code>j</Code> oznacza indeks drugiej, a{' '}
            <Code>k</Code> oznacza indeks trzeciej.
          </li>
          <li>
            <Code>{'arr[i]^2 + arr[j]^2 < arr[k]^2'}</Code> - suma kwadratów
            dwóch pierwszych liczb powinna być mniejsza od kwadratu liczby
            trzeciej.
          </li>
        </ul>
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Tablica liczb.
          <br />
          <TaskRange min={1} max={100}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[10, -4]} max={[10, 4]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>{'number[][]'}</Code> - Wszystkie trójki liczb spełniające
        powyższe równanie. Każdy element zawiera tablicę z trzema elementami.
        Pierwszy element oznacza <Code>i</Code>, drugi <Code>j</Code>, a trzeci{' '}
        <Code>k</Code>.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
awesomeTriples([1, 2, 3]))
[
  [0, 1, 2],
]

// Przykład 2
awesomeTriples([1, 2, 3, 3]))
[
  [0, 1, 2],
  [0, 1, 3],
]

// Przykład 3
awesomeTriples([10, 10, 20, 30])
[
  [0, 1, 2],
  [0, 1, 3],
  [0, 2, 3],
  [1, 2, 3],
]

      `}
      />
    </TaskWrapper>
  );
}
