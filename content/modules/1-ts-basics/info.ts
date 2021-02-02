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

const task1Sources = [
  {
    resolution: '4k',
    url:
      'https://cdn.fullstack.pl/assets/task-1-4k.071777c99fbf54c0111336cc1943a757.mp4',
  },
  {
    resolution: '1080p',
    url:
      'https://cdn.fullstack.pl/assets/task-1-1080p.78cc7ef9cb65be2b7fa29a7932a51171.mp4',
  },
  {
    resolution: '720p',
    url:
      'https://cdn.fullstack.pl/assets/task-1-720p.f0b22872252e00700a52f98b5b1fe3df.mp4',
  },
];

const task2Sources = [
  {
    resolution: '4k',
    url:
      'https://cdn.fullstack.pl/assets/task-2-4k.124373d9431669db6c2bc4c4144aa42c.mp4',
  },
  {
    resolution: '1080p',
    url:
      'https://cdn.fullstack.pl/assets/task-2-1080p.07940e03a2ea0162dbbe4bf714e815b3.mp4',
  },
  {
    resolution: '720p',
    url:
      'https://cdn.fullstack.pl/assets/task-2-720p.a7f0544d864df38d5239b62fa7951256.mp4',
  },
];

const task3Sources = [
  {
    resolution: '4k',
    url:
      'https://cdn.fullstack.pl/assets/task-3-4k.64d67cd9c8307558844d2601113f892a.mp4',
  },
  {
    resolution: '1080p',
    url:
      'https://cdn.fullstack.pl/assets/task-3-1080p.6a24595b7372ee9d2c1dd7d38ed23be3.mp4',
  },
  {
    resolution: '720p',
    url:
      'https://cdn.fullstack.pl/assets/task-3-720p.2869bea41477e3434d88ed824c1e2c7c.mp4',
  },
];

const task4Sources = [
  {
    resolution: '4k',
    url:
      'https://cdn.fullstack.pl/assets/task-4-4k.56bb13be6fe335404fa96a8ddb437a93.mp4',
  },
  {
    resolution: '1080p',
    url:
      'https://cdn.fullstack.pl/assets/task-4-1080p.0db23e0add7c1cf22f487b6f86f4e593.mp4',
  },
  {
    resolution: '720p',
    url:
      'https://cdn.fullstack.pl/assets/task-4-720p.fac2ce8899b457a0a2004f3d6034abc7.mp4',
  },
];

