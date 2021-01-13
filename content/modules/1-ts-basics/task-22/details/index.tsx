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
      <TaskTitle>Najmniejsze zaokrąglenie</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>lowestRounding</Code>, która oblicza
        najmniejsze zaokrąglenie takie, żeby dane liczby były sobie równe.
      </div>
      <TaskFnArguments
        footer={
          <>
            Możesz założyć, że liczby będą miały maksymalnie 6 cyfr po
            przecinku.
            <br />
            <TaskRange min={0} max={[10, 3]}>
              Zakres liczb:
            </TaskRange>
          </>
        }
      >
        <li>
          <Code>a: number</Code> - Pierwsza liczba.
        </li>
        <li>
          <Code>b: number</Code> - Druga liczba. Możesz założyć, że liczba
          będzie różna od liczby pierwszej.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Precyzja zaokrąglenia wymagana, aby liczby były
        sobie równe. <Code>0</Code> oznacza zaokrąglenie do liczby całkowitej,{' '}
        <Code>1</Code> oznacza zaokrąglenie do pierwszej liczby po przecinku
        itd. Liczba powinna być możliwie jak największa.
        <br />
        Jeżeli takie zaokrąglenie nie istnieje, zwróć <Code>-1</Code>.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
lowestRounding(0.34, 0.341)
2

// Przykład 2
lowestRounding(1.2345, 1.2)
1

// Przykład 3
lowestRounding(1.2345, 1.23)
2

// Przykład 4
lowestRounding(1.111111, 1.122222)
1

// Przykład 5
lowestRounding(1.251111, 1.222222)
0

// Przykład 6
lowestRounding(1.2, 2.2)
-1
      `}
      />
    </TaskWrapper>
  );
}
