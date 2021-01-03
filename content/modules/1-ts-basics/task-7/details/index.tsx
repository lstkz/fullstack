import React from 'react';
import {
  TaskTitle,
  Code,
  TaskWrapper,
  TaskFnArguments,
  TaskFnReturn,
  TaskFnExamples,
} from 'ui';

export function Details() {
  return (
    <TaskWrapper>
      <TaskTitle>Cykliczna tablica</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>cycledIndex</Code>. Zwróć liczbę o podanym
        indeksie, zakładając, że tablica zawiera nieskończony cykl. <br />
        Na przykład: <br />
        Dana jest tablica 5-elementowa <Code>[10, 11, 12, 13, 14]</Code>. <br />
        Po ostatnim elemencie powtarzamy tablicę od początku{' '}
        <Code>[10, 11, 12, 13, 14, 10, 11, 12, ...]</Code>. <br />
        Wartość pod indeksem <Code>4</Code> to <Code>14</Code>. <br />
        Wartości dla indeksów <Code>0</Code> i <Code>5</Code> to <Code>10</Code>
        . <br />
        Elementy w tablicy są powtórzone w nieskończoność.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Dana tablica. Tablica będzie zawierać
          min. 1 element.
        </li>
        <li>
          <Code>idx: number</Code> - Indeks do obliczenia. Zakres:{' '}
          <Code>
            {'<'}0 - 1.000.000.000{'>'}
          </Code>
          .
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Wartość dla podanego indeksu.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
cycledIndex([10, 11, 12, 13, 14], 4)
14

// Przykład 2
cycledIndex([10, 11, 12, 13, 14], 0)
10

// Przykład 3
cycledIndex([10, 11, 12, 13, 14], 5)
10

// Przykład 3
cycledIndex([1, 2, 3], 9)
1

// Przykład 4
cycledIndex([1, 2, 3], 100)
2

// Przykład 5
cycledIndex([1, 2, 3], 1000000)
2

// Przykład 6
cycledIndex([7], 50)
7
      `}
      />
    </TaskWrapper>
  );
}
