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
      <TaskTitle>Piętro</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>floorNumber</Code>, która zwraca numer
        piętra, które znajduje się na danej wysokości.
      </div>
      <TaskFnArguments>
        <li>
          <Code>heights: number[]</Code> - Wysokości poszczególnych pięter. i-ty
          element oznacza wysokość i-tego piętra w metrach. Zakres liczby
          elementów:{' '}
          <Code>
            {'<'}1 - 500{'>'}
          </Code>
          . Zakres elementu:{' '}
          <Code>
            {'<'}1 - 10<sup>3</sup>
            {'>'}
          </Code>
          .
        </li>
        <li>
          <Code>h: number</Code> - Wysokość do sprawdzenia. Zakres:{' '}
          <Code>
            {'<'}0 - 10<sup>9</sup>
            {'>'}
          </Code>
          .
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Numer piętra (indeksowane od 0), które znajduję
        się dla danej wysokości. Jeżeli wysokość znajduje się między piętrami,
        zwróć piętro, które jest wyżej. Jeżeli wysokość znajduje się ponad
        budynkiem, zwróć <Code>-1</Code>.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
floorNumber([5, 10, 10], 0)
0

// Przykład 2
floorNumber([5, 10, 10], 4)
0

// Przykład 3
floorNumber([5, 10, 10], 5)
1

// Przykład 4
floorNumber([5, 10, 10], 15)
2

// Przykład 5
floorNumber([5, 10, 10], 25)
2

// Przykład 6
floorNumber([5, 10, 10], 50)
-1

// Przykład 7
floorNumber([1, 2, 2, 3, 3, 5], 10)
4
      `}
      />
    </TaskWrapper>
  );
}
