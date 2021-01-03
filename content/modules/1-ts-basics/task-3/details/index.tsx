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
      <TaskTitle>Najcieplejszy miesiac</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>warmestMonth</Code>, która zwraca numer
        miesiąca, który był najcieplejszy. Jeżeli dwa lub więcej miesięcy ma
        taką samą najwyższą temperaturę, zwróć <Code>null</Code>.
      </div>
      <TaskFnArguments>
        <li>
          <Code>temps: number[]</Code> - lista temperatur dla każdego miesiąca.
          Możesz założyc, że tablica ma zawsze 12 elementów. Pierwszy element to
          temparatura w styczniu, druga to temparatura w lutym itd.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number | null</Code> - Numer najcieplejszego miesiąca lub{' '}
        <Code>null</Code>, jeżeli było kilka najciepleszych miesięcy. Numery
        miesięcy zaczynają się od <Code>1</Code>. (1 - styczeń, 2 - luty, ...,
        12 - grudzień).
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
warmestMonth([
  1, 1, 2,
  4, 5, 6,
  10, 9, 9,
  1, 2, 3,
])
7

// Przykład 2
warmestMonth([
  1, 1, 2,
  4, 5, 6,
  9, 9, 9,
  1, 2, 3,
])
null

// Przykład 3
warmestMonth([
  1, 1, 2,
  4, 5, 21,
  20, 20, 9,
  1, 2, 3,
])
6
      `}
      />
    </TaskWrapper>
  );
}
