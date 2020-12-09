import { ModuleUpload } from 'shared';

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
      sources: [],
    },
    {
      id: 2,
      name: 'Deklaracja zmiennych.',
      sources: [],
    },
    {
      id: 3,
      name:
        'Typy podstawowe: number, string, boolean, null, undefined, any, unknown.',
      sources: [],
    },
    {
      id: 4,
      name: 'Tablice.',
      sources: [],
    },
    {
      id: 5,
      name: 'Operatory jednoargumentowe: ++, --.',
      sources: [],
    },
    {
      id: 6,
      name: 'Operatory dwuargumentowe podstawowe: +, -, *, **, /, %.',
      sources: [],
    },
    {
      id: 7,
      name: 'Operatory dwuargumentowe binarne: |, ^, &, >>, <<.',
      sources: [],
    },
    {
      id: 8,
      name:
        'Operatory przypisania: =, +=, -=, *=, **=, /=, %=, &=, |=, ^=, <<=, >>=.',
      sources: [],
    },
    {
      id: 9,
      name: 'Operatory porównania: <, >, <=, >=, ==, !=, ===, !===.',
      sources: [],
    },
    {
      id: 10,
      name: 'Operatory logiczne: !, ||, &&.',
      sources: [],
    },
    {
      id: 11,
      name: 'Warunki: if..else.',
      sources: [],
    },
    {
      id: 12,
      name: 'Operator trójskładnikowy (ternary operator).',
      sources: [],
    },
    {
      id: 13,
      name: 'Petla for, for of, while.',
      sources: [],
    },
    {
      id: 14,
      name: 'Podstawy funkcji.',
      sources: [],
    },
    {
      id: 15,
      name: 'Podstawowe funkcje w Math.',
      sources: [],
    },
    {
      id: 16,
      name: 'Podstawowe funkcje w tablicy.',
      sources: [],
    },
  ],
  tasks: [
    {
      id: 1,
      isExample: true,
      name: 'Środkowa liczba',
      detailsS3Key: '',
      sourceS3Key: '',
    },
    // {
    //   id: 2,
    //   isExample: true,
    //   name: 'Pełna kwota',
    //   detailsS3Key: '',
    //   sourceS3Key: '',
    // },
  ],
};
