import { ModuleTaskUpload, ModuleUpload } from 'shared';

const sampleSources = [
  {
    resolution: '5k',
    url:
      'https://cdn.fullstack.pl/assets/sample-5k.54466dbf1212bb0bdb39ef875194dfc6.mp4',
  },
  {
    resolution: '1080',
    url:
      'https://cdn.fullstack.pl/assets/sample-1080p.d6867acbd6a566fb3ad237aaa70b6876.mp4',
  },
  {
    resolution: '720',
    url:
      'https://cdn.fullstack.pl/assets/sample-720p.3624bbf94bc8491650e64a72f58b0529.mp4',
  },
];

function _getTask(
  id: number,
  name: string,
  isExample = false
): ModuleTaskUpload {
  return {
    id,
    isExample: isExample,
    name,
    detailsS3Key: '',
    sourceS3Key: '',
    htmlS3Key: '',
    hintHtmlS3Key: null,
    testsInfo: require(`./task-${id}/tests-info.json`),
  };
}

export const info: ModuleUpload = {
  id: '1-ts-basics',
  name: 'Podstawy Typescripta i algorytmiki',
  description: `
Naucz się kompletnych podstaw Typescripta i algorytmiki.
Moduł zawiera lekcje i zadania dla osób, które chcą zacząć swoją przygodę z programowaniem.
`.trim(),
  isPending: false,
  lessons: [
    {
      id: 1,
      name: 'Wprowadzenie',
      sources: sampleSources,
    },
    {
      id: 2,
      name: 'Deklaracja zmiennych.',
      sources: sampleSources,
    },
    {
      id: 3,
      name:
        'Typy podstawowe: number, string, boolean, null, undefined, any, unknown.',
      sources: sampleSources,
    },
    {
      id: 4,
      name: 'Tablice.',
      sources: sampleSources,
    },
    {
      id: 5,
      name: 'Operatory jednoargumentowe: ++, --.',
      sources: sampleSources,
    },
    {
      id: 6,
      name: 'Operatory dwuargumentowe podstawowe: +, -, *, **, /, %.',
      sources: sampleSources,
    },
    {
      id: 7,
      name: 'Operatory dwuargumentowe binarne: |, ^, &, >>, <<.',
      sources: sampleSources,
    },
    {
      id: 8,
      name:
        'Operatory przypisania: =, +=, -=, *=, **=, /=, %=, &=, |=, ^=, <<=, >>=.',
      sources: sampleSources,
    },
    {
      id: 9,
      name: 'Operatory porównania: <, >, <=, >=, ==, !=, ===, !===.',
      sources: sampleSources,
    },
    {
      id: 10,
      name: 'Operatory logiczne: !, ||, &&.',
      sources: sampleSources,
    },
    {
      id: 11,
      name: 'Warunki: if..else.',
      sources: sampleSources,
    },
    {
      id: 12,
      name: 'Operator trójskładnikowy (ternary operator).',
      sources: sampleSources,
    },
    {
      id: 13,
      name: 'Petla for, for of, while.',
      sources: sampleSources,
    },
    {
      id: 14,
      name: 'Podstawy funkcji.',
      sources: sampleSources,
    },
    {
      id: 15,
      name: 'Podstawowe funkcje w Math.',
      sources: sampleSources,
    },
    {
      id: 16,
      name: 'Podstawowe funkcje w tablicy.',
      sources: sampleSources,
    },
  ],
  tasks: [
    _getTask(1, 'Środkowa liczba', true),
    _getTask(2, 'Pełna kwota', true),
    _getTask(3, 'Najcieplejszy miesiac', true),
    _getTask(4, 'Okrągła suma', true),
    _getTask(5, 'Wygrane pod rząd', true),
    _getTask(6, 'Clamp'),
    _getTask(7, 'Cykliczna tablica'),
    _getTask(8, 'Niedokładne liczby'),
    _getTask(9, 'Brakująca liczba'),
  ],
};
