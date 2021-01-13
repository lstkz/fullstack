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
      <TaskTitle>Dziwna wojna</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>weirdWar</Code>. Dziwna gra polega na
        usuwaniu na zmianę liczb. Najpierw usuwa się liczbę najmniejszą, a
        później największą. Oblicz, jaka liczba zostanie zagrana jako ostania.
      </div>
      <TaskFnArguments>
        <li>
          <Code>arr: number[]</Code> - Dana tablica.
          <br />
          <TaskRange min={1} max={[10, 5]}>
            Zakres liczby elementów:
          </TaskRange>
          <br />
          <TaskRange min={[-10, 9]} max={[10, 9]}>
            Zakres elementu:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Ostatnia zagrana liczba.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
weirdWar([1, 2, 3])
2

// Przykład 2
weirdWar([4, 1, 2, 3])
3

// Przykład 3
weirdWar([1, 1])
1

// Przykład 4
weirdWar([4])
4

// Przykład 5
weirdWar([1, 1, 1, 3, 3, 3])
3

// Przykład 6
weirdWar([1, 1, 1, 3, 3])
1
      `}
      />
    </TaskWrapper>
  );
}
