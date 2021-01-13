import { ModuleTaskUpload, ModuleUpload, VideoUpload } from 'shared';

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

function _getTask({
  id,
  name,
  isExample = false,
  videoSolution = null,
}: {
  id: number;
  name: string;
  isExample?: boolean;
  videoSolution?: VideoUpload[];
}): ModuleTaskUpload {
  return {
    id,
    isExample: isExample,
    name,
    detailsS3Key: '',
    sourceS3Key: '',
    htmlS3Key: '',
    hintHtmlS3Key: null,
    videoSolution,
    testsInfo: require(`./task-${id}/tests-info.json`),
  };
}

export const info: ModuleUpload = {
  id: '1-ts-basics',
  name: 'Typescript i algorytmika - podstawy',
  description: `
Naucz się kompletnych podstaw Typescripta i algorytmiki.
Moduł zawiera lekcje i zadania dla osób, które chcą zacząć swoją przygodę z programowaniem.
`.trim(),
  isPending: false,
  estimatedPracticeTimeHours: 100,
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
    _getTask({
      id: 1,
      name: 'Środkowa liczba',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 2,
      name: 'Pełna kwota',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 3,
      name: 'Najcieplejszy miesiac',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 4,
      name: 'Okrągła suma',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 5,
      name: 'Wygrane pod rząd',
      isExample: true,
      videoSolution: sampleSources,
    }),
    _getTask({ id: 6, name: 'Clamp', videoSolution: sampleSources }),
    _getTask({
      id: 7,
      name: 'Cykliczna tablica',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 8,
      name: 'Niedokładne liczby',
      videoSolution: sampleSources,
    }),
    _getTask({ id: 9, name: 'Brakująca liczba', videoSolution: sampleSources }),
    _getTask({ id: 10, name: 'Gra w światełka', videoSolution: sampleSources }),
    _getTask({
      id: 11,
      name: 'Przedziały liczb',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 12,
      name: 'Piętro',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 13,
      name: 'Wspaniałe trójki',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 14,
      name: 'Trójkąt',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 15,
      name: 'Banknoty',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 16,
      name: 'Równe karty',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 17,
      name: 'Odwróć część tablicy',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 18,
      name: 'Strony',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 19,
      name: 'Docelowa suma',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 20,
      name: 'Suma dwóch najwiekszych',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 21,
      name: 'Równe tablice',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 22,
      name: 'Najmniejsze zaokrąglenie',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 23,
      name: 'Suma prawie dwóch największych',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 24,
      name: 'Dziwna wojna',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 25,
      name: 'Binarna choinka',
      videoSolution: sampleSources,
    }),
    _getTask({
      id: 26,
      name: 'Sekwencja liczb',
      videoSolution: sampleSources,
    }),
  ],
};
