import fs from 'fs';
import Path from 'path';

for (let i = 1; i <= 30; i++) {
  const path = Path.join(__dirname, `task-${i}`, 'source/package.json');
  const file = JSON.parse(fs.readFileSync(path, 'utf8'));
  file.scripts = {
    test: 'jest',
    'test:watch': 'jest --watchAll',
    submit: 'fs-tester',
    run: 'ts-node -T src/main',
  };
  file.dependencies = {
    'fullstack-tester': '^1.0.0',
    jest: '26.6.3',
    'ts-jest': '26.4.4',
    typescript: '4.1.3',
  };
  file.jest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
  fs.writeFileSync(path, JSON.stringify(file, null, 2));
}
