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
      <TaskTitle>Sekwencja liczb</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>numberSequence</Code>, która generuje
        sekwencję liczb między danymi przedziałami. Sekwencja może być zarówna
        rosnąca, jak i malejąca.
      </div>
      <TaskFnArguments>
        <li>
          <Code>start: number</Code> - Początek sekwencji (włącznie).
          <br />
          <TaskRange min={-1000} max={1000}>
            Zakres
          </TaskRange>
        </li>
        <li>
          <Code>end: number</Code> - Koniec sekwencji (włącznie). Możesz
          założyć, że liczba będzie różna od <Code>start</Code>.
          <br />
          <TaskRange min={-1000} max={1000}>
            Zakres
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Foo.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
numberSequence(1, 3)
[1, 2, 3]

// Przykład 2
numberSequence(3, 1)
[3, 2, 1]

// Przykład 3
numberSequence(0, 1)
[0, 1]

// Przykład 4
numberSequence(-5, -3)
[-5, -4, -3]

// Przykład 5
numberSequence(-2, -5)
[-2, -3, -4, -5]
      `}
      />
    </TaskWrapper>
  );
}
