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
      <TaskTitle>Gra w światełka</TaskTitle>
      <div>
        Zaimplementuj funkcję <Code>lightsGame</Code>. Gra w światełka polega na
        wciskaniu przycisków, które zmieniają stan światełek (włączanie lub
        wyłączanie światełek). Na samym początku gry wszystkie światełka są
        wyłączane. Oblicz stan światełek po wciśnięciu danych przycisków.
      </div>
      <TaskFnArguments>
        <li>
          <Code>lightCount: number</Code> - Liczba światełek. Zakres:{' '}
          <Code>
            {'<'}1 - 20{'>'}
          </Code>
          .
        </li>
        <li>
          <Code>toggleButtons: number[][]</Code> - Definicja przycisków. i-ty
          element oznacza definicje i-tego przycisku. Definicja przycisku
          zawiera dokładnie <Code>lightCount</Code> elementów. j-ty element
          oznacza czy przycisk zmienia stan j-tego światełka. Jeżeli wartość
          równa się <Code>1</Code>, oznacza to, że przycisk zmienia stan
          światełka (włącza, jeżeli światełko jest wyłączone lub wyłącza, jeżeli
          światełko jest włączone).
          <br />
          <br />
          Przykład:
          <br />
          <Code>[[1, 0, 0], [1, 0, 1]]</Code> - W tym przykładzie są dwa
          przyciski i trzy światełka. <br />
          Pierwszy przycisk zmienia stan pierwszego światełka i nie zmienia
          stanów drugiego i trzeciego. <br />
          Drugi przycisk zmienia stan pierwszego i trzeciego światełka i nie
          zmienia stanu drugiego.
          <br />
          Zakres liczby przycisków:{' '}
          <Code>
            {'<'}1 - 50{'>'}
          </Code>
          .
        </li>
        <li>
          <Code>actions: number[]</Code> - Lista wykonanych akcji (wciśniętych
          przycisków). i-ty element oznacza indeks wciśniętego przycisku
          (numerowane od 0).
          <br />
          Zakres liczby akcji:{' '}
          <Code>
            {'<'}1 - 50{'>'}
          </Code>
          .
        </li>
      </TaskFnArguments>

      <TaskFnReturn>
        <Code>number[]</Code> - Stan światełek po wykonaniu wszystkich akcji.
        Powinien zawierać dokładnie <Code>lightCount</Code> elementów. Każdy
        powinien być równy <Code>0</Code> lub <Code>1</Code>, gdzie{' '}
        <Code>1</Code> oznacza, że i-te światełko jest włączone, a{' '}
        <Code>0</Code> oznacza, że i-te światełko jest wyłączone.
      </TaskFnReturn>

      <TaskFnExamples
        code={`
// Przykład 1
lightsGame(2, [[1, 1], [0, 0]], [0])
[1, 1]
// Wyjaśnienie:
// dane są dwa światełka i dwa przyciski
// wciskamy tylko pierwszy przycisk (indeks 0)
// definicja tego przycisku to [1, 1] i oznacza, że zmieniamy stan obu przycisków

// Przykład 2
lightsGame(2, [[1, 1], [0, 0]], [0, 0])
[0, 0]
// Wyjaśnienie:
// po wcisniętu przycisku po raz pierwszy stan to [1, 1]
// po ponownym wcisniętu wracamy do stanu [0, 0]

// Przykład 3
lightsGame(2, [[1, 0], [0, 1]], [0, 1, 1])
[1, 0]

// Przykład 4
lightsGame(3, [[1, 0, 1]], [0])
[1, 0, 1]
      `}
      />
    </TaskWrapper>
  );
}
