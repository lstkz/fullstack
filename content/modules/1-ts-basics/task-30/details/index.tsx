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
      <TaskTitle>Mikstura</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>mixture</Code>, która oblicza ilość mikstur,
        jakie można przygotować z podanych składników. Proporcja przygotowania
        to <Code>2:5:3</Code>, czyli do przygotowania jednej mikstury potrzeba 2
        x składnik A, 5 x składnik B, 3 x składnik C.
      </div>
      <TaskFnArguments
        footer={
          <TaskRange min={0} max={[10, 9]}>
            Zakres liczb:
          </TaskRange>
        }
      >
        <li>
          <Code>a: number</Code> - Ilość składniku A.
        </li>
        <li>
          <Code>b: number</Code> - Ilość składniku B.
        </li>
        <li>
          <Code>c: number</Code> - Ilość składniku C.
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Ilość mikstur jakie, można wytworzyć.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
mixture(2, 5, 3)
1

// Przykład 2
mixture(100, 100, 4)
1

// Przykład 3
mixture(4, 10, 6)
2

// Przykład 4
mixture(6, 15, 12)
3

// Przykład 5
mixture(6, 15, 0)
0
      `}
      />
    </TaskWrapper>
  );
}
