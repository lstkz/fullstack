const path = require('path');

module.exports = function generate(plop) {
  plop.setGenerator('feature', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in camelCase (e.g. myFeature)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'apps/front/src/features'),
        base: '.blueprints/feature',
        templateFiles: '.blueprints/feature/**/**',
      },
    ],
  });
  plop.setGenerator('entity', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in PascalCase (e.g. SolutionVote)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'apps/api/src/entities'),
        base: '.blueprints/entity',
        templateFiles: '.blueprints/entity/**/**',
      },
    ],
  });
  plop.setGenerator('collection', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in PascalCase (e.g. SolutionVote)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'apps/api/src/collections'),
        base: '.blueprints/collection',
        templateFiles: '.blueprints/collection/**/**',
      },
    ],
  });
  plop.setGenerator('contract', {
    prompts: [
      {
        type: 'input',
        name: 'ns',
        message: 'choose ns name in camelCase (e.g. user)',
        basePath: '.',
      },
      {
        type: 'input',
        name: 'name',
        message: 'choose contract name in camelCase (e.g. registerUser)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'apps/api/src/contracts'),
        base: '.blueprints/contract',
        templateFiles: '.blueprints/contract/**/**',
      },
    ],
  });
  plop.setGenerator('module', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in PascalCase (e.g. ErrorModal)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'apps/front/src/components'),
        base: '.blueprints/module',
        templateFiles: '.blueprints/module/**/**',
      },
    ],
  });
};
