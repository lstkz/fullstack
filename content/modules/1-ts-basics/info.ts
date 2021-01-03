import { ModuleUpload } from 'shared';

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
    {
      id: 1,
      isExample: true,
      name: 'Środkowa liczba',
      detailsS3Key: '',
      sourceS3Key: '',
      htmlS3Key: '',
      testsInfo: require('./task-1/tests-info.json'),
    },
    {
      id: 2,
      isExample: true,
      name: 'Pełna kwota',
      detailsS3Key: '',
      sourceS3Key: '',
      htmlS3Key: '',
      testsInfo: require('./task-2/tests-info.json'),
    },
    {
      id: 3,
      isExample: true,
      name: 'Najcieplejszy miesiac',
      detailsS3Key: '',
      sourceS3Key: '',
      htmlS3Key: '',
      testsInfo: require('./task-3/tests-info.json'),
    },
    {
      id: 4,
      isExample: true,
      name: 'Okrągła suma',
      detailsS3Key: '',
      sourceS3Key: '',
      htmlS3Key: '',
      testsInfo: require('./task-4/tests-info.json'),
    },
    {
      id: 5,
      isExample: true,
      name: 'Wygrane pod rząd',
      detailsS3Key: '',
      sourceS3Key: '',
      htmlS3Key: '',
      testsInfo: require('./task-5/tests-info.json'),
    },
  ],
};
