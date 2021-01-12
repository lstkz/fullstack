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
      <TaskTitle>Banknoty</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>banknotes</Code>, która zwraca ilość
        banknotów, które są potrzebne do uzyskania danej kwoty. Masz do
        dyspozycji tylko banknoty o nominałach{' '}
        <Code>100, 50, 20, 10, 5, 1</Code>.
      </div>
      <TaskFnArguments>
        <li>
          <Code>amount: number</Code> - Kwota do obliczenia.
          <br />
          <TaskRange min={1} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Ilość banknotów, które trzeba użyć, żeby uzyskać
        daną kwotę. Ilość powinna być możliwie jak najmniejsza.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
banknotes(8)
4

// Przykład 2
banknotes(3)
3

// Przykład 3
banknotes(10)
1

// Przykład 4
banknotes(101)
2
      `}
      />
    </TaskWrapper>
  );
}