const task5Sources = [
  {
    resolution: '4k',
    url:
      'https://cdn.fullstack.pl/assets/task-5-4k.45e4ae9261f3268ca9a714c8b6d04245.mp4',
  },
  {
    resolution: '1080p',
    url:
      'https://cdn.fullstack.pl/assets/task-5-1080p.7a952c3a15b135d9bfcb51fe763a5733.mp4',
  },
  {
    resolution: '720p',
    url:
      'https://cdn.fullstack.pl/assets/task-5-720p.1804bc74d84337a59ac515e367d34723.mp4',
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
  packageJson: JSON.stringify(require('./package-template.json'), null, 2),
  isPending: false,
  estimatedPracticeTimeHours: 100,

  lessons: [
    {
      id: 1,
      name: 'Wprowadzenie.',
      duration: '7:20',
      sources:
        // [
        //   {
        //     resolution: '4k',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-1-4k.c75b9f12b7764492cf30c8107e81c30b.mp4',
        //   },
        //   {
        //     resolution: '1080p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-1-1080p.60692c62cc679787d91b6450cb856741.mp4',
        //   },
        //   {
        //     resolution: '720p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-1-720p.7a3ce5291f95489b634d5868db9c6841.mp4',
        //   },
        // ],
        [
          {
            resolution: '4k',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-1-4k.92bb0e3baff01f32a365c3002053f41d.mp4',
          },
          {
            resolution: '1080p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-1-1080p.5b44397d00e8e6b3e9076935c7e2a2f1.mp4',
          },
          {
            resolution: '720p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-1-720p.eb0324afa215c87cb570758492a80bd7.mp4',
          },
        ],
    },
    {
      id: 2,
      name:
        'Deklaracja zmiennych: number, string, boolean, null, undefined, any.',
      duration: '8:55',
      sources:
        // [
        //   {
        //     resolution: '4k',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-2-4k.e52adedb369efe8133e73193cbfb9da1.mp4',
        //   },
        //   {
        //     resolution: '1080p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-2-1080p.811e4cb050c4e76d7ec0732c35c9be4e.mp4',
        //   },
        //   {
        //     resolution: '720p',
        //     url:
        //       'https://cdn.fullstack.pl/assets/lekcja-2-720p.81ff9a6b04c906278e51c1afde1be388.mp4',
        //   },
        // ],
        [
          {
            resolution: '4k',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-2-4k.bd1274261274e46270e27ac9f1941e5d.mp4',
          },
          {
            resolution: '1080p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-2-1080p.f049c7450a1c19575cb80b341c939b1f.mp4',
          },
          {
            resolution: '720p',
            url:
              'https://cdn.fullstack.pl/assets/lekcja-2-720p.accb03d6d6aa6356f0249f2feeec34db.mp4',
          },
        ],
    },
    {
      id: 3,
      name:
        'Operatory: jednoargumentowe, dwuargumentowe, przypisania, porównania, logiczne.',
      duration: '8:23',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-3-4k.c2a00336153d41b6b0e141cbd84a0f51.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-3-1080p.54f9d63517b6856bb3e56dc599ac0638.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-3-720p.49c512a6635e615fc09e47c7812b6300.mp4',
        },
      ],
    },
    {
      id: 4,
      name: 'Operatory binarne.',
      duration: '5:04',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-4-4k.be09a55c5e820b4708f54ded603a448c.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-4-1080p.da3cef380af9c3b6873604b2e2f68c71.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-4-720p.bf387b5093bf37ff47dfc6058566cd15.mp4',
        },
      ],
    },
    {
      id: 5,
      name: 'Instrukcje warunkowe If, ternary operator, falsy values.',
      duration: '8:02',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-5-4k.3e0ed3f802eb59e350892520dea4af78.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-5-1080p.4c2ec2400ad9de23c92fc1390923f9e2.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-5-720p.ff4ed20aa47e4493f9a46d3f80df7d39.mp4',
        },
      ],
    },
    {
      id: 6,
      name: 'Deklaracja funkcji i funkcje lambda.',
      duration: '11:53',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-6-4k.21e9d56f8eb8a5d97c10b77c84cd5770.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-6-1080p.2270b6959cddce4f2219716104b8d8d8.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-6-720p.d825881ddc887b8d4b10b46006b675ab.mp4',
        },
      ],
    },
    {
      id: 7,
      name: 'Tablice i podstawowe operacje na tablicach.',
      duration: '11:55',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-7-4k.3ec390a29e93f3810ac802ad3dc03e85.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-7-1080p.965e5ca0928ad90aca36b8888b799ce2.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-7-720p.60919150660db01e1dafbb5f67b1afad.mp4',
        },
      ],
    },
    {
      id: 8,
      name: 'Pętle "for" i "for of".',
      duration: '12:53',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-8-4k.32dcba3174289fce6fd3537e8761400f.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-8-1080p.39fe41b845d135944ee4584da7a2a382.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-8-720p.251fb7820affc78c5def95d27cef0854.mp4',
        },
      ],
    },
    {
      id: 9,
      name: 'Pętle "while", "do while" oraz kontrola pętel.',
      duration: '6:16',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-9-4k.bacdfe5d9af806b6c46b5597417d13b4.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-9-1080p.7022f3a130f6a3e73657687332b57a81.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-9-720p.9d61f11e287c5318137b408ed65cbcff.mp4',
        },
      ],
    },
    {
      id: 10,
      name: 'Spread operator',
      duration: '5:11',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-10-4k.704e4d14b3626cc09a912a056f248ed6.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-10-1080p.25ae7843f950250dfae88bec6fb0ffd9.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-10-720p.b5d178408c3131ff5dbfc79412796dee.mp4',
        },
      ],
    },
    {
      id: 11,
      name: 'Tablice: sort, forEach, map, filter.',
      duration: '13:37',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-11-4k.5b473bfda0fb896255c3639a952f9f58.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-11-1080p.ee0248fb9323be40e7b65fa556653215.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-11-720p.726292bb06938d977d4d37bf1c651e23.mp4',
        },
      ],
    },
    {
      id: 12,
      name: 'Math: min, max, floor, ceil, round.',
      duration: '7:54',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-12-4k.ba1c9632ddb9ab22a710ad14e5c1b75f.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-12-1080p.3d5fa03bab6cef3742b6ce401fd57d70.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-12-720p.aba3f63a68d0ae994285d1f40f3c5f95.mp4',
        },
      ],
    },
    {
      id: 13,
      name: 'Jak korzystać z platformy?',
      duration: '5:46',
      sources: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-13-4k.1fb876be2bb9596ad839bcf9cdf00291.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-13-1080p.b0e7447f85c9a55a9b469973d1e2c8b8.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/lekcja-13-720p.f37c0c1d65c536ea016efc8166e5fa6d.mp4',
        },
      ],
    },
    {
      id: 14,
      name: 'Przykładowe rozwiązanie: Środkowa liczba',
      duration: '2:17',
      sources: task1Sources,
    },
    {
      id: 15,
      name: 'Przykładowe rozwiązanie: Pełna kwota',
      duration: '0:32',
      sources: task2Sources,
    },
    {
      id: 16,
      name: 'Przykładowe rozwiązanie: Najcieplejszy miesiac',
      duration: '3:48',
      sources: task3Sources,
    },
    {
      id: 17,
      name: 'Przykładowe rozwiązanie: Okrągła suma',
      duration: '2:38',
      sources: task4Sources,
    },
    {
      id: 18,
      name: 'Przykładowe rozwiązanie: Wygrane pod rząd',
      duration: '1:29',
      sources: task5Sources,
    },
  ],
  tasks: [
    _getTask({
      id: 1,
      name: 'Środkowa liczba',
      isExample: true,
      videoSolution: task1Sources,
    }),
    _getTask({
      id: 2,
      name: 'Pełna kwota',
      isExample: true,
      videoSolution: task2Sources,
    }),
    _getTask({
      id: 3,
      name: 'Najcieplejszy miesiąc',
      isExample: true,
      videoSolution: task3Sources,
    }),
    _getTask({
      id: 4,
      name: 'Okrągła suma',
      isExample: true,
      videoSolution: task4Sources,
    }),
    _getTask({
      id: 5,
      name: 'Wygrane pod rząd',
      isExample: true,
      videoSolution: task5Sources,
    }),
    _getTask({
      id: 6,
      name: 'Clamp',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-6-4k.80c40137d42608e4be8eaebdf96db9c0.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-6-1080p.5170f8c0768937b36a25566b5e32ae99.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-6-720p.fa67f5eef3a87d36acc8542588b76918.mp4',
        },
      ],
    }),
    _getTask({
      id: 7,
      name: 'Cykliczna tablica',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-7-4k.c926b41fb2bb838f0ba8d1ac5fcbc051.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-7-1080p.8bd013934c57ae733afc0df44b4f5878.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-7-720p.55ec6e9e962e9b3623d0e1c5e668e792.mp4',
        },
      ],
    }),
    _getTask({
      id: 8,
      name: 'Niedokładne liczby',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-8-4k.922ca824563886d6c14c2eccad870291.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-8-1080p.92273df32fd38fe000c00bdf4d971476.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-8-720p.dba162cb9aaf04621d16d5be6db80b6a.mp4',
        },
      ],
    }),
    _getTask({
      id: 9,
      name: 'Brakująca liczba',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-9-4k.8cf4ea0c6c41e3b6fe9204ed7e1093f1.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-9-1080p.3b8fb42726d96e0951f30e36ea65e7a9.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-9-720p.80ea806ad49970f0f62d3636804416b2.mp4',
        },
      ],
    }),
    _getTask({
      id: 10,
      name: 'Gra w światełka',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-10-4k.d69aa449c4a12a1b5f28bce17ded69dc.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-10-1080p.33f87602324b2aa65179202cb638496f.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-10-720p.3c7644378a62d09f4dd74708b909277a.mp4',
        },
      ],
    }),
    _getTask({
      id: 11,
      name: 'Przedziały liczb',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-11-4k.77a13266c190bc0c08199799fb3ac670.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-11-1080p.c39e019f9456bf2c32f396960ab0cac4.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-11-720p.436fcfbccc6d1f3a7ff0dce0ff7adaa2.mp4',
        },
      ],
    }),
    _getTask({
      id: 12,
      name: 'Piętro',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-12-4k.5838826516de2c28e5cbcaa1e1f6be12.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-12-1080p.c3f92d30bcc22c8931cb8e5fdb0510a0.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-12-720p.3f1fbdeb9943ca78bde2eaa93fa35dda.mp4',
        },
      ],
    }),
    _getTask({
      id: 13,
      name: 'Wspaniałe trójki',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-13-4k.f6945d18cf9d15c76b5bfeb305129451.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-13-1080p.9050ac9cdce265647f38ca52bcd29375.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-13-720p.c62b1f1c35985ccca7e706e5d8f1ca9e.mp4',
        },
      ],
    }),
    _getTask({
      id: 14,
      name: 'Trójkąt',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-14-4k.3bca4899a6cb5373ba8f35d9e2434764.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-14-1080p.636cac66395fcc92fcf8adb5c91261df.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-14-720p.3eaaa1dbb87e336023f9a4bb6f7780a1.mp4',
        },
      ],
    }),
    _getTask({
      id: 15,
      name: 'Banknoty',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-15-4k.bca186e48a4f42e9907610ca9063f939.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-15-1080p.2a7260098870cff3c0c7a3b9df3449cb.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-15-720p.200266493fac1f56dc0b242ecf9453bf.mp4',
        },
      ],
    }),
    _getTask({
      id: 16,
      name: 'Równe karty',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-16-4k.ae738a8e5726b771cb636e6f6052d931.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-16-1080p.7e3dbebf8c95f24bc402eb32ff096992.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-16-720p.3261b699f68c1dff6ca600e590a66a10.mp4',
        },
      ],
    }),
    _getTask({
      id: 17,
      name: 'Odwróć część tablicy',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-17-4k.1bf87a092cff7cec31fa35a08633de7c.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-17-1080p.2682302cc4bc0ae5cda13e58c514f36b.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-17-720p.0a9fd9e2b2d29325f2c080744da656c1.mp4',
        },
      ],
    }),
    _getTask({
      id: 18,
      name: 'Strony',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-18-4k.590f6cefcb0ec92a11c29dc9d4402a38.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-18-1080p.8494773e70e3735e44e3afb509dd1386.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-18-720p.7a0305aeae9f8ac0079a7f88fb44fb30.mp4',
        },
      ],
    }),
    _getTask({
      id: 19,
      name: 'Docelowa suma',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-19-4k.485146118848182af7ecee189633ccce.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-19-1080p.3b89d07f4fd7e12daede60ceedd37bf6.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-19-720p.96e59f2c454f418d8e0b1a244fdc3fec.mp4',
        },
      ],
    }),
    _getTask({
      id: 20,
      name: 'Suma dwóch najwiekszych',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-20-4k.3151240b705780782a9117f2cb98a271.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-20-1080p.62527c9e4d82bc09a30aa27f6513eee4.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-20-720p.e1c45bce70a6acb813c963354089c399.mp4',
        },
      ],
    }),
    _getTask({
      id: 21,
      name: 'Równe tablice',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-21-4k.ba7bf7f1c1ad4d773851de0aafaa53be.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-21-1080p.0505b1becb3146d166b45644c0fe83ce.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-21-720p.ad4c1b6dfc5e389f09701f411a7b78f3.mp4',
        },
      ],
    }),
    _getTask({
      id: 22,
      name: 'Najmniejsze zaokrąglenie',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-22-4k.ec55d35e9fc8c0bdf0db52cb524c03d2.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-22-1080p.83e36350077b56817d5d8fc30bdbf303.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-22-720p.3aa2e63bbaec3e1838fc00e976323399.mp4',
        },
      ],
    }),
    _getTask({
      id: 23,
      name: 'Suma prawie dwóch największych',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-23-4k.721edcbb1a9fe37ba3951401dbc651e8.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-23-1080p.376fffaa8e6b491b107575aabf95de32.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-23-720p.34f77b0c5ed140f228fd58147d5c84b5.mp4',
        },
      ],
    }),
    _getTask({
      id: 24,
      name: 'Dziwna wojna',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-24-4k.14f97968b841ad81d7de9f14a2145a7c.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-24-1080p.5035e63a717b87dde3972698696856b8.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-24-720p.bed154c569dd4c4b9fd7ab8c02c419b0.mp4',
        },
      ],
    }),
    _getTask({
      id: 25,
      name: 'Binarna choinka',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-25-4k.454a4f8e84d5c24d99d4d5ea453053b3.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-25-1080p.6af6589e9e0c2d485a347798bda92f00.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-25-720p.36b529cfaab684432b77db6652d5a7bf.mp4',
        },
      ],
    }),
    _getTask({
      id: 26,
      name: 'Sekwencja liczb',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-26-4k.bf7b61ea616c1d1daa448a7f30812c95.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-26-1080p.7c123536e91512400dc4b0b44d002f63.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-26-720p.c5d94f0a8aa96d68029f26876ca55aaf.mp4',
        },
      ],
    }),
    _getTask({
      id: 27,
      name: 'Odległość liczb',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-27-4k.5c524849e3c6a90afbac6fc5df92f6df.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-27-1080p.227a33c1916854a2271122209d9216d8.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-27-720p.eebb10b36762dac45790d862950141aa.mp4',
        },
      ],
    }),
    _getTask({
      id: 28,
      name: 'Najdłuższy rosnący ciąg',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-28-4k.e46edc07eb15d96d5599c396956f0619.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-28-1080p.33737f42e10ff5a04c5313e14ae0d890.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-28-720p.669c5c42a7136012f6e645974c5827b8.mp4',
        },
      ],
    }),
    _getTask({
      id: 29,
      name: 'Hazardzista',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-29-4k.54977e315d5525518ec446f49e10a441.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-29-1080p.514b836c52e465d5d2b4a0239051caf4.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-29-720p.59efde5115979640ee0619add88764c3.mp4',
        },
      ],
    }),
    _getTask({
      id: 30,
      name: 'Mikstura',
      videoSolution: [
        {
          resolution: '4k',
          url:
            'https://cdn.fullstack.pl/assets/task-30-4k.00cb14007995fb9b7b41137c7f959db2.mp4',
        },
        {
          resolution: '1080p',
          url:
            'https://cdn.fullstack.pl/assets/task-30-1080p.0d4d5fe044e14ed4b6c439f693bdc6db.mp4',
        },
        {
          resolution: '720p',
          url:
            'https://cdn.fullstack.pl/assets/task-30-720p.d8f66dff6851af199a42a506d8278f36.mp4',
        },
      ],
    }),
  ],
};
