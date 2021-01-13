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
      <TaskTitle>Hazardzista</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>gambler</Code>, która symuluje obstawianie
        progresywne w ruletce. Obstawianie progresywne polega, na podwajaniu
        zakładu po każdej przegranej. Znając maksymalny możliwy zakład oraz
        ilość pieniędzy gracza, oblicz ile razy musi przegrać pod rząd, żeby
        przegrać wszystkie pieniądze. Zakład zawsze zaczyna się od kwoty{' '}
        <Code>1</Code>. Jeżeli kwota zakładu nie może zostać podwojona, to
        zawsze już się równa kwocie maksymalnej (jeżeli graczowi zostało
        wystarczająco pieniędzy).
      </div>
      <TaskFnArguments>
        <li>
          <Code>maxBet: number</Code> - Maksymalny możliwy zakład.
          <br />
          <TaskRange min={1} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
        <li>
          <Code>amount: number</Code> - Kwota pieniędzy gracza.
          <br />
          <TaskRange min={1} max={[10, 9]}>
            Zakres:
          </TaskRange>
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number</Code> - Ilość przegranych z rząd, które są potrzebne do
        przegrania wszystkich pieniędzy. Zakładamy, że każda gra kończy się
        przegraną.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
gambler(100, 7)
3
// Wyjaśnienie:
// Gracz obstawia po kolei: 1, 2, 4

// Przykład 2
gambler(100, 8)
4
// Wyjaśnienie:
// Gracz obstawia po kolei: 1, 2, 4, 1

// Przykład 3
gambler(100, 13)
4
// Wyjaśnienie:
// Gracz obstawia po kolei: 1, 2, 4, 6

// Przykład 4
gambler(2, 7)
5
// Wyjaśnienie:
// Gracz obstawia po kolei: 1, 2, 2, 2, 1

// Przykład 5
gambler(30, 30)
5
// Wyjaśnienie:
// Gracz obstawia po kolei: 1, 2, 4, 8, 15

// Przykład 6
gambler(5, 22)
6
// Wyjaśnienie:
// Gracz obstawia po kolei: 1, 2, 4, 5, 5, 5

      `}
      />
    </TaskWrapper>
  );
}
