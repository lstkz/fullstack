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
      <TaskTitle>Wygrane pod rząd</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>maxStreak</Code>, która oblicza maksymalną
        ilość wygranych pod rząd gracza. Funkcja, przyjmuje jako argument
        tablice liczb, gdzie <Code>0</Code> oznacza przegraną, a <Code>1</Code>{' '}
        oznacza wygraną.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Tablica wyników gracza. Możesz założyć,
          że tablica zawiera tylko liczby <Code>0</Code> i <Code>1</Code>.{' '}
          <TaskRange min={0} max={100}>
            Zakres liczby elementów:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Maksymalna ilość wygranych (liczb <Code>1</Code>)
        pod rząd.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
maxStreak([1, 1, 0])
2

// Przykład 2
maxStreak([1, 0, 1, 0, 1])
1

// Przykład 3
maxStreak([0, 0])
0

// Przykład 4
maxStreak([1, 1, 0, 1, 1, 1])
3

// Przykład 5
maxStreak([1, 1, 0, 1, 1, 0, 1])
2

// Przykład 6
maxStreak([])
0
      `}
      />
    </TaskWrapper>
  );
}
