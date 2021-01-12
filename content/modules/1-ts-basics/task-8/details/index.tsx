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
      <TaskTitle>Niedokładne liczby</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>inaccurateNumbersEqual</Code>, porównującą
        dwie liczby zmiennoprzecinkowe z określoną dokładnością.
      </div>
      <TaskFnArguments>
        <li>
          <Code>a: number</Code> - Pierwsza liczba. <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
        <li>
          <Code>b: number</Code> - Druga liczba.
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
        <li>
          <Code>p: number</Code> - Precyzja zaokrąglenia. <Code>0</Code> oznacza
          zaokrąglenie do liczby całkowitej. <Code>1</Code> oznacza zaokrąglenie
          do 1 liczby po przecinku, <Code>2</Code> oznacza zaokrąglenie do 2
          liczby po przecinku, itd.
          <br />
          <TaskRange min={0} max={7}>
            Zakres:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>boolean</Code> - <Code>true</Code> jeśli liczby są równe lub{' '}
        <Code>false</Code> jeśli są nierówne.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
inaccurateNumbersEqual(1.1, 1.2, 0)
true

// Przykład 2
inaccurateNumbersEqual(1.1, 1.2, 1)
false

// Przykład 3
inaccurateNumbersEqual(1.12, 1.13, 1)
true

// Przykład 4
inaccurateNumbersEqual(1.12, 1.15, 1)
false

// Przykład 5
inaccurateNumbersEqual(0.99, 0.989999, 2)
true

// Przykład 6
inaccurateNumbersEqual(0.123456, 0.123455, 5)
true

// Przykład 7
inaccurateNumbersEqual(0.123456, 0.12345, 5)
false

      `}
      />
    </TaskWrapper>
  );
}
