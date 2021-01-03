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
      <TaskTitle>Pełna kwota</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>roundCurrency</Code>, która powinna
        zaokraglić kwotę do pełnych groszy.
      </div>
      <TaskFnArguments>
        <li>
          <Code>amount: number</Code> - kwota do zaokrąglenia
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - zaokrąglona kwota do pełnych groszy (drugie
        miejsce po przecinku)
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
roundCurrency(1.101)
1.1

// Przykład 2
roundCurrency(10.59999)
10.6

// Przykład 3
roundCurrency(4.123)
4.12

// Przykład 4
roundCurrency(4.44499)
4.44

// Przykład 5
roundCurrency(1000)
1000
      `}
      />
    </TaskWrapper>
  );
}
